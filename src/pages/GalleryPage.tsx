import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Camera,
  Sparkles,
  Trophy,
  Microscope,
  Cpu,
  BookOpen,
  Award,
  Users
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const galleryItems = [
    {
      id: 1,
      title: 'Annual Science & Robotics Exhibition',
      category: 'Science & STEM',
      desc: 'Students demonstrating working prototypes of hydraulic bridges and automated micro-controllers.',
      icon: Microscope,
      badge: 'STEM 2026'
    },
    {
      id: 2,
      title: 'High-Tech Computer Science Lab',
      category: 'Campus Facilities',
      desc: 'Matriculation students engaging in programming algorithms and hardware diagnostics.',
      icon: Cpu,
      badge: 'ICT Suite'
    },
    {
      id: 3,
      title: 'Annual Sports Gala & Athletics Championship',
      category: 'Sports & Co-Curricular',
      desc: 'Cricket tournament, 100m sprint, tug-of-war, and gymnastics display at the campus grounds.',
      icon: Trophy,
      badge: 'Sports Day'
    },
    {
      id: 4,
      title: 'BISE High Achievers Prize Distribution Ceremony',
      category: 'Academic Honors',
      desc: 'Medals and merit cash awards presented to matriculation board position holders and teachers.',
      icon: Award,
      badge: 'Gold Medals'
    },
    {
      id: 5,
      title: 'Allama Iqbal Bilingual Declamation Contest',
      category: 'Literary & Debates',
      desc: 'Inter-school speech competition celebrating national heritage and poetic eloquence.',
      icon: BookOpen,
      badge: 'Urdu & English'
    },
    {
      id: 6,
      title: 'Siraj Central Reference Library & Study Hall',
      category: 'Campus Facilities',
      desc: 'Quiet reading environment fostering independent research and extensive literature review.',
      icon: Users,
      badge: 'Learning Center'
    }
  ];

  const filteredItems = filter === 'All' ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-teal-700 bg-teal-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Campus Life & Highlights
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Vibrant Memories & Student Milestones
        </h1>
        <p className="text-sm sm:text-base text-emerald-800 font-urdu" dir="rtl">
          ہم نصابی سرگرمیاں، سائنس نمائش اور سالانہ سپورٹس گالا کی تصویری جھلکیاں
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Explore the vibrant tapestry of extracurricular endeavors, sports competitions, scientific innovations, and prize distributions at Al-Siraj Model High School.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-1.5 pt-3">
          {['All', 'Science & STEM', 'Campus Facilities', 'Sports & Co-Curricular', 'Academic Honors'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              {/* Visual Graphic Tile */}
              <div className="h-48 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 relative p-6 flex flex-col justify-between text-white overflow-hidden">
                <div className="absolute -right-8 -bottom-8 opacity-15 text-white pointer-events-none group-hover:scale-110 transition-transform">
                  <Icon className="w-40 h-40" />
                </div>

                <div className="flex justify-between items-start z-10">
                  <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white border border-white/20">
                    {item.badge}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="z-10">
                  <span className="text-[11px] text-emerald-300 uppercase font-semibold block">{item.category}</span>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="p-6 space-y-2">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Al-Siraj Campus Archive</span>
                  <span className="font-semibold text-emerald-800">Session 2025-26</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
