import React, { useState, useEffect } from 'react';
import { SchoolProvider } from './context/SchoolContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DeploymentModal } from './components/DeploymentModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ResultCheckerPage } from './pages/ResultCheckerPage';
import { FeePortalPage } from './pages/FeePortalPage';
import { NoticesPage } from './pages/NoticesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { TeacherPortalPage } from './pages/TeacherPortalPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [deploymentModalOpen, setDeploymentModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <SchoolProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openDeploymentModal={() => setDeploymentModalOpen(true)}
        />

        <main className="flex-1">
          {activeTab === 'home' && (
            <HomePage
              setActiveTab={setActiveTab}
              openDeploymentModal={() => setDeploymentModalOpen(true)}
            />
          )}
          {activeTab === 'about' && <AboutPage setActiveTab={setActiveTab} />}
          {activeTab === 'academics' && <AcademicsPage setActiveTab={setActiveTab} />}
          {activeTab === 'admission' && <AdmissionsPage />}
          {activeTab === 'result' && <ResultCheckerPage />}
          {activeTab === 'fee' && <FeePortalPage />}
          {activeTab === 'notices' && <NoticesPage />}
          {activeTab === 'gallery' && <GalleryPage />}
          {activeTab === 'contact' && <ContactPage />}
          {activeTab === 'teacher' && <TeacherPortalPage />}
          {activeTab === 'admin' && (
            <AdminDashboardPage openDeploymentModal={() => setDeploymentModalOpen(true)} />
          )}
        </main>

        <Footer
          setActiveTab={setActiveTab}
          openDeploymentModal={() => setDeploymentModalOpen(true)}
        />

        <DeploymentModal
          isOpen={deploymentModalOpen}
          onClose={() => setDeploymentModalOpen(false)}
        />
      </div>
    </SchoolProvider>
  );
}
