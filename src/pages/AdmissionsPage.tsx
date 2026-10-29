import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Printer,
  Sparkles,
  Search,
  User,
  Phone,
  Calendar,
  Building,
  GraduationCap,
  AlertCircle,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { AdmissionApplication } from '../types/school';

export const AdmissionsPage: React.FC = () => {
  const { db, submitAdmission } = useSchool();
  const [activeTab, setActiveTab] = useState<'form' | 'tracker' | 'criteria'>('form');

  // Form State
  const [applicantName, setApplicantName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [fatherCnic, setFatherCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('2011-06-15');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [classApplied, setClassApplied] = useState('Class 9th (Science - Biology)');
  const [previousSchool, setPreviousSchool] = useState('');
  const [previousMarksPercentage, setPreviousMarksPercentage] = useState('85');
  const [address, setAddress] = useState('');

  // Confirmation Slip State
  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);

  // Tracker State
  const [trackIdInput, setTrackIdInput] = useState('');
  const [trackedRecord, setTrackedRecord] = useState<AdmissionApplication | null>(null);
  const [trackSearched, setTrackSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !fatherName || !phone || !fatherCnic) {
      alert('Please fill out all mandatory fields (Student Name, Father Name, CNIC, Phone).');
      return;
    }

    const newApp = submitAdmission({
      applicantName,
      fatherName,
      fatherCnic,
      phone,
      email: email || 'guardian@gmail.com',
      dob,
      gender,
      classApplied,
      previousSchool: previousSchool || 'Private School',
      previousMarksPercentage: parseFloat(previousMarksPercentage) || 0,
      address: address || 'Punjab, Pakistan',
      notes: 'Submitted via Online Portal. Awaiting test & document verification.'
    });

    setSubmittedApp(newApp);
    // Scroll to slip
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackSearched(true);
    const found = db.admissions.find(
      a =>
        a.id.toLowerCase() === trackIdInput.trim().toLowerCase() ||
        a.fatherCnic.replace(/-/g, '') === trackIdInput.trim().replace(/-/g, '') ||
        a.phone.replace(/[\s-]/g, '') === trackIdInput.trim().replace(/[\s-]/g, '')
    );
    setTrackedRecord(found || null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 no-print">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Admissions 2026-2027
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Al-Siraj Online Admission Portal
        </h1>
        <p className="text-sm sm:text-base text-emerald-800 font-urdu" dir="rtl">
          آن لائن داخلہ فارم — سیشن 2026ء تا 2027ء (پلے گروپ تا میٹرک)
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Submit your child's online admission application in simple steps, download the entrance test slip, and track the admission status live.
        </p>

        {/* Tab switchers */}
        <div className="flex justify-center pt-2">
          <div className="inline-flex bg-slate-100 p-1 rounded-xl gap-1">
            <button
              onClick={() => {
                setActiveTab('form');
                setSubmittedApp(null);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'form' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Online Admission Form
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'tracker' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Track Application Status
            </button>
            <button
              onClick={() => setActiveTab('criteria')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'criteria' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Criteria & Fee Structure
            </button>
          </div>
        </div>
      </div>

      {/* View 1: Online Admission Form or Success Slip */}
      {activeTab === 'form' && (
        <>
          {submittedApp ? (
            /* Printable Official Admission Confirmation Slip */
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-center justify-between no-print">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-emerald-950">Application Submitted Successfully!</h3>
                    <p className="text-xs text-emerald-800">
                      Your reference ID is <strong className="font-mono">{submittedApp.id}</strong>. Print or save this slip for the entrance interview.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-lg hover:bg-emerald-900 flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Slip</span>
                  </button>
                  <button
                    onClick={() => setSubmittedApp(null)}
                    className="px-3 py-2 bg-white text-slate-700 border border-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    New Form
                  </button>
                </div>
              </div>

              {/* Physical Slip Card */}
              <div className="bg-white rounded-2xl border-2 border-slate-800 p-8 shadow-xl print-card space-y-6">
                {/* School Header */}
                <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-2xl">
                      <GraduationCap className="w-9 h-9 text-emerald-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-950 tracking-tight">Al-Siraj Model High School</h2>
                      <p className="text-xs font-urdu text-emerald-900 font-bold" dir="rtl">السراج ماڈل ہائی اسکول — رجسٹریشن فارم</p>
                      <p className="text-[11px] text-slate-600">{db.settings.address} • Tel: {db.settings.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold bg-slate-900 text-white px-2.5 py-1 rounded block mb-1">
                      ADMISSION SLIP 2026-27
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      ID: {submittedApp.id}
                    </span>
                  </div>
                </div>

                {/* Applicant Bio Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Applicant Name</span>
                    <span className="font-bold text-slate-900 text-sm">{submittedApp.applicantName}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Father / Guardian</span>
                    <span className="font-bold text-slate-900 text-sm">{submittedApp.fatherName}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Class Applied For</span>
                    <span className="font-bold text-emerald-800 text-sm">{submittedApp.classApplied}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Father CNIC</span>
                    <span className="font-mono font-semibold text-slate-900">{submittedApp.fatherCnic}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Contact Phone</span>
                    <span className="font-mono font-semibold text-slate-900">{submittedApp.phone}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Gender & DOB</span>
                    <span className="font-semibold text-slate-900">{submittedApp.gender} • {submittedApp.dob}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Previous School</span>
                    <span className="font-semibold text-slate-900">{submittedApp.previousSchool} ({submittedApp.previousMarksPercentage}%)</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg col-span-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Address</span>
                    <span className="text-slate-800">{submittedApp.address}</span>
                  </div>
                </div>

                {/* Instructions Box */}
                <div className="border border-slate-300 rounded-xl p-4 bg-amber-50/60 text-xs space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    Instructions for Admission Entrance Assessment:
                  </h4>
                  <ul className="text-slate-700 space-y-1 list-disc list-inside">
                    <li>Please bring this printed slip along with 2 passport-sized photographs and student B-Form copy.</li>
                    <li>Entrance test covers English, Mathematics, and Urdu based on previous grade curriculum.</li>
                    <li>Test schedule will be communicated via SMS on <strong className="font-mono">{submittedApp.phone}</strong>.</li>
                    <li>For inquiries, visit admission office Mon - Sat (08:00 AM - 02:00 PM) or call {db.settings.phone}.</li>
                  </ul>
                </div>

                {/* Signatures & Barcode simulation */}
                <div className="pt-6 border-t border-slate-300 flex justify-between items-end text-xs">
                  <div>
                    <div className="font-mono text-xs tracking-widest text-slate-400">
                      ||| | ||||| || |||||| | |||| ||| |||||||
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">SYS-REF: {submittedApp.id}</span>
                  </div>
                  <div className="text-center">
                    <div className="w-36 border-b border-slate-700 mb-1"></div>
                    <span className="text-[11px] font-semibold text-slate-700">Admission Officer Stamp</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Admission Form */
            <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Student Online Admission Form</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Please complete the form accurately. All fields marked with * are mandatory.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Student Information */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4" /> 1. Student Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Muhammad Rehan"
                        value={applicantName}
                        onChange={e => setApplicantName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Father / Guardian Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Mahmood"
                        value={fatherName}
                        onChange={e => setFatherName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Father / Guardian CNIC *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 35201-1234567-1"
                        value={fatherCnic}
                        onChange={e => setFatherCnic(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
                      <select
                        value={gender}
                        onChange={e => setGender(e.target.value as 'Male' | 'Female')}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      >
                        <option value="Male">Male (طالب علم)</option>
                        <option value="Female">Female (طالبہ)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Class Seeking Admission In *
                      </label>
                      <select
                        value={classApplied}
                        onChange={e => setClassApplied(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg font-semibold text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      >
                        <option value="Playgroup / Montessori">Playgroup / Montessori</option>
                        <option value="Nursery">Nursery</option>
                        <option value="Prep">Prep</option>
                        <option value="Class 1st">Class 1st</option>
                        <option value="Class 2nd">Class 2nd</option>
                        <option value="Class 3rd">Class 3rd</option>
                        <option value="Class 4th">Class 4th</option>
                        <option value="Class 5th">Class 5th (Primary)</option>
                        <option value="Class 6th">Class 6th (Middle)</option>
                        <option value="Class 7th">Class 7th (Middle)</option>
                        <option value="Class 8th">Class 8th (Middle)</option>
                        <option value="Class 9th (Science - Biology)">Class 9th (Science - Biology Group)</option>
                        <option value="Class 9th (Science - Computer)">Class 9th (Science - Computer Group)</option>
                        <option value="Class 10th (Science - Biology)">Class 10th (Science - Biology Group)</option>
                        <option value="Class 10th (Science - Computer)">Class 10th (Science - Computer Group)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact Information */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                    <Phone className="w-4 h-4" /> 2. Guardian Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number (for SMS Alerts) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0300 1234567"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="guardian@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Residential Home Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House No, Street, Mohalla / Colony, City"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Previous Academic History */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> 3. Previous Academic Records
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Previous School Attended
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Govt Primary School / The Educators"
                        value={previousSchool}
                        onChange={e => setPreviousSchool(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Marks Percentage in Last Class (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="e.g. 88.5"
                        value={previousMarksPercentage}
                        onChange={e => setPreviousMarksPercentage(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-xs text-slate-500">
                    By submitting, you agree to comply with Al-Siraj Model High School admission guidelines and code of conduct.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-amber-300" />
                    <span>Submit Online Application</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {/* View 2: Application Status Tracker */}
      {activeTab === 'tracker' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Check Admission Application Status</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your Admission Application ID (e.g. <span className="font-mono font-semibold text-slate-700">ASM-ADM-2026-001</span>) or Father's CNIC / Mobile Number to track progress.
              </p>
            </div>

            <form onSubmit={handleTrackSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Application ID, CNIC or Phone"
                value={trackIdInput}
                onChange={e => setTrackIdInput(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>

            {/* Quick Demo Test Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
              <span>Quick Test ID:</span>
              <button
                type="button"
                onClick={() => {
                  setTrackIdInput('ASM-ADM-2026-001');
                }}
                className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-mono text-[11px] hover:bg-slate-200 cursor-pointer"
              >
                ASM-ADM-2026-001 (Pending)
              </button>
              <button
                type="button"
                onClick={() => {
                  setTrackIdInput('ASM-ADM-2026-002');
                }}
                className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-mono text-[11px] hover:bg-slate-200 cursor-pointer"
              >
                ASM-ADM-2026-002 (Interview)
              </button>
              <button
                type="button"
                onClick={() => {
                  setTrackIdInput('ASM-ADM-2026-003');
                }}
                className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-mono text-[11px] hover:bg-slate-200 cursor-pointer"
              >
                ASM-ADM-2026-003 (Approved)
              </button>
            </div>

            {/* Results Display */}
            {trackSearched && (
              <div className="pt-4 border-t border-slate-100">
                {trackedRecord ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                          {trackedRecord.id}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-1">{trackedRecord.applicantName}</h3>
                        <p className="text-xs text-slate-500">Father: {trackedRecord.fatherName} • {trackedRecord.classApplied}</p>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        trackedRecord.status === 'Approved' || trackedRecord.status === 'Enrolled'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : trackedRecord.status === 'Interview Scheduled'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : trackedRecord.status === 'Rejected'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        Status: {trackedRecord.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-white p-3.5 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Date Applied</span>
                        <span className="font-semibold text-slate-700">{trackedRecord.appliedDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Contact</span>
                        <span className="font-semibold text-slate-700 font-mono">{trackedRecord.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Assigned Roll No</span>
                        <span className="font-bold text-emerald-800 font-mono">{trackedRecord.assignedRollNo || 'Pending Clearance'}</span>
                      </div>
                    </div>

                    {trackedRecord.interviewDate && (
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-xs text-blue-900 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        <span><strong>Scheduled Interview:</strong> {trackedRecord.interviewDate} at School Administration Block.</span>
                      </div>
                    )}

                    {trackedRecord.notes && (
                      <p className="text-xs text-slate-600 italic">
                        Administration Note: "{trackedRecord.notes}"
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl">
                    No application found matching your search. Please check the Application ID or CNIC.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* View 3: Criteria & Fee Structure */}
      {activeTab === 'criteria' && (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Admission Eligibility & Age Limits
              </h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• <strong>Playgroup / Nursery:</strong> 3.0 to 4.5 Years</li>
                <li>• <strong>Prep to Class 1:</strong> 5.0 to 6.5 Years</li>
                <li>• <strong>Class 6th to 8th:</strong> Based on previous school passing certificate and entrance test.</li>
                <li>• <strong>Class 9th & 10th (Matric):</strong> Minimum 60% marks in previous middle standard examination.</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                Required Documents Checklist
              </h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• 3 Passport-sized student photographs (sky blue background).</li>
                <li>• Copy of NADRA B-Form or Child Birth Certificate.</li>
                <li>• Copy of Father/Guardian Computerized National ID Card (CNIC).</li>
                <li>• Original School Leaving Certificate (SLC) from previous school.</li>
                <li>• Previous Class Report Card / Marks Sheet.</li>
              </ul>
            </div>
          </div>

          {/* Fee Structure Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-5 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Official Monthly Fee Structure (2026-2027)</h3>
              <p className="text-xs text-slate-500">Transparent, affordable education without hidden charges</p>
            </div>
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Grade / Level</th>
                  <th className="p-3">Admission Fee (One-Time)</th>
                  <th className="p-3">Monthly Tuition</th>
                  <th className="p-3">Science/IT Lab Charges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Pre-School (Playgroup, Nursery, Prep)</td>
                  <td className="p-3">PKR 3,000</td>
                  <td className="p-3 font-bold text-emerald-800">PKR 2,000 / month</td>
                  <td className="p-3 text-slate-500">Included</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Primary Wing (Class 1st to 5th)</td>
                  <td className="p-3">PKR 3,500</td>
                  <td className="p-3 font-bold text-emerald-800">PKR 2,200 / month</td>
                  <td className="p-3 text-slate-500">PKR 100</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Middle Wing (Class 6th to 8th)</td>
                  <td className="p-3">PKR 4,000</td>
                  <td className="p-3 font-bold text-emerald-800">PKR 2,800 / month</td>
                  <td className="p-3 text-slate-500">PKR 200</td>
                </tr>
                <tr className="bg-emerald-50/50">
                  <td className="p-3 font-bold text-slate-900">Secondary Matric (Class 9th & 10th Science)</td>
                  <td className="p-3">PKR 5,000</td>
                  <td className="p-3 font-bold text-emerald-800">PKR 3,500 / month</td>
                  <td className="p-3 text-slate-500">PKR 400</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
