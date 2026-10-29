-- ============================================================
-- Al-Siraj Model High School Database Schema (PostgreSQL / MySQL)
-- السراج ماڈل ہائی اسکول مکمل ڈیٹا بیس اسکیما
-- For Supabase, Neon, Railway, or local PostgreSQL
-- ============================================================

-- 1. Students Table
CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(50) PRIMARY KEY,
    roll_no VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    father_name VARCHAR(150) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    section VARCHAR(50) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female')),
    dob DATE,
    b_form VARCHAR(50),
    phone VARCHAR(50),
    address TEXT,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'Active',
    monthly_fee NUMERIC(10, 2) DEFAULT 3000.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Online Admission Applications
CREATE TABLE IF NOT EXISTS admission_applications (
    id VARCHAR(50) PRIMARY KEY, -- e.g. ASM-ADM-2026-001
    applicant_name VARCHAR(150) NOT NULL,
    father_name VARCHAR(150) NOT NULL,
    father_cnic VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    dob DATE,
    gender VARCHAR(10),
    class_applied VARCHAR(50) NOT NULL,
    previous_school VARCHAR(200),
    previous_marks_percentage NUMERIC(5, 2),
    address TEXT,
    applied_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'Pending Review', -- Pending Review, Interview Scheduled, Approved, Enrolled, Rejected
    interview_date VARCHAR(100),
    assigned_roll_no VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Fee Challans Table
CREATE TABLE IF NOT EXISTS fee_challans (
    id VARCHAR(50) PRIMARY KEY,
    challan_no VARCHAR(50) UNIQUE NOT NULL, -- e.g. CH-2026-0501
    student_id VARCHAR(50) REFERENCES students(id) ON DELETE CASCADE,
    roll_no VARCHAR(50) NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    father_name VARCHAR(150) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    month_year VARCHAR(50) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    tuition_fee NUMERIC(10, 2) DEFAULT 0.00,
    exam_fee NUMERIC(10, 2) DEFAULT 0.00,
    lab_charges NUMERIC(10, 2) DEFAULT 0.00,
    sports_fund NUMERIC(10, 2) DEFAULT 0.00,
    late_fee NUMERIC(10, 2) DEFAULT 200.00,
    discount NUMERIC(10, 2) DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    after_due_date_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'Unpaid', -- Paid, Unpaid, Pending Verification
    payment_method VARCHAR(50), -- EasyPaisa, JazzCash, Bank Transfer (Raast), Cash at Counter
    payment_date DATE,
    transaction_id VARCHAR(100),
    receipt_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Result Detailed Marks Certificates (DMC)
CREATE TABLE IF NOT EXISTS results (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) REFERENCES students(id) ON DELETE CASCADE,
    roll_no VARCHAR(50) NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    father_name VARCHAR(150) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    section VARCHAR(50) NOT NULL,
    exam_type VARCHAR(100) NOT NULL, -- Annual Examination, Mid-Term, 1st Term
    session_year VARCHAR(50) NOT NULL,
    total_marks INT NOT NULL,
    obtained_marks INT NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    grade VARCHAR(5) NOT NULL,
    position VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Passed',
    remarks TEXT,
    attendance_percentage NUMERIC(5, 2),
    subjects_json JSONB, -- Subject-wise marks breakdown
    issued_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Notices & Announcements
CREATE TABLE IF NOT EXISTS notices (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    category VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    is_urgent BOOLEAN DEFAULT FALSE,
    author VARCHAR(100) DEFAULT 'Administration',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Teachers Directory
CREATE TABLE IF NOT EXISTS teachers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(50),
    qualification VARCHAR(200),
    assigned_class VARCHAR(100),
    assigned_subject VARCHAR(100),
    join_date DATE,
    status VARCHAR(20) DEFAULT 'Active'
);

-- 7. Homework & Classwork
CREATE TABLE IF NOT EXISTS homework (
    id VARCHAR(50) PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    teacher_name VARCHAR(150) NOT NULL,
    assigned_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);
