import React, { useContext } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import StudentListPage from './pages/StudentListPage';
import CourseManagementPage from './pages/CourseManagementPage';
import LandingPage from './pages/LandingPage';
import AuthContext, { AuthProvider } from './context/AuthContext';
import './App.css';

function AppRoutes() {
  const { auth } = useContext(AuthContext);

  const routes = useRoutes([
    { path: '/', element: <LandingPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/students', element: auth ? <StudentListPage /> : <Navigate to="/login" /> },
    { path: '/courses', element: auth ? <CourseManagementPage /> : <Navigate to="/login" /> },
  ]);

  return routes;
}

function App() {
  return (
    <AuthProvider>
      <Header />
      <div className="App">
        <AppRoutes />
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
