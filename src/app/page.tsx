'use client';

import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  GraduationCap,
  BookOpen,
  Calendar as CalendarIcon,
  Megaphone,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  School,
  Sparkles,
  ExternalLink,
  ClipboardList,
  Award,
  BookMarked,
  X,
  Check,
  Share2,
  Download,
  Eye,
  EyeOff,
  Trash2,
  Edit3,
  Mail,
  SlidersHorizontal,
  UserCheck2,
  UserPlus,
  Key,
  Lock,
  Unlock,
  Shield,
  Briefcase,
  FileCheck,
  LogIn,
  Save
} from 'lucide-react';
import {
  INITIAL_CLASSES,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_SUBJECTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_EXAMS,
  INITIAL_PRINCIPALS,
  INITIAL_CURRICULUM_HEADS,
  DEFAULT_ADMIN_ACCOUNT,
  ACADEMIC_CALENDAR,
  RECENT_ACTIVITIES,
  NOTIFICATIONS,
  SchoolClass,
  Teacher,
  Student,
  Subject,
  Assignment,
  Exam,
  Principal,
  CurriculumHead,
  AcademicEvent,
  RecentActivity,
  SchoolNotification
} from '../lib/data';

export type UserRole = 'Administrator' | 'Kepala Sekolah' | 'Kurikulum' | 'Guru' | 'Siswa';

export type TabType =
  | 'dashboard'
  | 'classes'
  | 'students'
  | 'teachers'
  | 'principals'
  | 'curriculum'
  | 'subjects'
  | 'calendar'
  | 'announcements';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('Administrator');

  // User Session & Authentication
  const [currentUser, setCurrentUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: UserRole;
    avatar: string;
    jobDesk?: string;
    meta?: string;
  } | null>(DEFAULT_ADMIN_ACCOUNT);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Interactive Data States (Fully connected to input totals)
  const [classesList, setClassesList] = useState<SchoolClass[]>(INITIAL_CLASSES);
  const [teachersList, setTeachersList] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [studentsList, setStudentsList] = useState<Student[]>(INITIAL_STUDENTS);
  const [principalsList, setPrincipalsList] = useState<Principal[]>(INITIAL_PRINCIPALS);
  const [curriculumList, setCurriculumList] = useState<CurriculumHead[]>(INITIAL_CURRICULUM_HEADS);
  const [subjectsList, setSubjectsList] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [assignmentsList, setAssignmentsList] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [examsList, setExamsList] = useState<Exam[]>(INITIAL_EXAMS);
  const [calendarEvents, setCalendarEvents] = useState<AcademicEvent[]>(ACADEMIC_CALENDAR);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(RECENT_ACTIVITIES);
  const [notificationsList, setNotificationsList] = useState<SchoolNotification[]>(NOTIFICATIONS);

  // Quick Password Change Modal (for Admin to easily reset passwords)
  const [passwordModalUser, setPasswordModalUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: string;
    type: 'student' | 'teacher' | 'principal' | 'curriculum';
    currentPassword?: string;
  } | null>(null);
  const [newModalPassword, setNewModalPassword] = useState('');
  const [showModalPassword, setShowModalPassword] = useState(false);

  // Edit Student Modal States
  const [selectedEditStudent, setSelectedEditStudent] = useState<Student | null>(null);
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentNisn, setEditStudentNisn] = useState('');
  const [editStudentClass, setEditStudentClass] = useState('');
  const [editStudentGender, setEditStudentGender] = useState<'L' | 'P'>('L');
  const [editStudentEmail, setEditStudentEmail] = useState('');
  const [editStudentPassword, setEditStudentPassword] = useState('');
  const [showEditStudentPass, setShowEditStudentPass] = useState(false);

  // Edit Teacher Modal States
  const [selectedEditTeacher, setSelectedEditTeacher] = useState<Teacher | null>(null);
  const [editTeacherName, setEditTeacherName] = useState('');
  const [editTeacherNip, setEditTeacherNip] = useState('');
  const [editTeacherSubject, setEditTeacherSubject] = useState('');
  const [editTeacherGender, setEditTeacherGender] = useState<'L' | 'P'>('L');
  const [editTeacherEmail, setEditTeacherEmail] = useState('');
  const [editTeacherPassword, setEditTeacherPassword] = useState('');
  const [showEditTeacherPass, setShowEditTeacherPass] = useState(false);

  // Kepala Sekolah Modals (Tambah & Edit)
  const [isAddPrincipalOpen, setIsAddPrincipalOpen] = useState(false);
  const [newPrincipalName, setNewPrincipalName] = useState('');
  const [newPrincipalNip, setNewPrincipalNip] = useState('');
  const [newPrincipalEmail, setNewPrincipalEmail] = useState('');
  const [newPrincipalPassword, setNewPrincipalPassword] = useState('kepsek123');
  const [newPrincipalPeriod, setNewPrincipalPeriod] = useState('2024 - 2028');
  const [newPrincipalGender, setNewPrincipalGender] = useState<'L' | 'P'>('L');
  const [newPrincipalJobDesk, setNewPrincipalJobDesk] = useState('Penanggung Jawab Mutu Pendidikan, Supervisi Manajerial, Pengesahan Kebijakan Sekolah & Hubungan DUDI');

  const [selectedEditPrincipal, setSelectedEditPrincipal] = useState<Principal | null>(null);
  const [editPrincipalName, setEditPrincipalName] = useState('');
  const [editPrincipalNip, setEditPrincipalNip] = useState('');
  const [editPrincipalEmail, setEditPrincipalEmail] = useState('');
  const [editPrincipalPassword, setEditPrincipalPassword] = useState('');
  const [editPrincipalPeriod, setEditPrincipalPeriod] = useState('');
  const [editPrincipalGender, setEditPrincipalGender] = useState<'L' | 'P'>('L');
  const [editPrincipalJobDesk, setEditPrincipalJobDesk] = useState('');
  const [showEditPrincipalPass, setShowEditPrincipalPass] = useState(false);

  // Kurikulum Modals (Tambah & Edit)
  const [isAddCurriculumOpen, setIsAddCurriculumOpen] = useState(false);
  const [newCurriculumName, setNewCurriculumName] = useState('');
  const [newCurriculumNip, setNewCurriculumNip] = useState('');
  const [newCurriculumEmail, setNewCurriculumEmail] = useState('');
  const [newCurriculumPassword, setNewCurriculumPassword] = useState('kurikulum123');
  const [newCurriculumPosition, setNewCurriculumPosition] = useState('Wakil Kepala Sekolah Bidang Kurikulum');
  const [newCurriculumGender, setNewCurriculumGender] = useState<'L' | 'P'>('L');
  const [newCurriculumJobDesk, setNewCurriculumJobDesk] = useState('Penyusunan Struktur Kurikulum Merdeka, Pembagian Beban JP Mengajar, Asesmen & Ujian UKK');

  const [selectedEditCurriculum, setSelectedEditCurriculum] = useState<CurriculumHead | null>(null);
  const [editCurriculumName, setEditCurriculumName] = useState('');
  const [editCurriculumNip, setEditCurriculumNip] = useState('');
  const [editCurriculumEmail, setEditCurriculumEmail] = useState('');
  const [editCurriculumPassword, setEditCurriculumPassword] = useState('');
  const [editCurriculumPosition, setEditCurriculumPosition] = useState('');
  const [editCurriculumGender, setEditCurriculumGender] = useState<'L' | 'P'>('L');
  const [editCurriculumJobDesk, setEditCurriculumJobDesk] = useState('');
  const [showEditCurriculumPass, setShowEditCurriculumPass] = useState(false);

  // Calendar Event Modal States
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDay, setNewEventDay] = useState('20');
  const [newEventMonth, setNewEventMonth] = useState('Des');
  const [newEventTime, setNewEventTime] = useState('08:00 - 12:00 WIB');
  const [newEventLocation, setNewEventLocation] = useState('Aula Utama SMK');
  const [selectedEvent, setSelectedEvent] = useState<AcademicEvent | null>(null);

  // Dashboard Interactive Filters
  const [calendarCategoryFilter, setCalendarCategoryFilter] = useState<string>('Semua');
  const [activityCategoryFilter, setActivityCategoryFilter] = useState<string>('Semua');
  const [notificationCategoryFilter, setNotificationCategoryFilter] = useState<string>('Semua');
  const [quickLogInput, setQuickLogInput] = useState<string>('');

  // Filter States
  const [classFilterMajor, setClassFilterMajor] = useState<string>('ALL');
  const [classFilterGrade, setClassFilterGrade] = useState<string>('ALL');
  const [studentGenderFilter, setStudentGenderFilter] = useState<string>('ALL');
  const [teacherGenderFilter, setTeacherGenderFilter] = useState<string>('ALL');

  // Class Selection & Edit Mode
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [editClassCapacity, setEditClassCapacity] = useState<number>(36);
  const [editClassHomeroom, setEditClassHomeroom] = useState<string>('');
  const [enrolledStudentIds, setEnrolledStudentIds] = useState<number[]>([]);
  const [studentSearchInClass, setStudentSearchInClass] = useState<string>('');

  // Modals for Tambah Kelas
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassMajor, setNewClassMajor] = useState('PPLG');
  const [newClassGrade, setNewClassGrade] = useState(10);
  const [newClassHomeroom, setNewClassHomeroom] = useState('Dewi Lestari, S.Kom');

  // Modals for Tambah Siswa (Nama Lengkap, NISN, Kelas, Gender, Email, Password)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentNisn, setNewStudentNisn] = useState('');
  const [newStudentClass, setNewStudentClass] = useState('12 PPLG 2');
  const [newStudentGender, setNewStudentGender] = useState<'L' | 'P'>('L');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentPassword, setNewStudentPassword] = useState('siswa123');

  // Modals for Tambah Guru (Nama Lengkap, NIP, Mata Pelajaran, Gender, Email, Password)
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherNip, setNewTeacherNip] = useState('');
  const [newTeacherSubject, setNewTeacherSubject] = useState('');
  const [newTeacherGender, setNewTeacherGender] = useState<'L' | 'P'>('L');
  const [newTeacherEmail, setNewTeacherEmail] = useState('');
  const [newTeacherPassword, setNewTeacherPassword] = useState('guru123');

  // Modals for Tambah Tugas & Ujian (Updates totals and school activity chart)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('Pemrograman Web');
  const [newTaskClass, setNewTaskClass] = useState('12 PPLG 2');
  const [newTaskMonth, setNewTaskMonth] = useState('Des');

  const [isAddExamOpen, setIsAddExamOpen] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamSubject, setNewExamSubject] = useState('Basis Data');
  const [newExamClass, setNewExamClass] = useState('12 PPLG 2');
  const [newExamMonth, setNewExamMonth] = useState('Des');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Helper to get real student count enrolled in a specific class
  const getStudentCountByClass = (className: string) => {
    return studentsList.filter((s) => s.className === className).length;
  };

  // Helper to add dynamic activity log
  const addRecentActivity = (
    user: string,
    action: string,
    type: 'upload' | 'submission' | 'schedule' | 'download' | 'announcement'
  ) => {
    const newAct: RecentActivity = {
      id: Date.now(),
      user,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      action,
      time: 'Baru saja',
      type,
    };
    setRecentActivities((prev) => [newAct, ...prev]);
  };

  // Helper to add dynamic notification
  const addSchoolNotification = (
    title: string,
    type: 'assignment' | 'warning' | 'user' | 'calendar'
  ) => {
    const newNotif: SchoolNotification = {
      id: Date.now(),
      title,
      time: 'Baru saja',
      type,
      read: false,
    };
    setNotificationsList((prev) => [newNotif, ...prev]);
  };

  // Tab switcher with transition animation
  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 120);
  };

  // Dynamic School Activity Chart Data directly connected to user input tasks and exams
  const dynamicChartData = useMemo(() => {
    const months = ['Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    return months.map((month) => {
      const tugasCount = assignmentsList.filter((a) => a.month === month).length;
      const ujianCount = examsList.filter((e) => e.month === month).length;
      return {
        month,
        tugas: tugasCount,
        ujian: ujianCount,
      };
    });
  }, [assignmentsList, examsList]);

  const maxActivityValue = useMemo(() => {
    let max = 1;
    dynamicChartData.forEach((d) => {
      if (d.tugas > max) max = d.tugas;
      if (d.ujian > max) max = d.ujian;
    });
    return max;
  }, [dynamicChartData]);

  // Filtered classes
  const filteredClasses = useMemo(() => {
    return classesList.filter((c) => {
      const matchMajor = classFilterMajor === 'ALL' || c.major === classFilterMajor;
      const matchGrade = classFilterGrade === 'ALL' || c.grade.toString() === classFilterGrade;
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.homeroomTeacher.toLowerCase().includes(searchQuery.toLowerCase());
      return matchMajor && matchGrade && matchSearch;
    });
  }, [classesList, classFilterMajor, classFilterGrade, searchQuery]);

  // Filtered students with search and gender
  const filteredStudents = useMemo(() => {
    return studentsList.filter((s) => {
      const matchGender = studentGenderFilter === 'ALL' || s.gender === studentGenderFilter;
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nisn.includes(searchQuery);
      return matchGender && matchSearch;
    });
  }, [studentsList, searchQuery, studentGenderFilter]);

  // Filtered teachers with search and gender
  const filteredTeachers = useMemo(() => {
    return teachersList.filter((t) => {
      const matchGender = teacherGenderFilter === 'ALL' || t.gender === teacherGenderFilter;
      const matchSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.nip.includes(searchQuery);
      return matchGender && matchSearch;
    });
  }, [teachersList, searchQuery, teacherGenderFilter]);

  // Filtered principals with search
  const filteredPrincipals = useMemo(() => {
    return principalsList.filter((p) => {
      return (
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nip.includes(searchQuery) ||
        p.period.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [principalsList, searchQuery]);

  // Filtered curriculum with search
  const filteredCurriculum = useMemo(() => {
    return curriculumList.filter((c) => {
      return (
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.nip.includes(searchQuery) ||
        c.position.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [curriculumList, searchQuery]);

  // Handle Edit Student
  const handleOpenEditStudent = (s: Student) => {
    setSelectedEditStudent(s);
    setEditStudentName(s.name);
    setEditStudentNisn(s.nisn);
    setEditStudentClass(s.className);
    setEditStudentGender(s.gender);
    setEditStudentEmail(s.email);
    setEditStudentPassword(s.password || 'siswa123');
    setShowEditStudentPass(false);
  };

  const handleSaveEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditStudent) return;
    setStudentsList((prev) =>
      prev.map((s) =>
        s.id === selectedEditStudent.id
          ? {
              ...s,
              name: editStudentName,
              nisn: editStudentNisn,
              className: editStudentClass,
              gender: editStudentGender,
              email: editStudentEmail,
              password: editStudentPassword,
            }
          : s
      )
    );
    addRecentActivity('Admin Fabian', `Memperbarui akun siswa ${editStudentName}`, 'upload');
    showToast(`Data siswa ${editStudentName} & kredensial berhasil diperbarui.`);
    setSelectedEditStudent(null);
  };

  // Handle Edit Teacher
  const handleOpenEditTeacher = (t: Teacher) => {
    setSelectedEditTeacher(t);
    setEditTeacherName(t.name);
    setEditTeacherNip(t.nip);
    setEditTeacherSubject(t.subject);
    setEditTeacherGender(t.gender);
    setEditTeacherEmail(t.email);
    setEditTeacherPassword(t.password || 'guru123');
    setShowEditTeacherPass(false);
  };

  const handleSaveEditTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditTeacher) return;
    setTeachersList((prev) =>
      prev.map((t) =>
        t.id === selectedEditTeacher.id
          ? {
              ...t,
              name: editTeacherName,
              nip: editTeacherNip,
              subject: editTeacherSubject,
              gender: editTeacherGender,
              email: editTeacherEmail,
              password: editTeacherPassword,
            }
          : t
      )
    );
    addRecentActivity('Admin Fabian', `Memperbarui akun guru ${editTeacherName}`, 'upload');
    showToast(`Data guru ${editTeacherName} & kredensial berhasil diperbarui.`);
    setSelectedEditTeacher(null);
  };

  // Handle Edit Principal
  const handleOpenEditPrincipal = (p: Principal) => {
    setSelectedEditPrincipal(p);
    setEditPrincipalName(p.name);
    setEditPrincipalNip(p.nip);
    setEditPrincipalEmail(p.email);
    setEditPrincipalPassword(p.password || 'kepsek123');
    setEditPrincipalPeriod(p.period);
    setEditPrincipalGender(p.gender);
    setEditPrincipalJobDesk(p.jobDesk);
    setShowEditPrincipalPass(false);
  };

  const handleSaveEditPrincipal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditPrincipal) return;
    setPrincipalsList((prev) =>
      prev.map((p) =>
        p.id === selectedEditPrincipal.id
          ? {
              ...p,
              name: editPrincipalName,
              nip: editPrincipalNip,
              email: editPrincipalEmail,
              password: editPrincipalPassword,
              period: editPrincipalPeriod,
              gender: editPrincipalGender,
              jobDesk: editPrincipalJobDesk,
            }
          : p
      )
    );
    addRecentActivity('Admin Fabian', `Memperbarui akun Kepala Sekolah ${editPrincipalName}`, 'upload');
    showToast(`Data Kepala Sekolah ${editPrincipalName} berhasil disimpan.`);
    setSelectedEditPrincipal(null);
  };

  const handleDeletePrincipal = (id: number, name: string) => {
    setPrincipalsList((prev) => prev.filter((p) => p.id !== id));
    showToast(`Data Kepala Sekolah ${name} berhasil dihapus.`);
  };

  // Handle Edit Curriculum
  const handleOpenEditCurriculum = (c: CurriculumHead) => {
    setSelectedEditCurriculum(c);
    setEditCurriculumName(c.name);
    setEditCurriculumNip(c.nip);
    setEditCurriculumEmail(c.email);
    setEditCurriculumPassword(c.password || 'kurikulum123');
    setEditCurriculumPosition(c.position);
    setEditCurriculumGender(c.gender);
    setEditCurriculumJobDesk(c.jobDesk);
    setShowEditCurriculumPass(false);
  };

  const handleSaveEditCurriculum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditCurriculum) return;
    setCurriculumList((prev) =>
      prev.map((c) =>
        c.id === selectedEditCurriculum.id
          ? {
              ...c,
              name: editCurriculumName,
              nip: editCurriculumNip,
              email: editCurriculumEmail,
              password: editCurriculumPassword,
              position: editCurriculumPosition,
              gender: editCurriculumGender,
              jobDesk: editCurriculumJobDesk,
            }
          : c
      )
    );
    addRecentActivity('Admin Fabian', `Memperbarui akun Kurikulum ${editCurriculumName}`, 'upload');
    showToast(`Data Tim Kurikulum ${editCurriculumName} berhasil disimpan.`);
    setSelectedEditCurriculum(null);
  };

  const handleDeleteCurriculum = (id: number, name: string) => {
    setCurriculumList((prev) => prev.filter((c) => c.id !== id));
    showToast(`Data Tim Kurikulum ${name} berhasil dihapus.`);
  };

  // Quick Password Reset Modal
  const handleOpenPasswordModal = (
    id: number,
    name: string,
    email: string,
    type: 'student' | 'teacher' | 'principal' | 'curriculum',
    currentPassword?: string
  ) => {
    const roleMap = {
      student: 'Siswa',
      teacher: 'Guru',
      principal: 'Kepala Sekolah',
      curriculum: 'Kurikulum',
    };
    setPasswordModalUser({
      id,
      name,
      email,
      role: roleMap[type],
      type,
      currentPassword: currentPassword || '123456',
    });
    setNewModalPassword(currentPassword || '');
    setShowModalPassword(false);
  };

  const handleSavePasswordModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordModalUser) return;
    if (!newModalPassword.trim()) {
      showToast('Password baru tidak boleh kosong!');
      return;
    }

    if (passwordModalUser.type === 'student') {
      setStudentsList((prev) =>
        prev.map((s) => (s.id === passwordModalUser.id ? { ...s, password: newModalPassword } : s))
      );
    } else if (passwordModalUser.type === 'teacher') {
      setTeachersList((prev) =>
        prev.map((t) => (t.id === passwordModalUser.id ? { ...t, password: newModalPassword } : t))
      );
    } else if (passwordModalUser.type === 'principal') {
      setPrincipalsList((prev) =>
        prev.map((p) => (p.id === passwordModalUser.id ? { ...p, password: newModalPassword } : p))
      );
    } else if (passwordModalUser.type === 'curriculum') {
      setCurriculumList((prev) =>
        prev.map((c) => (c.id === passwordModalUser.id ? { ...c, password: newModalPassword } : c))
      );
    }

    addRecentActivity(
      'Admin Fabian',
      `Mereset password akun ${passwordModalUser.role}: ${passwordModalUser.name}`,
      'upload'
    );
    showToast(`Password untuk ${passwordModalUser.name} berhasil diperbarui menjadi "${newModalPassword}".`);
    setPasswordModalUser(null);
  };

  // Authentication Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const emailClean = loginEmail.trim().toLowerCase();
    const passClean = loginPassword.trim();

    if (!emailClean || !passClean) {
      setLoginError('Harap isi email dan password.');
      return;
    }

    // 1. Check Admin
    if (
      (emailClean === DEFAULT_ADMIN_ACCOUNT.email.toLowerCase() || emailClean === 'admin') &&
      (passClean === DEFAULT_ADMIN_ACCOUNT.password || passClean === 'admin123')
    ) {
      setCurrentUser(DEFAULT_ADMIN_ACCOUNT);
      setUserRole('Administrator');
      setActiveTab('dashboard');
      showToast('Selamat datang kembali, Administrator!');
      return;
    }

    // 2. Check Kepala Sekolah
    const matchedPrincipal = principalsList.find(
      (p) => p.email.toLowerCase() === emailClean && (p.password || 'kepsek123') === passClean
    );
    if (matchedPrincipal) {
      const u = {
        id: matchedPrincipal.id,
        name: matchedPrincipal.name,
        email: matchedPrincipal.email,
        role: 'Kepala Sekolah' as UserRole,
        avatar: matchedPrincipal.avatar,
        jobDesk: matchedPrincipal.jobDesk,
        meta: matchedPrincipal.nip,
      };
      setCurrentUser(u);
      setUserRole('Kepala Sekolah');
      setActiveTab('dashboard');
      showToast(`Login berhasil! Selamat datang, ${matchedPrincipal.name}`);
      return;
    }

    // 3. Check Kurikulum
    const matchedCurriculum = curriculumList.find(
      (c) => c.email.toLowerCase() === emailClean && (c.password || 'kurikulum123') === passClean
    );
    if (matchedCurriculum) {
      const u = {
        id: matchedCurriculum.id,
        name: matchedCurriculum.name,
        email: matchedCurriculum.email,
        role: 'Kurikulum' as UserRole,
        avatar: matchedCurriculum.avatar,
        jobDesk: matchedCurriculum.jobDesk,
        meta: matchedCurriculum.position,
      };
      setCurrentUser(u);
      setUserRole('Kurikulum');
      setActiveTab('dashboard');
      showToast(`Login berhasil! Selamat datang, ${matchedCurriculum.name}`);
      return;
    }

    // 4. Check Guru
    const matchedTeacher = teachersList.find(
      (t) => t.email.toLowerCase() === emailClean && (t.password || 'guru123') === passClean
    );
    if (matchedTeacher) {
      const u = {
        id: matchedTeacher.id,
        name: matchedTeacher.name,
        email: matchedTeacher.email,
        role: 'Guru' as UserRole,
        avatar: matchedTeacher.avatar,
        meta: matchedTeacher.subject,
      };
      setCurrentUser(u);
      setUserRole('Guru');
      setActiveTab('dashboard');
      showToast(`Login berhasil! Selamat datang Ibu/Bapak ${matchedTeacher.name}`);
      return;
    }

    // 5. Check Siswa
    const matchedStudent = studentsList.find(
      (s) => s.email.toLowerCase() === emailClean && (s.password || 'siswa123') === passClean
    );
    if (matchedStudent) {
      const u = {
        id: matchedStudent.id,
        name: matchedStudent.name,
        email: matchedStudent.email,
        role: 'Siswa' as UserRole,
        avatar: matchedStudent.avatar,
        meta: matchedStudent.className,
      };
      setCurrentUser(u);
      setUserRole('Siswa');
      setActiveTab('dashboard');
      showToast(`Login berhasil! Selamat datang, ${matchedStudent.name}`);
      return;
    }

    setLoginError(
      'Email atau password salah! Hubungi Admin jika Anda lupa password akun sekolah Anda.'
    );
  };

  const handleQuickLogin = (role: UserRole) => {
    setLoginError('');
    if (role === 'Administrator') {
      setCurrentUser(DEFAULT_ADMIN_ACCOUNT);
      setUserRole('Administrator');
      setActiveTab('dashboard');
      showToast('Beralih ke akun Administrator');
    } else if (role === 'Kepala Sekolah') {
      const p = principalsList[0];
      setCurrentUser({
        id: p.id,
        name: p.name,
        email: p.email,
        role: 'Kepala Sekolah',
        avatar: p.avatar,
        jobDesk: p.jobDesk,
        meta: p.nip,
      });
      setUserRole('Kepala Sekolah');
      setActiveTab('dashboard');
      showToast(`Beralih ke akun Kepala Sekolah (${p.name})`);
    } else if (role === 'Kurikulum') {
      const c = curriculumList[0];
      setCurrentUser({
        id: c.id,
        name: c.name,
        email: c.email,
        role: 'Kurikulum',
        avatar: c.avatar,
        jobDesk: c.jobDesk,
        meta: c.position,
      });
      setUserRole('Kurikulum');
      setActiveTab('dashboard');
      showToast(`Beralih ke akun Tim Kurikulum (${c.name})`);
    } else if (role === 'Guru') {
      const t = teachersList[2] || teachersList[0];
      setCurrentUser({
        id: t.id,
        name: t.name,
        email: t.email,
        role: 'Guru',
        avatar: t.avatar,
        meta: t.subject,
      });
      setUserRole('Guru');
      setActiveTab('dashboard');
      showToast(`Beralih ke akun Guru (${t.name})`);
    } else if (role === 'Siswa') {
      const s = studentsList[0];
      setCurrentUser({
        id: s.id,
        name: s.name,
        email: s.email,
        role: 'Siswa',
        avatar: s.avatar,
        meta: s.className,
      });
      setUserRole('Siswa');
      setActiveTab('dashboard');
      showToast(`Beralih ke akun Siswa (${s.name})`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
    showToast('Anda telah keluar dari sistem.');
  };

  // Handle Class Click to open Details & prepare edit state
  const handleOpenClass = (cls: SchoolClass) => {
    setSelectedClass(cls);
    setIsEditingClass(false);
    setEditClassCapacity(cls.capacity || 32);
    setEditClassHomeroom(cls.homeroomTeacher);
    // Find all students currently in this class
    const enrolled = studentsList.filter((s) => s.className === cls.name).map((s) => s.id);
    setEnrolledStudentIds(enrolled);
    setStudentSearchInClass('');
  };

  // Toggle student assignment in class
  const toggleStudentInClass = (studentId: number) => {
    setEnrolledStudentIds((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  // Save changes to class (capacity, homeroom, and enrolled students)
  const handleSaveClass = () => {
    if (!selectedClass) return;
    const capacityNum = Number(editClassCapacity) || selectedClass.capacity || 32;
    const enrolledCount = enrolledStudentIds.length;
    const updatedClasses = classesList.map((c) => {
      if (c.id === selectedClass.id) {
        return {
          ...c,
          capacity: capacityNum,
          totalStudents: enrolledCount > 0 ? enrolledCount : c.totalStudents,
          homeroomTeacher: editClassHomeroom || c.homeroomTeacher,
        };
      }
      return c;
    });
    setClassesList(updatedClasses);

    // Update students in studentsList
    const updatedStudents = studentsList.map((s) => {
      if (enrolledStudentIds.includes(s.id)) {
        return { ...s, className: selectedClass.name };
      } else if (s.className === selectedClass.name) {
        return { ...s, className: 'Belum Ada Kelas' };
      }
      return s;
    });
    setStudentsList(updatedStudents);

    setSelectedClass({
      ...selectedClass,
      capacity: capacityNum,
      totalStudents: enrolledCount > 0 ? enrolledCount : selectedClass.totalStudents,
      homeroomTeacher: editClassHomeroom || selectedClass.homeroomTeacher,
    });
    setIsEditingClass(false);
    showToast(
      `Kelas ${selectedClass.name} berhasil diperbarui! (${enrolledCount} siswa terdaftar, kapasitas: ${capacityNum})`
    );
  };

  // Delete student handler
  const handleDeleteStudent = (id: number, name: string) => {
    setStudentsList((prev) => prev.filter((s) => s.id !== id));
    showToast(`Data siswa ${name} berhasil dihapus.`);
  };

  // Delete teacher handler
  const handleDeleteTeacher = (id: number, name: string) => {
    setTeachersList((prev) => prev.filter((t) => t.id !== id));
    showToast(`Data guru ${name} berhasil dihapus.`);
  };

  // Tab Title helper
  const getTabTitle = (tab: TabType) => {
    switch (tab) {
      case 'dashboard':
        return 'Dashboard';
      case 'students':
        return 'Manajemen Siswa';
      case 'teachers':
        return 'Manajemen Guru';
      case 'principals':
        return 'Manajemen Kepala Sekolah';
      case 'curriculum':
        return 'Manajemen Kurikulum';
      case 'subjects':
        return 'Daftar Mata Pelajaran';
      case 'classes':
        return 'Manajemen Kelas';
      case 'calendar':
        return 'Kalender Akademik';
      case 'announcements':
        return 'Pengumuman Sekolah';
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f4f7fb] overflow-hidden">
      {/* ---------------------------------------------------- */}
      {/* 1. LEFT SIDEBAR (Dark Navy matching image screenshot) */}
      {/* ---------------------------------------------------- */}
      <aside
        id="sidebar"
        className="w-64 bg-[#09162e] text-slate-300 flex flex-col justify-between shrink-0 select-none border-r border-slate-800/80 shadow-2xl z-30 transition-all duration-300"
      >
        {/* Top Branding */}
        <div>
          <div className="p-6 pb-5 flex items-center gap-3.5 border-b border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-[#1C4D8D] flex items-center justify-center text-white shadow-md shadow-[#1C4D8D]/30 transform transition-transform duration-300 hover:scale-105">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                  SIAS Admin
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-wide text-slate-400">
                Institutional Control
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3.5 space-y-1.5 mt-2" aria-label="Sidebar Navigation">
            {/* 1. Dashboard */}
            <button
              id="nav-dashboard"
              onClick={() => handleTabChange('dashboard')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#1C4D8D] text-white shadow-md shadow-[#1C4D8D]/30 scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:translate-x-1 active:scale-95'
              }`}
            >
              <LayoutDashboard
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  activeTab === 'dashboard' ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                }`}
              />
              <span>Dashboard</span>
            </button>

            {/* 2. Manajemen Kelas (Directly below Dashboard as requested) */}
            <button
              id="nav-classes"
              onClick={() => handleTabChange('classes')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group cursor-pointer ${
                activeTab === 'classes'
                  ? 'bg-[#1C4D8D] text-white shadow-md shadow-[#1C4D8D]/30 scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:translate-x-1 active:scale-95'
              }`}
            >
              <School
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  activeTab === 'classes' ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                }`}
              />
              <div className="flex items-center justify-between w-full">
                <span>Manajemen Kelas</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                  {classesList.length}
                </span>
              </div>
            </button>

            {/* 3. Manajemen Siswa */}
            <button
              id="nav-students"
              onClick={() => handleTabChange('students')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-[#1C4D8D] text-white shadow-md shadow-[#1C4D8D]/30 scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:translate-x-1 active:scale-95'
              }`}
            >
              <Users
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  activeTab === 'students' ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                }`}
              />
              <div className="flex items-center justify-between w-full">
                <span>Manajemen Siswa</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                  {studentsList.length}
                </span>
              </div>
            </button>

            {/* 4. Manajemen Guru */}
            <button
              id="nav-teachers"
              onClick={() => handleTabChange('teachers')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group cursor-pointer ${
                activeTab === 'teachers'
                  ? 'bg-[#1C4D8D] text-white shadow-md shadow-[#1C4D8D]/30 scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:translate-x-1 active:scale-95'
              }`}
            >
              <UserCheck
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  activeTab === 'teachers' ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                }`}
              />
              <div className="flex items-center justify-between w-full">
                <span>Manajemen Guru</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                  {teachersList.length}
                </span>
              </div>
            </button>

            {/* 5. Manajemen Kepala Sekolah */}
            <button
              id="nav-principals"
              onClick={() => handleTabChange('principals')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group cursor-pointer ${
                activeTab === 'principals'
                  ? 'bg-[#1C4D8D] text-white shadow-md shadow-[#1C4D8D]/30 scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:translate-x-1 active:scale-95'
              }`}
            >
              <Briefcase
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  activeTab === 'principals' ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                }`}
              />
              <div className="flex items-center justify-between w-full">
                <span>Manajemen Kepala Sekolah</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                  {principalsList.length}
                </span>
              </div>
            </button>

            {/* 6. Manajemen Kurikulum */}
            <button
              id="nav-curriculum"
              onClick={() => handleTabChange('curriculum')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group cursor-pointer ${
                activeTab === 'curriculum'
                  ? 'bg-[#1C4D8D] text-white shadow-md shadow-[#1C4D8D]/30 scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:translate-x-1 active:scale-95'
              }`}
            >
              <SlidersHorizontal
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  activeTab === 'curriculum' ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                }`}
              />
              <div className="flex items-center justify-between w-full">
                <span>Manajemen Kurikulum</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                  {curriculumList.length}
                </span>
              </div>
            </button>

            {/* 7. Daftar Mata Pelajaran */}
            <button
              id="nav-subjects"
              onClick={() => handleTabChange('subjects')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group cursor-pointer ${
                activeTab === 'subjects'
                  ? 'bg-[#1C4D8D] text-white shadow-md shadow-[#1C4D8D]/30 scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:translate-x-1 active:scale-95'
              }`}
            >
              <BookOpen
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  activeTab === 'subjects' ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                }`}
              />
              <span>Daftar Mata Pelajaran</span>
            </button>

            {/* 8. Kalender */}
            <button
              id="nav-calendar"
              onClick={() => handleTabChange('calendar')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-[#1C4D8D] text-white shadow-md shadow-[#1C4D8D]/30 scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:translate-x-1 active:scale-95'
              }`}
            >
              <CalendarIcon
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  activeTab === 'calendar' ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                }`}
              />
              <span>Kalender</span>
            </button>

            {/* 9. Pengumuman */}
            <button
              id="nav-announcements"
              onClick={() => handleTabChange('announcements')}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group cursor-pointer ${
                activeTab === 'announcements'
                  ? 'bg-[#1C4D8D] text-white shadow-md shadow-[#1C4D8D]/30 scale-[1.01]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:translate-x-1 active:scale-95'
              }`}
            >
              <Megaphone
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  activeTab === 'announcements' ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                }`}
              />
              <span>Pengumuman</span>
            </button>
          </nav>
        </div>

        {/* Bottom Section: Clean Logout Button without SMK 12 PPLG 2 badge */}
        <div className="p-4 border-t border-slate-800/60">
          <button
            id="nav-logout"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 group cursor-pointer active:scale-95"
          >
            <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ---------------------------------------------------- */}
      {/* 2. MAIN CONTENT AREA */}
      {/* ---------------------------------------------------- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between shrink-0 shadow-xs z-20">
          {/* Active Tab Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {getTabTitle(activeTab)}
            </h1>
          </div>

          {/* Search, Notifications & Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Input Bar */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari data, siswa, atau materi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 pl-10 pr-4 py-2 bg-[#f1f5f9]/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-150"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="btn-notification"
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-blue-600 flex items-center justify-center transition-all duration-150 relative cursor-pointer active:scale-95"
                aria-label="Notifikasi"
              >
                <Bell className="w-4 h-4" />
                {notificationsList.filter((n) => !n.read).length > 0 && (
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full absolute top-2 right-2 ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-bold text-sm text-slate-800">Pemberitahuan</span>
                    <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {notificationsList.filter((n) => !n.read).length} Baru
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 mt-1 max-h-72 overflow-y-auto">
                    {notificationsList.length === 0 ? (
                      <p className="py-6 text-center text-xs text-slate-400">Tidak ada notifikasi baru</p>
                    ) : (
                      notificationsList.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setNotificationsList((prev) =>
                              prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
                            );
                            showToast(`Notifikasi: ${n.title}`);
                          }}
                          className={`py-2.5 rounded-lg px-2 transition flex gap-2.5 items-start cursor-pointer ${
                            n.read ? 'opacity-60 hover:bg-slate-50' : 'bg-blue-50/40 hover:bg-blue-50'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              n.read ? 'bg-slate-300' : 'bg-blue-500'
                            }`}
                          ></span>
                          <div>
                            <p className="text-xs font-medium text-slate-800 leading-snug">{n.title}</p>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setNotificationsList((prev) => prev.map((item) => ({ ...item, read: true })));
                      setNotificationOpen(false);
                      showToast('Semua notifikasi ditandai sudah dibaca.');
                    }}
                    className="w-full mt-2 text-center text-xs font-semibold text-blue-600 hover:text-blue-700 py-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                  >
                    Tandai Semua Dibaca
                  </button>
                </div>
              )}
            </div>

            {/* Profile Pill */}
            <div className="relative">
              <button
                id="btn-user-profile"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-1.5 pr-2.5 rounded-xl hover:bg-slate-100 transition-all duration-150 cursor-pointer active:scale-95"
              >
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={currentUser?.name || 'Pengguna'}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {currentUser?.name || 'Fulani bin Fulano'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">{currentUser?.role || userRole}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* User Dropdown / Role Switcher */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-100 text-xs">
                    <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
                      Akun Login Saat Ini
                    </p>
                    <p className="font-bold text-slate-800 mt-0.5 truncate">{currentUser?.email || 'admin@smk.sch.id'}</p>
                    <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold">
                      <Shield className="w-3 h-3" />
                      <span>{currentUser?.role || userRole}</span>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Ubah / Coba Akses Role:
                    </p>
                    {(['Administrator', 'Kepala Sekolah', 'Kurikulum', 'Guru', 'Siswa'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          handleQuickLogin(r);
                          setUserMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                          currentUser?.role === r ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{r}</span>
                        {currentUser?.role === r && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1 mt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Content View Area with Animated Transition */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          <div
            key={activeTab}
            className={`max-w-7xl mx-auto transition-all duration-300 ${
              isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0 page-transition'
            }`}
          >
            {/* ---------------------------------------------------- */}
            {/* TAB 1: DASHBOARD (EXACT SCREENSHOT LAYOUT) */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Role Switcher & Simulator Pill Strip */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1C4D8D] text-white flex items-center justify-center font-black shrink-0">
                      {userRole === 'Administrator' && <Shield className="w-5 h-5" />}
                      {userRole === 'Kepala Sekolah' && <Briefcase className="w-5 h-5" />}
                      {userRole === 'Kurikulum' && <SlidersHorizontal className="w-5 h-5" />}
                      {userRole === 'Guru' && <UserCheck className="w-5 h-5" />}
                      {userRole === 'Siswa' && <GraduationCap className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                          Dashboard {userRole}
                        </h2>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {currentUser.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Tampilan dan fitur disesuaikan otomatis dengan wewenang & job desk peran{' '}
                        <strong className="text-slate-800">{userRole}</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Fast Role Simulator Buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                    <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">Beralih Peran:</span>
                    {(['Administrator', 'Kepala Sekolah', 'Kurikulum', 'Guru', 'Siswa'] as const).map((role) => (
                      <button
                        key={role}
                        onClick={() => handleQuickLogin(role)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap shrink-0 ${
                          userRole === role
                            ? 'bg-[#1C4D8D] text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ==================================================== */}
                {/* 1. DASHBOARD KHUSUS: ADMINISTRATOR */}
                {/* ==================================================== */}
                {userRole === 'Administrator' && (
                  <div className="space-y-6">
                    {/* 5 KPI Stat Cards for Admin */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                      {/* 1. Total Guru */}
                      <div
                        onClick={() => handleTabChange('teachers')}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md hover:border-indigo-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-105 transition-transform">
                          <div className="w-6 h-6 rounded-md border-2 border-purple-500/70 flex items-center justify-center">
                            <span className="text-[10px] font-black">G</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-black tracking-tight text-slate-900">
                            {teachersList.length}
                          </div>
                          <div className="text-xs font-medium text-slate-500">Total Guru</div>
                        </div>
                      </div>

                      {/* 2. Total Siswa */}
                      <div
                        onClick={() => handleTabChange('students')}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md hover:border-cyan-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0 group-hover:scale-105 transition-transform">
                          <div className="w-6 h-6 rounded-full border-2 border-cyan-500/80 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-black tracking-tight text-slate-900">
                            {studentsList.length.toLocaleString('id-ID')}
                          </div>
                          <div className="text-xs font-medium text-slate-500">Total Siswa</div>
                        </div>
                      </div>

                      {/* 3. Total Kepsek & Kurikulum */}
                      <div
                        onClick={() => handleTabChange('principals')}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
                          <Briefcase className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-black tracking-tight text-slate-900">
                            {principalsList.length + curriculumList.length}
                          </div>
                          <div className="text-xs font-medium text-slate-500">Pimpinan & Kurikulum</div>
                        </div>
                      </div>

                      {/* 4. Total Tugas */}
                      <div
                        onClick={() => setIsAddTaskOpen(true)}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md hover:border-amber-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                        title="Klik untuk tambah tugas baru"
                      >
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-105 transition-transform">
                          <ClipboardList className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-black tracking-tight text-slate-900">
                            {assignmentsList.length}
                          </div>
                          <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                            <span>Total Tugas</span>
                            <Plus className="w-3 h-3 text-amber-500" />
                          </div>
                        </div>
                      </div>

                      {/* 5. Total Ujian */}
                      <div
                        onClick={() => setIsAddExamOpen(true)}
                        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md hover:border-rose-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group col-span-2 sm:col-span-1"
                        title="Klik untuk tambah jadwal ujian baru"
                      >
                        <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0 group-hover:scale-105 transition-transform">
                          <Award className="w-6 h-6 text-rose-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-black tracking-tight text-slate-900">
                            {examsList.length}
                          </div>
                          <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                            <span>Total Ujian</span>
                            <Plus className="w-3 h-3 text-rose-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Row: Aktivitas Sekolah Chart & Interactive Kalender Akademik */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left (8 cols): Aktivitas Sekolah Chart */}
                      <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
                          <div>
                            <h3 className="font-extrabold text-base text-slate-900">
                              Aktivitas Sekolah
                            </h3>
                            <p className="text-[11px] text-slate-400">
                              Data dinamis grafik penugasan & ujian yang telah diinput
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 mr-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#5b52eb]"></span>
                              <span className="text-xs text-slate-500 font-semibold">Tugas ({assignmentsList.length})</span>
                            </div>
                            <div className="flex items-center gap-1.5 mr-3">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span>
                              <span className="text-xs text-slate-500 font-semibold">Ujian ({examsList.length})</span>
                            </div>

                            <button
                              onClick={() => setIsAddTaskOpen(true)}
                              className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Tugas</span>
                            </button>
                            <button
                              onClick={() => setIsAddExamOpen(true)}
                              className="px-2.5 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Ujian</span>
                            </button>
                          </div>
                        </div>

                        {/* Chart Bars Render */}
                        <div className="h-64 flex items-end justify-between px-3 sm:px-6 pt-6 border-b border-slate-100">
                          {dynamicChartData.map((item) => {
                            const tugasHeight = item.tugas > 0
                              ? Math.max(16, (item.tugas / Math.max(maxActivityValue, 1)) * 170)
                              : 4;
                            const ujianHeight = item.ujian > 0
                              ? Math.max(16, (item.ujian / Math.max(maxActivityValue, 1)) * 170)
                              : 4;

                            return (
                              <div key={item.month} className="flex flex-col items-center gap-2 group flex-1">
                                <div className="flex items-end gap-2 sm:gap-3 h-48">
                                  {/* Tugas Bar */}
                                  <div
                                    onClick={() => setIsAddTaskOpen(true)}
                                    className="relative flex flex-col items-center cursor-pointer"
                                    title={`Bulan ${item.month}: ${item.tugas} Tugas`}
                                  >
                                    <div
                                      style={{ height: `${tugasHeight}px` }}
                                      className={`w-4 sm:w-6 bg-[#5b52eb] rounded-t-lg transition-all duration-300 group-hover:brightness-110 shadow-xs ${
                                        item.tugas === 0 ? 'opacity-30' : 'opacity-100'
                                      }`}
                                    ></div>
                                    <span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[10px] font-bold bg-slate-800 text-white px-1.5 py-0.5 rounded transition pointer-events-none z-10 whitespace-nowrap">
                                      {item.tugas} Tugas
                                    </span>
                                  </div>

                                  {/* Ujian Bar */}
                                  <div
                                    onClick={() => setIsAddExamOpen(true)}
                                    className="relative flex flex-col items-center cursor-pointer"
                                    title={`Bulan ${item.month}: ${item.ujian} Ujian`}
                                  >
                                    <div
                                      style={{ height: `${ujianHeight}px` }}
                                      className={`w-4 sm:w-6 bg-[#38bdf8] rounded-t-lg transition-all duration-300 group-hover:brightness-110 shadow-xs ${
                                        item.ujian === 0 ? 'opacity-30' : 'opacity-100'
                                      }`}
                                    ></div>
                                    <span className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[10px] font-bold bg-slate-800 text-white px-1.5 py-0.5 rounded transition pointer-events-none z-10 whitespace-nowrap">
                                      {item.ujian} Ujian
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition">
                                  {item.month}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right (4 cols): Interactive Kalender Akademik */}
                      <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-3">
                            <div>
                              <h3 className="font-extrabold text-base text-slate-900">
                                Kalender Akademik
                              </h3>
                              <p className="text-[11px] text-slate-400">
                                {calendarEvents.length} agenda sekolah terdaftar
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setIsAddEventOpen(true)}
                                className="text-xs font-bold text-white bg-[#1C4D8D] hover:bg-[#153a6b] px-2.5 py-1 rounded-lg transition shadow-2xs cursor-pointer active:scale-95 flex items-center gap-1"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Agenda</span>
                              </button>
                              <button
                                onClick={() => handleTabChange('calendar')}
                                className="text-xs font-semibold text-[#1C4D8D] hover:underline transition cursor-pointer"
                              >
                                Buka
                              </button>
                            </div>
                          </div>

                          {/* Category Filter Pills for Calendar */}
                          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
                            {['Semua', 'Ujian', 'Akademik', 'Rapat'].map((cat) => (
                              <button
                                key={cat}
                                onClick={() => setCalendarCategoryFilter(cat)}
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                  calendarCategoryFilter === cat
                                    ? 'bg-[#1C4D8D] text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>

                          {/* Filtered Event Cards */}
                          <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
                            {calendarEvents
                              .filter((evt) => {
                                if (calendarCategoryFilter === 'Semua') return true;
                                if (calendarCategoryFilter === 'Ujian') return evt.title.toLowerCase().includes('ujian') || evt.title.toLowerCase().includes('asesmen');
                                if (calendarCategoryFilter === 'Rapat') return evt.title.toLowerCase().includes('rapat') || evt.title.toLowerCase().includes('evaluasi');
                                return !evt.title.toLowerCase().includes('ujian') && !evt.title.toLowerCase().includes('rapat');
                              })
                              .slice(0, 5)
                              .map((evt) => (
                                <div
                                  key={evt.id}
                                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/90 border border-slate-100 transition duration-150 cursor-pointer group"
                                  onClick={() => setSelectedEvent(evt)}
                                >
                                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center justify-center shrink-0 group-hover:border-[#1C4D8D] transition">
                                    <span className="text-xs font-extrabold text-slate-900 leading-tight">
                                      {evt.day}
                                    </span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                                      {evt.month}
                                    </span>
                                  </div>
                                  <div className="overflow-hidden flex-1">
                                    <p className="text-xs font-bold text-slate-800 truncate group-hover:text-[#1C4D8D] transition">
                                      {evt.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                                      <span className="truncate">{evt.time}</span>
                                      <span>•</span>
                                      <span className="truncate text-slate-500">{evt.location}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Interactive Aktivitas Terbaru & Notifikasi */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left (8 cols): Interactive Aktivitas Terbaru */}
                      <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          <div>
                            <h3 className="font-extrabold text-base text-slate-900">
                              Aktivitas Terbaru
                            </h3>
                            <p className="text-[11px] text-slate-400">
                              Log perubahan, penambahan data, dan interaksi sistem
                            </p>
                          </div>
                          {/* Filter Pills for Activity */}
                          <div className="flex items-center gap-1 overflow-x-auto">
                            {['Semua', 'Pendidik', 'Siswa', 'Tugas', 'Jadwal'].map((f) => (
                              <button
                                key={f}
                                onClick={() => setActivityCategoryFilter(f)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                  activityCategoryFilter === f
                                    ? 'bg-[#1C4D8D] text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Quick Activity Logger */}
                        <div className="my-3 flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                          <input
                            type="text"
                            placeholder="Catat log aktivitas administrator cepat..."
                            value={quickLogInput}
                            onChange={(e) => setQuickLogInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && quickLogInput.trim()) {
                                addRecentActivity('Admin Fabian', quickLogInput.trim(), 'announcement');
                                showToast(`Log tersimpan: "${quickLogInput.trim()}"`);
                                setQuickLogInput('');
                              }
                            }}
                            className="flex-1 bg-transparent px-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                          />
                          <button
                            onClick={() => {
                              if (!quickLogInput.trim()) return;
                              addRecentActivity('Admin Fabian', quickLogInput.trim(), 'announcement');
                              showToast(`Log tersimpan: "${quickLogInput.trim()}"`);
                              setQuickLogInput('');
                            }}
                            className="px-3 py-1.5 bg-[#1C4D8D] hover:bg-[#153a6b] text-white text-[11px] font-bold rounded-lg transition cursor-pointer"
                          >
                            + Catat Log
                          </button>
                        </div>

                        <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="text-slate-400 border-b border-slate-100">
                                <th className="py-2.5 font-semibold">Pengguna</th>
                                <th className="py-2.5 font-semibold">Aktivitas</th>
                                <th className="py-2.5 font-semibold text-right">Waktu</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {recentActivities
                                .filter((act) => {
                                  if (activityCategoryFilter === 'Semua') return true;
                                  const text = (act.user + ' ' + act.action).toLowerCase();
                                  if (activityCategoryFilter === 'Pendidik') return text.includes('guru') || text.includes('kepala') || text.includes('kurikulum');
                                  if (activityCategoryFilter === 'Siswa') return text.includes('siswa') || text.includes('nisn');
                                  if (activityCategoryFilter === 'Tugas') return text.includes('tugas');
                                  if (activityCategoryFilter === 'Jadwal') return text.includes('ujian') || text.includes('agenda');
                                  return true;
                                })
                                .slice(0, 7)
                                .map((act) => (
                                  <tr
                                    key={act.id}
                                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                                    onClick={() => showToast(`[Log] ${act.user}: ${act.action}`)}
                                  >
                                    <td className="py-3 pr-3">
                                      <div className="flex items-center gap-2.5">
                                        <img
                                          src={act.avatar}
                                          alt={act.user}
                                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                                        />
                                        <span className="font-bold text-slate-800 group-hover:text-[#1C4D8D] transition-colors">
                                          {act.user}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 text-slate-600 font-medium">
                                      {act.action}
                                    </td>
                                    <td className="py-3 text-right text-slate-400 font-medium whitespace-nowrap">
                                      {act.time}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Right (4 cols): Interactive Notifikasi */}
                      <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div>
                            <h3 className="font-extrabold text-base text-slate-900">
                              Notifikasi
                            </h3>
                            <p className="text-[11px] text-slate-400">Pemberitahuan sistem & data</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                              {notificationsList.filter((n) => !n.read).length} Baru
                            </span>
                          </div>
                        </div>

                        {/* Interactive Filter & Action Bar */}
                        <div className="flex items-center justify-between my-3">
                          <div className="flex items-center gap-1">
                            {['Semua', 'Belum Dibaca'].map((f) => (
                              <button
                                key={f}
                                onClick={() => setNotificationCategoryFilter(f)}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition cursor-pointer ${
                                  notificationCategoryFilter === f
                                    ? 'bg-[#1C4D8D] text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={() => {
                              setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
                              showToast('Semua notifikasi ditandai sudah dibaca.');
                            }}
                            className="text-[10px] font-bold text-[#1C4D8D] hover:underline cursor-pointer"
                          >
                            Baca Semua
                          </button>
                        </div>

                        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                          {notificationsList
                            .filter((n) => {
                              if (notificationCategoryFilter === 'Belum Dibaca') return !n.read;
                              return true;
                            })
                            .map((notif) => {
                              const getIcon = () => {
                                switch (notif.type) {
                                  case 'assignment':
                                    return <FileText className="w-4 h-4 text-blue-600" />;
                                  case 'warning':
                                    return <AlertCircle className="w-4 h-4 text-rose-600" />;
                                  case 'user':
                                    return <Users className="w-4 h-4 text-emerald-600" />;
                                  case 'calendar':
                                  default:
                                    return <CalendarIcon className="w-4 h-4 text-amber-600" />;
                                }
                              };

                              const getBg = () => {
                                switch (notif.type) {
                                  case 'assignment':
                                    return 'bg-blue-50';
                                  case 'warning':
                                    return 'bg-rose-50';
                                  case 'user':
                                    return 'bg-emerald-50';
                                  case 'calendar':
                                  default:
                                    return 'bg-amber-50';
                                }
                              };

                              return (
                                <div
                                  key={notif.id}
                                  onClick={() => {
                                    setNotificationsList((prev) =>
                                      prev.map((item) =>
                                        item.id === notif.id ? { ...item, read: !item.read } : item
                                      )
                                    );
                                    showToast(`Status notifikasi "${notif.title}" diperbarui.`);
                                  }}
                                  className={`flex items-start gap-3 p-2.5 rounded-xl transition cursor-pointer ${
                                    notif.read
                                      ? 'opacity-60 hover:bg-slate-50'
                                      : 'bg-slate-50/90 hover:bg-slate-100/80 border border-slate-100'
                                  }`}
                                  title="Klik untuk mengubah status dibaca"
                                >
                                  <div className={`w-8 h-8 rounded-xl ${getBg()} flex items-center justify-center shrink-0`}>
                                    {getIcon()}
                                  </div>
                                  <div className="overflow-hidden flex-1">
                                    <div className="flex items-center gap-1.5">
                                      <p className="text-xs font-bold text-slate-800 truncate">{notif.title}</p>
                                      {!notif.read && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                                      )}
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-0.5">{notif.time}</p>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* 2. DASHBOARD KHUSUS: KEPALA SEKOLAH */}
                {/* ==================================================== */}
                {userRole === 'Kepala Sekolah' && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Executive Welcome Banner */}
                    <div className="bg-gradient-to-r from-[#09162e] to-[#1C4D8D] text-white p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold backdrop-blur-xs">
                          <Briefcase className="w-3.5 h-3.5 text-amber-300" />
                          <span>Pusat Kendali Eksekutif & Supervisi Sekolah</span>
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">
                          Selamat Datang, Bapak Kepala Sekolah
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                          SMK Negeri Unggulan berkomitmen mencetak lulusan berkarakter, berdaya saing global, dan siap kerja pada industri teknologi nasional.
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20 shrink-0 flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-[11px] text-slate-300 font-medium">Status Akreditasi</p>
                          <p className="text-xl font-black text-amber-300">A (UNGGUL)</p>
                          <p className="text-[10px] text-slate-300">Nilai: 98 / 100</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
                          <Award className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* 4 Executive KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Mutu Pembelajaran</span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+2.4%</span>
                        </div>
                        <div className="text-2xl font-black text-slate-900 mt-2">98.4%</div>
                        <p className="text-[11px] text-slate-400 mt-1">Target ketercapaian terpenuhi</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Tenaga Pendidik</span>
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">100% Aktif</span>
                        </div>
                        <div className="text-2xl font-black text-slate-900 mt-2">{teachersList.length} Guru</div>
                        <p className="text-[11px] text-slate-400 mt-1">Supervisi PKG berjalan lancar</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Peserta Didik</span>
                          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">54 Kelas</span>
                        </div>
                        <div className="text-2xl font-black text-slate-900 mt-2">{studentsList.length} Siswa</div>
                        <p className="text-[11px] text-slate-400 mt-1">PPLG, DKV, TJKT, PM, MPLB</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Kemitraan DUDI</span>
                          <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">Industri</span>
                        </div>
                        <div className="text-2xl font-black text-slate-900 mt-2">18 Mitra</div>
                        <p className="text-[11px] text-slate-400 mt-1">MoU PKL & Magang Industri</p>
                      </div>
                    </div>

                    {/* Executive Job Desk & Approval Center */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div>
                            <h3 className="font-extrabold text-base text-slate-900">
                              Wewenang & Agenda Supervisi Kepala Sekolah
                            </h3>
                            <p className="text-[11px] text-slate-400">
                              Job desk dan otorisasi dokumen kelembagaan
                            </p>
                          </div>
                          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                            4 Otorisasi Aktif
                          </span>
                        </div>

                        <div className="space-y-3">
                          {[
                            {
                              title: 'Pengesahan Laporan Supervisi Kinerja Guru (PKG)',
                              desc: 'Verifikasi hasil penilaian pedagogik dan profesional 12 orang guru produktif.',
                              status: 'Siap Disahkan',
                              badge: 'bg-emerald-50 text-emerald-700',
                            },
                            {
                              title: 'Persetujuan Rencana Anggaran & Sarana Prasarana (BOS)',
                              desc: 'Otorisasi pengadaan workstation lab komputer dan lisensi perangkat lunak.',
                              status: 'Menunggu Review',
                              badge: 'bg-amber-50 text-amber-700',
                            },
                            {
                              title: 'Validasi SK Pembagian Jam Mengajar Semester Genap',
                              desc: 'Penetapan beban 1.440 Jam Pelajaran (JP) yang telah disusun Waka Kurikulum.',
                              status: 'Selesai',
                              badge: 'bg-blue-50 text-blue-700',
                            },
                            {
                              title: 'Verifikasi Kerjasama Industri Baru (MoU Magang)',
                              desc: 'Penyelarasan kurikulum berbasis kebutuhan industri software development.',
                              status: 'Terverifikasi',
                              badge: 'bg-purple-50 text-purple-700',
                            },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                              <div>
                                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.badge}`}>
                                  {item.status}
                                </span>
                                <button
                                  onClick={() => showToast(`Otorisasi "${item.title}" berhasil diproses oleh Kepala Sekolah.`)}
                                  className="px-3 py-1 bg-[#1C4D8D] hover:bg-[#153a6b] text-white text-[11px] font-bold rounded-lg transition cursor-pointer"
                                >
                                  Tandatangani
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right (4 cols): Disposisi & Agenda Rapat Pimpinan */}
                      <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                        <div className="pb-3 border-b border-slate-100">
                          <h3 className="font-extrabold text-base text-slate-900">Agenda Pimpinan</h3>
                          <p className="text-[11px] text-slate-400">Jadwal koordinasi dinas & dewan guru</p>
                        </div>

                        <div className="space-y-3">
                          {calendarEvents.slice(0, 3).map((evt) => (
                            <div key={evt.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                  {evt.day} {evt.month}
                                </span>
                                <span className="text-[10px] text-slate-400">{evt.time}</span>
                              </div>
                              <p className="text-xs font-bold text-slate-800 mt-2">{evt.title}</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">📍 {evt.location}</p>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => setIsAddEventOpen(true)}
                          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                        >
                          + Tambah Agenda Pimpinan
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* 3. DASHBOARD KHUSUS: KURIKULUM */}
                {/* ==================================================== */}
                {userRole === 'Kurikulum' && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Curriculum Header Banner */}
                    <div className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold backdrop-blur-xs">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-300" />
                          <span>Direktorat Pengembangan & Penjaminan Kurikulum</span>
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">
                          Dashboard Waka Kurikulum Merdeka
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                          Pengelolaan struktur kurikulum, plotting jam mengajar guru, perangkat ajar, dan jadwal asesmen sumatif sekolah.
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20 shrink-0">
                        <p className="text-[11px] text-slate-300 font-medium">Kurikulum Aktif</p>
                        <p className="text-lg font-black text-cyan-300">Kurikulum Merdeka SMK</p>
                        <p className="text-[10px] text-slate-300">Fase E & F (Kelas 10, 11, 12)</p>
                      </div>
                    </div>

                    {/* 4 Curriculum KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Struktur Mata Pelajaran</span>
                        <div className="text-2xl font-black text-slate-900 mt-2">{subjectsList.length} Mapel</div>
                        <p className="text-[11px] text-slate-400 mt-1">Normatif, Adaptif, Produktif</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Jam Pembelajaran (JP)</span>
                        <div className="text-2xl font-black text-slate-900 mt-2">1.440 JP</div>
                        <p className="text-[11px] text-slate-400 mt-1">Terploting per minggu ke 54 kelas</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Modul Ajar & ATP</span>
                        <div className="text-2xl font-black text-slate-900 mt-2">94.8%</div>
                        <p className="text-[11px] text-slate-400 mt-1">Tervalidasi tim pengembang</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Kesiapan Asesmen & Ujian</span>
                        <div className="text-2xl font-black text-slate-900 mt-2">{examsList.length} Ujian</div>
                        <p className="text-[11px] text-slate-400 mt-1">STS, SAS, dan UKK Kejuruan</p>
                      </div>
                    </div>

                    {/* Curriculum Operations & Job Desk Panel */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div>
                            <h3 className="font-extrabold text-base text-slate-900">
                              Job Desk Operasional & Validasi Kurikulum
                            </h3>
                            <p className="text-[11px] text-slate-400">Tugas harian waka dan staf kurikulum</p>
                          </div>
                          <button
                            onClick={() => handleTabChange('subjects')}
                            className="text-xs font-bold text-[#1C4D8D] hover:underline"
                          >
                            Kelola Mapel →
                          </button>
                        </div>

                        <div className="space-y-3">
                          {[
                            {
                              task: 'Penyusunan Roster & Jadwal Pelajaran Mingguan',
                              desc: 'Menghindari bentrok jam mengajar pada lab komputer dan ruang teori.',
                              status: 'Selesai 100%',
                              color: 'text-emerald-700 bg-emerald-50',
                            },
                            {
                              task: 'Validasi KKTP & Kriteria Ketercapaian Pembelajaran',
                              desc: 'Review rubrik penilaian asesmen formatif dan sumatif oleh Musyawarah Guru Mapel.',
                              status: 'Dalam Proses',
                              color: 'text-amber-700 bg-amber-50',
                            },
                            {
                              task: 'Sinkronisasi Kurikulum Berbasis Standar Industri',
                              desc: 'Penyelarasan materi Web Programming dan Basis Data dengan kebutuhan mitra DUDI.',
                              status: 'Tervalidasi',
                              color: 'text-blue-700 bg-blue-50',
                            },
                            {
                              task: 'Pengaturan Jadwal Uji Kompetensi Keahlian (UKK)',
                              desc: 'Penetapan jadwal penguji eksternal dari asosiasi industri teknologi.',
                              status: 'Terjadwal',
                              color: 'text-purple-700 bg-purple-50',
                            },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                              <div>
                                <h4 className="text-xs font-bold text-slate-900">{item.task}</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md self-start sm:self-auto ${item.color}`}>
                                {item.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right (4 cols): Quick Controls for Curriculum */}
                      <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                        <h3 className="font-extrabold text-base text-slate-900">Aksi Cepat Kurikulum</h3>
                        <p className="text-[11px] text-slate-400 pb-2 border-b border-slate-100">
                          Jalur pintas penerbitan tugas dan jadwal asesmen
                        </p>

                        <button
                          onClick={() => setIsAddTaskOpen(true)}
                          className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs rounded-xl transition text-left flex items-center justify-between cursor-pointer"
                        >
                          <span>+ Terbitkan Penugasan</span>
                          <Plus className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setIsAddExamOpen(true)}
                          className="w-full py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs rounded-xl transition text-left flex items-center justify-between cursor-pointer"
                        >
                          <span>+ Jadwalkan Ujian / Asesmen</span>
                          <Plus className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setIsAddEventOpen(true)}
                          className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition text-left flex items-center justify-between cursor-pointer"
                        >
                          <span>+ Tambah Kalender Akademik</span>
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* 4. DASHBOARD KHUSUS: GURU */}
                {/* ==================================================== */}
                {userRole === 'Guru' && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Teacher Greeting */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                            Ruang Pengajar: {currentUser.name}
                          </h2>
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                            Pengampu Produktif PPLG
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Kelola kelas yang diampu, tugas siswa, penilaian harian, dan jadwal mengajar hari ini.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsAddTaskOpen(true)}
                          className="px-3.5 py-2 bg-[#1C4D8D] hover:bg-[#153a6b] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Buat Tugas Baru</span>
                        </button>
                      </div>
                    </div>

                    {/* 4 Teacher KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Kelas Diampu</span>
                        <div className="text-2xl font-black text-slate-900 mt-2">4 Kelas</div>
                        <p className="text-[11px] text-slate-400 mt-1">10 PPLG 1, 11 PPLG 2, 12 PPLG 1 & 2</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Tugas Diterbitkan</span>
                        <div className="text-2xl font-black text-slate-900 mt-2">{assignmentsList.length} Tugas</div>
                        <p className="text-[11px] text-slate-400 mt-1">Tersedia di e-learning</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Jadwal Ujian</span>
                        <div className="text-2xl font-black text-slate-900 mt-2">{examsList.length} Ujian</div>
                        <p className="text-[11px] text-slate-400 mt-1">Sumatif Tengah & Akhir</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Siswa Bimbingan</span>
                        <div className="text-2xl font-black text-slate-900 mt-2">{studentsList.length} Siswa</div>
                        <p className="text-[11px] text-slate-400 mt-1">Terdaftar aktif</p>
                      </div>
                    </div>

                    {/* Teacher's Active Assignments & Today's Schedule */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div>
                            <h3 className="font-extrabold text-base text-slate-900">
                              Daftar Penugasan Aktif
                            </h3>
                            <p className="text-[11px] text-slate-400">Monitoring pengumpulan tugas siswa</p>
                          </div>
                          <button
                            onClick={() => setIsAddTaskOpen(true)}
                            className="text-xs font-bold text-[#1C4D8D] hover:underline"
                          >
                            + Tambah Tugas
                          </button>
                        </div>

                        <div className="space-y-3">
                          {assignmentsList.slice(0, 4).map((a) => (
                            <div
                              key={a.id}
                              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                              <div>
                                <h4 className="text-xs font-bold text-slate-900">{a.title}</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  {a.subject} • Kelas {a.className} • Batas: {a.dueDate}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                                  {a.month} 2026
                                </span>
                                <button
                                  onClick={() => showToast(`Membuka berkas pengumpulan "${a.title}"`)}
                                  className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg transition cursor-pointer"
                                >
                                  Cek Nilai
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right (4 cols): Jadwal Mengajar Hari Ini */}
                      <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                        <div className="pb-3 border-b border-slate-100">
                          <h3 className="font-extrabold text-base text-slate-900">Jadwal Mengajar Hari Ini</h3>
                          <p className="text-[11px] text-slate-400">Senin, Semester Genap</p>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
                            <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded">
                              07:30 - 09:45 WIB
                            </span>
                            <p className="font-bold text-slate-900 text-xs mt-1">Pemrograman Web & Perangkat Bergerak</p>
                            <p className="text-[11px] text-slate-500">Kelas 12 PPLG 2 • Lab Komputer 3</p>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                            <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded">
                              10:15 - 12:30 WIB
                            </span>
                            <p className="font-bold text-slate-900 text-xs mt-1">Basis Data & SQL Architecture</p>
                            <p className="text-[11px] text-slate-500">Kelas 11 PPLG 1 • Lab Komputer 1</p>
                          </div>
                        </div>

                        <button
                          onClick={() => showToast('Presensi kelas hari ini berhasil dibuka untuk siswa.')}
                          className="w-full py-2.5 bg-[#1C4D8D] hover:bg-[#153a6b] text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs text-center"
                        >
                          Buka Presensi Kelas
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* 5. DASHBOARD KHUSUS: SISWA */}
                {/* ==================================================== */}
                {userRole === 'Siswa' && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Student Welcome Header */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                            Halo, {currentUser.name}!
                          </h2>
                          <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full">
                            Kelas 12 PPLG 2
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Selamat datang di portal pembelajaran SIAS. Semangat menuntaskan tugas dan persiapan ujian kelulusan!
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                          NISN: 0058291048
                        </span>
                      </div>
                    </div>

                    {/* 4 Student KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Tugas Aktif</span>
                        <div className="text-2xl font-black text-slate-900 mt-2">{assignmentsList.length} Tugas</div>
                        <p className="text-[11px] text-slate-400 mt-1">Harus diselesaikan</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Jadwal Ujian</span>
                        <div className="text-2xl font-black text-slate-900 mt-2">{examsList.length} Ujian</div>
                        <p className="text-[11px] text-slate-400 mt-1">Sumatif semester genap</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Rata-rata Nilai</span>
                        <div className="text-2xl font-black text-emerald-600 mt-2">88.5 / A</div>
                        <p className="text-[11px] text-slate-400 mt-1">Capaian kompetensi sangat baik</p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                        <span className="text-xs font-bold text-slate-500">Presensi Kehadiran</span>
                        <div className="text-2xl font-black text-blue-600 mt-2">98.2%</div>
                        <p className="text-[11px] text-slate-400 mt-1">Tertib masuk kelas</p>
                      </div>
                    </div>

                    {/* Student Assignments & Deadlines */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div>
                            <h3 className="font-extrabold text-base text-slate-900">
                              Tugas Sekolah Saya
                            </h3>
                            <p className="text-[11px] text-slate-400">Kerjakan dan kumpulkan sebelum batas waktu</p>
                          </div>
                          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                            {assignmentsList.length} Menunggu
                          </span>
                        </div>

                        <div className="space-y-3">
                          {assignmentsList.slice(0, 4).map((a) => (
                            <div
                              key={a.id}
                              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                              <div>
                                <h4 className="text-xs font-bold text-slate-900">{a.title}</h4>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  Mata Pelajaran: <strong className="text-slate-700">{a.subject}</strong> • Tenggat: {a.dueDate}
                                </p>
                              </div>
                              <button
                                onClick={() => showToast(`Tugas "${a.title}" berhasil dikumpulkan oleh ${currentUser.name}!`)}
                                className="px-3.5 py-1.5 bg-[#1C4D8D] hover:bg-[#153a6b] text-white text-[11px] font-bold rounded-lg transition cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
                              >
                                Kumpulkan Tugas
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right (4 cols): Kalender Ujian Siswa */}
                      <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                        <div className="pb-3 border-b border-slate-100">
                          <h3 className="font-extrabold text-base text-slate-900">Jadwal Ujian Terdekat</h3>
                          <p className="text-[11px] text-slate-400">Pastikan kartu ujian sudah dicetak</p>
                        </div>

                        <div className="space-y-3">
                          {examsList.slice(0, 3).map((ex) => (
                            <div key={ex.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                                  Bulan {ex.month}
                                </span>
                                <span className="text-[10px] text-slate-400">Ujian {ex.subject}</span>
                              </div>
                              <p className="text-xs font-bold text-slate-800 mt-1.5">{ex.title}</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">Target: {ex.className}</p>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => showToast('Kartu peserta ujian berhasil diunduh dalam format PDF.')}
                          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer text-center"
                        >
                          Unduh Kartu Ujian (PDF)
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: MANAJEMEN KELAS (54 SMK Classes) */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'classes' && (
              <div className="space-y-6">
                {/* Header & Controls */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      Manajemen Kelas (Total: {classesList.length} Kelas)
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Daftar 54 kelas SMK Negeri untuk jurusan PPLG, DKV, TJKT, PEMASARAN, dan MPLB tingkat 10, 11, dan 12.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddClassOpen(true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Kelas Baru</span>
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-2">
                    <Filter className="w-3.5 h-3.5" /> Filter Jurusan:
                  </span>
                  {['ALL', 'PPLG', 'DKV', 'TJKT', 'PEMASARAN', 'MPLB'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setClassFilterMajor(m)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer active:scale-95 ${
                        classFilterMajor === m
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {m === 'ALL' ? 'Semua Jurusan' : m}
                    </button>
                  ))}

                  <div className="h-4 w-px bg-slate-300 mx-2 hidden sm:block"></div>

                  <span className="text-xs font-semibold text-slate-500">Tingkat:</span>
                  {['ALL', '10', '11', '12'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setClassFilterGrade(g)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer active:scale-95 ${
                        classFilterGrade === g
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {g === 'ALL' ? 'Semua' : `Kelas ${g}`}
                    </button>
                  ))}
                </div>

                {/* Classes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredClasses.map((cls) => (
                    <div
                      key={cls.id}
                      onClick={() => handleOpenClass(cls)}
                      className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition">
                              {cls.name}
                            </h3>
                            {cls.isPlus && (
                              <span className="px-2 py-0.5 text-[10px] font-black bg-amber-100 text-amber-800 rounded-md">
                                PLUS
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Jurusan {cls.major} • Tingkat {cls.grade}
                          </p>
                        </div>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-105 transition-transform">
                          <School className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Wali Kelas:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                          {cls.homeroomTeacher}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Kapasitas Siswa:</span>
                        <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          {cls.capacity || 32} Siswa
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Total Siswa:</span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded-full ${
                            getStudentCountByClass(cls.name) > 0
                              ? 'text-emerald-600 bg-emerald-50'
                              : 'text-slate-400 bg-slate-100'
                          }`}
                        >
                          {getStudentCountByClass(cls.name)} Siswa
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: MANAJEMEN SISWA */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        Manajemen Siswa
                      </h2>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        {studentsList.length} Siswa Terdaftar
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Kelola data lengkap peserta didik: Nama, NISN, rombel kelas, jenis kelamin, dan email.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddStudentOpen(true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Siswa</span>
                  </button>
                </div>

                {/* Filter Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Filter Gender:</span>
                    {(['ALL', 'L', 'P'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setStudentGenderFilter(g)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          studentGenderFilter === g
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {g === 'ALL' ? 'Semua' : g === 'L' ? 'Laki-laki' : 'Perempuan'}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs font-medium text-slate-400">
                    Menampilkan <strong className="text-slate-700">{filteredStudents.length}</strong> siswa
                  </div>
                </div>

                {/* Identical Table: Siswa */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="py-3.5 px-6 font-bold">Nama Lengkap Siswa</th>
                          <th className="py-3.5 px-6 font-bold">NISN</th>
                          <th className="py-3.5 px-6 font-bold">Kelas</th>
                          <th className="py-3.5 px-6 font-bold">Jenis Kelamin</th>
                          <th className="py-3.5 px-6 font-bold">Email & Password Akun</th>
                          <th className="py-3.5 px-6 font-bold">Status</th>
                          <th className="py-3.5 px-6 font-bold text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50/80 transition group">
                            <td className="py-3.5 px-6 font-bold text-slate-900">
                              <div className="flex items-center gap-3">
                                <img
                                  src={s.avatar}
                                  alt={s.name}
                                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                                />
                                <div>
                                  <div className="font-bold text-slate-800 group-hover:text-blue-600 transition">
                                    {s.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-normal sm:hidden">
                                    {s.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-6 font-mono text-slate-600 font-medium">
                              {s.nisn}
                            </td>
                            <td className="py-3.5 px-6">
                              <span className="font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700">
                                {s.className}
                              </span>
                            </td>
                            <td className="py-3.5 px-6">
                              <span
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                                  s.gender === 'L'
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'bg-pink-50 text-pink-700'
                                }`}
                              >
                                {s.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-slate-600 font-medium">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5">
                                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span className="font-medium text-slate-700 truncate max-w-[160px]">{s.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] text-amber-700 font-mono bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/50 w-fit">
                                  <Key className="w-3 h-3 text-amber-600 shrink-0" />
                                  <span>Pass: <strong>{s.password || 'siswa123'}</strong></span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-6">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                {s.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditStudent(s)}
                                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold transition cursor-pointer flex items-center gap-1"
                                  title="Edit Siswa & Kredensial"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleOpenPasswordModal(s.id, s.name, s.email, 'student', s.password || 'siswa123')}
                                  className="p-1 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition cursor-pointer"
                                  title="Lihat / Ganti Password"
                                >
                                  <Key className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStudent(s.id, s.name)}
                                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                  title="Hapus Siswa"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: MANAJEMEN GURU (IDENTICAL UI TO MANAJEMEN SISWA) */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'teachers' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        Manajemen Guru
                      </h2>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                        {teachersList.length} Tenaga Pendidik
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Kelola data lengkap tenaga pengajar: Nama lengkap, NIP, mata pelajaran, jenis kelamin, dan email.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddTeacherOpen(true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Guru</span>
                  </button>
                </div>

                {/* Filter Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Filter Gender:</span>
                    {(['ALL', 'L', 'P'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setTeacherGenderFilter(g)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          teacherGenderFilter === g
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {g === 'ALL' ? 'Semua' : g === 'L' ? 'Laki-laki' : 'Perempuan'}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs font-medium text-slate-400">
                    Menampilkan <strong className="text-slate-700">{filteredTeachers.length}</strong> guru
                  </div>
                </div>

                {/* Identical Table: Guru */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="py-3.5 px-6 font-bold">Nama Lengkap Guru</th>
                          <th className="py-3.5 px-6 font-bold">NIP</th>
                          <th className="py-3.5 px-6 font-bold">Mata Pelajaran</th>
                          <th className="py-3.5 px-6 font-bold">Jenis Kelamin</th>
                          <th className="py-3.5 px-6 font-bold">Email & Password Akun</th>
                          <th className="py-3.5 px-6 font-bold">Status</th>
                          <th className="py-3.5 px-6 font-bold text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredTeachers.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50/80 transition group">
                            <td className="py-3.5 px-6 font-bold text-slate-900">
                              <div className="flex items-center gap-3">
                                <img
                                  src={t.avatar}
                                  alt={t.name}
                                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                                />
                                <div>
                                  <div className="font-bold text-slate-800 group-hover:text-blue-600 transition">
                                    {t.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-normal sm:hidden">
                                    {t.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-6 font-mono text-slate-600 font-medium">
                              {t.nip}
                            </td>
                            <td className="py-3.5 px-6">
                              <span className="font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700">
                                {t.subject}
                              </span>
                            </td>
                            <td className="py-3.5 px-6">
                              <span
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                                  t.gender === 'L'
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'bg-pink-50 text-pink-700'
                                }`}
                              >
                                {t.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-slate-600 font-medium">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5">
                                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span className="font-medium text-slate-700 truncate max-w-[160px]">{t.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] text-amber-700 font-mono bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/50 w-fit">
                                  <Key className="w-3 h-3 text-amber-600 shrink-0" />
                                  <span>Pass: <strong>{t.password || 'guru123'}</strong></span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-6">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                {t.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditTeacher(t)}
                                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold transition cursor-pointer flex items-center gap-1"
                                  title="Edit Guru & Kredensial"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleOpenPasswordModal(t.id, t.name, t.email, 'teacher', t.password || 'guru123')}
                                  className="p-1 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition cursor-pointer"
                                  title="Lihat / Ganti Password"
                                >
                                  <Key className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTeacher(t.id, t.name)}
                                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                  title="Hapus Guru"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB: MANAJEMEN KEPALA SEKOLAH */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'principals' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        Manajemen Kepala Sekolah
                      </h2>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/50">
                        {principalsList.length} Pimpinan Eksekutif
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Kelola data pimpinan institusi, NIP, periode dinas, kredensial login, dan rincian job desk supervisi.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddPrincipalOpen(true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Kepala Sekolah</span>
                  </button>
                </div>

                {/* Info Card: Job Desk & Wewenang Kepala Sekolah */}
                <div className="bg-linear-to-r from-slate-900 to-[#0d2346] text-white p-5 rounded-2xl shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <Briefcase className="w-4 h-4" />
                      <span>Fungsi & Job Desk Utama Kepala Sekolah</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Bertanggung jawab penuh atas manajemen mutu pendidikan, pembinaan kedisiplinan, supervisi kinerja guru (PKG), pengesahan legalitas kelulusan dan raport, serta perluasan kerja sama industri (MoU DUDI).
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 text-slate-200 text-xs font-semibold border border-white/10">
                      Hak Akses: Penuh (Eksekutif)
                    </span>
                  </div>
                </div>

                {/* Table: Kepala Sekolah */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="py-3.5 px-6 font-bold">Nama Lengkap & Gelar</th>
                          <th className="py-3.5 px-6 font-bold">NIP</th>
                          <th className="py-3.5 px-6 font-bold">Periode Masa Bakti</th>
                          <th className="py-3.5 px-6 font-bold">Email & Password Login</th>
                          <th className="py-3.5 px-6 font-bold">Fokus & Job Desk</th>
                          <th className="py-3.5 px-6 font-bold">Status</th>
                          <th className="py-3.5 px-6 font-bold text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredPrincipals.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition group">
                            <td className="py-3.5 px-6 font-bold text-slate-900">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.avatar}
                                  alt={p.name}
                                  className="w-9 h-9 rounded-full object-cover border-2 border-amber-300"
                                />
                                <div>
                                  <div className="font-bold text-slate-900 group-hover:text-blue-600 transition flex items-center gap-1.5">
                                    <span>{p.name}</span>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                                      Kepsek
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-normal">
                                    {p.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-6 font-mono text-slate-600 font-medium">
                              {p.nip}
                            </td>
                            <td className="py-3.5 px-6">
                              <span className="font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                                {p.period}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-slate-600 font-medium">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5">
                                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span className="font-medium text-slate-700 truncate max-w-[160px]">{p.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] text-amber-700 font-mono bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/50 w-fit">
                                  <Key className="w-3 h-3 text-amber-600 shrink-0" />
                                  <span>Pass: <strong>{p.password || 'kepsek123'}</strong></span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-6">
                              <p className="text-slate-600 max-w-xs text-xs line-clamp-2" title={p.jobDesk}>
                                {p.jobDesk}
                              </p>
                            </td>
                            <td className="py-3.5 px-6">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                {p.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditPrincipal(p)}
                                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold transition cursor-pointer flex items-center gap-1"
                                  title="Edit Kepala Sekolah & Kredensial"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleOpenPasswordModal(p.id, p.name, p.email, 'principal', p.password || 'kepsek123')}
                                  className="p-1 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition cursor-pointer"
                                  title="Lihat / Ganti Password"
                                >
                                  <Key className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeletePrincipal(p.id, p.name)}
                                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                  title="Hapus Kepala Sekolah"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB: MANAJEMEN KURIKULUM */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'curriculum' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        Manajemen Kurikulum
                      </h2>
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/50">
                        {curriculumList.length} Tim Akademik
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Kelola tim pengembang kurikulum, waka bidang kurikulum, beban mengajar, dan alur asesmen Merdeka Belajar.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddCurriculumOpen(true)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Tim Kurikulum</span>
                  </button>
                </div>

                {/* Info Card: Job Desk & Wewenang Tim Kurikulum */}
                <div className="bg-linear-to-r from-blue-900 to-[#102d5c] text-white p-5 rounded-2xl shadow-sm border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Fungsi & Job Desk Tim Kurikulum</span>
                    </div>
                    <p className="text-xs text-blue-100 leading-relaxed">
                      Menyusun struktur Kurikulum Merdeka, mengatur pembagian jam pelajaran (JP) seluruh guru, memverifikasi kelengkapan Modul Ajar/ATP, mengelola jadwal KBM mingguan, serta mengorganisasi pelaksanaan Asesmen Sumatif & Uji Kompetensi Keahlian (UKK).
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-semibold border border-white/10">
                      Fokus: Standar KBM & Mutu Akademik
                    </span>
                  </div>
                </div>

                {/* Table: Kurikulum */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="py-3.5 px-6 font-bold">Nama Lengkap & Gelar</th>
                          <th className="py-3.5 px-6 font-bold">NIP</th>
                          <th className="py-3.5 px-6 font-bold">Jabatan Struktural</th>
                          <th className="py-3.5 px-6 font-bold">Email & Password Login</th>
                          <th className="py-3.5 px-6 font-bold">Tugas & Job Desk</th>
                          <th className="py-3.5 px-6 font-bold">Status</th>
                          <th className="py-3.5 px-6 font-bold text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredCurriculum.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50/80 transition group">
                            <td className="py-3.5 px-6 font-bold text-slate-900">
                              <div className="flex items-center gap-3">
                                <img
                                  src={c.avatar}
                                  alt={c.name}
                                  className="w-9 h-9 rounded-full object-cover border-2 border-indigo-400"
                                />
                                <div>
                                  <div className="font-bold text-slate-900 group-hover:text-blue-600 transition flex items-center gap-1.5">
                                    <span>{c.name}</span>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-bold">
                                      Kurikulum
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-normal">
                                    {c.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-6 font-mono text-slate-600 font-medium">
                              {c.nip}
                            </td>
                            <td className="py-3.5 px-6">
                              <span className="font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700">
                                {c.position}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-slate-600 font-medium">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5">
                                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span className="font-medium text-slate-700 truncate max-w-[160px]">{c.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] text-amber-700 font-mono bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/50 w-fit">
                                  <Key className="w-3 h-3 text-amber-600 shrink-0" />
                                  <span>Pass: <strong>{c.password || 'kurikulum123'}</strong></span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-6">
                              <p className="text-slate-600 max-w-xs text-xs line-clamp-2" title={c.jobDesk}>
                                {c.jobDesk}
                              </p>
                            </td>
                            <td className="py-3.5 px-6">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                {c.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditCurriculum(c)}
                                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold transition cursor-pointer flex items-center gap-1"
                                  title="Edit Tim Kurikulum & Kredensial"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleOpenPasswordModal(c.id, c.name, c.email, 'curriculum', c.password || 'kurikulum123')}
                                  className="p-1 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition cursor-pointer"
                                  title="Lihat / Ganti Password"
                                >
                                  <Key className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCurriculum(c.id, c.name)}
                                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                  title="Hapus Tim Kurikulum"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 5: DAFTAR MATA PELAJARAN */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'subjects' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      Daftar Mata Pelajaran & Kurikulum
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Mata pelajaran kejuruan PPLG, muatan umum, dan alokasi jam pelajaran per minggu.
                    </p>
                  </div>
                  <button
                    onClick={() => showToast('Form tambah kurikulum mata pelajaran dibuka.')}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Mata Pelajaran</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjectsList.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 transition duration-150 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md font-mono font-bold text-xs bg-slate-100 text-slate-800">
                            {sub.code}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                            {sub.category}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-base text-slate-900 mt-2">
                          {sub.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Guru Pengampu: <strong className="text-slate-700">{sub.teacher}</strong>
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">{sub.grade}</span>
                        <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {sub.hours} Jam / Minggu
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 6: KALENDER AKADEMIK */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'calendar' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      Kalender Akademik Sekolah
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Agenda resmi semester ganjil dan genap tahun ajaran aktif ({calendarEvents.length} agenda terdaftar).
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddEventOpen(true)}
                    className="px-4 py-2.5 bg-[#1C4D8D] hover:bg-[#153a6b] text-white rounded-xl font-bold text-xs shadow-xs transition cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Tambah Agenda</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {calendarEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => setSelectedEvent(evt)}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition relative group cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1C4D8D] font-extrabold flex flex-col items-center justify-center mb-3">
                          <span className="text-base leading-none">{evt.day}</span>
                          <span className="text-[10px] uppercase font-bold text-blue-500">{evt.month}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCalendarEvents((prev) => prev.filter((item) => item.id !== evt.id));
                            addRecentActivity('Admin Fabian', `Menghapus agenda: ${evt.title}`, 'schedule');
                            showToast(`Agenda "${evt.title}" telah dihapus.`);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Hapus Agenda"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#1C4D8D] transition">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{evt.time}</p>
                      <p className="text-xs font-semibold text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg">
                        📍 {evt.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 7: PENGUMUMAN */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'announcements' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      Pengumuman & Siaran Sekolah
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Informasi resmi kepala sekolah dan bidang kurikulum untuk guru dan siswa.
                    </p>
                  </div>
                  <button
                    onClick={() => showToast('Modal buat pengumuman baru dibuka.')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-xs hover:bg-blue-700 transition"
                  >
                    + Buat Pengumuman
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        PENTING & SEGERA
                      </span>
                      <span className="text-xs text-slate-400">18 September 2026</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mt-2">
                      Persiapan Pelaksanaan Ujian Akhir Semester (UAS) Ganjil
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Diberitahukan kepada seluruh wali kelas dan peserta didik tingkat 10, 11, dan 12 SMK Negeri bahwa pelaksanaan Ujian Akhir Semester akan dimulai sesuai jadwal di kalender akademik. Harap menyelesaikan seluruh penugasan sebelum tanggal penutupan.
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>Diterbitkan oleh: <strong>Bambang Wijaya (Kurikulum)</strong></span>
                      <span className="text-blue-600 font-bold">Target: Semua Kelas</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        JURUSAN PPLG
                      </span>
                      <span className="text-xs text-slate-400">15 September 2026</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mt-2">
                      Pengumpulan Portofolio Project Web & Aplikasi 12 PPLG 2
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Siswa kelas 12 PPLG 2 diwajibkan mengunggah repository GitHub dan link live demo aplikasi tugas akhir paling lambat akhir pekan ini melalui portal Fabian LMS.
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>Diterbitkan oleh: <strong>Dewi Lestari, S.Kom</strong></span>
                      <span className="text-blue-600 font-bold">Target: 12 PPLG 2</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MODAL: Detail & Edit Kelas */}
      {/* ---------------------------------------------------- */}
      {selectedClass && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{selectedClass.name}</h3>
                  <p className="text-xs text-slate-400">
                    {isEditingClass ? 'Edit Rombongan Belajar & Siswa' : 'Informasi Rombongan Belajar'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedClass(null);
                  setIsEditingClass(false);
                }}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isEditingClass ? (
              /* VIEW MODE: Tampilan Detail (Program Kelas dihapus) */
              <div className="my-5 space-y-4 text-xs">
                <div className="space-y-3.5">
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">Jurusan:</span>
                    <span className="font-bold text-slate-800">{selectedClass.major}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">Tingkat Pendidikan:</span>
                    <span className="font-bold text-slate-800">Kelas {selectedClass.grade} SMK</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">Wali Kelas:</span>
                    <span className="font-bold text-slate-800">{selectedClass.homeroomTeacher}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">Kapasitas Siswa:</span>
                    <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      {selectedClass.capacity || 32} Siswa
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">Total Siswa:</span>
                    <span
                      className={`font-bold px-2.5 py-1 rounded-md ${
                        getStudentCountByClass(selectedClass.name) > 0
                          ? 'text-emerald-600 bg-emerald-50'
                          : 'text-slate-400 bg-slate-100'
                      }`}
                    >
                      {getStudentCountByClass(selectedClass.name)} Siswa
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <button
                    onClick={() => setIsEditingClass(true)}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Kelas Ini</span>
                  </button>
                  <button
                    onClick={() => setSelectedClass(null)}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : (
              /* EDIT MODE: Atur Kapasitas & Pilih Siswa yang Masuk */
              <div className="my-4 space-y-4 text-xs overflow-y-auto pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Kapasitas Siswa (Jumlah Maksimal)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={editClassCapacity}
                      onChange={(e) => setEditClassCapacity(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Wali Kelas
                    </label>
                    <input
                      type="text"
                      value={editClassHomeroom}
                      onChange={(e) => setEditClassHomeroom(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                    />
                  </div>
                </div>

                {/* Section: Pilih Murid untuk Kelas Ini */}
                <div className="border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-slate-800">Daftar Murid Kelas Ini</span>
                      <p className="text-[11px] text-slate-400">
                        Centang murid yang ingin dimasukkan ke kelas {selectedClass.name}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        enrolledStudentIds.length > editClassCapacity
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {enrolledStudentIds.length} / {editClassCapacity} Siswa
                    </span>
                  </div>

                  {/* Search inside student enrollment */}
                  <div className="relative mb-2.5">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari nama atau NISN siswa..."
                      value={studentSearchInClass}
                      onChange={(e) => setStudentSearchInClass(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Student Checkbox List */}
                  <div className="max-h-52 overflow-y-auto space-y-1.5 border border-slate-200/80 rounded-xl p-2 bg-slate-50/50">
                    {studentsList
                      .filter(
                        (s) =>
                          s.name.toLowerCase().includes(studentSearchInClass.toLowerCase()) ||
                          s.nisn.includes(studentSearchInClass)
                      )
                      .map((s) => {
                        const isEnrolled = enrolledStudentIds.includes(s.id);
                        return (
                          <div
                            key={s.id}
                            onClick={() => toggleStudentInClass(s.id)}
                            className={`p-2 rounded-xl flex items-center justify-between gap-2.5 cursor-pointer transition ${
                              isEnrolled
                                ? 'bg-blue-50/80 border border-blue-200 text-blue-900'
                                : 'bg-white border border-slate-100 hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <input
                                type="checkbox"
                                checked={isEnrolled}
                                onChange={() => {}} // handled by parent onClick
                                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 pointer-events-none"
                              />
                              <img
                                src={s.avatar}
                                alt={s.name}
                                className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0"
                              />
                              <div className="truncate">
                                <span className="font-bold text-xs truncate block">{s.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  NISN: {s.nisn}
                                </span>
                              </div>
                            </div>

                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                                isEnrolled
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {isEnrolled ? 'Terdaftar' : s.className}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={handleSaveClass}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer active:scale-95"
                  >
                    Simpan Perubahan Kelas
                  </button>
                  <button
                    onClick={() => setIsEditingClass(false)}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: Tambah Kelas Baru */}
      {/* ---------------------------------------------------- */}
      {isAddClassOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Tambah Kelas Baru</h3>
              <button
                onClick={() => setIsAddClassOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newClassName) return;
                const newClassObj: SchoolClass = {
                  id: Date.now(),
                  name: newClassName.toUpperCase(),
                  grade: Number(newClassGrade),
                  major: newClassMajor,
                  isPlus: newClassName.toUpperCase().includes('PLUS'),
                  capacity: 36,
                  totalStudents: 0,
                  homeroomTeacher: newClassHomeroom,
                };
                setClassesList([newClassObj, ...classesList]);
                setIsAddClassOpen(false);
                setNewClassName('');
                showToast(`Kelas ${newClassObj.name} berhasil ditambahkan!`);
              }}
              className="space-y-4 my-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700">Nama Kelas (Contoh: 10 PPLG 3)</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: 10 PPLG 3"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Jurusan</label>
                  <select
                    value={newClassMajor}
                    onChange={(e) => setNewClassMajor(e.target.value)}
                    className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PPLG">PPLG</option>
                    <option value="DKV">DKV</option>
                    <option value="TJKT">TJKT</option>
                    <option value="PEMASARAN">PEMASARAN</option>
                    <option value="MPLB">MPLB</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Tingkat</label>
                  <select
                    value={newClassGrade}
                    onChange={(e) => setNewClassGrade(Number(e.target.value))}
                    className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={10}>Kelas 10</option>
                    <option value={11}>Kelas 11</option>
                    <option value={12}>Kelas 12</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Wali Kelas</label>
                <input
                  type="text"
                  required
                  value={newClassHomeroom}
                  onChange={(e) => setNewClassHomeroom(e.target.value)}
                  className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Simpan Kelas
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddClassOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: Tambah Siswa */}
      {/* ---------------------------------------------------- */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Tambah Data Siswa</h3>
                <p className="text-xs text-slate-400">Lengkapi formulir biodata siswa baru</p>
              </div>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newStudentName) return;
                const finalEmail =
                  newStudentEmail.trim() ||
                  `${newStudentName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@student.sch.id`;
                const finalNisn =
                  newStudentNisn.trim() ||
                  '006' + Math.floor(1000000 + Math.random() * 9000000);

                const newStd: Student = {
                  id: Date.now(),
                  name: newStudentName,
                  nisn: finalNisn,
                  className: newStudentClass,
                  gender: newStudentGender,
                  email: finalEmail,
                  phone: '0812-' + Math.floor(1000 + Math.random() * 9000),
                  avatar:
                    newStudentGender === 'L'
                      ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
                      : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
                  status: 'Aktif',
                };

                setStudentsList([newStd, ...studentsList]);

                // Also increment totalStudents in corresponding class if found
                setClassesList((prev) =>
                  prev.map((c) =>
                    c.name === newStudentClass ? { ...c, totalStudents: c.totalStudents + 1 } : c
                  )
                );

                // Add dynamic activity log & notification
                addRecentActivity('Admin Fabian', `Mendaftarkan siswa baru: ${newStd.name} (${newStd.className})`, 'user');
                addSchoolNotification(`Siswa baru ${newStd.name} berhasil didaftarkan ke kelas ${newStd.className}`, 'user');

                setIsAddStudentOpen(false);
                setNewStudentName('');
                setNewStudentNisn('');
                setNewStudentEmail('');
                setNewStudentGender('L');
                showToast(`Siswa ${newStd.name} berhasil ditambahkan ke kelas ${newStd.className}!`);
              }}
              className="space-y-3.5 my-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Fabian Nanday Pratama"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NISN (10 Digit)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 0061928374"
                    value={newStudentNisn}
                    onChange={(e) => setNewStudentNisn(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kelas</label>
                  <select
                    value={newStudentClass}
                    onChange={(e) => setNewStudentClass(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                  >
                    {classesList.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Jenis Kelamin</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewStudentGender('L')}
                    className={`py-2 px-3 rounded-xl font-bold border transition text-center cursor-pointer ${
                      newStudentGender === 'L'
                        ? 'bg-indigo-50 border-indigo-400 text-indigo-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Laki-laki
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewStudentGender('P')}
                    className={`py-2 px-3 rounded-xl font-bold border transition text-center cursor-pointer ${
                      newStudentGender === 'P'
                        ? 'bg-pink-50 border-pink-400 text-pink-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Perempuan
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Siswa</label>
                <input
                  type="email"
                  placeholder="Misal: fabian.nanday@student.sch.id"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                >
                  Daftarkan Siswa
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: Tambah Guru */}
      {/* ---------------------------------------------------- */}
      {isAddTeacherOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Tambah Guru Baru</h3>
                <p className="text-xs text-slate-400">Lengkapi data tenaga pendidik dan pengajar</p>
              </div>
              <button
                onClick={() => setIsAddTeacherOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newTeacherName) return;
                const finalEmail =
                  newTeacherEmail.trim() ||
                  `${newTeacherName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@school.sch.id`;
                const finalNip =
                  newTeacherNip.trim() ||
                  '199' + Math.floor(100000000000000 + Math.random() * 90000000000000);

                const newTch: Teacher = {
                  id: Date.now(),
                  name: newTeacherName,
                  nip: finalNip,
                  email: finalEmail,
                  subject: newTeacherSubject || 'Produktif PPLG',
                  gender: newTeacherGender,
                  phone: '0812-3344-5566',
                  avatar:
                    newTeacherGender === 'L'
                      ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
                      : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
                  status: 'Aktif',
                };

                setTeachersList([newTch, ...teachersList]);

                // Add dynamic activity log & notification
                addRecentActivity('Admin Fabian', `Menambahkan guru baru: ${newTch.name} (${newTch.subject})`, 'user');
                addSchoolNotification(`Guru ${newTch.name} terdaftar sebagai pengampu ${newTch.subject}`, 'user');

                setIsAddTeacherOpen(false);
                setNewTeacherName('');
                setNewTeacherNip('');
                setNewTeacherSubject('');
                setNewTeacherEmail('');
                setNewTeacherGender('L');
                showToast(`Guru ${newTch.name} (${newTch.subject}) berhasil ditambahkan!`);
              }}
              className="space-y-3.5 my-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Drs. Subagyo, M.Kom"
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NIP (18 Digit)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 198501102010011002"
                    value={newTeacherNip}
                    onChange={(e) => setNewTeacherNip(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Pemrograman Web"
                    value={newTeacherSubject}
                    onChange={(e) => setNewTeacherSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Jenis Kelamin</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewTeacherGender('L')}
                    className={`py-2 px-3 rounded-xl font-bold border transition text-center cursor-pointer ${
                      newTeacherGender === 'L'
                        ? 'bg-indigo-50 border-indigo-400 text-indigo-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Laki-laki
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTeacherGender('P')}
                    className={`py-2 px-3 rounded-xl font-bold border transition text-center cursor-pointer ${
                      newTeacherGender === 'P'
                        ? 'bg-pink-50 border-pink-400 text-pink-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Perempuan
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Guru</label>
                <input
                  type="email"
                  placeholder="Misal: subagyo@school.sch.id"
                  value={newTeacherEmail}
                  onChange={(e) => setNewTeacherEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                >
                  Simpan Guru
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddTeacherOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: Tambah Tugas (Memperbarui Total Tugas & Grafik) */}
      {/* ---------------------------------------------------- */}
      {isAddTaskOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Tambah Penugasan Sekolah</h3>
                <p className="text-xs text-slate-400">
                  Data ini langsung memperbarui KPI dan Grafik Aktivitas Sekolah
                </p>
              </div>
              <button
                onClick={() => setIsAddTaskOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newTaskTitle) return;
                const newT: Assignment = {
                  id: Date.now(),
                  title: newTaskTitle,
                  subject: newTaskSubject,
                  className: newTaskClass,
                  dueDate: '2026-10-15',
                  month: newTaskMonth,
                  status: 'Aktif',
                };
                setAssignmentsList([newT, ...assignmentsList]);

                // Add dynamic activity log & notification
                addRecentActivity('Admin Fabian', `Menerbitkan tugas baru: ${newT.title} (${newT.className})`, 'upload');
                addSchoolNotification(`Tugas baru "${newT.title}" untuk kelas ${newT.className} berhasil dibuat`, 'assignment');

                setIsAddTaskOpen(false);
                setNewTaskTitle('');
                showToast(`Tugas "${newT.title}" berhasil ditambahkan ke ${newT.className}!`);
              }}
              className="space-y-3.5 my-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Judul Tugas</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Pembuatan REST API dengan Express"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    required
                    value={newTaskSubject}
                    onChange={(e) => setNewTaskSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kelas Target</label>
                  <select
                    value={newTaskClass}
                    onChange={(e) => setNewTaskClass(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                  >
                    {classesList.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Bulan Pelaksanaan (Memperbarui Bar Grafik)
                </label>
                <select
                  value={newTaskMonth}
                  onChange={(e) => setNewTaskMonth(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                >
                  <option value="Jul">Juli</option>
                  <option value="Ags">Agustus</option>
                  <option value="Sep">September</option>
                  <option value="Okt">Oktober</option>
                  <option value="Nov">November</option>
                  <option value="Des">Desember</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                >
                  Simpan Tugas
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddTaskOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: Tambah Ujian (Memperbarui Total Ujian & Grafik) */}
      {/* ---------------------------------------------------- */}
      {isAddExamOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Tambah Jadwal Ujian</h3>
                <p className="text-xs text-slate-400">
                  Data ujian akan langsung masuk ke KPI dan Grafik Aktivitas Sekolah
                </p>
              </div>
              <button
                onClick={() => setIsAddExamOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newExamTitle) return;
                const newEx: Exam = {
                  id: Date.now(),
                  title: newExamTitle,
                  subject: newExamSubject,
                  className: newExamClass,
                  date: '2026-11-20',
                  month: newExamMonth,
                  totalQuestions: 40,
                };
                setExamsList([newEx, ...examsList]);

                // Sync into Academic Calendar
                const newCalEvt: AcademicEvent = {
                  id: Date.now(),
                  day: String(Math.floor(Math.random() * 10) + 15),
                  month: newEx.month,
                  title: `Ujian: ${newEx.title}`,
                  time: `08:00 - 10:00 WIB • ${newEx.className}`,
                  location: `Ruang Lab / ${newEx.className}`,
                };
                setCalendarEvents((prev) => [newCalEvt, ...prev]);

                // Add dynamic activity log & notification
                addRecentActivity('Admin Fabian', `Menjadwalkan ujian: ${newEx.title} (${newEx.className})`, 'schedule');
                addSchoolNotification(`Jadwal ujian "${newEx.title}" (${newEx.className}) telah diterbitkan`, 'warning');

                setIsAddExamOpen(false);
                setNewExamTitle('');
                showToast(`Ujian "${newEx.title}" berhasil dijadwalkan dan disinkronkan ke kalender!`);
              }}
              className="space-y-3.5 my-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama / Judul Ujian</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Penilaian Akhir Semester Ganjil PPLG"
                  value={newExamTitle}
                  onChange={(e) => setNewExamTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    required
                    value={newExamSubject}
                    onChange={(e) => setNewExamSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kelas Target</label>
                  <select
                    value={newExamClass}
                    onChange={(e) => setNewExamClass(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                  >
                    {classesList.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Bulan Pelaksanaan (Memperbarui Bar Grafik)
                </label>
                <select
                  value={newExamMonth}
                  onChange={(e) => setNewExamMonth(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                >
                  <option value="Jul">Juli</option>
                  <option value="Ags">Agustus</option>
                  <option value="Sep">September</option>
                  <option value="Okt">Oktober</option>
                  <option value="Nov">November</option>
                  <option value="Des">Desember</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                >
                  Simpan Jadwal Ujian
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddExamOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: Tambah Agenda Kalender Akademik */}
      {/* ---------------------------------------------------- */}
      {isAddEventOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Tambah Agenda Kalender</h3>
                <p className="text-xs text-slate-400">
                  Agenda akan langsung terbit di Kalender Akademik dan widget Dashboard
                </p>
              </div>
              <button
                onClick={() => setIsAddEventOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newEventTitle) return;
                const newEvt: AcademicEvent = {
                  id: Date.now(),
                  title: newEventTitle,
                  day: newEventDay,
                  month: newEventMonth,
                  time: newEventTime,
                  location: newEventLocation,
                };
                setCalendarEvents([newEvt, ...calendarEvents]);
                addRecentActivity('Admin Fabian', `Menambahkan agenda baru: ${newEventTitle}`, 'schedule');
                addSchoolNotification(
                  `Agenda baru "${newEventTitle}" dijadwalkan (${newEventDay} ${newEventMonth})`,
                  'calendar'
                );
                setIsAddEventOpen(false);
                setNewEventTitle('');
                showToast(`Agenda "${newEvt.title}" berhasil ditambahkan ke Kalender Akademik!`);
              }}
              className="space-y-3.5 my-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Judul / Nama Agenda</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Rapat Evaluasi Kurikulum Merdeka"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tanggal (Hari)</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    required
                    value={newEventDay}
                    onChange={(e) => setNewEventDay(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Bulan</label>
                  <select
                    value={newEventMonth}
                    onChange={(e) => setNewEventMonth(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] font-bold"
                  >
                    <option value="Jul">Juli</option>
                    <option value="Ags">Agustus</option>
                    <option value="Sep">September</option>
                    <option value="Okt">Oktober</option>
                    <option value="Nov">November</option>
                    <option value="Des">Desember</option>
                    <option value="Jan">Januari</option>
                    <option value="Feb">Februari</option>
                    <option value="Mar">Maret</option>
                    <option value="Apr">April</option>
                    <option value="Mei">Mei</option>
                    <option value="Jun">Juni</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Waktu Pelaksanaan</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: 08:00 - 12:00 WIB"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lokasi / Tempat</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Aula Utama SMK / Daring Zoom"
                  value={newEventLocation}
                  onChange={(e) => setNewEventLocation(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1C4D8D] hover:bg-[#153a6b] text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                >
                  Simpan Agenda
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddEventOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: Detail Agenda Kalender */}
      {/* ---------------------------------------------------- */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1C4D8D] font-extrabold flex flex-col items-center justify-center">
                  <span className="text-sm leading-none">{selectedEvent.day}</span>
                  <span className="text-[9px] uppercase font-bold text-blue-500">{selectedEvent.month}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    Agenda Sekolah
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedEvent.day} {selectedEvent.month} 2026</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs">
              <h4 className="font-extrabold text-base text-slate-900 leading-snug">
                {selectedEvent.title}
              </h4>
              <div className="p-3 rounded-xl bg-slate-50 space-y-2 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <span className="text-slate-400 shrink-0">📍</span>
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setCalendarEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
                  addRecentActivity('Admin Fabian', `Menghapus agenda: ${selectedEvent.title}`, 'schedule');
                  setSelectedEvent(null);
                  showToast(`Agenda "${selectedEvent.title}" telah dihapus.`);
                }}
                className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-1 py-2.5 bg-[#1C4D8D] hover:bg-[#153a6b] text-white font-bold text-xs rounded-xl transition cursor-pointer text-center shadow-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: LOGIN SISTEM SIAS DENGAN EMAIL & PASSWORD */}
      {/* ---------------------------------------------------- */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#1C4D8D] text-white flex items-center justify-center font-black">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Masuk Akun SIAS</h3>
                  <p className="text-xs text-slate-400">Gunakan email dan password terdaftar</p>
                </div>
              </div>
              <button
                onClick={() => setIsLoginOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 my-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Pengguna</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="nama@school.sch.id"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Password</label>
                  <span className="text-[10px] text-slate-400">Lupa? Hubungi Admin untuk reset</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    placeholder="Masukkan kata sandi akun"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1C4D8D] hover:bg-[#153a6b] text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk Sekarang</span>
                </button>
              </div>
            </form>

            {/* Quick 1-Click Login Simulator for Demonstration */}
            <div className="pt-4 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                Atau Masuk Cepat Sesuai Role (Demo):
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(['Administrator', 'Kepala Sekolah', 'Kurikulum', 'Guru', 'Siswa'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleQuickLogin(r)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition border text-left flex items-center justify-between hover:bg-slate-50 ${
                      r === 'Administrator' ? 'col-span-2 bg-blue-50/50 border-blue-200 text-blue-800' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="truncate">{r}</span>
                    <span className="text-[9px] text-slate-400">Demo</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: RESET / GANTI PASSWORD AKUN (ADMIN TOOL) */}
      {/* ---------------------------------------------------- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Ganti / Reset Password</h3>
                  <p className="text-xs text-slate-400">Atur password baru jika akun pengguna lupa kata sandi</p>
                </div>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePasswordModal} className="space-y-3.5 my-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-400">Informasi Akun</p>
                <p className="font-bold text-slate-800 text-sm">{passwordTargetName}</p>
                <p className="text-slate-500 text-xs font-mono">{passwordTargetEmail}</p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Password Baru Akun
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C4D8D] font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Pengguna akan dapat langsung login menggunakan password ini.
                </p>
              </div>

              {/* Quick Generate Password presets */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400">Preset cepat:</span>
                {['smk12345', 'pass2026', 'belajar123', 'merdeka2026'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setNewPasswordInput(preset)}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-mono transition"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1C4D8D] hover:bg-[#153a6b] text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Password Baru</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: EDIT DATA SISWA & PASSWORD */}
      {/* ---------------------------------------------------- */}
      {isEditStudentOpen && editingStudent && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Edit Data Siswa</h3>
                <p className="text-xs text-slate-400">Perbarui profil, kelas, email, dan password siswa</p>
              </div>
              <button
                onClick={() => setIsEditStudentOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditStudent} className="space-y-3.5 my-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NISN</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.nisn}
                    onChange={(e) => setEditingStudent({ ...editingStudent, nisn: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kelas</label>
                  <select
                    value={editingStudent.className}
                    onChange={(e) => setEditingStudent({ ...editingStudent, className: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                  >
                    {classesList.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Login</label>
                  <input
                    type="email"
                    required
                    value={editingStudent.email}
                    onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password Akun</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.password || 'siswa123'}
                    onChange={(e) => setEditingStudent({ ...editingStudent, password: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Status Keaktifan</label>
                <select
                  value={editingStudent.status}
                  onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Alumni">Alumni / Lulus</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditStudentOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: EDIT DATA GURU & PASSWORD */}
      {/* ---------------------------------------------------- */}
      {isEditTeacherOpen && editingTeacher && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Edit Data Guru</h3>
                <p className="text-xs text-slate-400">Perbarui profil, mata pelajaran, email, dan password guru</p>
              </div>
              <button
                onClick={() => setIsEditTeacherOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditTeacher} className="space-y-3.5 my-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={editingTeacher.name}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NIP</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.nip}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, nip: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mata Pelajaran</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.subject}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Login</label>
                  <input
                    type="email"
                    required
                    value={editingTeacher.email}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password Akun</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.password || 'guru123'}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, password: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditTeacherOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: TAMBAH KEPALA SEKOLAH */}
      {/* ---------------------------------------------------- */}
      {isAddPrincipalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Tambah Kepala Sekolah</h3>
                <p className="text-xs text-slate-400">Daftarkan akun pimpinan institusi dan wewenangnya</p>
              </div>
              <button
                onClick={() => setIsAddPrincipalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPrincipalSubmit} className="space-y-3.5 my-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Dr. H. Bambang Sutrisno, M.Pd"
                  value={newPrincipalName}
                  onChange={(e) => setNewPrincipalName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NIP (18 Digit)</label>
                  <input
                    type="text"
                    required
                    placeholder="197001011995011001"
                    value={newPrincipalNip}
                    onChange={(e) => setNewPrincipalNip(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Periode Jabatan</label>
                  <input
                    type="text"
                    required
                    placeholder="2024 - 2028"
                    value={newPrincipalPeriod}
                    onChange={(e) => setNewPrincipalPeriod(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Login</label>
                  <input
                    type="email"
                    required
                    placeholder="kepsek@school.sch.id"
                    value={newPrincipalEmail}
                    onChange={(e) => setNewPrincipalEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password Akun</label>
                  <input
                    type="text"
                    required
                    value={newPrincipalPassword}
                    onChange={(e) => setNewPrincipalPassword(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Fokus Job Desk & Tugas Utama</label>
                <textarea
                  rows={2}
                  required
                  value={newPrincipalJobDesk}
                  onChange={(e) => setNewPrincipalJobDesk(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                >
                  Simpan Kepala Sekolah
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddPrincipalOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: EDIT KEPALA SEKOLAH */}
      {/* ---------------------------------------------------- */}
      {isEditPrincipalOpen && editingPrincipal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Edit Data Kepala Sekolah</h3>
                <p className="text-xs text-slate-400">Perbarui profil, masa bakti, email, dan password</p>
              </div>
              <button
                onClick={() => setIsEditPrincipalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditPrincipal} className="space-y-3.5 my-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={editingPrincipal.name}
                  onChange={(e) => setEditingPrincipal({ ...editingPrincipal, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NIP</label>
                  <input
                    type="text"
                    required
                    value={editingPrincipal.nip}
                    onChange={(e) => setEditingPrincipal({ ...editingPrincipal, nip: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Periode Jabatan</label>
                  <input
                    type="text"
                    required
                    value={editingPrincipal.period}
                    onChange={(e) => setEditingPrincipal({ ...editingPrincipal, period: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Login</label>
                  <input
                    type="email"
                    required
                    value={editingPrincipal.email}
                    onChange={(e) => setEditingPrincipal({ ...editingPrincipal, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password Akun</label>
                  <input
                    type="text"
                    required
                    value={editingPrincipal.password || 'kepsek123'}
                    onChange={(e) => setEditingPrincipal({ ...editingPrincipal, password: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Fokus Job Desk & Tugas Utama</label>
                <textarea
                  rows={2}
                  required
                  value={editingPrincipal.jobDesk}
                  onChange={(e) => setEditingPrincipal({ ...editingPrincipal, jobDesk: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditPrincipalOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: TAMBAH KURIKULUM */}
      {/* ---------------------------------------------------- */}
      {isAddCurriculumOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Tambah Tim Kurikulum</h3>
                <p className="text-xs text-slate-400">Daftarkan akun pengembang kurikulum dan wewenangnya</p>
              </div>
              <button
                onClick={() => setIsAddCurriculumOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCurriculumSubmit} className="space-y-3.5 my-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Ahmad Zaki, M.Pd"
                  value={newCurriculumName}
                  onChange={(e) => setNewCurriculumName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NIP (18 Digit)</label>
                  <input
                    type="text"
                    required
                    placeholder="198402122008011003"
                    value={newCurriculumNip}
                    onChange={(e) => setNewCurriculumNip(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jabatan Struktural</label>
                  <input
                    type="text"
                    required
                    placeholder="Waka Bidang Kurikulum"
                    value={newCurriculumPosition}
                    onChange={(e) => setNewCurriculumPosition(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Login</label>
                  <input
                    type="email"
                    required
                    placeholder="kurikulum@school.sch.id"
                    value={newCurriculumEmail}
                    onChange={(e) => setNewCurriculumEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password Akun</label>
                  <input
                    type="text"
                    required
                    value={newCurriculumPassword}
                    onChange={(e) => setNewCurriculumPassword(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tugas & Job Desk Kurikulum</label>
                <textarea
                  rows={2}
                  required
                  value={newCurriculumJobDesk}
                  onChange={(e) => setNewCurriculumJobDesk(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                >
                  Simpan Tim Kurikulum
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddCurriculumOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: EDIT KURIKULUM */}
      {/* ---------------------------------------------------- */}
      {isEditCurriculumOpen && editingCurriculum && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Edit Data Tim Kurikulum</h3>
                <p className="text-xs text-slate-400">Perbarui profil, posisi, email, dan password</p>
              </div>
              <button
                onClick={() => setIsEditCurriculumOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditCurriculum} className="space-y-3.5 my-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={editingCurriculum.name}
                  onChange={(e) => setEditingCurriculum({ ...editingCurriculum, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NIP</label>
                  <input
                    type="text"
                    required
                    value={editingCurriculum.nip}
                    onChange={(e) => setEditingCurriculum({ ...editingCurriculum, nip: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jabatan</label>
                  <input
                    type="text"
                    required
                    value={editingCurriculum.position}
                    onChange={(e) => setEditingCurriculum({ ...editingCurriculum, position: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Login</label>
                  <input
                    type="email"
                    required
                    value={editingCurriculum.email}
                    onChange={(e) => setEditingCurriculum({ ...editingCurriculum, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password Akun</label>
                  <input
                    type="text"
                    required
                    value={editingCurriculum.password || 'kurikulum123'}
                    onChange={(e) => setEditingCurriculum({ ...editingCurriculum, password: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tugas & Job Desk Kurikulum</label>
                <textarea
                  rows={2}
                  required
                  value={editingCurriculum.jobDesk}
                  onChange={(e) => setEditingCurriculum({ ...editingCurriculum, jobDesk: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditCurriculumOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* FLOATING TOAST NOTIFICATION */}
      {/* ---------------------------------------------------- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-fade-in border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
