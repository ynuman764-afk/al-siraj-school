import React, { useState } from 'react';
import {
  Bell,
  Search,
  Filter,
  Calendar,
  AlertTriangle,
  User,
  Printer,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { Notice } from '../types/school';

export const NoticesPage: React.FC = () => {
  const { db } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  const categories = ['All', 'Urgent', 'Exams', 'Admissions', 'Holidays', 'Events'];

  const filteredNotices = db.notices.filter(notice => {
    const matchesCat =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'Urgent'
        ? notice.isUrgent
        : notice.category === selectedCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 no-print">
        <span className="text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Circulars & Updates
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Official School Notices & Circulars
        </h1>
        <p className="text-sm sm:text-base text-emerald-800 font-urdu" dir="rtl">
          تمام سرکاری اعلانات، امتحانی ڈیٹ شیٹس اور چھٹیوں کے نوٹیفیکیشنز
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Stay informed with prompt announcements regarding admissions, examinations, parent-teacher conferences, and academic schedules.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 no-print">
        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'Urgent' ? '🔥 Urgent' : cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
          />
        </div>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotices.map(notice => (
          <div
            key={notice.id}
            className={`bg-white rounded-2xl p-6 border transition-all shadow-sm flex flex-col justify-between ${
              notice.isUrgent
                ? 'border-red-300 bg-red-50/20 shadow-red-100/50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    notice.category === 'Exams' ? 'bg-amber-100 text-amber-800' :
                    notice.category === 'Admissions' ? 'bg-emerald-100 text-emerald-800' :
                    notice.category === 'Holidays' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {notice.category}
                  </span>
                  {notice.isUrgent && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white animate-pulse">
                      Urgent Alert
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{notice.date}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {notice.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {notice.content}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                <User className="w-3.5 h-3.5" /> Issued by: {notice.author}
              </span>
              <button
                onClick={() => setActiveNotice(notice)}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>Read Circular</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Notice Detail Reader Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  {activeNotice.category}
                </span>
                <span className="text-xs text-slate-400 ml-2">{activeNotice.date}</span>
              </div>
              <button
                onClick={() => setActiveNotice(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">{activeNotice.title}</h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>{activeNotice.content}</p>
                <div className="pt-2 text-right text-xs font-bold text-slate-800">
                  — {activeNotice.author}, Al-Siraj Model High School
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Circular</span>
              </button>
              <button
                onClick={() => setActiveNotice(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
