import React, { useState, useEffect } from 'react';
import {
  Search,
  Printer,
  Award,
  GraduationCap,
  Calendar,
  User,
  CheckCircle2,
  FileText,
  AlertCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { ResultRecord } from '../types/school';

export const ResultCheckerPage: React.FC = () => {
  const { db } = useSchool();
  const [rollInput, setRollInput] = useState('ASM-101');
  const [examType, setExamType] = useState('Annual Examination 2026');
  const [searchedResult, setSearchedResult] = useState<ResultRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const temp = sessionStorage.getItem('search_roll_temp');
    if (temp) {
      setRollInput(temp);
      sessionStorage.removeItem('search_roll_temp');
      executeSearch(temp, examType);
    } else {
      executeSearch('ASM-101', 'Annual Examination 2026');
    }
  }, []);

  const executeSearch = (roll: string, exam: string) => {
    setHasSearched(true);
    const cleaned = roll.trim().toUpperCase();
    const match = db.results.find(
      r => (r.rollNo.toUpperCase() === cleaned || r.studentName.toLowerCase().includes(cleaned.toLowerCase())) &&
           (exam === 'all' || r.examType === exam)
    );
    setSearchedResult(match || null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(rollInput, examType);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Search Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 no-print">
        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Student Examination Portal
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Online Student Result & DMC Verification
        </h1>
        <p className="text-sm sm:text-base text-emerald-800 font-urdu" dir="rtl">
          امتحانی نتائج و تفصیلی مارکس سرٹیفکیٹ (DMC) کی آن لائن تصدیق
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Verify authentic academic examination cards issued by the Controller of Examinations, Al-Siraj Model High School.
        </p>
      </div>

      {/* Search Box Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4 no-print">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Student Roll Number or Reg No *
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="e.g. ASM-101, ASM-102"
                value={rollInput}
                onChange={e => setRollInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Examination Session</label>
            <select
              value={examType}
              onChange={e => setExamType(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Annual Examination 2026">Annual Examination 2026</option>
              <option value="Mid-Term Examination 2026">Mid-Term Examination 2026</option>
              <option value="First Term Assessment 2025">First Term Assessment 2025</option>
              <option value="all">Any Available Session</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* Quick Test Demo Roll Numbers */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-medium">Test with Demo Students:</span>
          {db.results.map(r => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setRollInput(r.rollNo);
                setExamType(r.examType);
                executeSearch(r.rollNo, r.examType);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono cursor-pointer transition-all ${
                rollInput === r.rollNo
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {r.rollNo} ({r.studentName.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Result Display / Printable DMC */}
      {hasSearched && (
        <div className="max-w-4xl mx-auto">
          {searchedResult ? (
            <div className="space-y-4">
              {/* Top Print Action Bar */}
              <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-2xl no-print">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-semibold">
                    Detailed Marks Certificate Verified for <strong className="text-amber-300">{searchedResult.studentName}</strong> ({searchedResult.rollNo})
                  </span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Official DMC Card</span>
                </button>
              </div>

              {/* Official Detailed Marks Certificate (DMC) */}
              <div className="bg-white rounded-3xl border-2 border-slate-800 p-8 sm:p-12 shadow-2xl print-card space-y-8 relative overflow-hidden">
                {/* Watermark Crest Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
                  <GraduationCap className="w-96 h-96 text-slate-900" />
                </div>

                {/* DMC Certificate Header */}
                <div className="text-center space-y-2 border-b-2 border-slate-900 pb-6 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-left text-[11px] text-slate-500 font-mono">
                      <p>Govt. Reg: {db.settings.regNo}</p>
                      <p>Affiliation: BISE</p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white flex items-center justify-center shadow-md">
                      <GraduationCap className="w-10 h-10 text-amber-400" />
                    </div>
                    <div className="text-right text-[11px] text-slate-500 font-mono">
                      <p>Issue Date: {searchedResult.issuedDate}</p>
                      <p>Session: {searchedResult.session}</p>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
                    {db.settings.schoolName}
                  </h2>
                  <p className="text-sm font-urdu font-bold text-emerald-900" dir="rtl">
                    السراج ماڈل ہائی اسکول — تفصیلی مارکس سرٹیفکیٹ
                  </p>
                  <div className="inline-block px-4 py-1 bg-slate-900 text-amber-400 rounded-full text-xs font-extrabold uppercase tracking-widest mt-1">
                    {searchedResult.examType}
                  </div>
                </div>

                {/* Student Particulars Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Student Name</span>
                    <span className="font-bold text-slate-950 text-sm">{searchedResult.studentName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Father's Name</span>
                    <span className="font-semibold text-slate-900 text-sm">{searchedResult.fatherName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Roll Number</span>
                    <span className="font-mono font-bold text-emerald-800 text-base">{searchedResult.rollNo}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Class & Section</span>
                    <span className="font-semibold text-slate-900">{searchedResult.class} ({searchedResult.section})</span>
                  </div>
                </div>

                {/* Subject-wise Marks Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-slate-300">
                    <thead className="bg-slate-900 text-white font-bold text-center">
                      <tr>
                        <th className="p-3 text-left">Subject Title</th>
                        <th className="p-3 w-20">Total Marks</th>
                        <th className="p-3 w-20">Passing</th>
                        <th className="p-3 w-24">Obtained</th>
                        <th className="p-3 w-16">Grade</th>
                        <th className="p-3 text-left">Teacher's Evaluation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {searchedResult.subjects.map((sub, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-900">{sub.subjectName}</td>
                          <td className="p-3 text-center font-mono text-slate-600">{sub.totalMarks}</td>
                          <td className="p-3 text-center font-mono text-slate-500">{sub.passingMarks}</td>
                          <td className="p-3 text-center font-mono font-bold text-emerald-900 bg-emerald-50/50">
                            {sub.obtainedMarks}
                          </td>
                          <td className="p-3 text-center font-bold">
                            <span className={`px-2 py-0.5 rounded text-[11px] ${
                              sub.grade === 'A+' ? 'bg-emerald-100 text-emerald-900' :
                              sub.grade === 'A' ? 'bg-blue-100 text-blue-900' :
                              'bg-amber-100 text-amber-900'
                            }`}>
                              {sub.grade}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600 text-[11px]">{sub.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-800">
                      <tr>
                        <td className="p-3 text-slate-950 uppercase">Grand Aggregate</td>
                        <td className="p-3 text-center font-mono">{searchedResult.totalMarks}</td>
                        <td className="p-3 text-center text-slate-500">-</td>
                        <td className="p-3 text-center font-mono text-emerald-950 text-sm font-black">
                          {searchedResult.obtainedMarks}
                        </td>
                        <td className="p-3 text-center text-emerald-900 font-black text-sm">
                          {searchedResult.grade}
                        </td>
                        <td className="p-3 text-slate-700">Percentage: {searchedResult.percentage}%</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Academic Standing & Standing Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-center">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase block">Percentage</span>
                    <span className="text-xl font-black text-emerald-950 font-mono">{searchedResult.percentage}%</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase block">Overall Grade</span>
                    <span className="text-xl font-black text-emerald-950">{searchedResult.grade}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase block">Class Standing</span>
                    <span className="text-base font-bold text-amber-800">{searchedResult.position}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase block">Annual Attendance</span>
                    <span className="text-base font-bold text-slate-800 font-mono">{searchedResult.attendancePercentage}%</span>
                  </div>
                </div>

                {/* Institutional Remarks */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-900 block mb-0.5">Head of Institution's Remarks:</span>
                  <p className="text-slate-600 italic">"{searchedResult.remarks}"</p>
                </div>

                {/* Official Stamps & Signatures */}
                <div className="pt-8 border-t-2 border-slate-800 grid grid-cols-3 gap-4 text-center text-xs">
                  <div>
                    <div className="h-12 flex items-center justify-center">
                      <span className="font-mono text-slate-400 text-[10px]">Verified By Incharge</span>
                    </div>
                    <div className="border-t border-slate-400 pt-1 font-semibold text-slate-700">Class Incharge</div>
                  </div>

                  <div>
                    <div className="h-12 flex items-center justify-center">
                      <div className="w-16 h-12 border-2 border-dashed border-emerald-700/60 rounded flex items-center justify-center text-[10px] text-emerald-800 font-bold">
                        OFFICIAL SEAL
                      </div>
                    </div>
                    <div className="border-t border-slate-400 pt-1 font-semibold text-slate-700">Controller of Exams</div>
                  </div>

                  <div>
                    <div className="h-12 flex items-center justify-center">
                      <span className="font-bold text-slate-800 text-xs">{db.settings.principalName.split(' ')[1]}</span>
                    </div>
                    <div className="border-t border-slate-400 pt-1 font-semibold text-slate-700">Principal Signature</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Record Found for "{rollInput}"</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Please double check the Roll Number or select "Any Available Session". For assistance, contact the examination controller office at {db.settings.phone}.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
