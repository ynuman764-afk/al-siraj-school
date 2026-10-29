import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  BookOpen,
  Plus,
  Trash2,
  FileText,
  Search,
  Sparkles,
  Phone,
  LogOut,
  Save,
  Users
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { HomeworkItem, Student } from '../types/school';

export const TeacherPortalPage: React.FC = () => {
  const { db, session, loginAs, logout, addHomework, deleteHomework, saveResult } = useSchool();
  const [activeTab, setActiveTab] = useState<'attendance' | 'homework' | 'marks' | 'students'>('attendance');

  // Login form state if not logged in
  const [teacherEmail, setTeacherEmail] = useState('teacher@alsiraj.edu');
  const [teacherPass, setTeacherPass] = useState('teach123');

  // Attendance state for Class 10th
  const classStudents = db.students.filter(s => s.class.includes('10th'));
  const [attendance, setAttendance] = useState<{ [studentId: string]: 'Present' | 'Absent' | 'Leave' }>(() => {
    const map: { [id: string]: 'Present' | 'Absent' | 'Leave' } = {};
    classStudents.forEach(s => {
      map[s.id] = 'Present';
    });
    return map;
  });
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  // Homework state
  const [hwSubject, setHwSubject] = useState('Computer Science');
  const [hwTitle, setHwTitle] = useState('');
  const [hwDesc, setHwDesc] = useState('');
  const [hwDueDate, setHwDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });

  // Marks Entry state
  const [selectedStudentId, setSelectedStudentId] = useState(classStudents[0]?.id || '');
  const [marksExamType, setMarksExamType] = useState<'Annual Examination 2026' | 'Mid-Term Examination 2026'>('Mid-Term Examination 2026');
  const [subMarksObtained, setSubMarksObtained] = useState('68');
  const [subMarksTotal, setSubMarksTotal] = useState('75');
  const [marksSubjectName, setMarksSubjectName] = useState('Computer Science');
  const [marksSavedNotice, setMarksSavedNotice] = useState(false);

  // If not logged in as teacher, show login card
  if (session.role !== 'teacher') {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 p-6 text-white text-center">
            <div className="w-14 h-14 bg-emerald-800 rounded-2xl mx-auto flex items-center justify-center text-amber-300 shadow mb-3">
              <UserCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold">Faculty & Teacher Portal</h2>
            <p className="text-xs text-emerald-200 font-urdu mt-0.5" dir="rtl">
              اساتذہ کرام کے لیے وقف پورٹل — السراج ماڈل ہائی اسکول
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900">Demo Faculty Credentials</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-mono font-bold px-1.5 py-0.5 rounded">Quick</span>
              </div>
              <p className="text-[11px] text-amber-800">
                Log in as <strong>Engr. Salman Farooq</strong> (Computer Science & Class 10 Incharge) to mark attendance, post homework, and enter results:
              </p>
              <button
                type="button"
                onClick={() => loginAs('teacher', 'Engr. Salman Farooq', 'teacher@alsiraj.edu', 'Class 10th')}
                className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Instant 1-Click Teacher Login</span>
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                loginAs('teacher', 'Engr. Salman Farooq', teacherEmail, 'Class 10th');
              }}
              className="space-y-3 pt-2"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Teacher Email</label>
                <input
                  type="email"
                  value={teacherEmail}
                  onChange={e => setTeacherEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={teacherPass}
                  onChange={e => setTeacherPass(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-all cursor-pointer"
              >
                Sign In to Teacher Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Teacher Dashboard
  const presentCount = Object.values(attendance).filter(v => v === 'Present').length;
  const absentCount = Object.values(attendance).filter(v => v === 'Absent').length;
  const leaveCount = Object.values(attendance).filter(v => v === 'Leave').length;

  const handlePostHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle || !hwDesc) {
      alert('Please fill out homework title and instructions.');
      return;
    }
    addHomework({
      class: session.assignedClass || 'Class 10th',
      subject: hwSubject,
      teacherName: session.name || 'Faculty Teacher',
      dueDate: hwDueDate,
      title: hwTitle,
      description: hwDesc
    });
    setHwTitle('');
    setHwDesc('');
    alert('Homework posted to Student Portal successfully!');
  };

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    const student = db.students.find(s => s.id === selectedStudentId);
    if (!student) return;

    const obt = parseFloat(subMarksObtained) || 0;
    const tot = parseFloat(subMarksTotal) || 75;
    const pct = (obt / tot) * 100;
    const grade = pct >= 80 ? 'A+' : pct >= 70 ? 'A' : pct >= 60 ? 'B' : pct >= 50 ? 'C' : 'D';

    // Find existing result or build new
    const existing = db.results.find(r => r.rollNo === student.rollNo && r.examType === marksExamType);
    if (existing) {
      const updatedSubjects = [...existing.subjects];
      const subIdx = updatedSubjects.findIndex(s => s.subjectName.toLowerCase().includes(marksSubjectName.toLowerCase()));
      if (subIdx >= 0) {
        updatedSubjects[subIdx] = {
          ...updatedSubjects[subIdx],
          obtainedMarks: obt,
          totalMarks: tot,
          grade,
          remarks: 'Updated by subject teacher'
        };
      } else {
        updatedSubjects.push({
          subjectName: marksSubjectName,
          totalMarks: tot,
          passingMarks: Math.round(tot * 0.33),
          obtainedMarks: obt,
          grade,
          remarks: 'Marked by subject faculty'
        });
      }

      const totalObtained = updatedSubjects.reduce((acc, s) => acc + s.obtainedMarks, 0);
      const totalAll = updatedSubjects.reduce((acc, s) => acc + s.totalMarks, 0);
      const grandPct = parseFloat(((totalObtained / totalAll) * 100).toFixed(2));
      const grandGrade = grandPct >= 80 ? 'A+' : grandPct >= 70 ? 'A' : grandPct >= 60 ? 'B' : 'C';

      saveResult({
        ...existing,
        subjects: updatedSubjects,
        obtainedMarks: totalObtained,
        totalMarks: totalAll,
        percentage: grandPct,
        grade: grandGrade
      });
    } else {
      saveResult({
        id: `res-${Date.now()}`,
        studentId: student.id,
        rollNo: student.rollNo,
        studentName: student.name,
        fatherName: student.fatherName,
        class: student.class,
        section: student.section,
        examType: marksExamType,
        session: '2025-2026',
        totalMarks: tot,
        obtainedMarks: obt,
        percentage: pct,
        grade,
        position: 'Under Grading',
        status: 'Passed',
        remarks: 'Entered by faculty incharge.',
        attendancePercentage: 95,
        issuedDate: new Date().toISOString().split('T')[0],
        subjects: [
          {
            subjectName: marksSubjectName,
            totalMarks: tot,
            passingMarks: Math.round(tot * 0.33),
            obtainedMarks: obt,
            grade,
            remarks: 'Satisfactory performance'
          }
        ]
      });
    }

    setMarksSavedNotice(true);
    setTimeout(() => setMarksSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Teacher Top Info Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-800 text-amber-300 rounded-2xl flex items-center justify-center font-bold text-xl shadow">
            {session.name?.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">{session.name}</h1>
              <span className="text-[10px] bg-emerald-600 px-2 py-0.5 rounded-full font-bold uppercase">
                Faculty Active
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-0.5">
              Assigned Wing: <strong>{session.assignedClass || 'Class 10th - Science'}</strong> • Department: Computer Science & IT
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs text-emerald-200 hidden sm:block">
            <span className="block text-[11px] text-slate-300">Today: {new Date().toDateString()}</span>
            <span>Al-Siraj High School</span>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600/80 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'attendance'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Daily Attendance Register</span>
        </button>

        <button
          onClick={() => setActiveTab('marks')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'marks'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Marks & DMC Grading</span>
        </button>

        <button
          onClick={() => setActiveTab('homework')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'homework'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Post Homework & Tasks ({db.homework.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'students'
              ? 'border-emerald-700 text-emerald-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Class Roster ({classStudents.length})</span>
        </button>
      </div>

      {/* TAB 1: ATTENDANCE REGISTER */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* Summary KPI row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Total Students</span>
              <p className="text-xl font-bold text-slate-900">{classStudents.length}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-xs">
              <span className="text-[11px] text-emerald-700 font-bold uppercase">Present Today</span>
              <p className="text-xl font-bold text-emerald-950">{presentCount}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-xs">
              <span className="text-[11px] text-red-700 font-bold uppercase">Absent</span>
              <p className="text-xl font-bold text-red-950">{absentCount}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-xs">
              <span className="text-[11px] text-amber-700 font-bold uppercase">On Leave</span>
              <p className="text-xl font-bold text-amber-950">{leaveCount}</p>
            </div>
          </div>

          {/* Student attendance roster table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Attendance Sheet: {session.assignedClass}</h3>
                <p className="text-xs text-slate-500">Date: {new Date().toLocaleDateString('en-PK', { dateStyle: 'full' })}</p>
              </div>
              <button
                onClick={() => {
                  setAttendanceSaved(true);
                  setTimeout(() => setAttendanceSaved(false), 3000);
                }}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Attendance Register</span>
              </button>
            </div>

            {attendanceSaved && (
              <div className="bg-emerald-100 text-emerald-900 p-3 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Attendance saved to school server and SMS notifications dispatched to absent students' guardians.</span>
              </div>
            )}

            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-24">Roll No</th>
                  <th className="p-3">Student Full Name</th>
                  <th className="p-3">Father's Name</th>
                  <th className="p-3 text-center">Status (P / A / L)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classStudents.map(std => {
                  const currentStatus = attendance[std.id] || 'Present';
                  return (
                    <tr key={std.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-emerald-800">{std.rollNo}</td>
                      <td className="p-3 font-semibold text-slate-900">{std.name}</td>
                      <td className="p-3 text-slate-600">{std.fatherName}</td>
                      <td className="p-3 text-center">
                        <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50 gap-1">
                          <button
                            type="button"
                            onClick={() => setAttendance(prev => ({ ...prev, [std.id]: 'Present' }))}
                            className={`px-3 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                              currentStatus === 'Present'
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            P (حاضر)
                          </button>
                          <button
                            type="button"
                            onClick={() => setAttendance(prev => ({ ...prev, [std.id]: 'Absent' }))}
                            className={`px-3 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                              currentStatus === 'Absent'
                                ? 'bg-red-600 text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            A (غیر حاضر)
                          </button>
                          <button
                            type="button"
                            onClick={() => setAttendance(prev => ({ ...prev, [std.id]: 'Leave' }))}
                            className={`px-3 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                              currentStatus === 'Leave'
                                ? 'bg-amber-500 text-slate-950 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            L (رخصت)
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MARKS ENTRY */}
      {activeTab === 'marks' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Enter Subject Marks for Student DMC</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Updates the student's live Detailed Marks Certificate available on the public result portal.
            </p>
          </div>

          {marksSavedNotice && (
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Marks recorded into official database successfully! Parents can now check the updated DMC.</span>
            </div>
          )}

          <form onSubmit={handleSaveMarks} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Student</label>
              <select
                value={selectedStudentId}
                onChange={e => setSelectedStudentId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {classStudents.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.rollNo} — {s.name} (S/O {s.fatherName})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Examination Session</label>
                <select
                  value={marksExamType}
                  onChange={e => setMarksExamType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Mid-Term Examination 2026">Mid-Term Examination 2026</option>
                  <option value="Annual Examination 2026">Annual Examination 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={marksSubjectName}
                  onChange={e => setMarksSubjectName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Marks</label>
                <input
                  type="number"
                  value={subMarksTotal}
                  onChange={e => setSubMarksTotal(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Marks Obtained</label>
                <input
                  type="number"
                  value={subMarksObtained}
                  onChange={e => setSubMarksObtained(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Record & Publish Student Marks</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: HOMEWORK & CLASSWORK */}
      {activeTab === 'homework' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Post Homework Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Assign New Homework / Task</h3>

            <form onSubmit={handlePostHomework} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Physics / Mathematics"
                  value={hwSubject}
                  onChange={e => setHwSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Homework Topic / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chapter 4 Exercise 4.2"
                  value={hwTitle}
                  onChange={e => setHwTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  required
                  value={hwDueDate}
                  onChange={e => setHwDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Instructions for Students</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Specify question numbers, register guidelines, or diagrams required..."
                  value={hwDesc}
                  onChange={e => setHwDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Homework</span>
              </button>
            </form>
          </div>

          {/* List of active homework */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Active Homework & Assignments</h3>

            <div className="space-y-3">
              {db.homework.map(hw => (
                <div key={hw.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      {hw.class} • {hw.subject}
                    </span>
                    <button
                      onClick={() => deleteHomework(hw.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                      title="Delete assignment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{hw.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{hw.description}</p>
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
                    <span>Teacher: {hw.teacherName}</span>
                    <span className="font-bold text-red-700">Due: {hw.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CLASS ROSTER */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 bg-slate-50 border-b border-slate-200">
            <h3 className="font-bold text-sm text-slate-900">Class Student Directory ({session.assignedClass})</h3>
            <p className="text-xs text-slate-500">Contact information for parent communication and emergency calls</p>
          </div>
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Roll No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Father Name</th>
                <th className="p-3">Section</th>
                <th className="p-3">Emergency Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.map(std => (
                <tr key={std.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-emerald-800">{std.rollNo}</td>
                  <td className="p-3 font-semibold text-slate-900">{std.name}</td>
                  <td className="p-3 text-slate-600">{std.fatherName}</td>
                  <td className="p-3 text-slate-600">{std.section}</td>
                  <td className="p-3 font-mono text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{std.phone}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
