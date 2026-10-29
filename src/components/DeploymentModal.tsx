import React, { useState } from 'react';
import {
  X,
  CloudUpload,
  Database,
  Globe,
  FileCode,
  CheckCircle2,
  Copy,
  Download,
  Upload,
  FolderGit2,
  Terminal,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
  const { exportDatabase, importDatabase, resetToDefault } = useSchool();
  const [activeTab, setActiveTab] = useState<'beginner' | 'vercel' | 'database' | 'structure' | 'backup'>('beginner');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const success = importDatabase(content);
          if (success) {
            alert('Database imported successfully! تمام ڈیٹا کامیابی کے ساتھ بحال ہو گیا۔');
          } else {
            alert('Invalid database JSON file. برائے مہربانی درست JSON فائل منتخب کریں۔');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 text-white flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-700/60 rounded-xl border border-emerald-500/30">
              <CloudUpload className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">Free Hosting & Database Deployment Guide</h3>
                <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase">
                  100% Free
                </span>
              </div>
              <p className="text-xs text-emerald-300 font-urdu mt-0.5" dir="rtl">
                السراج ماڈل ہائی اسکول - مفت لائیو ہوسٹنگ اور ڈیٹا بیس سیٹ اپ کی مکمل تکنیکی گائیڈ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('beginner')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'beginner'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            Beginner Step-by-Step (سب سے آسان طریقہ)
          </button>
          <button
            onClick={() => setActiveTab('vercel')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'vercel'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            Developer Git & Commands
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'database'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            Free Cloud Database (SQL & Firebase)
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'structure'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            Project Structure & Files
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'backup'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCode className="w-4 h-4" />
            Live DB Backup & Restore (JSON)
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 max-h-[68vh] overflow-y-auto space-y-6">
          {activeTab === 'beginner' && (
            <div className="space-y-6">
              {/* Simple Overview Banner */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 p-5 rounded-2xl">
                <h4 className="font-bold text-base text-emerald-950 mb-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  GitHub اور Vercel کیا ہیں اور یہ کیسے کام کرتے ہیں؟ (آسان ترین الفاظ میں)
                </h4>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  <strong>GitHub:</strong> ایک محفوظ کلاؤڈ تجوڑی (Digital Drive) ہے جہاں آپ کے اسکول کی ویب سائٹ کا کوڈ محفوظ رہے گا۔<br />
                  <strong>Vercel:</strong> ایک مفت سرور (Free Host) ہے جو GitHub سے آپ کا کوڈ لے کر اسے انٹرنیٹ پر لائیو چلا دیتا ہے تاکہ کوئی بھی موبائل سے آپ کی ویب سائٹ کھول سکے۔
                </p>
              </div>

              {/* Step Cards */}
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">GitHub پر مفت اکاؤنٹ بنائیں (Free Account)</h5>
                      <p className="text-xs text-slate-500">صرف 1 منٹ کا کام ہے</p>
                    </div>
                  </div>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside pl-2">
                    <li>اپنے براؤزر میں <a href="https://github.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">github.com</a> کھولیں۔</li>
                    <li><strong>"Sign up"</strong> پر کلک کر کے اپنا Email اور Password درج کریں۔</li>
                    <li>ای میل پر آنے والا 6 ہندسوں کا کوڈ درج کریں اور لاگ ان ہو جائیں۔</li>
                  </ol>
                </div>

                {/* Step 2 */}
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">GitHub پر نئی Repository (فولڈر) بنائیں</h5>
                      <p className="text-xs text-slate-500">جہاں آپ کا اسکول کوڈ محفوظ ہو گا</p>
                    </div>
                  </div>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside pl-2">
                    <li>GitHub کے اوپر دائیں کونے میں <strong>"+"</strong> کے نشان پر کلک کریں اور <strong>"New repository"</strong> منتخب کریں۔</li>
                    <li>Repository name میں لکھیں: <code className="bg-slate-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">al-siraj-school</code></li>
                    <li>اسے <strong>Public</strong> رہنے دیں اور نیچے سبز رنگ کا بٹن <strong>"Create repository"</strong> دبا دیں۔</li>
                  </ol>
                </div>

                {/* Step 3 */}
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                      3
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">فائلیں اپلوڈ کریں (Upload Files)</h5>
                      <p className="text-xs text-slate-500">بغیر کسی کمانڈ کے ڈریگ اینڈ ڈراپ کریں</p>
                    </div>
                  </div>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside pl-2">
                    <li>نئے صفحے پر آپ کو لنک نظر آئے گا: <strong>"uploading an existing file"</strong>، اس پر کلک کریں۔</li>
                    <li>اپنے اسکول کوڈ کی فائلیں سلیکٹ کر کے براؤزر میں ڈراپ (Drop) کر دیں۔</li>
                    <li>نیچے سبز رنگ کے بٹن <strong>"Commit changes"</strong> پر کلک کر دیں۔ آپ کا تمام کوڈ GitHub پر محفوظ ہو جائے گا!</li>
                  </ol>
                </div>

                {/* Step 4 */}
                <div className="bg-white border-2 border-emerald-500/80 rounded-2xl p-5 shadow-sm space-y-2 bg-emerald-50/20">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center">
                      4
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-emerald-950">Vercel پر جا کر 1 منٹ میں مفت لائیو کریں!</h5>
                      <p className="text-xs text-emerald-700 font-semibold">سب سے آخری اور جادوئی مرحلہ</p>
                    </div>
                  </div>
                  <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside pl-2">
                    <li>نئے ٹیب میں <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">vercel.com</a> کھولیں۔</li>
                    <li><strong>"Sign Up"</strong> دبا کر <strong>"Continue with GitHub"</strong> منتخب کریں (اور اجازت Authorize کر دیں)۔</li>
                    <li>ڈیش بورڈ پر <strong>"Add New..."</strong> → <strong>"Project"</strong> پر کلک کریں۔</li>
                    <li>آپ کو آپ کا پروجیکٹ <code className="bg-emerald-100 font-bold px-1.5 py-0.5 rounded">al-siraj-school</code> نظر آئے گا، اس کے سامنے <strong>"Import"</strong> پر کلک کریں۔</li>
                    <li>کسی سیٹنگ کو بدلنے کی ضرورت نہیں، سیدھا نیچے نیلے رنگ کا <strong>"Deploy"</strong> بٹن دبا دیں!</li>
                    <li>صرف 45 سیکنڈ میں آپ کی اسکول کی ویب سائٹ انٹرنیٹ پر لائیو ہو جائے گی اور آپ کو ایسا فری لنک مل جائے گا:
                      <div className="mt-1.5 p-2 bg-slate-900 text-emerald-300 rounded font-mono text-xs">
                        👉 https://al-siraj-school.vercel.app
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vercel' && (
            <div className="space-y-5">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <h4 className="font-bold text-sm mb-1">
                    ویب سائٹ کو 2 منٹ میں مفت لائیو (Deploy) کرنے کا طریقہ
                  </h4>
                  <p className="leading-relaxed">
                    یہ ویب سائٹ جدید Vite + React میں تیار کی گئی ہے۔ آپ اسے Vercel یا Netlify پر بغیر کسی فیس یا کریڈٹ کارڈ کے ہمیشہ کے لیے مفت لائیو چلا سکتے ہیں۔
                  </p>
                </div>
              </div>

              {/* Step 1 */}
              <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h5 className="font-bold text-sm text-slate-800">
                    Push Project Code to GitHub (گٹ ہب پر کوڈ اپلوڈ کریں)
                  </h5>
                </div>
                <p className="text-xs text-slate-600">
                  Run these commands in your project terminal to push the entire school code:
                </p>
                <div className="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono text-xs flex justify-between items-center">
                  <code>git init && git add . && git commit -m "Al-Siraj High School Complete Project"</code>
                  <button
                    onClick={() => handleCopy('git init && git add . && git commit -m "Al-Siraj High School Complete Project"', 'git-cmd')}
                    className="text-slate-400 hover:text-white p-1 rounded"
                    title="Copy Command"
                  >
                    {copiedText === 'git-cmd' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h5 className="font-bold text-sm text-slate-800">
                    Import to Vercel (1-Click Deployment)
                  </h5>
                </div>
                <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside pl-2">
                  <li>Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-semibold underline">vercel.com</a> and sign up / login with GitHub.</li>
                  <li>Click <strong>"Add New..."</strong> → <strong>"Project"</strong> and select your GitHub repository.</li>
                  <li>Framework Preset will auto-detect: <strong>Vite</strong>.</li>
                  <li>Click <strong>"Deploy"</strong>.</li>
                  <li>In 60 seconds, your school website is live on a free SSL domain like: <code className="text-emerald-700 font-mono">https://al-siraj-high-school.vercel.app</code></li>
                </ol>
                <div className="bg-slate-100 p-2.5 rounded-lg text-xs text-slate-600">
                  💡 Note: We have already included <code className="text-slate-900 font-mono">vercel.json</code> and <code className="text-slate-900 font-mono">netlify.toml</code> in the project root to guarantee seamless Single Page Application routing!
                </div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                <h4 className="font-bold text-sm text-blue-900 mb-1">
                  مفت کلاؤڈ ڈیٹا بیس سیٹ اپ (Free PostgreSQL / Supabase & Firebase)
                </h4>
                <p className="text-xs text-blue-800 leading-relaxed">
                  ہم نے آپ کے لیے مکمل ریڈی میڈ SQL اسکیما اور Firebase کلیکشن فائلیں تیار کر کے فولڈر <code className="font-mono bg-blue-100 px-1 py-0.5 rounded">/deployment-guide/</code> میں رکھ دی ہیں۔
                </p>
              </div>

              {/* Supabase Free PostgreSQL */}
              <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-600" />
                    <h5 className="font-bold text-sm text-slate-800">Option A: Supabase (Free 500MB PostgreSQL Database)</h5>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Recommended SQL
                  </span>
                </div>
                <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside pl-2">
                  <li>Create a free account at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-semibold">Supabase.com</a>.</li>
                  <li>Create a new project named <code className="font-mono text-slate-800">al-siraj-school</code>.</li>
                  <li>Go to <strong>SQL Editor</strong>, open <code className="font-mono text-slate-800">/deployment-guide/schema.sql</code>, copy its content and click <strong>Run</strong>.</li>
                  <li>All tables for Students, Online Admissions, Fee Challans, Results DMC, and Notices will be created instantly.</li>
                </ol>
                <div className="p-3 bg-slate-900 text-slate-300 rounded-lg text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-400 mb-1 text-[11px]">
                    <span>schema.sql Preview (Tables created):</span>
                    <button
                      onClick={() => handleCopy(`-- View full file in /deployment-guide/schema.sql\nCREATE TABLE students (...);\nCREATE TABLE admission_applications (...);\nCREATE TABLE fee_challans (...);\nCREATE TABLE results (...);`, 'schema-sql')}
                      className="text-emerald-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedText === 'schema-sql' ? 'Copied!' : 'Copy SQL snippet'}
                    </button>
                  </div>
                  <pre className="text-emerald-400 text-[11px] overflow-x-auto">
{`students (id, roll_no, name, class_name, section, phone, monthly_fee)
admission_applications (id, applicant_name, father_name, father_cnic, status)
fee_challans (id, challan_no, student_id, total_amount, status, payment_method)
results (id, roll_no, exam_type, total_marks, obtained_marks, percentage, grade)`}
                  </pre>
                </div>
              </div>

              {/* Firebase Option */}
              <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <CloudUpload className="w-5 h-5 text-amber-600" />
                  <h5 className="font-bold text-sm text-slate-800">Option B: Firebase Firestore (Free Tier)</h5>
                </div>
                <p className="text-xs text-slate-600">
                  You can also connect Firebase Firestore using the ready structure in <code className="font-mono text-slate-800">/deployment-guide/firebase-schema.json</code>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-800">
                پروجیکٹ کی مکمل فائلیں اور فولڈر اسٹرکچر (Complete Project Architecture)
              </h4>
              <p className="text-xs text-slate-600">
                تمام ٹولز، اسکول کے صفحات، پورٹلز اور ڈیٹا بیس بیک اپ کی فائلیں درج ذیل ترتیب سے تیار کی گئی ہیں:
              </p>

              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-1">
                <p className="text-emerald-400 font-bold">/ (Root)</p>
                <p className="pl-4 text-amber-300">├── deployment-guide/ <span className="text-slate-400 font-sans text-[11px]">(مفت ہوسٹنگ اور ڈیٹا بیس کی فائلیں)</span></p>
                <p className="pl-8 text-slate-300">├── README_DEPLOYMENT.md</p>
                <p className="pl-8 text-slate-300">├── schema.sql <span className="text-emerald-400">(PostgreSQL / Supabase Schema)</span></p>
                <p className="pl-8 text-slate-300">└── firebase-schema.json</p>
                <p className="pl-4 text-emerald-400">├── vercel.json & netlify.toml <span className="text-slate-400 font-sans text-[11px]">(Free Host Configs)</span></p>
                <p className="pl-4 text-blue-300">├── src/</p>
                <p className="pl-8 text-slate-300">├── components/ <span className="text-slate-400">(Navbar, Footer, DeploymentModal, DMC Print Card, Challan Slip)</span></p>
                <p className="pl-8 text-slate-300">├── context/SchoolContext.tsx <span className="text-emerald-400">(Reactive Store & Database Engine)</span></p>
                <p className="pl-8 text-slate-300">├── data/initialData.ts <span className="text-slate-400">(Al-Siraj High School Seed Records)</span></p>
                <p className="pl-8 text-slate-300">├── pages/</p>
                <p className="pl-12 text-slate-400">├── HomePage.tsx, AboutPage.tsx, AcademicsPage.tsx</p>
                <p className="pl-12 text-slate-400">├── AdmissionsPage.tsx <span className="text-emerald-300">(Online Admission & Slip Generator)</span></p>
                <p className="pl-12 text-slate-400">├── ResultCheckerPage.tsx <span className="text-amber-300">(Roll No Lookup & DMC Card)</span></p>
                <p className="pl-12 text-slate-400">├── FeePortalPage.tsx <span className="text-emerald-300">(EasyPaisa, JazzCash & 3-Part Challan)</span></p>
                <p className="pl-12 text-slate-400">├── TeacherPortalPage.tsx <span className="text-teal-300">(Attendance & Homework)</span></p>
                <p className="pl-12 text-slate-400">├── AdminDashboardPage.tsx <span className="text-amber-300">(Full School ERP)</span></p>
                <p className="pl-12 text-slate-400">└── NoticesPage.tsx, GalleryPage.tsx, ContactPage.tsx</p>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                <h4 className="font-bold text-sm text-emerald-950 mb-1">
                  براہ راست ڈیٹا بیس بیک اپ اور ری اسٹور (Instant Database Backup & Restore)
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  آپ کسی بھی وقت اسکول کے تمام طلباء کا ریکارڈ، آن لائن داخلے، امتحانی نتائج اور فیس چالان ایک کلک میں اپنے کمپیوٹر میں بطور JSON فائل ڈاؤن لوڈ کر سکتے ہیں اور جب چاہیں واپس اپلوڈ کر کے بحال کر سکتے ہیں۔
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-200 p-4 rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full mx-auto flex items-center justify-center">
                    <Download className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-sm text-slate-800">Export School Database</h5>
                  <p className="text-xs text-slate-500">
                    Download full snapshot with all students, fees, results, and settings.
                  </p>
                  <button
                    onClick={exportDatabase}
                    className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download JSON Backup
                  </button>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full mx-auto flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-sm text-slate-800">Restore / Import Database</h5>
                  <p className="text-xs text-slate-500">
                    Upload a previously exported backup file to restore records instantly.
                  </p>
                  <label className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4" />
                    Select JSON File to Restore
                    <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
                <span>Want to restore original demo seed records?</span>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset to initial demo data?')) {
                      resetToDefault();
                      alert('Reset to default school records successfully.');
                    }
                  }}
                  className="text-red-600 hover:underline font-semibold cursor-pointer"
                >
                  Reset to Default Demo Data
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500">
            All files ready in <code className="font-mono text-emerald-800 font-bold">/deployment-guide/</code> folder.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
