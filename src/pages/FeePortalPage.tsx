import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building,
  Smartphone,
  ShieldCheck,
  Download,
  Calendar,
  Sparkles,
  Receipt
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { FeeChallan } from '../types/school';

export const FeePortalPage: React.FC = () => {
  const { db, payFeeChallan } = useSchool();
  const [searchInput, setSearchInput] = useState('ASM-102');
  const [selectedChallan, setSelectedChallan] = useState<FeeChallan | null>(() => {
    return db.feeChallans.find(c => c.rollNo === 'ASM-102') || db.feeChallans[0] || null;
  });

  // Digital Payment Modal / State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<FeeChallan['paymentMethod']>('EasyPaisa');
  const [transactionId, setTransactionId] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    const found = db.feeChallans.find(
      c => c.rollNo.toUpperCase() === query ||
           c.challanNo.toUpperCase() === query ||
           c.studentName.toLowerCase().includes(query.toLowerCase())
    );
    setSelectedChallan(found || null);
  };

  const handleDigitalPaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallan) return;
    if (!transactionId && paymentMethod !== 'Cash at Counter') {
      alert('Please provide the Transaction ID / Reference Number from your payment app.');
      return;
    }

    const success = payFeeChallan(
      selectedChallan.challanNo,
      paymentMethod,
      transactionId || `CASH-${Date.now()}`,
      paymentNote
    );

    if (success) {
      setPaymentSuccess(true);
      // Refresh current challan from updated db state
      const updated = db.feeChallans.find(c => c.id === selectedChallan.id);
      if (updated) {
        setSelectedChallan({
          ...updated,
          status: 'Paid',
          paymentMethod,
          transactionId: transactionId || `CASH-${Date.now()}`,
          paymentDate: new Date().toISOString().split('T')[0]
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 no-print">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Student Accounts & Fee Services
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Al-Siraj Digital Fee & Challan Portal
        </h1>
        <p className="text-sm sm:text-base text-emerald-800 font-urdu" dir="rtl">
          آن لائن فیس چالان، ایزی پیسہ، جاز کیش اور 3-حصوں پر مشتمل بینک چالان پورٹل
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Search student fee vouchers, make instant digital payments with automated receipt generation, or print the official 3-copy bank challan slip.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4 no-print">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by Roll No (e.g. ASM-101, ASM-102) or Challan No (e.g. CH-2026-0502)"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl font-mono uppercase focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search Challan</span>
          </button>
        </form>

        {/* Demo Roll Numbers quick picks */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-medium">Quick Pick Vouchers:</span>
          {db.feeChallans.map(ch => (
            <button
              key={ch.id}
              onClick={() => {
                setSearchInput(ch.rollNo);
                setSelectedChallan(ch);
                setPaymentSuccess(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono cursor-pointer transition-all ${
                selectedChallan?.id === ch.id
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {ch.rollNo} ({ch.status})
            </button>
          ))}
        </div>
      </div>

      {/* Selected Challan Details Card */}
      {selectedChallan ? (
        <div className="space-y-8">
          {/* Action Toolbar */}
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900 text-white p-4 rounded-2xl no-print">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${selectedChallan.status === 'Paid' ? 'bg-emerald-600' : 'bg-red-600'}`}>
                {selectedChallan.status === 'Paid' ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <span className="text-xs text-slate-400">Voucher No: <strong className="font-mono text-white">{selectedChallan.challanNo}</strong></span>
                <p className="text-sm font-bold text-white">
                  {selectedChallan.studentName} ({selectedChallan.rollNo}) • {selectedChallan.monthYear}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedChallan.status !== 'Paid' && (
                <button
                  onClick={() => {
                    setPaymentModalOpen(true);
                    setPaymentSuccess(false);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-amber-300" />
                  <span>Pay with EasyPaisa / JazzCash</span>
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-4 h-4 text-emerald-700" />
                <span>Print 3-Part Bank Challan</span>
              </button>
            </div>
          </div>

          {/* Quick Status Pill & Digital Breakdown on Screen */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 no-print">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Status</span>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                  selectedChallan.status === 'Paid'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {selectedChallan.status}
                </span>
                {selectedChallan.paymentMethod && (
                  <span className="text-xs text-slate-500 font-medium">via {selectedChallan.paymentMethod}</span>
                )}
              </div>
              {selectedChallan.transactionId && (
                <p className="text-[11px] font-mono text-slate-600">
                  TRX ID: {selectedChallan.transactionId}
                </p>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Due Date</span>
              <p className="text-lg font-bold text-slate-900">{selectedChallan.dueDate}</p>
              <p className="text-[11px] text-slate-500">Late fee of PKR {selectedChallan.breakdown.lateFee || 200} applies after due date.</p>
            </div>

            <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-sm space-y-1">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Total Payable Amount</span>
              <p className="text-2xl font-black font-mono">PKR {selectedChallan.totalAmount.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-200">After Due Date: PKR {selectedChallan.afterDueDateAmount.toLocaleString()}</p>
            </div>
          </div>

          {/* ============================================================== */}
          {/* OFFICIAL 3-PART BANK CHALLAN (Printable Layout) */}
          {/* Exactly mimics authentic school bank deposit slips */}
          {/* ============================================================== */}
          <div className="bg-white rounded-3xl border-2 border-slate-800 p-6 sm:p-8 shadow-xl print-card space-y-6">
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 no-print">
              <span className="text-xs font-bold text-slate-700 uppercase">
                Official 3-Part School Fee Voucher (Bank Copy + School Copy + Student Copy)
              </span>
              <span className="text-xs text-slate-500">Print ready for A4 horizontal paper</span>
            </div>

            {/* 3 Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-300 text-xs">
              {/* Copy 1: BANK COPY */}
              <div className="space-y-3 md:pr-4">
                <div className="text-center border-b border-slate-300 pb-2">
                  <span className="text-[10px] font-black bg-slate-900 text-white px-2 py-0.5 rounded uppercase">
                    Part 1: Bank Copy (بینک کاپی)
                  </span>
                  <h4 className="font-extrabold text-slate-950 text-xs mt-1">{db.settings.schoolName}</h4>
                  <p className="text-[10px] text-slate-600 font-mono">{db.settings.bankName}</p>
                  <p className="text-[10px] text-slate-500">A/C: {db.settings.accountNumber}</p>
                </div>

                <div className="space-y-1 text-[11px] bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Challan No:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedChallan.challanNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Due Date:</span>
                    <span className="font-bold text-red-700">{selectedChallan.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Month:</span>
                    <span className="font-semibold text-slate-900">{selectedChallan.monthYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student:</span>
                    <span className="font-bold text-slate-900">{selectedChallan.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Roll No:</span>
                    <span className="font-mono font-bold text-emerald-800">{selectedChallan.rollNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Class:</span>
                    <span className="text-slate-900">{selectedChallan.class}</span>
                  </div>
                </div>

                {/* Breakdown Table */}
                <table className="w-full text-[10px] border border-slate-200">
                  <tbody className="divide-y divide-slate-200">
                    <tr><td className="p-1 text-slate-600">Tuition Fee</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.tuitionFee}</td></tr>
                    {selectedChallan.breakdown.examFee ? <tr><td className="p-1 text-slate-600">Exam Fee</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.examFee}</td></tr> : null}
                    {selectedChallan.breakdown.labCharges ? <tr><td className="p-1 text-slate-600">Science/IT Lab</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.labCharges}</td></tr> : null}
                    {selectedChallan.breakdown.sportsFund ? <tr><td className="p-1 text-slate-600">Sports & Activity</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.sportsFund}</td></tr> : null}
                    {selectedChallan.breakdown.discount ? <tr className="text-emerald-700"><td className="p-1 font-semibold">Scholarship Discount</td><td className="p-1 text-right font-mono">-PKR {selectedChallan.breakdown.discount}</td></tr> : null}
                    <tr className="bg-slate-100 font-bold border-t border-slate-300">
                      <td className="p-1 text-slate-900">Total Payable</td>
                      <td className="p-1 text-right font-mono text-slate-950 font-black">PKR {selectedChallan.totalAmount}</td>
                    </tr>
                    <tr className="text-red-700 text-[9px]">
                      <td className="p-1">After Due Date</td>
                      <td className="p-1 text-right font-mono">PKR {selectedChallan.afterDueDateAmount}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="pt-8 flex justify-between items-end text-[10px] text-slate-500">
                  <div className="text-center">
                    <div className="w-20 border-b border-slate-400 mb-1"></div>
                    <span>Depositor Sign</span>
                  </div>
                  <div className="text-center">
                    <div className="w-20 border-b border-slate-400 mb-1"></div>
                    <span>Bank Cashier Stamp</span>
                  </div>
                </div>
              </div>

              {/* Copy 2: SCHOOL / ACCOUNTS COPY */}
              <div className="space-y-3 pt-4 md:pt-0 md:px-4">
                <div className="text-center border-b border-slate-300 pb-2">
                  <span className="text-[10px] font-black bg-emerald-900 text-white px-2 py-0.5 rounded uppercase">
                    Part 2: School Copy (اسکول کاپی)
                  </span>
                  <h4 className="font-extrabold text-slate-950 text-xs mt-1">{db.settings.schoolName}</h4>
                  <p className="text-[10px] text-slate-600 font-mono">{db.settings.bankName}</p>
                  <p className="text-[10px] text-slate-500">Accounts Record Voucher</p>
                </div>

                <div className="space-y-1 text-[11px] bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Challan No:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedChallan.challanNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Due Date:</span>
                    <span className="font-bold text-red-700">{selectedChallan.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Month:</span>
                    <span className="font-semibold text-slate-900">{selectedChallan.monthYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student:</span>
                    <span className="font-bold text-slate-900">{selectedChallan.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Roll No:</span>
                    <span className="font-mono font-bold text-emerald-800">{selectedChallan.rollNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Class:</span>
                    <span className="text-slate-900">{selectedChallan.class}</span>
                  </div>
                </div>

                <table className="w-full text-[10px] border border-slate-200">
                  <tbody className="divide-y divide-slate-200">
                    <tr><td className="p-1 text-slate-600">Tuition Fee</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.tuitionFee}</td></tr>
                    {selectedChallan.breakdown.examFee ? <tr><td className="p-1 text-slate-600">Exam Fee</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.examFee}</td></tr> : null}
                    {selectedChallan.breakdown.labCharges ? <tr><td className="p-1 text-slate-600">Science/IT Lab</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.labCharges}</td></tr> : null}
                    {selectedChallan.breakdown.sportsFund ? <tr><td className="p-1 text-slate-600">Sports & Activity</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.sportsFund}</td></tr> : null}
                    {selectedChallan.breakdown.discount ? <tr className="text-emerald-700"><td className="p-1 font-semibold">Scholarship Discount</td><td className="p-1 text-right font-mono">-PKR {selectedChallan.breakdown.discount}</td></tr> : null}
                    <tr className="bg-slate-100 font-bold border-t border-slate-300">
                      <td className="p-1 text-slate-900">Total Payable</td>
                      <td className="p-1 text-right font-mono text-slate-950 font-black">PKR {selectedChallan.totalAmount}</td>
                    </tr>
                    <tr className="text-red-700 text-[9px]">
                      <td className="p-1">After Due Date</td>
                      <td className="p-1 text-right font-mono">PKR {selectedChallan.afterDueDateAmount}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="pt-8 flex justify-between items-end text-[10px] text-slate-500">
                  <div className="text-center">
                    <div className="w-20 border-b border-slate-400 mb-1"></div>
                    <span>Accountant Sign</span>
                  </div>
                  <div className="text-center">
                    <div className="w-20 border-b border-slate-400 mb-1"></div>
                    <span>School Stamp</span>
                  </div>
                </div>
              </div>

              {/* Copy 3: STUDENT / PARENT COPY */}
              <div className="space-y-3 pt-4 md:pt-0 md:pl-4">
                <div className="text-center border-b border-slate-300 pb-2">
                  <span className="text-[10px] font-black bg-teal-800 text-white px-2 py-0.5 rounded uppercase">
                    Part 3: Student Copy (طالب علم کاپی)
                  </span>
                  <h4 className="font-extrabold text-slate-950 text-xs mt-1">{db.settings.schoolName}</h4>
                  <p className="text-[10px] text-slate-600 font-mono">Student Receipt</p>
                  <p className="text-[10px] text-slate-500">Keep safe for roll slip clearance</p>
                </div>

                <div className="space-y-1 text-[11px] bg-slate-50 p-2 rounded border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Challan No:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedChallan.challanNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Due Date:</span>
                    <span className="font-bold text-red-700">{selectedChallan.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Month:</span>
                    <span className="font-semibold text-slate-900">{selectedChallan.monthYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student:</span>
                    <span className="font-bold text-slate-900">{selectedChallan.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Roll No:</span>
                    <span className="font-mono font-bold text-emerald-800">{selectedChallan.rollNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Class:</span>
                    <span className="text-slate-900">{selectedChallan.class}</span>
                  </div>
                </div>

                <table className="w-full text-[10px] border border-slate-200">
                  <tbody className="divide-y divide-slate-200">
                    <tr><td className="p-1 text-slate-600">Tuition Fee</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.tuitionFee}</td></tr>
                    {selectedChallan.breakdown.examFee ? <tr><td className="p-1 text-slate-600">Exam Fee</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.examFee}</td></tr> : null}
                    {selectedChallan.breakdown.labCharges ? <tr><td className="p-1 text-slate-600">Science/IT Lab</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.labCharges}</td></tr> : null}
                    {selectedChallan.breakdown.sportsFund ? <tr><td className="p-1 text-slate-600">Sports & Activity</td><td className="p-1 text-right font-mono">PKR {selectedChallan.breakdown.sportsFund}</td></tr> : null}
                    {selectedChallan.breakdown.discount ? <tr className="text-emerald-700"><td className="p-1 font-semibold">Scholarship Discount</td><td className="p-1 text-right font-mono">-PKR {selectedChallan.breakdown.discount}</td></tr> : null}
                    <tr className="bg-slate-100 font-bold border-t border-slate-300">
                      <td className="p-1 text-slate-900">Total Payable</td>
                      <td className="p-1 text-right font-mono text-slate-950 font-black">PKR {selectedChallan.totalAmount}</td>
                    </tr>
                    <tr className="text-red-700 text-[9px]">
                      <td className="p-1">After Due Date</td>
                      <td className="p-1 text-right font-mono">PKR {selectedChallan.afterDueDateAmount}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="pt-8 flex justify-between items-end text-[10px] text-slate-500">
                  <div className="text-center">
                    <div className="w-20 border-b border-slate-400 mb-1"></div>
                    <span>Authorized Signature</span>
                  </div>
                  <div className="text-center">
                    <span className="font-mono text-[9px] block">||||||||||||||</span>
                    <span className="font-mono text-[8px]">{selectedChallan.challanNo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <CreditCard className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Challan Found for "{searchInput}"</h3>
          <p className="text-xs text-slate-500">
            Please verify student roll number or pick one from the quick test vouchers above.
          </p>
        </div>
      )}

      {/* ============================================================== */}
      {/* DIGITAL PAYMENT MODAL (EasyPaisa, JazzCash, Raast) */}
      {/* ============================================================== */}
      {paymentModalOpen && selectedChallan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-700/60 rounded-xl border border-emerald-500/30">
                  <Smartphone className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Online Fee Payment Gateway</h3>
                  <p className="text-xs text-emerald-200">
                    Challan: <span className="font-mono font-bold text-white">{selectedChallan.challanNo}</span> • Amount: <strong className="text-amber-300">PKR {selectedChallan.totalAmount}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="text-emerald-300 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {paymentSuccess ? (
              /* Payment Successful Receipt View */
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Fee Payment Recorded Successfully!</h4>
                <p className="text-xs text-slate-600">
                  Payment of <strong>PKR {selectedChallan.totalAmount}</strong> has been updated for student{' '}
                  <strong>{selectedChallan.studentName}</strong> ({selectedChallan.rollNo}).
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left space-y-1 font-mono">
                  <div className="flex justify-between"><span className="text-slate-500 font-sans">Payment Method:</span><span className="font-bold">{paymentMethod}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 font-sans">Transaction ID:</span><span className="text-emerald-800 font-bold">{transactionId || 'DIRECT-VERIFIED'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 font-sans">Date:</span><span>{new Date().toISOString().split('T')[0]}</span></div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setPaymentModalOpen(false);
                      window.print();
                    }}
                    className="flex-1 py-2.5 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Paid Receipt</span>
                  </button>
                  <button
                    onClick={() => setPaymentModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Payment Methods Form */
              <form onSubmit={handleDigitalPaySubmit} className="p-6 space-y-5">
                {/* Channel Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Digital Channel
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('EasyPaisa')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === 'EasyPaisa'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xs block font-bold text-emerald-800">EasyPaisa Till</span>
                      <span className="text-[10px] text-slate-500 font-mono">Till ID: {db.settings.easyPaisaTill}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('JazzCash')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === 'JazzCash'
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xs block font-bold text-amber-800">JazzCash Till</span>
                      <span className="text-[10px] text-slate-500 font-mono">Till ID: {db.settings.jazzCashTill}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Bank Transfer (Raast)')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === 'Bank Transfer (Raast)'
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xs block font-bold text-teal-800">Raast Instant</span>
                      <span className="text-[10px] text-slate-500 font-mono">{db.settings.raastId}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Cash at Counter')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === 'Cash at Counter'
                          ? 'border-slate-800 bg-slate-100 text-slate-900 font-bold shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xs block font-bold text-slate-800">Cash / Counter</span>
                      <span className="text-[10px] text-slate-500">School Accounts Office</span>
                    </button>
                  </div>
                </div>

                {/* Instructions Box depending on method */}
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs space-y-1.5">
                  <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    How to pay via {paymentMethod}:
                  </h5>
                  {paymentMethod === 'EasyPaisa' && (
                    <ol className="text-slate-600 space-y-1 list-decimal list-inside pl-1 text-[11px]">
                      <li>Open EasyPaisa App → Tap <strong>"Till Payment"</strong>.</li>
                      <li>Enter School Till ID: <strong className="font-mono text-emerald-800 font-bold">{db.settings.easyPaisaTill}</strong>.</li>
                      <li>Enter Amount: <strong className="font-mono">PKR {selectedChallan.totalAmount}</strong>.</li>
                      <li>Tap Pay Now and copy the 11-digit <strong>TRX ID</strong> from the SMS/Receipt.</li>
                    </ol>
                  )}
                  {paymentMethod === 'JazzCash' && (
                    <ol className="text-slate-600 space-y-1 list-decimal list-inside pl-1 text-[11px]">
                      <li>Open JazzCash App or dial <strong className="font-mono">*786#</strong>.</li>
                      <li>Select Till Payments → Enter Till: <strong className="font-mono text-amber-800 font-bold">{db.settings.jazzCashTill}</strong>.</li>
                      <li>Confirm Amount: <strong className="font-mono">PKR {selectedChallan.totalAmount}</strong> and enter MPIN.</li>
                      <li>Copy the <strong>Transaction ID (TID)</strong>.</li>
                    </ol>
                  )}
                  {paymentMethod === 'Bank Transfer (Raast)' && (
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <p>Transfer via any banking app through Raast Instant P2M:</p>
                      <p>Raast ID: <strong className="font-mono text-slate-900">{db.settings.raastId}</strong></p>
                      <p>Bank: <strong>{db.settings.bankName}</strong> (A/C: {db.settings.accountNumber})</p>
                    </div>
                  )}
                  {paymentMethod === 'Cash at Counter' && (
                    <p className="text-[11px] text-slate-600">
                      Submit cash directly at Al-Siraj Model High School accounts window and obtain a signed and stamped slip.
                    </p>
                  )}
                </div>

                {/* Input Fields */}
                {paymentMethod !== 'Cash at Counter' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Transaction ID (TRX ID / TID) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 88392019482 or TID91827"
                      value={transactionId}
                      onChange={e => setTransactionId(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-mono uppercase focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Depositor Name or Phone (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Father's phone 0300-1234567"
                    value={paymentNote}
                    onChange={e => setPaymentNote(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentModalOpen(false)}
                    className="flex-1 py-2.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Confirm & Record Payment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
