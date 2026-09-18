export interface SchoolClass {
  id: number;
  name: string;
  grade: number;
  major: string;
  isPlus: boolean;
  capacity: number;
  totalStudents: number;
  homeroomTeacher: string;
}

export interface Teacher {
  id: number;
  name: string;
  nip: string;
  email: string;
  password?: string;
  subject: string;
  gender: 'L' | 'P';
  phone: string;
  avatar: string;
  status: 'Aktif' | 'Cuti';
}

export interface Student {
  id: number;
  nisn: string;
  name: string;
  className: string;
  gender: 'L' | 'P';
  email: string;
  password?: string;
  phone: string;
  avatar: string;
  status: 'Aktif' | 'Alumni';
}

export interface Principal {
  id: number;
  name: string;
  nip: string;
  email: string;
  password?: string;
  phone: string;
  gender: 'L' | 'P';
  period: string;
  status: 'Aktif' | 'Nonaktif';
  avatar: string;
  jobDesk: string;
}

export interface CurriculumHead {
  id: number;
  name: string;
  nip: string;
  email: string;
  password?: string;
  phone: string;
  gender: 'L' | 'P';
  position: string;
  status: 'Aktif' | 'Cuti';
  avatar: string;
  jobDesk: string;
}

export interface Subject {
  id: number;
  code: string;
  name: string;
  teacher: string;
  grade: string;
  hours: number;
  category: 'Kejuruan (PPLG)' | 'Umum' | 'Muatan Lokal';
}

export interface AcademicEvent {
  id: number;
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
  color?: string;
}

export interface RecentActivity {
  id: number;
  user: string;
  avatar: string;
  action: string;
  time: string;
  type: 'upload' | 'submission' | 'schedule' | 'download' | 'announcement';
}

export interface SchoolNotification {
  id: number;
  title: string;
  time: string;
  type: 'assignment' | 'warning' | 'user' | 'calendar';
  read: boolean;
}

export interface Announcement {
  id: number;
  title: string;
  author: string;
  date: string;
  target: 'Semua' | 'Guru' | 'Siswa' | '12 PPLG 2';
  content: string;
  important: boolean;
}

const rawClassNames = [
  "10 DKV PLUS", "10 DKV 1", "10 DKV 2", "10 TJKT PLUS", "10 TJKT 1", "10 TJKT 2", "10 TJKT 3", "10 TJKT 4", "10 TJKT 5", "10 PPLG 1", "10 PPLG 2", "10 PEMASARAN 1", "10 PEMASARAN 2", "10 MPLB PLUS", "10 MPLB 1", "10 MPLB 2", "10 MPLB 3", "10 MPLB 4", "10 MPLB 5",
  "11 DKV PLUS", "11 DKV 1", "11 DKV 2", "11 TJKT PLUS", "11 TJKT 1", "11 TJKT 2", "11 TJKT 3", "11 TJKT 4", "11 TJKT 5", "11 TJKT 6", "11 TJKT 7", "11 PPLG 1", "11 PPLG 2", "11 PEMASARAN 1", "11 PEMASARAN 2", "11 PEMASARAN 3", "11 MPLB PLUS", "11 MPLB 1", "11 MPLB 2", "11 MPLB 3", "11 MPLB 4", "11 MPLB 5",
  "12 DKV PLUS", "12 DKV 1", "12 DKV 2", "12 TJKT PLUS", "12 TJKT 1", "12 TJKT 2", "12 TJKT 3", "12 TJKT 4", "12 TJKT 5", "12 TJKT 6", "12 TJKT 7", "12 PPLG 1", "12 PPLG 2", "12 PEMASARAN 1", "12 PEMASARAN 2", "12 PEMASARAN 3", "12 MPLB PLUS", "12 MPLB 1", "12 MPLB 2", "12 MPLB 3", "12 MPLB 4", "12 MPLB 5"
];

export const INITIAL_CLASSES: SchoolClass[] = rawClassNames.map((name, index) => {
  const grade = parseInt(name.substring(0, 2), 10);
  const parts = name.split(' ');
  const major = parts[1] || 'UMUM';
  const isPlus = name.includes('PLUS');
  const teachers = [
    'Dewi Lestari, S.Kom', 'Ahmad Fauzi, M.Pd', 'Bambang Wijaya, S.T', 
    'Rahmania, S.Si', 'Sri Wulandari, S.Pd', 'Hendra Gunawan, S.Kom'
  ];

  const capacity = name === '12 PPLG 2' ? 36 : Math.floor(32 + ((index * 7) % 6));
  const totalStudents = name === '12 PPLG 2' ? 3 : (name === '12 PPLG 1' || name === '11 DKV PLUS' || name === '10 TJKT 1' ? 1 : 0);

  return {
    id: index + 1,
    name,
    grade,
    major,
    isPlus,
    capacity,
    totalStudents,
    homeroomTeacher: teachers[index % teachers.length],
  };
});

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 1,
    name: 'Rahmania, S.Si',
    nip: '198803152012012003',
    email: 'rahmania@school.sch.id',
    password: 'guru123',
    subject: 'Fisika Terapan',
    gender: 'P',
    phone: '0812-3456-7890',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  },
  {
    id: 2,
    name: 'Ahmad Fauzi, M.Pd',
    nip: '198405202008011002',
    email: 'ahmad.fauzi@school.sch.id',
    password: 'guru123',
    subject: 'Matematika Produktif',
    gender: 'L',
    phone: '0813-9876-5432',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  },
  {
    id: 3,
    name: 'Dewi Lestari, S.Kom',
    nip: '199208102018022004',
    email: 'dewi.lestari@school.sch.id',
    password: 'guru123',
    subject: 'Pemrograman Web (PPLG)',
    gender: 'P',
    phone: '0821-4567-8910',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  },
  {
    id: 4,
    name: 'Sri Wulandari, S.Pd',
    nip: '198911042014022001',
    email: 'sri.wulandari@school.sch.id',
    password: 'guru123',
    subject: 'Sejarah Indonesia',
    gender: 'P',
    phone: '0857-1234-5678',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  },
  {
    id: 5,
    name: 'Bambang Wijaya, S.T',
    nip: '197901152005011008',
    email: 'bambang.wijaya@school.sch.id',
    password: 'guru123',
    subject: 'Basis Data & Rekayasa Perangkat Lunak',
    gender: 'L',
    phone: '0811-2233-4455',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  },
  {
    id: 6,
    name: 'Hendra Gunawan, S.Kom',
    nip: '199407222020011005',
    email: 'hendra.gunawan@school.sch.id',
    password: 'guru123',
    subject: 'Pemodelan Perangkat Lunak',
    gender: 'L',
    phone: '0819-3344-5566',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  }
];

export interface Assignment {
  id: number;
  title: string;
  subject: string;
  className: string;
  month: string;
}

export interface Exam {
  id: number;
  title: string;
  subject: string;
  className: string;
  month: string;
}

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  { id: 1, title: 'Tugas 1 - Desain ERD Database', subject: 'Basis Data', className: '12 PPLG 2', month: 'Jul' },
  { id: 2, title: 'Tugas 2 - Pembuatan Komponen React', subject: 'Pemrograman Web', className: '12 PPLG 2', month: 'Jul' },
  { id: 3, title: 'Tugas 3 - Logika Aljabar Terapan', subject: 'Matematika Terapan', className: '10 DKV PLUS', month: 'Ags' },
  { id: 4, title: 'Tugas 4 - Konfigurasi Routing MikroTik', subject: 'Jaringan Dasar', className: '11 TJKT 1', month: 'Sep' },
  { id: 5, title: 'Tugas 5 - Desain Mockup UI/UX Mobile', subject: 'Pemrograman Mobile', className: '12 PPLG 1', month: 'Okt' },
  { id: 6, title: 'Tugas 6 - Laporan Praktikum Sensor', subject: 'Fisika Terapan', className: '10 PPLG 1', month: 'Nov' },
  { id: 7, title: 'Tugas 7 - Final Project LMS Deployment', subject: 'Pemrograman Web', className: '12 PPLG 2', month: 'Des' },
];

export const INITIAL_EXAMS: Exam[] = [
  { id: 1, title: 'Kuis 1 - Sintaks SQL Dasar', subject: 'Basis Data', className: '12 PPLG 2', month: 'Jul' },
  { id: 2, title: 'UTS Ganjil - Teori Algoritma', subject: 'Pemrograman Web', className: '12 PPLG 2', month: 'Sep' },
  { id: 3, title: 'Praktik Kejuruan - Slicing UI Figma', subject: 'DKV Terapan', className: '11 DKV PLUS', month: 'Okt' },
  { id: 4, title: 'UAS Teori - Arsitektur Web Service', subject: 'Pemrograman Web', className: '12 PPLG 2', month: 'Des' },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 1,
    nisn: '0061234567',
    name: 'Fabian Nanday',
    className: '12 PPLG 2',
    gender: 'L',
    email: 'fabiannanday77@gmail.com',
    password: 'siswa123',
    phone: '0812-9988-7766',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  },
  {
    id: 2,
    nisn: '0061234568',
    name: 'Budi Santoso',
    className: '12 PPLG 2',
    gender: 'L',
    email: 'budi.santoso@student.sch.id',
    password: 'siswa123',
    phone: '0813-1122-3344',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  },
  {
    id: 3,
    nisn: '0061234569',
    name: 'Siti Aisyah',
    className: '12 PPLG 2',
    gender: 'P',
    email: 'siti.aisyah@student.sch.id',
    password: 'siswa123',
    phone: '0815-5566-7788',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  },
  {
    id: 4,
    nisn: '0061234570',
    name: 'Dimas Pratama',
    className: '12 PPLG 1',
    gender: 'L',
    email: 'dimas.pratama@student.sch.id',
    password: 'siswa123',
    phone: '0817-2233-4455',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  },
  {
    id: 5,
    nisn: '0061234571',
    name: 'Putri Anggraini',
    className: '11 DKV PLUS',
    gender: 'P',
    email: 'putri.a@student.sch.id',
    password: 'siswa123',
    phone: '0818-4455-6677',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  },
  {
    id: 6,
    nisn: '0061234572',
    name: 'Rian Hidayat',
    className: '10 TJKT 1',
    gender: 'L',
    email: 'rian.h@student.sch.id',
    password: 'siswa123',
    phone: '0819-7788-9900',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    status: 'Aktif',
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: 'PPLG-01',
    name: 'Pemrograman Web & Perangkat Bergerak',
    teacher: 'Dewi Lestari, S.Kom',
    grade: 'Kelas 11 & 12',
    hours: 8,
    category: 'Kejuruan (PPLG)',
  },
  {
    id: 2,
    code: 'PPLG-02',
    name: 'Basis Data & SQL Architecture',
    teacher: 'Bambang Wijaya, S.T',
    grade: 'Kelas 11 & 12',
    hours: 6,
    category: 'Kejuruan (PPLG)',
  },
  {
    id: 3,
    code: 'PPLG-03',
    name: 'Pemodelan Perangkat Lunak (UML & Scrum)',
    teacher: 'Hendra Gunawan, S.Kom',
    grade: 'Kelas 10 & 11',
    hours: 4,
    category: 'Kejuruan (PPLG)',
  },
  {
    id: 4,
    code: 'PPLG-04',
    name: 'Pemrograman Berorientasi Objek',
    teacher: 'Dewi Lestari, S.Kom',
    grade: 'Kelas 11 & 12',
    hours: 6,
    category: 'Kejuruan (PPLG)',
  },
  {
    id: 5,
    code: 'UMUM-01',
    name: 'Matematika Terapan SMK',
    teacher: 'Ahmad Fauzi, M.Pd',
    grade: 'Semua Tingkat',
    hours: 4,
    category: 'Umum',
  },
  {
    id: 6,
    code: 'UMUM-02',
    name: 'Fisika Terapan & Elektronika',
    teacher: 'Rahmania, S.Si',
    grade: 'Kelas 10 & 11',
    hours: 3,
    category: 'Umum',
  },
  {
    id: 7,
    code: 'UMUM-03',
    name: 'Sejarah Indonesia',
    teacher: 'Sri Wulandari, S.Pd',
    grade: 'Kelas 10',
    hours: 2,
    category: 'Umum',
  }
];

export const ACADEMIC_CALENDAR: AcademicEvent[] = [
  {
    id: 1,
    day: '12',
    month: 'DES',
    title: 'Ujian Akhir Semester',
    time: '08.00 - 12.00 WIB',
    location: 'Lab Komputer & Ruang Kelas',
    color: 'blue'
  },
  {
    id: 2,
    day: '18',
    month: 'DES',
    title: 'Rapat Wali Kelas',
    time: '13.00 WIB - Aula',
    location: 'Aula Utama SMK',
    color: 'indigo'
  },
  {
    id: 3,
    day: '22',
    month: 'DES',
    title: 'Pembagian Rapor',
    time: '09.00 WIB - Kelas',
    location: 'Masing-masing Ruang Kelas',
    color: 'emerald'
  },
  {
    id: 4,
    day: '25',
    month: 'DES',
    title: 'Libur Semester Ganjil',
    time: 'Sepanjang hari',
    location: 'Hari Libur Nasional',
    color: 'amber'
  },
  {
    id: 5,
    day: '05',
    month: 'JAN',
    title: 'Awal Masuk Semester Genap',
    time: '07.00 WIB - Selesai',
    location: 'Lapangan Upacara',
    color: 'purple'
  }
];

export const RECENT_ACTIVITIES: RecentActivity[] = [
  {
    id: 1,
    user: 'Rahmania',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80',
    action: 'Mengunggah materi Fisika Bab 5',
    time: '5 menit lalu',
    type: 'upload',
  },
  {
    id: 2,
    user: 'Ahmad Fauzi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    action: 'Mengumpulkan tugas Matematika',
    time: '22 menit lalu',
    type: 'submission',
  },
  {
    id: 3,
    user: 'Dewi Lestari',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
    action: 'Membuat jadwal ujian Biologi',
    time: '1 jam lalu',
    type: 'schedule',
  },
  {
    id: 4,
    user: 'sri Wulandari',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80',
    action: 'Mengunduh materi Sejarah',
    time: '2 jam lalu',
    type: 'download',
  },
  {
    id: 5,
    user: 'Bambang Wijaya',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    action: 'Menambahkan pengumuman baru',
    time: '3 jam lalu',
    type: 'announcement',
  }
];

export const NOTIFICATIONS: SchoolNotification[] = [
  {
    id: 1,
    title: '15 tugas baru menunggu ditinjau',
    time: 'Baru saja',
    type: 'assignment',
    read: false,
  },
  {
    id: 2,
    title: '3 guru belum mengisi nilai UAS',
    time: '30 menit lalu',
    type: 'warning',
    read: false,
  },
  {
    id: 3,
    title: '12 siswa baru terdaftar hari ini',
    time: '1 jam lalu',
    type: 'user',
    read: false,
  },
  {
    id: 4,
    title: 'Jadwal UAS akan dimulai besok',
    time: '2 jam lalu',
    type: 'calendar',
    read: false,
  }
];

export const MONTHLY_CHART_DATA = [
  { month: 'Jul', tugas: 38, ujian: 20 },
  { month: 'Ags', tugas: 55, ujian: 28 },
  { month: 'Sep', tugas: 46, ujian: 52 },
  { month: 'Okt', tugas: 78, ujian: 40 },
  { month: 'Nov', tugas: 62, ujian: 68 },
  { month: 'Des', tugas: 90, ujian: 60 },
];

export const INITIAL_PRINCIPALS: Principal[] = [
  {
    id: 1,
    name: 'Dr. H. Sulaiman Mansyur, M.M., M.Pd',
    nip: '196805121992031004',
    email: 'kepsek@school.sch.id',
    password: 'kepsek123',
    phone: '0811-9876-5432',
    gender: 'L',
    period: '2023 - 2027',
    status: 'Aktif',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
    jobDesk: 'Penanggung Jawab Tertinggi Mutu Pendidikan, Supervisi Manajerial, Pengesahan Kebijakan, Kemitraan Industri & Akreditasi A Unggul',
  },
  {
    id: 2,
    name: 'Dra. Hj. Nurul Hidayati, M.Pd',
    nip: '197109201997022001',
    email: 'nurul.hidayati@school.sch.id',
    password: 'kepsek123',
    phone: '0812-8877-6655',
    gender: 'P',
    period: '2019 - 2023 (Demisioner)',
    status: 'Nonaktif',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    jobDesk: 'Dewan Pertimbangan Sekolah, Pembina Komite & Konsultan Pengembangan Mutu Kejuruan',
  },
];

export const INITIAL_CURRICULUM_HEADS: CurriculumHead[] = [
  {
    id: 1,
    name: 'Ir. M. Taufik Ridwan, M.T',
    nip: '198104142006041007',
    email: 'kurikulum@school.sch.id',
    password: 'kurikulum123',
    phone: '0813-4455-8899',
    gender: 'L',
    position: 'Wakil Kepala Sekolah Bidang Kurikulum (Waka Kurikulum)',
    status: 'Aktif',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    jobDesk: 'Penyusunan Struktur Kurikulum Merdeka, Pembagian Jam Mengajar (Beban Kerja Guru), Pengaturan Jadwal KBM, Penjadwalan Asesmen & Uji Kompetensi Keahlian (UKK)',
  },
  {
    id: 2,
    name: 'Siti Maryam, S.Pd., M.Kom',
    nip: '198708152011012015',
    email: 'siti.maryam@school.sch.id',
    password: 'kurikulum123',
    phone: '0858-1122-3344',
    gender: 'P',
    position: 'Sekretaris Tim Kurikulum & Verifikator Modul Ajar',
    status: 'Aktif',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    jobDesk: 'Verifikasi Modul Ajar & RPP Guru, Rekapitulasi Presensi Pembelajaran, Sinkronisasi Kalender Akademik & Penilaian Raport',
  },
];

export const DEFAULT_ADMIN_ACCOUNT = {
  id: 0,
  name: 'Fabian Admin',
  email: 'admin@school.sch.id',
  password: 'admin123',
  role: 'Administrator' as const,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
  jobDesk: 'Pengelola Penuh Sistem SIAS, Manajemen Pengguna & Kredensial, Konfigurasi Kelas & Keamanan Data',
};
