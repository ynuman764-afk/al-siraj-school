export interface Student {
  id: string;
  rollNo: string;
  name: string;
  fatherName: string;
  class: string;
  section: string;
  gender: 'Male' | 'Female';
  dob: string;
  bForm: string;
  phone: string;
  address: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'Alumni';
  monthlyFee: number;
  avatar?: string;
}

export interface AdmissionApplication {
  id: string; // e.g. ASM-ADM-2026-001
  applicantName: string;
  fatherName: string;
  fatherCnic: string;
  phone: string;
  email: string;
  dob: string;
  gender: 'Male' | 'Female';
  classApplied: string;
  previousSchool: string;
  previousMarksPercentage: number;
  address: string;
  appliedDate: string;
  status: 'Pending Review' | 'Interview Scheduled' | 'Approved' | 'Enrolled' | 'Rejected';
  interviewDate?: string;
  assignedRollNo?: string;
  notes?: string;
}

export interface SubjectResult {
  subjectName: string;
  totalMarks: number;
  passingMarks: number;
  obtainedMarks: number;
  grade: string;
  remarks: string;
}

export interface ResultRecord {
  id: string;
  studentId: string;
  rollNo: string;
  studentName: string;
  fatherName: string;
  class: string;
  section: string;
  examType: 'Annual Examination 2026' | 'Mid-Term Examination 2026' | 'First Term Assessment 2025';
  session: string;
  subjects: SubjectResult[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string; // A+, A, B, C, D, F
  position: string;
  status: 'Passed' | 'Supplementary' | 'Failed';
  remarks: string;
  attendancePercentage: number;
  issuedDate: string;
}

export interface FeeBreakdown {
  tuitionFee: number;
  examFee?: number;
  labCharges?: number;
  sportsFund?: number;
  lateFee?: number;
  discount?: number;
}

export interface FeeChallan {
  id: string;
  challanNo: string; // e.g. CH-2026-0481
  studentId: string;
  rollNo: string;
  studentName: string;
  fatherName: string;
  class: string;
  monthYear: string; // e.g. "May 2026"
  issueDate: string;
  dueDate: string;
  breakdown: FeeBreakdown;
  totalAmount: number;
  afterDueDateAmount: number;
  status: 'Paid' | 'Unpaid' | 'Pending Verification';
  paymentMethod?: 'EasyPaisa' | 'JazzCash' | 'Bank Transfer (Raast)' | 'Cash at Counter';
  paymentDate?: string;
  transactionId?: string;
  receiptNote?: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Exams' | 'Admissions' | 'Holidays' | 'Events' | 'Urgent';
  content: string;
  isUrgent?: boolean;
  author: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  assignedClass: string;
  assignedSubject: string;
  joinDate: string;
  status: 'Active' | 'On Leave';
}

export interface HomeworkItem {
  id: string;
  class: string;
  subject: string;
  teacherName: string;
  assignedDate: string;
  dueDate: string;
  title: string;
  description: string;
}

export interface SchoolDatabase {
  students: Student[];
  admissions: AdmissionApplication[];
  results: ResultRecord[];
  feeChallans: FeeChallan[];
  notices: Notice[];
  teachers: Teacher[];
  homework: HomeworkItem[];
  settings: {
    schoolName: string;
    schoolUrduName: string;
    tagline: string;
    taglineUrdu: string;
    regNo: string;
    affiliation: string;
    address: string;
    phone: string;
    phoneAlt: string;
    email: string;
    website: string;
    principalName: string;
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    raastId: string;
    easyPaisaTill: string;
    jazzCashTill: string;
  };
}
