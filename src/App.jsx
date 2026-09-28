import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AdminLayout } from './components/layout/AdminLayout';
import { StudentLayout } from './components/layout/StudentLayout';
import { ProtectedRoute } from './components/routes/ProtectedRoute';
import { BackToTop } from './components/shared/CourseCard';

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Academics } from './pages/public/Academics';
import { Courses } from './pages/public/Courses';
import { FacultyPage } from './pages/public/FacultyPage';
import { FacilitiesPage } from './pages/public/FacilitiesPage';
import { AdmissionsPage } from './pages/public/AdmissionsPage';
import { NoticesPage } from './pages/public/NoticesPage';
import { EventsPage } from './pages/public/EventsPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { AchievementsPage } from './pages/public/AchievementsPage';
import { ContactPage } from './pages/public/ContactPage';
import { StudentLogin } from './pages/public/StudentLogin';
import { StudentRegister } from './pages/public/StudentRegister';
import { AdminLogin } from './pages/public/AdminLogin';
import { NotFound } from './pages/public/NotFound';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { AdmissionApplication } from './pages/student/AdmissionApplication';
import { MyApplications } from './pages/student/MyApplications';
import { ApplicationDetails } from './pages/student/ApplicationDetails';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageStudents } from './pages/admin/ManageStudents';
import { ManageAdmissions } from './pages/admin/ManageAdmissions';
import { ManageNotices } from './pages/admin/ManageNotices';
import { ManageEvents } from './pages/admin/ManageEvents';
import { ManageFaculty } from './pages/admin/ManageFaculty';
import { ManageCourses } from './pages/admin/ManageCourses';
import { ManageFacilities } from './pages/admin/ManageFacilities';
import { ManageGallery } from './pages/admin/ManageGallery';
import { ManageAchievements } from './pages/admin/ManageAchievements';
import { ManageSchoolInfo } from './pages/admin/ManageSchoolInfo';
import { ManageContacts } from './pages/admin/ManageContacts';

// Public Layout Wrapper
const PublicLayout = () => (
  <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <BackToTop />
  </div>
);

export function App() {
  return (
    <Routes>
      {/* 1. PUBLIC WEBSITE ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Route>

      {/* 2. PROTECTED STUDENT ROUTES */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout><StudentDashboard /></StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout><StudentProfile /></StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/apply"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout><AdmissionApplication /></StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/applications"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout><MyApplications /></StudentLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/applications/:id"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout><ApplicationDetails /></StudentLayout>
          </ProtectedRoute>
        }
      />

      {/* 3. PROTECTED ADMIN ROUTES */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><ManageStudents /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/admissions"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><ManageAdmissions /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/contacts"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><ManageContacts /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notices"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><ManageNotices /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><ManageEvents /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/faculty"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><ManageFaculty /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><ManageCourses /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/facilities"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><ManageFacilities /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><ManageGallery /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/achievements"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><ManageAchievements /></AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/school-info"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout><ManageSchoolInfo /></AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* 4. 404 CATCH-ALL ROUTE */}
      <Route path="*" element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
