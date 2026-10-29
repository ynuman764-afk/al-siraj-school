import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Search,
  CreditCard,
  FileText,
  Calendar,
  ShieldCheck,
  Microscope,
  Cpu,
  HeartHandshake,
  Star,
  Quote,
  Bell
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  openDeploymentModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, openDeploymentModal }) => {
  const { db } = useSchool();
  const urgentNotices = db.notices.filter(n => n.isUrgent);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 text-white pt-16 pb-20 sm:pb-24">
        {/* Subtle decorative glow & pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badges */}
              <div className="inline-flex flex-wrap items-center gap-2 justify-center lg:justify-start">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Admissions Open 2026-2027
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/15 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> BISE Affiliated & Govt. Registered
                </span>
              </div>

              {/* Headings */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  Empowering Futures with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Faith, Knowledge</span> & Excellence.
                </h1>
                <p className="text-base sm:text-lg text-emerald-100/90 font-urdu leading-relaxed pt-1" dir="rtl">
                  السراج ماڈل ہائی اسکول — اسلامی اقدار اور جدید سائنسی تعلیم کا مثالی سنگم
                </p>
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Welcome to Al-Siraj Model High School. We cultivate academic distinction, ethical integrity, and technological proficiency from Montessori to Matriculation in a purpose-built nurturing environment.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => setActiveTab('admission')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60 transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('result')}
                  className="px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Result (DMC)</span>
                </button>

                <button
                  onClick={() => setActiveTab('fee')}
                  className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Digital Fee Portal</span>
                </button>
              </div>

              {/* Key Features Bullet Row */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Well-Equipped Science & IT Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hifz & Nazra Tajweed Wing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Scholarships for High Achievers</span>
                </div>
              </div>
            </div>

            {/* Right Card / Interactive Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl space-y-5 text-white">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Al-Siraj Quick Portal</h3>
                      <p className="text-[11px] text-slate-300">Immediate Student Services</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-600/60 px-2 py-0.5 rounded text-emerald-200">
                    24/7 Live
                  </span>
                </div>

                {/* Instant Result Box */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5" /> Online Result DMC Search
                    </span>
                    <span className="text-[10px] text-slate-400">Annual 2026</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Enter student roll number to view official Detailed Marks Certificate (DMC):
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. ASM-101"
                      defaultValue="ASM-101"
                      id="hero-roll-input"
                      className="bg-slate-800 border border-slate-700 text-white text-xs px-3 py-2 rounded-lg flex-1 font-mono uppercase focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <button
                      onClick={() => {
                        const val = (document.getElementById('hero-roll-input') as HTMLInputElement)?.value || 'ASM-101';
                        sessionStorage.setItem('search_roll_temp', val);
                        setActiveTab('result');
                      }}
                      className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Quick links to Fee & Admission */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => setActiveTab('fee')}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-left space-y-1 transition-all cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <p className="font-bold text-slate-200">Fee Challan</p>
                    <p className="text-[11px] text-slate-400">EasyPaisa, JazzCash & Raast</p>
                  </button>
                  <button
                    onClick={() => setActiveTab('admission')}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-left space-y-1 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-teal-300" />
                    <p className="font-bold text-slate-200">Online Admission</p>
                    <p className="text-[11px] text-slate-400">Instant Slip & Roll No</p>
                  </button>
                </div>

                {/* Free Hosting & DB banner */}
                <div className="pt-1 text-center">
                  <button
                    onClick={openDeploymentModal}
                    className="text-xs text-emerald-300 hover:text-emerald-200 underline decoration-dotted flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                  >
                    <span>Click here for Free Hosting & Database Setup Guide</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Board Marquee / Alert Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0">
            <Bell className="w-4 h-4 text-red-600 animate-pulse" />
            <span>CAMPUS NOTICE BOARD</span>
          </div>

          <div className="flex-1 overflow-hidden w-full">
            <div className="flex items-center gap-4 text-xs text-slate-700 font-medium">
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">LATEST</span>
              <p className="truncate">
                {urgentNotices.length > 0
                  ? `${urgentNotices[0].title} — Published: ${urgentNotices[0].date}`
                  : 'Classes commencing for academic year 2026. Submit fee challans before due date.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('notices')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>View All Circulars</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1 hover:border-emerald-400 transition-colors">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl mx-auto flex items-center justify-center mb-2">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">1,250+</div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Active Students</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1 hover:border-emerald-400 transition-colors">
            <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-xl mx-auto flex items-center justify-center mb-2">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">54+</div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Expert Teachers</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1 hover:border-emerald-400 transition-colors">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl mx-auto flex items-center justify-center mb-2">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">99.4%</div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Board Pass Ratio</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1 hover:border-emerald-400 transition-colors">
            <div className="w-12 h-12 bg-teal-100 text-teal-800 rounded-xl mx-auto flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">14+</div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Years of Trust</p>
          </div>
        </div>
      </section>

      {/* Message from Principal Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-900/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Principal Info & Badge */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-4">
              <div className="relative inline-block">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-600 p-1 shadow-2xl">
                  <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-amber-400 font-bold text-3xl">
                    <GraduationCap className="w-16 h-16 text-emerald-400" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">
                  Principal
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{db.settings.principalName}</h3>
                <p className="text-xs text-emerald-300 font-medium">Head of Institution • Al-Siraj Model High School</p>
                <p className="text-xs font-urdu text-amber-300 mt-1" dir="rtl">
                  "تعلیم صرف معلومات کا نام نہیں، کردار اور بصیرت کی تعمیر ہے"
                </p>
              </div>
            </div>

            {/* Principal Quote / Speech */}
            <div className="lg:col-span-8 space-y-4 text-slate-300 text-sm leading-relaxed border-t lg:border-t-0 lg:border-l border-emerald-800/60 pt-6 lg:pt-0 lg:pl-8">
              <Quote className="w-8 h-8 text-amber-400 opacity-60" />
              <p>
                "At Al-Siraj Model High School, our foremost duty is to illuminate the intellect of our youth while anchoring their hearts in noble moral values and Islamic character. In an era revolutionized by artificial intelligence and digital discovery, we empower our students with cutting-edge STEM education, rigorous Board examination preparation, and compassionate social empathy."
              </p>
              <p>
                "Whether inside our modern science labs, computer suites, or Quran recitation sessions, every child receives personalized attention from qualified educators dedicated to sculpting future leaders, doctors, engineers, and visionaries."
              </p>
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Office of Principal</span>
                  <span className="text-[11px] text-slate-400">Al-Siraj Educational Trust</span>
                </div>
                <button
                  onClick={() => setActiveTab('about')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Full History</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Why Choose Al-Siraj
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nurturing Potential Across Every Dimension
          </h2>
          <p className="text-sm text-slate-600 font-urdu" dir="rtl">
            ہم صرف امتحان پاس نہیں کرواتے، بلکہ زندگی میں کامیابی کا راستہ ہموار کرتے ہیں
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Modern Science & Practical Labs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipped with contemporary apparatus for Physics, Chemistry, and Biology. Hands-on weekly experiments prepare students for BISE board practical excellence.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 bg-teal-100 text-teal-800 rounded-xl flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Computer Science & ICT Education</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-speed internet lab featuring C++, Python basics, web development concepts, and computer literacy from primary to matriculation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Islamic Tarbiyah & Moral Ethics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Integrated Nazra Quran with Tajweed, daily morning supplications, Hadith recitation, and character-building ethics for well-rounded personalities.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Programs Wings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-100/80 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Educational Structure</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Academic Wings at Al-Siraj
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('academics')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Detailed Syllabus & Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Wing 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                Early Childhood & Primary
              </div>
              <h3 className="text-lg font-bold text-slate-900">Playgroup to Grade 5</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Activity-based Montessori foundation, phonics, English language fluency, Urdu calligraphy, basic arithmetic, and Islamic tales.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">✓ Visual Activity Rooms</li>
                <li className="flex items-center gap-2">✓ Nazra Quran with Tajweed</li>
                <li className="flex items-center gap-2">✓ Creative Arts & Crafts</li>
              </ul>
            </div>

            {/* Wing 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block">
                Middle Wing
              </div>
              <h3 className="text-lg font-bold text-slate-900">Grade 6th to 8th</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rigorous preparation bridging primary learning with board secondary standards. Emphasis on analytical science, mathematics, and bilingual communication.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">✓ Conceptual Science & Math</li>
                <li className="flex items-center gap-2">✓ IT Lab Practice Sessions</li>
                <li className="flex items-center gap-2">✓ Declamation & Speech Clubs</li>
              </ul>
            </div>

            {/* Wing 3 */}
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-600/40 shadow-sm space-y-4 relative">
              <span className="absolute -top-3 right-4 bg-emerald-700 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                BISE Matric
              </span>
              <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md inline-block">
                Secondary Wing
              </div>
              <h3 className="text-lg font-bold text-slate-900">Matric (Grade 9th & 10th)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accredited BISE board curriculum with dedicated focus on Biology (Pre-Medical) and Computer Science (ICT) streams. Extensive test session schemes.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">✓ Pre-Medical / Pre-Engineering / Computer</li>
                <li className="flex items-center gap-2">✓ Regular Sunday Test Sessions</li>
                <li className="flex items-center gap-2">✓ Past Board Papers Mastery</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Online Services Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Looking for Immediate Student Verification or Fee Submission?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200">
              Check your official Detailed Marks Certificate (DMC) or generate a 3-part bank challan online in seconds.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('result')}
              className="px-5 py-3 bg-white text-emerald-950 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-emerald-700" />
              <span>Verify Result Online</span>
            </button>
            <button
              onClick={() => setActiveTab('fee')}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-md flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Fees Digitally</span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Success Stories</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Words of Confidence from Parents & Board Achievers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "Both my sons studied at Al-Siraj from class 6th to Matric. Muhammad Hamza secured 91.6% in BISE board exams. The teachers’ dedication, continuous test sessions, and personal mentoring are unmatched."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                TK
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Tariq Mahmood Khan</h4>
                <p className="text-[11px] text-slate-500">Father of Hamza (Class 10th - 1st Position)</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "The online portals for results and fee challans make life so easy for working parents. We can check attendance, homework, and pay school fees via EasyPaisa directly from our phone."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                NQ
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Noor Muhammad Qureshi</h4>
                <p className="text-[11px] text-slate-500">Parent of Fatima Noor (Grade 10)</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "Al-Siraj taught me not just computer science and programming syntax, but discipline and moral leadership. I am currently pursuing Software Engineering with full confidence."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                AH
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Ali Hassan</h4>
                <p className="text-[11px] text-slate-500">Alumni (Matric Science Batch 2024)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
