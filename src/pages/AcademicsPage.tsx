import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Calendar,
  Award,
  Sparkles,
  ArrowRight,
  Calculator,
  Compass,
  FileText
} from 'lucide-react';

interface AcademicsPageProps {
  setActiveTab: (tab: string) => void;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({ setActiveTab }) => {
  const [activeGroup, setActiveGroup] = useState<'biology' | 'computer'>('biology');

  const gradingScale = [
    { range: '80% & Above (90%+ A+)', grade: 'A+', remarks: 'Outstanding / Exceptional Merit' },
    { range: '70% to 79%', grade: 'A', remarks: 'Excellent / Distinction' },
    { range: '60% to 69%', grade: 'B', remarks: 'Very Good / High Achievement' },
    { range: '50% to 59%', grade: 'C', remarks: 'Good / Satisfactory' },
    { range: '40% to 49%', grade: 'D', remarks: 'Fair / Acceptable' },
    { range: '33% to 39%', grade: 'E', remarks: 'Passing Threshold' },
    { range: 'Below 33%', grade: 'F', remarks: 'Needs Improvement / Supplementary' },
  ];

  const calendarEvents = [
    { month: 'April 2026', title: 'New Academic Session 2026-27 Begins', desc: 'Orientation for new students & distribution of books/syllabi.' },
    { month: 'June - July 2026', title: 'Summer Vacations & Summer Camp', desc: 'Creative arts, coding workshops, and Nazra Quran camps.' },
    { month: 'September 2026', title: 'First Term Assessments', desc: 'Comprehensive testing on 40% completed syllabus.' },
    { month: 'November 2026', title: 'Mid-Term Examinations & Science Fair', desc: '50% syllabus evaluation & annual science project exhibition.' },
    { month: 'December 2026', title: 'Winter Break & Remedial Classes', desc: 'Intensive prep sessions for Matric Class 9th & 10th.' },
    { month: 'January - February 2027', title: 'Pre-Board Mock Examinations', desc: 'Full length board pattern papers and speed practice.' },
    { month: 'March - April 2027', title: 'BISE Annual Board Examinations', desc: 'Official Board exams for Secondary School Certificate (SSC).' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Academics & Curriculum
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Comprehensive Scheme of Studies
        </h1>
        <p className="text-sm sm:text-base text-emerald-800 font-urdu" dir="rtl">
          پنجاب ٹیکسٹ بک بورڈ اور فیڈرل بورڈ کی جدید ترین نصابی ہم آہنگی
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Our curriculum integrates rigorous national textbook board curricula with progressive English language proficiency, computer sciences, and foundational Islamic knowledge.
        </p>
      </div>

      {/* Matric Subject Groups (Interactive Switcher) */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Matriculation (SSC Grade 9 & 10)</span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Science Stream Subject Combinations
            </h2>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveGroup('biology')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeGroup === 'biology' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Biology Group (Pre-Medical)
            </button>
            <button
              onClick={() => setActiveGroup('computer')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeGroup === 'computer' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Computer Science Group (ICT)
            </button>
          </div>
        </div>

        {/* Selected Group Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              {activeGroup === 'biology'
                ? 'Biology (Pre-Medical / Life Sciences) Track'
                : 'Computer Science (Software & Tech) Track'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeGroup === 'biology'
                ? 'Tailored for aspiring physicians, pharmacists, biochemists, and biological researchers. Includes full dissection demonstrations, microscopic specimen analysis, and human physiology.'
                : 'Engineered for future software developers, system architects, data analysts, and electrical engineers. Emphasizes C++ algorithms, discrete problem solving, and digital hardware.'}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Included Subjects:</span>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-semibold block">English (Compulsory)</span>
                  <span className="text-[11px] text-slate-500">75 Marks (Paper I & II)</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-semibold block">Urdu (Compulsory)</span>
                  <span className="text-[11px] text-slate-500">75 Marks (Paper I & II)</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-semibold block">Mathematics (Science)</span>
                  <span className="text-[11px] text-slate-500">75 Marks (Algebra & Geometry)</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-semibold block">Physics (Theory + Practical)</span>
                  <span className="text-[11px] text-slate-500">60 Th + 15 Pr Marks</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-semibold block">Chemistry (Theory + Practical)</span>
                  <span className="text-[11px] text-slate-500">60 Th + 15 Pr Marks</span>
                </div>
                <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <span className="font-bold text-emerald-900 block">
                    {activeGroup === 'biology' ? 'Biology (Theory + Practical)' : 'Computer Science (Coding + Lab)'}
                  </span>
                  <span className="text-[11px] text-emerald-700">60 Th + 15 Pr / Lab Marks</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-semibold block">Islamiyat / Ethics</span>
                  <span className="text-[11px] text-slate-500">50 Marks Compulsory</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-semibold block">Pakistan Studies</span>
                  <span className="text-[11px] text-slate-500">50 Marks Compulsory</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              Board Preparation Excellence Strategy
            </h4>
            <ul className="text-xs text-slate-300 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Chapter-wise Testing:</strong> Weekly test on each subject with immediate teacher marking and feedback.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Past 10 Years Solved Papers:</strong> Comprehensive familiarization with BISE examiners' rubric.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Full-Scale Send-Up Mocks:</strong> Rigorous 3-hour examination simulated under strict exam hall conditions.</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('admission')}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Enroll in Matric Batch 2026-2027</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Examination System & Grading Standard Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Assessment Policy</span>
          <h2 className="text-2xl font-bold text-slate-900">Official BISE Grading Standard</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            All report cards (DMC) generated by Al-Siraj Model High School follow the standardized Punjab Examination Commission and Board of Intermediate & Secondary Education grading criteria.
          </p>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Percentage Range</th>
                  <th className="p-3 text-center">Grade</th>
                  <th className="p-3">Performance Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {gradingScale.map((g, idx) => (
                  <tr key={idx} className={g.grade === 'A+' ? 'bg-emerald-50/60 font-semibold' : ''}>
                    <td className="p-3 font-mono">{g.range}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        g.grade === 'A+' ? 'bg-emerald-700 text-white' :
                        g.grade === 'A' ? 'bg-emerald-100 text-emerald-800' :
                        g.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                        g.grade === 'C' ? 'bg-amber-100 text-amber-800' :
                        g.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {g.grade}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{g.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Calendar Milestones */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Yearly Timeline</span>
          <h2 className="text-2xl font-bold text-slate-900">Academic Calendar 2026-2027</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Key milestones, assessment terms, and educational activities across the year.
          </p>

          <div className="space-y-2.5">
            {calendarEvents.map((ev, i) => (
              <div key={i} className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3 shadow-xs">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold text-[11px] rounded-lg border border-emerald-200 shrink-0">
                  {ev.month}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{ev.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
