import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SchoolDatabase,
  Student,
  AdmissionApplication,
  ResultRecord,
  FeeChallan,
  Notice,
  Teacher,
  HomeworkItem
} from '../types/school';
import { initialSchoolData } from '../data/initialData';

interface UserSession {
  role: 'public' | 'teacher' | 'admin';
  name?: string;
  email?: string;
  assignedClass?: string;
}

interface SchoolContextType {
  db: SchoolDatabase;
  session: UserSession;
  loginAs: (role: 'teacher' | 'admin', name?: string, email?: string, assignedClass?: string) => void;
  logout: () => void;
  
  // Student actions
  addStudent: (student: Omit<Student, 'id'>) => Student;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  
  // Admission actions
  submitAdmission: (data: Omit<AdmissionApplication, 'id' | 'appliedDate' | 'status'>) => AdmissionApplication;
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status'], notes?: string, assignedRollNo?: string) => void;
  
  // Fee actions
  payFeeChallan: (challanNo: string, paymentMethod: FeeChallan['paymentMethod'], transactionId: string, receiptNote?: string) => boolean;
  verifyFeePayment: (challanId: string, isApproved: boolean) => void;
  generateChallan: (challan: Omit<FeeChallan, 'id'>) => FeeChallan;
  
  // Result actions
  saveResult: (result: ResultRecord) => void;
  deleteResult: (id: string) => void;
  
  // Notice actions
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  deleteNotice: (id: string) => void;

  // Teacher actions
  addHomework: (hw: Omit<HomeworkItem, 'id' | 'assignedDate'>) => void;
  deleteHomework: (id: string) => void;

  // Database tools
  exportDatabase: () => void;
  importDatabase: (jsonData: string) => boolean;
  resetToDefault: () => void;
}

const STORAGE_KEY = 'al_siraj_school_database_v1';
const SESSION_KEY = 'al_siraj_user_session_v1';

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db, setDb] = useState<SchoolDatabase>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load database from localStorage', e);
    }
    return initialSchoolData;
  });

  const [session, setSession] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { role: 'public' };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (e) {
      console.error('Failed to persist database to localStorage', e);
    }
  }, [db]);

  useEffect(() => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      // ignore
    }
  }, [session]);

  const loginAs = (role: 'teacher' | 'admin', name?: string, email?: string, assignedClass?: string) => {
    const newSession: UserSession = {
      role,
      name: name || (role === 'admin' ? 'Principal Administrator' : 'Engr. Salman Farooq'),
      email: email || (role === 'admin' ? 'admin@alsiraj.edu' : 'teacher@alsiraj.edu'),
      assignedClass: assignedClass || (role === 'teacher' ? 'Class 10th' : undefined)
    };
    setSession(newSession);
  };

  const logout = () => {
    setSession({ role: 'public' });
  };

  const addStudent = (studentData: Omit<Student, 'id'>): Student => {
    const newStudent: Student = {
      ...studentData,
      id: `std-${Date.now()}`
    };
    setDb(prev => ({
      ...prev,
      students: [newStudent, ...prev.students]
    }));
    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setDb(prev => ({
      ...prev,
      students: prev.students.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const deleteStudent = (id: string) => {
    setDb(prev => ({
      ...prev,
      students: prev.students.filter(s => s.id !== id)
    }));
  };

  const submitAdmission = (data: Omit<AdmissionApplication, 'id' | 'appliedDate' | 'status'>): AdmissionApplication => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newApp: AdmissionApplication = {
      ...data,
      id: `ASM-ADM-2026-${randomSuffix}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending Review'
    };
    setDb(prev => ({
      ...prev,
      admissions: [newApp, ...prev.admissions]
    }));
    return newApp;
  };

  const updateAdmissionStatus = (
    id: string,
    status: AdmissionApplication['status'],
    notes?: string,
    assignedRollNo?: string
  ) => {
    setDb(prev => {
      const app = prev.admissions.find(a => a.id === id);
      let updatedStudents = [...prev.students];

      // If approved or enrolled and assigned a roll number, optionally create student record if not existing
      if ((status === 'Approved' || status === 'Enrolled') && assignedRollNo && app) {
        const exists = prev.students.some(s => s.rollNo === assignedRollNo);
        if (!exists) {
          const newStd: Student = {
            id: `std-${Date.now()}`,
            rollNo: assignedRollNo,
            name: app.applicantName,
            fatherName: app.fatherName,
            class: app.classApplied,
            section: 'Section A',
            gender: app.gender,
            dob: app.dob,
            bForm: app.fatherCnic,
            phone: app.phone,
            address: app.address,
            enrollmentDate: new Date().toISOString().split('T')[0],
            status: 'Active',
            monthlyFee: 3200
          };
          updatedStudents = [newStd, ...updatedStudents];
        }
      }

      return {
        ...prev,
        students: updatedStudents,
        admissions: prev.admissions.map(a =>
          a.id === id
            ? { ...a, status, notes: notes || a.notes, assignedRollNo: assignedRollNo || a.assignedRollNo }
            : a
        )
      };
    });
  };

  const payFeeChallan = (
    challanNo: string,
    paymentMethod: FeeChallan['paymentMethod'],
    transactionId: string,
    receiptNote?: string
  ): boolean => {
    let found = false;
    setDb(prev => ({
      ...prev,
      feeChallans: prev.feeChallans.map(ch => {
        if (ch.challanNo.toLowerCase() === challanNo.trim().toLowerCase() || ch.rollNo.toLowerCase() === challanNo.trim().toLowerCase()) {
          found = true;
          return {
            ...ch,
            status: 'Paid',
            paymentMethod,
            transactionId,
            receiptNote: receiptNote || `Paid via ${paymentMethod}`,
            paymentDate: new Date().toISOString().split('T')[0]
          };
        }
        return ch;
      })
    }));
    return found;
  };

  const verifyFeePayment = (challanId: string, isApproved: boolean) => {
    setDb(prev => ({
      ...prev,
      feeChallans: prev.feeChallans.map(ch => {
        if (ch.id === challanId) {
          return {
            ...ch,
            status: isApproved ? 'Paid' : 'Unpaid'
          };
        }
        return ch;
      })
    }));
  };

  const generateChallan = (challan: Omit<FeeChallan, 'id'>): FeeChallan => {
    const newChallan: FeeChallan = {
      ...challan,
      id: `fee-${Date.now()}`
    };
    setDb(prev => ({
      ...prev,
      feeChallans: [newChallan, ...prev.feeChallans]
    }));
    return newChallan;
  };

  const saveResult = (result: ResultRecord) => {
    setDb(prev => {
      const existingIndex = prev.results.findIndex(r => r.id === result.id || (r.rollNo === result.rollNo && r.examType === result.examType));
      if (existingIndex >= 0) {
        const updated = [...prev.results];
        updated[existingIndex] = result;
        return { ...prev, results: updated };
      }
      return {
        ...prev,
        results: [result, ...prev.results]
      };
    });
  };

  const deleteResult = (id: string) => {
    setDb(prev => ({
      ...prev,
      results: prev.results.filter(r => r.id !== id)
    }));
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...notice,
      id: `not-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setDb(prev => ({
      ...prev,
      notices: [newNotice, ...prev.notices]
    }));
  };

  const deleteNotice = (id: string) => {
    setDb(prev => ({
      ...prev,
      notices: prev.notices.filter(n => n.id !== id)
    }));
  };

  const addHomework = (hw: Omit<HomeworkItem, 'id' | 'assignedDate'>) => {
    const newHw: HomeworkItem = {
      ...hw,
      id: `hw-${Date.now()}`,
      assignedDate: new Date().toISOString().split('T')[0]
    };
    setDb(prev => ({
      ...prev,
      homework: [newHw, ...prev.homework]
    }));
  };

  const deleteHomework = (id: string) => {
    setDb(prev => ({
      ...prev,
      homework: prev.homework.filter(h => h.id !== id)
    }));
  };

  const exportDatabase = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `al_siraj_school_database_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDatabase = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed && parsed.students && parsed.settings) {
        setDb(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import', e);
    }
    return false;
  };

  const resetToDefault = () => {
    setDb(initialSchoolData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SchoolContext.Provider
      value={{
        db,
        session,
        loginAs,
        logout,
        addStudent,
        updateStudent,
        deleteStudent,
        submitAdmission,
        updateAdmissionStatus,
        payFeeChallan,
        verifyFeePayment,
        generateChallan,
        saveResult,
        deleteResult,
        addNotice,
        deleteNotice,
        addHomework,
        deleteHomework,
        exportDatabase,
        importDatabase,
        resetToDefault
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
