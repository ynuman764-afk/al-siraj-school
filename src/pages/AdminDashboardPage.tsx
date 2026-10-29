import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  CreditCard,
  FileText,
  Search,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  Upload,
  Calendar,
  Sparkles,
  DollarSign,
  Award,
  Bell,
  Settings,
  CloudUpload,
  LogOut,
  Phone
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { Student, AdmissionApplication, FeeChallan, Notice } from '../types/school';

interface AdminDashboardPageProps {
  openDeploymentModal: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ openDeploymentModal }) => {
  const {
    db,
    session,
    loginAs,
    logout,
    addStudent,
    updateStudent,
    deleteStudent,
    updateAdmissionStatus,
    verifyFeePayment,
    generateChallan,
    addNotice,
    deleteNotice,
    exportDatabase
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'students' | 'admissions' | 'fees' | 'results' | 'notices' | 'settings'>('students');

  // Search filters
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('All');

  // Add Student Modal State
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);
  const [newRollNo, setNewRollNo] = useState(`ASM-${100 + db.students.length + 1}`);
  const [newName, setNewName] = useState('');
  const [newFatherName, setNewFatherName] = useState('');
  const [newClass, setNewClass] = useState('Class 9th');
  const [newSection, setNewSection] = useState('Science');
  const [newPhone, setNewPhone] = useState('');
  const [newFee, setNewFee] = useState('3200');

  // Generate Challan Modal State
  const [addChallanModalOpen, setAddChallanModalOpen] = useState(false);
  const [challanStudentRoll, setChallanStudentRoll] = useState(db.students[0]?.rollNo || 'ASM-101');
  const [challanMonth, setChallanMonth] = useState('June 2026');
  const [challanAmount, setChallanAmount] = useState('3500');

  // New Notice Modal State
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<Notice['category']>('Exams');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeIsUrgent, setNoticeIsUrgent] = useState(false);

  // If not logged in as Admin, show login screen
  if (session.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-emerald-950 p-6 text-white text-center">
            <div className="w-14 h-14 bg-emerald-800 rounded-2xl mx-auto flex items-center justify-center text-amber-300 shadow mb-3">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold">Principal & Administrator ERP</h2>
            <p className="text-xs text-emerald-200 font-urdu mt-0.5" dir="rtl">
              السراج ماڈل ہائی اسکول — ایڈمنسٹریشن کنٹرول پینل
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900">Administrator Access</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-mono font-bold px-1.5 py-0.5 rounded">Master ERP</span>
              </div>
              <p className="text-[11px] text-amber-800">
                Click below to immediately log in with full administrative privileges to manage students, fees, results, and admissions:
              </p>
              <button
                type="button"
                onClick={() => loginAs('admin', 'Principal / Administrator', 'admin@alsiraj.edu')}
                className="w-full py-2 bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>One-Click Administrator Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // KPIs
  const totalStudents = db.students.length;
  const pendingAdmissions = db.admissions.filter(a => a.status === 'Pending Review').length;
  const totalFeesPaid = db.feeChallans
    .filter(c => c.status === 'Paid')
    .reduce((sum, c) => sum + c.totalAmount, 0);
  const totalFeesPending = db.feeChallans
    .filter(c => c.status !== 'Paid')
    .reduce((sum, c) => sum + c.totalAmount, 0);

  // Student filtering
  const filteredStudents = db.students.filter(std => {
    const matchesSearch =
      std.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      std.rollNo.toLowerCase().includes(studentSearch.toLowerCase()) ||
      std.fatherName.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesClass = selectedClassFilter === 'All' ? true : std.class.includes(selectedClassFilter);
    return matchesSearch && matchesClass;
  });

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newFatherName || !newRollNo) {
      alert('Please fill out student name, father name, and roll number.');
      return;
    }
    addStudent({
      rollNo: newRollNo,
      name: newName,
      fatherName: newFatherName,
      class: newClass,
      section: newSection,
      gender: 'Male',
      dob: '2011-01-01',
      bForm: '35201-0000000-1',
      phone: newPhone || '+92 300 0000000',
      address: 'Punjab, Pakistan',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      monthlyFee: parseFloat(newFee) || 3000
    });
    setAddStudentModalOpen(false);
    setNewName('');
    setNewFatherName('');
    alert(`Student ${newName} enrolled with Roll Number ${newRollNo}!`);
  };

  const handleGenerateChallanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = db.students.find(s => s.rollNo === challanStudentRoll);
    if (!student) {
      alert('Selected student not found.');
      return;
    }
    const amt = parseFloat(challanAmount) || 3500;
    const chNo = `CH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    generateChallan({
      challanNo: chNo,
      studentId: student.id,
      rollNo: student.rollNo,
      studentName: student.name,
      fatherName: student.fatherName,
      class: student.class,
      monthYear: challanMonth,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '2026-06-15',
      breakdown: {
        tuitionFee: amt,
        lateFee: 200
      },
      totalAmount: amt,
      afterDueDateAmount: amt + 200,
      status: 'Unpaid'
    });

    setAddChallanModalOpen(false);
    alert(`Fee Challan ${chNo} generated for ${student.name}!`);
  };

  const handleCreateNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;
    addNotice({
      title: noticeTitle,
      category: noticeCategory,
      content: noticeContent,
      isUrgent: noticeIsUrgent,
      author: 'Principal Office'
    });
    setNoticeModalOpen(false);
    setNoticeTitle('');
    setNoticeContent('');
    alert('Notice broadcasted to school portal!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-700 text-amber-300 rounded-2xl flex items-center justify-center font-bold text-xl shadow">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">School Administration ERP</h1>
              <span className="text-[10px] bg-emerald-600 px-2 py-0.5 rounded-full font-bold uppercase">
                Master Admin
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-0.5">
              Al-Siraj Model High School • Central Academic & Financial Records Management
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={openDeploymentModal}
            className="px-3.5 py-2 bg-emerald-900/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
          >
            <CloudUpload className="w-4 h-4 text-emerald-400" />
            <span>Free Hosting Guide</span>
          </button>

          <button
            onClick={exportDatabase}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            title="Download full JSON backup of database"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Export DB (JSON)</span>
          </button>

          <button
            onClick={logout}
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase">Enrolled Students</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalStudents}</div>
          <p className="text-[11px] text-emerald-700 font-semibold">Active in Playgroup - 10th</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase">Pending Admissions</span>
            <FileText className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-amber-900">{pendingAdmissions}</div>
          <p className="text-[11px] text-amber-700 font-semibold">Online applications to review</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase">Fee Collected</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-950 font-mono">
            PKR {totalFeesPaid.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">Processed digitally & cash</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase">Unpaid Fee Dues</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-extrabold text-red-900 font-mono">
            PKR {totalFeesPending.toLocaleString()}
          </div>
          <p className="text-[11px] text-red-700 font-semibold">Defaulters / Pending vouchers</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'students' ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Directory ({db.students.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('admissions')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'admissions' ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Online Admissions ({db.admissions.length})</span>
          {pendingAdmissions > 0 && (
            <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
              {pendingAdmissions}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('fees')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'fees' ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Fee Vouchers & Accounts ({db.feeChallans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'results' ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Results DMC Records ({db.results.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'notices' ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notices & Circulars ({db.notices.length})</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: STUDENT DIRECTORY */}
      {/* ============================================================== */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <select
                value={selectedClassFilter}
                onChange={e => setSelectedClassFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
              >
                <option value="All">All Classes</option>
                <option value="10th">Class 10th</option>
                <option value="9th">Class 9th</option>
                <option value="8th">Class 8th</option>
                <option value="7th">Class 7th</option>
                <option value="5th">Class 5th</option>
              </select>
            </div>

            <button
              onClick={() => {
                setNewRollNo(`ASM-${100 + db.students.length + 1}`);
                setAddStudentModalOpen(true);
              }}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll New Student</span>
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Father Name</th>
                  <th className="p-3">Class & Section</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Monthly Fee</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map(std => (
                  <tr key={std.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-emerald-800">{std.rollNo}</td>
                    <td className="p-3 font-bold text-slate-900">{std.name}</td>
                    <td className="p-3 text-slate-600">{std.fatherName}</td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800">{std.class}</span>{' '}
                      <span className="text-[11px] text-slate-500">({std.section})</span>
                    </td>
                    <td className="p-3 font-mono text-slate-600">{std.phone}</td>
                    <td className="p-3 font-mono font-semibold text-slate-900">PKR {std.monthlyFee}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {std.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Delete student record for ${std.name} (${std.rollNo})?`)) {
                            deleteStudent(std.id);
                          }
                        }}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Delete Student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: ONLINE ADMISSION APPLICATIONS */}
      {/* ============================================================== */}
      {activeTab === 'admissions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Incoming Online Admission Applications</h3>
                <p className="text-xs text-slate-500">Review candidate submissions, schedule tests, or approve enrollment</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {db.admissions.map(app => (
                <div key={app.id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                        {app.id}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">{app.applicantName}</h4>
                      <span className="text-xs text-slate-500">(Father: {app.fatherName})</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Applied for: <strong className="text-emerald-800">{app.classApplied}</strong> • Previous: {app.previousSchool} ({app.previousMarksPercentage}%)
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Phone: <span className="font-mono">{app.phone}</span> • Date: {app.appliedDate}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      app.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {app.status}
                    </span>

                    {app.status !== 'Approved' && (
                      <button
                        onClick={() => {
                          const autoRoll = `ASM-${100 + db.students.length + 1}`;
                          updateAdmissionStatus(app.id, 'Approved', 'Approved and enrolled by Principal', autoRoll);
                          alert(`Application Approved! New student enrolled with Roll No: ${autoRoll}`);
                        }}
                        className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                      >
                        Approve & Enroll
                      </button>
                    )}

                    {app.status === 'Pending Review' && (
                      <button
                        onClick={() => {
                          updateAdmissionStatus(app.id, 'Interview Scheduled', 'Interview scheduled for Saturday 10:00 AM');
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Schedule Interview
                      </button>
                    )}

                    {app.status !== 'Rejected' && (
                      <button
                        onClick={() => updateAdmissionStatus(app.id, 'Rejected', 'Did not meet admission criteria')}
                        className="px-2.5 py-1 text-slate-400 hover:text-red-600 text-xs cursor-pointer"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: FEE VOUCHERS & ACCOUNTS */}
      {/* ============================================================== */}
      {activeTab === 'fees' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Fee Accounts Ledger</h3>
            <button
              onClick={() => setAddChallanModalOpen(true)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Issue New Fee Voucher</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Challan No</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Month</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Method / Ref</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {db.feeChallans.map(ch => (
                  <tr key={ch.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{ch.challanNo}</td>
                    <td className="p-3 font-semibold text-slate-900">{ch.studentName}</td>
                    <td className="p-3 font-mono text-emerald-800 font-bold">{ch.rollNo}</td>
                    <td className="p-3 text-slate-600">{ch.monthYear}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">PKR {ch.totalAmount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ch.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                        ch.status === 'Pending Verification' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {ch.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 font-mono text-[11px]">
                      {ch.paymentMethod ? `${ch.paymentMethod} (${ch.transactionId || 'Counter'})` : 'Awaiting Payment'}
                    </td>
                    <td className="p-3 text-right">
                      {ch.status !== 'Paid' ? (
                        <button
                          onClick={() => {
                            verifyFeePayment(ch.id, true);
                            alert(`Challan ${ch.challanNo} marked as Paid!`);
                          }}
                          className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold cursor-pointer shadow-xs"
                        >
                          Mark Paid
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-bold text-xs flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: RESULTS DMC RECORDS */}
      {/* ============================================================== */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-5 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900">Published Examination Results & DMC Certificates</h3>
              <p className="text-xs text-slate-500">Live academic records visible on the student public result portal</p>
            </div>

            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Exam Type</th>
                  <th className="p-3">Obtained / Total</th>
                  <th className="p-3">Percentage</th>
                  <th className="p-3">Grade</th>
                  <th className="p-3">Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {db.results.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-emerald-800">{r.rollNo}</td>
                    <td className="p-3 font-bold text-slate-900">{r.studentName}</td>
                    <td className="p-3 text-slate-600">{r.class}</td>
                    <td className="p-3 font-semibold text-slate-800">{r.examType}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">{r.obtainedMarks} / {r.totalMarks}</td>
                    <td className="p-3 font-mono text-emerald-800 font-bold">{r.percentage}%</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">
                        {r.grade}
                      </span>
                    </td>
                    <td className="p-3 text-amber-800 font-semibold">{r.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: NOTICES & CIRCULARS */}
      {/* ============================================================== */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Official Notices & Circulars Manager</h3>
            <button
              onClick={() => setNoticeModalOpen(true)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast New Notice</span>
            </button>
          </div>

          <div className="space-y-3">
            {db.notices.map(notice => (
              <div key={notice.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-start gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-slate-100 text-slate-800">
                      {notice.category}
                    </span>
                    {notice.isUrgent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white">
                        Urgent
                      </span>
                    )}
                    <span className="text-xs text-slate-400">{notice.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{notice.title}</h4>
                  <p className="text-xs text-slate-600">{notice.content}</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Delete this circular?')) {
                      deleteNotice(notice.id);
                    }
                  }}
                  className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ADD STUDENT MODAL */}
      {/* ============================================================== */}
      {addStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-900">Enroll New Student</h3>
              <button onClick={() => setAddStudentModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Roll Number</label>
                <input
                  type="text"
                  required
                  value={newRollNo}
                  onChange={e => setNewRollNo(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono font-bold text-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Usama Khalid"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Father's Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Khalid Mehmood"
                  value={newFatherName}
                  onChange={e => setNewFatherName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                  <select
                    value={newClass}
                    onChange={e => setNewClass(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  >
                    <option value="Class 10th">Class 10th</option>
                    <option value="Class 9th">Class 9th</option>
                    <option value="Class 8th">Class 8th</option>
                    <option value="Class 7th">Class 7th</option>
                    <option value="Class 6th">Class 6th</option>
                    <option value="Class 5th">Class 5th</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Section</label>
                  <input
                    type="text"
                    value={newSection}
                    onChange={e => setNewSection(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="0300-1234567"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Fee (PKR)</label>
                  <input
                    type="number"
                    value={newFee}
                    onChange={e => setNewFee(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAddStudentModalOpen(false)}
                  className="flex-1 py-2 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900 cursor-pointer"
                >
                  Save & Enroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ISSUE CHALLAN MODAL */}
      {/* ============================================================== */}
      {addChallanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-900">Issue New Fee Voucher</h3>
              <button onClick={() => setAddChallanModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleGenerateChallanSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Student</label>
                <select
                  value={challanStudentRoll}
                  onChange={e => setChallanStudentRoll(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                >
                  {db.students.map(s => (
                    <option key={s.id} value={s.rollNo}>
                      {s.rollNo} - {s.name} ({s.class})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Billing Month</label>
                <input
                  type="text"
                  value={challanMonth}
                  onChange={e => setChallanMonth(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Fee Amount (PKR)</label>
                <input
                  type="number"
                  value={challanAmount}
                  onChange={e => setChallanAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAddChallanModalOpen(false)}
                  className="flex-1 py-2 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900 cursor-pointer"
                >
                  Issue Challan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* BROADCAST NOTICE MODAL */}
      {/* ============================================================== */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-900">Publish Circular to School Notice Board</h3>
              <button onClick={() => setNoticeModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleCreateNoticeSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Heading / Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter Break Dates Announced"
                  value={noticeTitle}
                  onChange={e => setNoticeTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={noticeCategory}
                  onChange={e => setNoticeCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                >
                  <option value="Exams">Exams</option>
                  <option value="Admissions">Admissions</option>
                  <option value="Holidays">Holidays</option>
                  <option value="Events">Events</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Content</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Official message text to all parents and students..."
                  value={noticeContent}
                  onChange={e => setNoticeContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgent-check"
                  checked={noticeIsUrgent}
                  onChange={e => setNoticeIsUrgent(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <label htmlFor="urgent-check" className="text-xs text-slate-700 font-semibold">
                  Mark as Urgent Alert (Show top ticker banner)
                </label>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setNoticeModalOpen(false)}
                  className="flex-1 py-2 border border-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900 cursor-pointer"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
