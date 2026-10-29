import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const ContactPage: React.FC = () => {
  const { db } = useSchool();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Admission Inquiry');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert('Please fill out Name, Phone and Message.');
      return;
    }
    setSentSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Connect With Us
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Campus Location & Inquiries
        </h1>
        <p className="text-sm sm:text-base text-emerald-800 font-urdu" dir="rtl">
          ہم سے رابطہ کریں — ہمارے نمائندے آپ کی رہنمائی کے لیے ہمہ وقت حاضر ہیں
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Have queries about admissions, syllabus, fee schedules, or school transport? Reach out to our administrative support desk or visit our campus.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-xl border border-slate-800">
            <h3 className="text-xl font-bold">Administration & Reception Block</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We welcome parents and visitors during official school visiting hours. Prior appointment recommended for meetings with the Principal.
            </p>

            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-800/80 text-emerald-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold uppercase">Campus Address</span>
                  <span className="text-slate-200 leading-snug">{db.settings.address}</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-800/80 text-teal-300 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold uppercase">Telephone & Helplines</span>
                  <p className="text-slate-200 font-mono">{db.settings.phone}</p>
                  <p className="text-slate-400 font-mono text-[11px]">{db.settings.phoneAlt}</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-800/80 text-blue-300 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold uppercase">Official Email</span>
                  <span className="text-slate-200">{db.settings.email}</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-800/80 text-amber-300 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-bold uppercase">Visiting Hours</span>
                  <p className="text-slate-200">Monday - Saturday: 07:30 AM - 02:30 PM</p>
                  <p className="text-slate-400 text-[11px]">Friday: 07:30 AM - 12:30 PM</p>
                </div>
              </li>
            </ul>

            {/* Quick WhatsApp link */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${db.settings.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on Official WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact / Query Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900">Send an Inquiry or Message</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Our admission counselor will respond to your phone or email within 24 working hours.
            </p>
          </div>

          {sentSuccess ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Message Sent Successfully!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you for contacting Al-Siraj Model High School. Our admissions office has received your inquiry.
              </p>
              <button
                onClick={() => {
                  setSentSuccess(false);
                  setMessage('');
                }}
                className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-lg hover:bg-emerald-900 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Admission Inquiry">Admission & Entrance Test</option>
                    <option value="Fee Portal / Challan Help">Fee Portal & Challan Verification</option>
                    <option value="Result / DMC Issue">Result DMC Verification</option>
                    <option value="School Transport">Van & Transport Routes</option>
                    <option value="General Query">General Administration Query</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please write your questions or details..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
