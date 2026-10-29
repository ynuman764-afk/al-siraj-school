import React from 'react';
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  BookOpen,
  FileText,
  CloudUpload,
  Heart
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openDeploymentModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openDeploymentModal }) => {
  const { db } = useSchool();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-8 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-lg shadow-emerald-950 border border-emerald-500/30">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg tracking-tight">Al-Siraj Model High School</h3>
                <p className="text-xs font-urdu text-emerald-400" dir="rtl">السراج ماڈل ہائی اسکول</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {db.settings.tagline}
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>{db.settings.affiliation}</span>
              </div>
              <p className="text-slate-400 text-[11px]">Govt. Registered Code: {db.settings.regNo}</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2.5">
              Quick Portals & Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('admission')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-emerald-300 font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Online Admission Form 2026-27</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('result')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-amber-300 font-semibold"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Check Student Result (DMC)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('fee')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Digital Fee Challan & Pay Online</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('academics')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Academics & Science Curriculum
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('notices')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Latest Notices & Datesheets
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Campus Life & Science Exhibitions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Fee & Payment Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2.5">
              Digital Fee Accounts
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Designated Bank</span>
                <p className="font-semibold text-slate-200">{db.settings.bankName}</p>
                <p className="text-[11px] font-mono text-emerald-400">A/C: {db.settings.accountNumber}</p>
                <p className="text-[10px] text-slate-400">Title: {db.settings.accountTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-emerald-400 font-bold block">EasyPaisa Till</span>
                  <p className="font-mono text-xs text-white">{db.settings.easyPaisaTill}</p>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-amber-400 font-bold block">JazzCash Till</span>
                  <p className="font-mono text-xs text-white">{db.settings.jazzCashTill}</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Raast Instant ID: <span className="font-mono text-white">{db.settings.raastId}</span>
              </p>
            </div>
          </div>

          {/* Col 4: Campus Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2.5">
              Campus Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{db.settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${db.settings.phone}`} className="hover:text-white transition-colors">
                  {db.settings.phone} / {db.settings.phoneAlt}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${db.settings.email}`} className="hover:text-white transition-colors">
                  {db.settings.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Office: Mon - Sat (07:30 AM - 02:30 PM)</span>
              </li>
            </ul>

            <button
              onClick={openDeploymentModal}
              className="mt-4 w-full py-2 px-3 bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-600/40 text-emerald-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CloudUpload className="w-4 h-4 text-emerald-400" />
              <span>Free Hosting & Technical Guide</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Al-Siraj Model High School. All Rights Reserved. Affiliated with BISE.</p>
          <div className="flex items-center gap-4">
            <span className="font-urdu text-emerald-400 text-sm" dir="rtl">
              علم کی روشنی — ہر بچے کا حق
            </span>
            <span>•</span>
            <span className="text-slate-400 flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Academic Excellence
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
