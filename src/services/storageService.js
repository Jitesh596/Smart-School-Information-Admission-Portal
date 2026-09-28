import { isFirebaseConfigured, storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

const MAX_DOC_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_DOC_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/jpg'
];

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/webp'
];

/**
 * Upload a student admission document to Firebase Storage
 * Path: studentDocuments/{uid}/{applicationId}/{filename}
 */
export const uploadStudentDocument = async (file, uid, applicationId, onProgress = null) => {
  if (!file) throw new Error('No file selected.');

  if (!ALLOWED_DOC_TYPES.includes(file.type)) {
    throw new Error(`Invalid file type (${file.type || 'unknown'}). Allowed formats: PDF, JPG, PNG.`);
  }

  if (file.size > MAX_DOC_SIZE) {
    throw new Error(`File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds 10MB limit.`);
  }

  const safeFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const storagePath = `studentDocuments/${uid}/${applicationId}/${safeFileName}`;

  if (isFirebaseConfigured && storage) {
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => {
          reject(new Error(`Storage Upload Failed: ${error.message}`));
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            name: file.name,
            path: storagePath,
            downloadURL,
            type: file.type,
            size: (file.size / 1024).toFixed(1) + ' KB'
          });
        }
      );
    });
  }

  // Demo fallback mode (object URL preview)
  const mockUrl = URL.createObjectURL(file);
  if (onProgress) onProgress(100);
  return {
    name: file.name,
    path: `mock/${storagePath}`,
    downloadURL: mockUrl,
    type: file.type,
    size: (file.size / 1024).toFixed(1) + ' KB'
  };
};

/**
 * Upload an admin school image (Gallery, Faculty, Facilities, Events, Achievements)
 * Path: schoolImages/{folder}/{filename}
 */
export const uploadSchoolImage = async (file, folder = 'general', onProgress = null) => {
  if (!file) throw new Error('No image file selected.');

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`Invalid image type (${file.type}). Allowed formats: JPG, PNG, WEBP.`);
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(`Image size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds 5MB limit.`);
  }

  const safeFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const storagePath = `schoolImages/${folder}/${safeFileName}`;

  if (isFirebaseConfigured && storage) {
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => {
          reject(new Error(`Image Upload Failed: ${error.message}`));
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadURL,
            path: storagePath,
            name: file.name
          });
        }
      );
    });
  }

  // Demo fallback mode
  const mockUrl = URL.createObjectURL(file);
  if (onProgress) onProgress(100);
  return {
    downloadURL: mockUrl,
    path: `mock/${storagePath}`,
    name: file.name
  };
};

/**
 * Delete a file from Firebase Storage
 */
export const deleteStorageFile = async (storagePath) => {
  if (!storagePath || storagePath.startsWith('mock/') || storagePath.startsWith('http')) {
    return true;
  }
  if (isFirebaseConfigured && storage) {
    try {
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
      return true;
    } catch (e) {
      console.warn("Storage delete file notice:", e);
      return false;
    }
  }
  return true;
};
