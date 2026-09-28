import { isFirebaseConfigured, db } from '../firebase/config';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

import {
  initialSchoolInfo,
  initialNotices,
  initialEvents,
  initialFaculty,
  initialFacilities,
  initialCourses,
  initialAchievements,
  initialGallery,
  initialApplications,
  initialUsers
} from '../data/initialDemoData';

// LocalStorage Persistence Keys (used only when Firebase is not configured)
const KEYS = {
  schoolInfo: 'school_info_v1',
  notices: 'school_notices_v1',
  events: 'school_events_v1',
  faculty: 'school_faculty_v1',
  facilities: 'school_facilities_v1',
  courses: 'school_courses_v1',
  achievements: 'school_achievements_v1',
  gallery: 'school_gallery_v1',
  applications: 'school_applications_v1',
  users: 'school_users_v1',
  contacts: 'school_contacts_v1'
};

// Initialize LocalStorage with seed data if empty and running in demo mode
const initLocalStorage = () => {
  if (isFirebaseConfigured) return; // Do not initialize demo LocalStorage if Firebase is configured

  if (!localStorage.getItem(KEYS.schoolInfo)) {
    localStorage.setItem(KEYS.schoolInfo, JSON.stringify(initialSchoolInfo));
  }
  if (!localStorage.getItem(KEYS.notices)) {
    localStorage.setItem(KEYS.notices, JSON.stringify(initialNotices));
  }
  if (!localStorage.getItem(KEYS.events)) {
    localStorage.setItem(KEYS.events, JSON.stringify(initialEvents));
  }
  if (!localStorage.getItem(KEYS.faculty)) {
    localStorage.setItem(KEYS.faculty, JSON.stringify(initialFaculty));
  }
  if (!localStorage.getItem(KEYS.facilities)) {
    localStorage.setItem(KEYS.facilities, JSON.stringify(initialFacilities));
  }
  if (!localStorage.getItem(KEYS.courses)) {
    localStorage.setItem(KEYS.courses, JSON.stringify(initialCourses));
  }
  if (!localStorage.getItem(KEYS.achievements)) {
    localStorage.setItem(KEYS.achievements, JSON.stringify(initialAchievements));
  }
  if (!localStorage.getItem(KEYS.gallery)) {
    localStorage.setItem(KEYS.gallery, JSON.stringify(initialGallery));
  }
  if (!localStorage.getItem(KEYS.applications)) {
    localStorage.setItem(KEYS.applications, JSON.stringify(initialApplications));
  }
  if (!localStorage.getItem(KEYS.users)) {
    localStorage.setItem(KEYS.users, JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem(KEYS.contacts)) {
    localStorage.setItem(KEYS.contacts, JSON.stringify([]));
  }
};

initLocalStorage();

const getLS = (key) => JSON.parse(localStorage.getItem(key) || '[]');
const setLS = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// ==========================================
// 1. SCHOOL INFORMATION SERVICE
// ==========================================
export const getSchoolInfo = async () => {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'schoolInfo', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    return initialSchoolInfo;
  }
  const data = localStorage.getItem(KEYS.schoolInfo);
  return data ? JSON.parse(data) : initialSchoolInfo;
};

export const updateSchoolInfo = async (infoData) => {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'schoolInfo', 'main');
    await setDoc(docRef, { ...infoData, updatedAt: serverTimestamp() }, { merge: true });
    return infoData;
  }
  setLS(KEYS.schoolInfo, infoData);
  return infoData;
};

// ==========================================
// 2. GENERIC COLLECTION CRUD SERVICE
// ==========================================
export const getCollectionData = async (collectionName, storageKey) => {
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() });
    });
    return items;
  }
  return getLS(KEYS[storageKey] || storageKey);
};

export const addItem = async (collectionName, storageKey, itemData) => {
  const newItem = {
    ...itemData,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    const docRef = await addDoc(collection(db, collectionName), {
      ...newItem,
      createdAt: serverTimestamp()
    });
    newItem.id = docRef.id;
    return newItem;
  }

  newItem.id = `${collectionName.slice(0, 3)}-${Date.now()}`;
  const items = getLS(KEYS[storageKey] || storageKey);
  items.unshift(newItem);
  setLS(KEYS[storageKey] || storageKey, items);
  return newItem;
};

export const updateItem = async (collectionName, storageKey, id, itemData) => {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...itemData,
      updatedAt: serverTimestamp()
    });
    return { id, ...itemData };
  }

  const items = getLS(KEYS[storageKey] || storageKey);
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...itemData, updatedAt: new Date().toISOString() };
    setLS(KEYS[storageKey] || storageKey, items);
    return items[index];
  }
  return null;
};

export const deleteItem = async (collectionName, storageKey, id) => {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, collectionName, id));
    return true;
  }

  const items = getLS(KEYS[storageKey] || storageKey);
  const filtered = items.filter(item => item.id !== id);
  setLS(KEYS[storageKey] || storageKey, filtered);
  return true;
};

// ==========================================
// 3. ADMISSION APPLICATIONS SERVICE
// ==========================================
export const getApplications = async (studentId = null) => {
  if (isFirebaseConfigured && db) {
    let q;
    if (studentId) {
      q = query(collection(db, 'applications'), where('studentId', '==', studentId));
    } else {
      q = query(collection(db, 'applications'));
    }
    const querySnapshot = await getDocs(q);
    const list = [];
    querySnapshot.forEach(docSnap => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  }

  const list = getLS(KEYS.applications);
  if (studentId) {
    return list.filter(app => app.studentId === studentId || app.email === studentId);
  }
  return list;
};

export const submitApplication = async (applicationData) => {
  const newApp = {
    ...applicationData,
    id: `APP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'Pending',
    submittedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'applications', newApp.id);
    await setDoc(docRef, {
      ...newApp,
      submittedAt: serverTimestamp()
    });
    return newApp;
  }

  const apps = getLS(KEYS.applications);
  apps.unshift(newApp);
  setLS(KEYS.applications, apps);
  return newApp;
};

export const updateApplicationStatus = async (id, status, notes = "") => {
  return updateItem('applications', 'applications', id, { status, adminNotes: notes });
};

// ==========================================
// 4. USER PROFILES SERVICE
// ==========================================
export const getUserProfile = async (uid) => {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    return null;
  }

  const users = getLS(KEYS.users);
  return users.find(u => u.uid === uid || u.email === uid) || null;
};

export const saveUserProfile = async (userData) => {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'users', userData.uid);
    await setDoc(docRef, {
      ...userData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return userData;
  }

  const users = getLS(KEYS.users);
  const index = users.findIndex(u => u.uid === userData.uid || u.email === userData.email);
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
  } else {
    users.push(userData);
  }
  setLS(KEYS.users, users);
  return userData;
};

export const getAllUsers = async () => {
  return getCollectionData('users', 'users');
};

// ==========================================
// 5. CONTACT INQUIRIES SERVICE
// ==========================================
export const getContacts = async () => {
  return getCollectionData('contacts', 'contacts');
};

export const submitContact = async (contactData) => {
  const newContact = {
    ...contactData,
    status: 'New',
    createdAt: new Date().toISOString()
  };
  return addItem('contacts', 'contacts', newContact);
};

export const updateContactStatus = async (id, status) => {
  return updateItem('contacts', 'contacts', id, { status });
};

export const deleteContact = async (id) => {
  return deleteItem('contacts', 'contacts', id);
};
