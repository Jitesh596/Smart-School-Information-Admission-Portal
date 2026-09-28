import React, { createContext, useContext, useState, useEffect } from 'react';
import { isFirebaseConfigured, auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getUserProfile, saveUserProfile } from '../services/dataService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('school_auth_user_v1');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // Sync with Firebase Auth state if configured
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            let profile = await getUserProfile(firebaseUser.uid);
            if (!profile) {
              // Create default student profile if missing in Firestore
              profile = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
                role: 'student',
                phone: '',
                createdAt: new Date().toISOString()
              };
              await saveUserProfile(profile);
            }
            setCurrentUser(profile);
            localStorage.setItem('school_auth_user_v1', JSON.stringify(profile));
          } catch (e) {
            console.error("Failed to load authenticated user profile:", e);
            setCurrentUser(null);
            localStorage.removeItem('school_auth_user_v1');
          }
        } else {
          setCurrentUser(null);
          localStorage.removeItem('school_auth_user_v1');
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      setLoading(false);
    }
  }, []);

  const updateLocalUser = (userData) => {
    setCurrentUser(userData);
    if (userData) {
      localStorage.setItem('school_auth_user_v1', JSON.stringify(userData));
    } else {
      localStorage.removeItem('school_auth_user_v1');
    }
  };

  // 1. Student Registration
  const registerStudent = async ({ fullName, email, password, phone }) => {
    if (isFirebaseConfigured && auth) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = {
          uid: userCredential.user.uid,
          name: fullName,
          email,
          phone: phone || '',
          role: 'student',
          createdAt: new Date().toISOString()
        };
        await saveUserProfile(newUser);
        updateLocalUser(newUser);
        return newUser;
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          throw new Error('An account with this email address already exists. Please log in.');
        } else if (err.code === 'auth/weak-password') {
          throw new Error('Password should be at least 6 characters long.');
        } else {
          throw new Error(err.message || 'Registration failed. Please try again.');
        }
      }
    }

    // Demo Mode fallback
    const mockUid = `uid-std-${Date.now()}`;
    const newUser = {
      uid: mockUid,
      name: fullName,
      email,
      phone: phone || '',
      role: 'student',
      createdAt: new Date().toISOString()
    };
    await saveUserProfile(newUser);
    updateLocalUser(newUser);
    return newUser;
  };

  // 2. Generic Student Login
  const loginUser = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        let profile = await getUserProfile(userCredential.user.uid);
        if (!profile) {
          profile = {
            uid: userCredential.user.uid,
            email,
            name: userCredential.user.displayName || email.split('@')[0],
            role: 'student',
            createdAt: new Date().toISOString()
          };
          await saveUserProfile(profile);
        }
        updateLocalUser(profile);
        return profile;
      } catch (err) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          throw new Error('Invalid email or password.');
        }
        throw new Error(err.message || 'Authentication failed.');
      }
    }

    // Demo Mode fallback
    const existing = await getUserProfile(email);
    const user = existing || {
      uid: `std-demo-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      phone: '+1 (555) 123-4567',
      role: 'student',
      createdAt: new Date().toISOString()
    };

    await saveUserProfile(user);
    updateLocalUser(user);
    return user;
  };

  // 3. Admin Login
  const loginAdmin = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const profile = await getUserProfile(userCredential.user.uid);

        if (!profile || profile.role !== 'admin') {
          // Immediately sign out unauthorized user
          await signOut(auth);
          updateLocalUser(null);
          throw new Error('Access denied. Account does not have administrator privileges.');
        }

        updateLocalUser(profile);
        return profile;
      } catch (err) {
        if (err.message.includes('Access denied')) {
          throw err;
        }
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          throw new Error('Invalid administrator credentials.');
        }
        throw new Error(err.message || 'Admin authentication failed.');
      }
    }

    // Demo Mode fallback
    if (email !== 'admin@example.com' && email !== 'admin@apexacademy.edu') {
      const existing = await getUserProfile(email);
      if (existing?.role !== 'admin') {
        throw new Error('Access denied. Account does not have administrator privileges.');
      }
    }

    const adminUser = {
      uid: 'admin-demo-id',
      name: 'System Administrator',
      email: email,
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    await saveUserProfile(adminUser);
    updateLocalUser(adminUser);
    return adminUser;
  };

  // 4. Update Profile
  const updateProfile = async (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    await saveUserProfile(updated);
    updateLocalUser(updated);
    return updated;
  };

  // 5. Logout
  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn("Signout error:", e);
      }
    }
    updateLocalUser(null);
  };

  const isAdmin = currentUser?.role === 'admin';
  const isStudent = currentUser?.role === 'student' || currentUser?.role === 'parent';

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      registerStudent,
      loginUser,
      loginAdmin,
      updateProfile,
      logout,
      isAdmin,
      isStudent,
      isAuthenticated: Boolean(currentUser)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
