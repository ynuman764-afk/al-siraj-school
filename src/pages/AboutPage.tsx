import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  Building,
  Library,
  Tv
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

interface AboutPageProps {
  setActiveTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  const { db } = useSchool();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          About Al-Siraj Model High School
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          A Legacy of Integrity, Intellect & Spiritual Grace
        </h1>
        <p className="text-sm sm:text-base text-emerald-800 font-urdu" dir="rtl">
          علم و اخلاق کے چراغ روشن کرنے کا چودہ سالہ باوقار سفر
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Founded with a visionary commitment to bridge classic Islamic moral values with forward-thinking scientific inquiry, Al-Siraj Model High School stands as one of the premier model educational institutions for boys and girls.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-8 rounded-3xl shadow-xl space-y-4 border border-emerald-700/40">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/50 flex items-center justify-center text-amber-300">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">Our Vision (ہمارا وژن)</h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            To emerge as a national beacon of progressive education where students excel academically, cultivate profound moral conscience, and graduate as empathetic, self-reliant global citizens firmly anchored in Islamic principles.
          </p>
          <div className="pt-2 border-t border-emerald-800/80 flex items-center gap-2 text-xs text-amber-300">
            <Sparkles className="w-4 h-4" />
            <span>Excellence • Modesty • Knowledge • Leadership</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 rounded-3xl shadow-xl space-y-4 border border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-teal-600/30 flex items-center justify-center text-teal-300">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">Our Mission (ہمارا مشن)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            To provide an affordable, world-class learning sanctuary that stimulates intellectual curiosity, embraces modern digital skills, and instills Taqwa and character. We ensure no deserving child is deprived of high-quality education.
          </p>
          <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Merit Scholarships & Fee Concessions Available</span>
          </div>
        </div>
      </div>

      {/* Institutional Highlights & Facilities */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Infrastructure</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Purpose-Built Campus Facilities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Well-Ventilated Classrooms</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ergonomic student desks, multimedia projectors, natural daylight, and uninterrupted solar/generator power backup.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <Library className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Rich Reference Library</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thousands of academic volumes, Islamic literature, science encyclopedias, children's storybooks, and quiet study alcoves.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">High-Tech IT Laboratory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Latest Intel Core workstations, fiber internet, C++/Python environments, and safe web filtering for student research.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Safe Campus & CCTV Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              24/7 CCTV surveillance across all corridors, gates, and perimeters with trained security guards and dedicated school vans.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Faculty Showcase */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Educational Leadership</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Qualified Educators & Faculty
            </h2>
            <p className="text-xs text-slate-500">
              Passionate, subject-specialist mentors committed to student excellence
            </p>
          </div>
          <button
            onClick={() => setActiveTab('admission')}
            className="text-xs font-bold bg-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-emerald-900 cursor-pointer"
          >
            Join Our Student Body
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {db.teachers.map(teacher => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-emerald-500 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-900 flex items-center justify-center font-bold text-sm">
                  {teacher.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {teacher.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{teacher.name}</h3>
                <p className="text-xs font-semibold text-emerald-700">{teacher.assignedSubject}</p>
                <p className="text-[11px] text-slate-500 mt-1">{teacher.qualification}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>Assigned: {teacher.assignedClass}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{teacher.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
