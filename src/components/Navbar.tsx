import React, { useState } from 'react';
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  UserCheck,
  Menu,
  X,
  FileText,
  CreditCard,
  Search,
  Bell,
  Sparkles,
  CloudUpload,
  BookOpen,
  Home,
  Info,
  Calendar,
  Image,
  LogOut
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openDeploymentModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openDeploymentModal }) => {
  const { db, session, logout, loginAs } = useSchool();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState<'admin' | 'teacher'>('teacher');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const urgentNotices = db.notices.filter(n => n.isUrgent);

  const handleQuickLogin = (role: 'admin' | 'teacher') => {
    if (role === 'admin') {
      loginAs('admin', 'Principal / Admin Office', 'admin@alsiraj.edu');
    } else {
      loginAs('teacher', 'Engr. Salman Farooq', 'teacher@alsiraj.edu', 'Class 10th - Science');
    }
    setLoginModalOpen(false);
    setActiveTab(role === 'admin' ? 'admin' : 'teacher');
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginRole === 'admin') {
      loginAs('admin', 'Administrator', emailInput || 'admin@alsiraj.edu');
      setActiveTab('admin');
    } else {
      loginAs('teacher', 'Faculty Member', emailInput || 'teacher@alsiraj.edu', 'Class 10th');
      setActiveTab('teacher');
    }
    setLoginModalOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'academics', label: 'Academics', icon: BookOpen },
    { id: 'admission', label: 'Online Admission', icon: FileText, highlight: true },
    { id: 'result', label: 'Check Result', icon: Search, badge: 'DMC' },
    { id: 'fee', label: 'Fee Portal', icon: CreditCard },
    { id: 'notices', label: 'Notices', icon: Bell, count: urgentNotices.length },
    { id: 'gallery', label: 'Campus Life', icon: Image },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <>
      {/* Top Bar with Urgent Announcement Marquee & Contact Info */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Marquee or Urgent Alert */}
          <div className="flex items-center gap-2 overflow-hidden w-full md:w-auto">
            <span className="bg-emerald-600 text-white font-semibold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Admission 2026-27
            </span>
            <p className="truncate text-slate-300 font-medium">
              {urgentNotices.length > 0 ? urgentNotices[0].title : 'Online Admissions are open for Playgroup to Matric (Science & Arts). Apply online now!'}
            </p>
          </div>

          {/* Quick Contact & Info */}
          <div className="flex items-center gap-4 text-slate-400 shrink-0">
            <a href={`tel:${db.settings.phone}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>{db.settings.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>BISE Affiliated</span>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <button
              onClick={openDeploymentModal}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer underline decoration-dotted"
              title="Free Hosting & Database Instructions"
            >
              <CloudUpload className="w-3.5 h-3.5" />
              <span>Free Hosting Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Branding */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo & School Name */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform border border-emerald-600/40">
              <GraduationCap className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Al-Siraj <span className="text-emerald-700 font-bold">Model High School</span>
                </span>
                <span className="hidden md:inline-block text-sm font-urdu text-emerald-800 font-bold" dir="rtl">
                  السراج ماڈل ہائی اسکول
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {db.settings.tagline} • <span className="text-emerald-700 font-semibold">{db.settings.regNo}</span>
              </p>
            </div>
          </div>

          {/* Right Action / Portal Badges */}
          <div className="hidden lg:flex items-center gap-3">
            {session.role === 'public' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setLoginRole('teacher');
                    setLoginModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Teacher Login
                </button>
                <button
                  onClick={() => {
                    setLoginRole('admin');
                    setLoginModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Admin ERP
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                <div className="text-xs">
                  <span className="font-semibold text-emerald-900 capitalize">{session.role} Mode:</span>{' '}
                  <span className="text-emerald-700">{session.name}</span>
                </div>
                <button
                  onClick={() => setActiveTab(session.role === 'admin' ? 'admin' : 'teacher')}
                  className="ml-2 text-xs font-semibold bg-emerald-700 text-white px-2.5 py-1 rounded hover:bg-emerald-800 cursor-pointer"
                >
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className="text-xs text-red-600 hover:text-red-700 p-1 cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Bar Links */}
        <nav className="hidden lg:block bg-slate-100/90 border-t border-slate-200/80 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-1 py-1.5">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : item.highlight
                        ? 'text-emerald-800 hover:bg-emerald-100/80 bg-emerald-50 border border-emerald-300'
                        : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : ''}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] bg-amber-500 text-slate-900 font-bold px-1.5 py-0.2 rounded-full ml-1">
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && item.count > 0 && (
                      <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded-full ml-1">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick action buttons on nav */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('fee')}
                className="text-xs font-semibold text-slate-700 hover:text-emerald-800 flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-slate-200 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                Pay Online
              </button>
              <button
                onClick={() => setActiveTab('result')}
                className="text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                Result DMC
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveTab('result');
                }}
                className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-left text-xs font-bold text-amber-900 flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-amber-600" />
                Check Result
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveTab('fee');
                }}
                className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-left text-xs font-bold text-emerald-900 flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-emerald-600" />
                Fee Portal
              </button>
            </div>

            <div className="space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'bg-emerald-800 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Portal links in mobile */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Staff & Admin Access</p>
              {session.role === 'public' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLoginRole('teacher');
                      setLoginModalOpen(true);
                    }}
                    className="flex-1 py-2 text-xs font-semibold border border-slate-300 rounded-lg text-slate-700 text-center"
                  >
                    Teacher Portal
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLoginRole('admin');
                      setLoginModalOpen(true);
                    }}
                    className="flex-1 py-2 text-xs font-semibold bg-emerald-800 text-white rounded-lg text-center"
                  >
                    Admin ERP
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-slate-100 p-2.5 rounded-lg">
                  <div>
                    <p className="text-xs font-bold text-slate-800 capitalize">{session.role} Logged In</p>
                    <p className="text-[11px] text-slate-500">{session.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveTab(session.role === 'admin' ? 'admin' : 'teacher');
                        setMobileMenuOpen(false);
                      }}
                      className="px-2.5 py-1 bg-emerald-800 text-white rounded text-xs font-semibold"
                    >
                      Dashboard
                    </button>
                    <button onClick={logout} className="p-1 text-red-600">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDeploymentModal();
              }}
              className="w-full mt-2 py-2 text-xs font-semibold bg-slate-900 text-emerald-400 rounded-lg flex items-center justify-center gap-1.5"
            >
              <CloudUpload className="w-4 h-4" />
              Free Hosting & Database Guide
            </button>
          </div>
        )}
      </header>

      {/* Staff / Admin Login Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-150">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-5 text-white flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-700/60 rounded-xl border border-emerald-500/30">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {loginRole === 'admin' ? 'School Administrator Login' : 'Teacher Portal Login'}
                  </h3>
                  <p className="text-xs text-emerald-200 font-urdu mt-0.5">
                    {loginRole === 'admin' ? 'السراج ماڈل ہائی اسکول ایڈمن پورٹل' : 'اساتذہ کے لیے وقف پورٹل'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setLoginModalOpen(false)}
                className="text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-emerald-800/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role switch toggle */}
            <div className="p-5">
              <div className="flex rounded-lg bg-slate-100 p-1 mb-5">
                <button
                  type="button"
                  onClick={() => setLoginRole('teacher')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    loginRole === 'teacher' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Teacher Portal
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRole('admin')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    loginRole === 'admin' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Principal / Admin ERP
                </button>
              </div>

              {/* Instant 1-Click Demo Login Box */}
              <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> One-Click Quick Access (Test Mode)
                  </span>
                  <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-mono font-semibold">
                    Instant
                  </span>
                </div>
                <p className="text-xs text-amber-800 mb-2.5">
                  Click below to immediately log in as {loginRole === 'admin' ? 'Principal Administrator' : 'Senior Teacher (Engr. Salman)'} without entering credentials:
                </p>
                <button
                  type="button"
                  onClick={() => handleQuickLogin(loginRole)}
                  className="w-full py-2 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-semibold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-amber-300" />
                  Instant Demo Login as {loginRole === 'admin' ? 'Admin' : 'Teacher'}
                </button>
              </div>

              {/* Custom Login Form */}
              <form onSubmit={handleCustomLogin} className="space-y-3">
                <div className="relative">
                  <div className="text-center text-xs text-slate-400 mb-2 font-medium">Or enter credentials</div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email or Username</label>
                  <input
                    type="text"
                    placeholder={loginRole === 'admin' ? 'admin@alsiraj.edu' : 'teacher@alsiraj.edu'}
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLoginModalOpen(false)}
                    className="flex-1 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
