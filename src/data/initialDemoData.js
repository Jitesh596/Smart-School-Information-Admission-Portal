// Initial pre-seeded demo data for Smart School Information & Admission Portal
// This seed data powers both Firestore initialization and out-of-the-box LocalStorage stateful fallback.

export const initialSchoolInfo = {
  schoolName: "Apex International Academy",
  tagline: "Empowering Students. Building Futures.",
  principalName: "Dr. Evelyn Vance, Ph.D.",
  description: "Apex International Academy is a premier co-educational institution committed to academic excellence, character development, and holistic innovation. Established in 1998, we nurture young minds to become compassionate global leaders.",
  vision: "To cultivate a dynamic learning community that inspires intellectual curiosity, ethical leadership, and global citizenship.",
  mission: "Providing world-class education through progressive curricula, state-of-the-art facilities, dedicated educators, and an inclusive culture.",
  address: "450 Innovation Parkway, Knowledge City, Metro District, 560012",
  phone: "+1 (800) 555-APEX / +1 (800) 555-0199",
  email: "admissions@apexacademy.edu",
  website: "https://apexacademy.edu",
  schoolTimings: "Monday - Friday: 8:00 AM - 3:30 PM (Saturday: 8:30 AM - 12:30 PM)",
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com"
  },
  establishedYear: "1998",
  totalStudentsCount: 1250,
  totalFacultyCount: 85,
  campusArea: "25 Acres",
  passPercentage: "99.4%"
};

export const initialNotices = [
  {
    id: "not-1",
    title: "Admissions Open for Academic Year 2025-26",
    description: "Online applications for Grades K-12 are now officially open. Early bird processing available for applications submitted before November 30th.",
    date: "2025-09-15",
    category: "Admissions",
    status: "Active",
    important: true
  },
  {
    id: "not-2",
    title: "Annual STEM & Robotics Exhibition 2025",
    description: "Students from Classes 6 to 12 will showcase innovative projects in AI, IoT, and Renewable Energy in the Main Auditorium.",
    date: "2025-10-05",
    category: "Academics",
    status: "Active",
    important: true
  },
  {
    id: "not-3",
    title: "Parent-Teacher Association (PTA) General Assembly",
    description: "All parents are invited to join the upcoming quarterly PTA meeting to review academic milestones and co-curricular updates.",
    date: "2025-09-28",
    category: "General",
    status: "Active",
    important: false
  },
  {
    id: "not-4",
    title: "Mid-Term Examination Schedule & Syllabus",
    description: "Detailed timetable and portion guides for mid-term assessments have been published on the student portal.",
    date: "2025-09-10",
    category: "Exams",
    status: "Active",
    important: false
  },
  {
    id: "not-5",
    title: "Inter-School Swimming Championship Victory",
    description: "Apex Academy Aquatic Team wins 12 Gold Medals at the State Interschool Championship!",
    date: "2025-09-02",
    category: "Sports",
    status: "Active",
    important: false
  }
];

export const initialEvents = [
  {
    id: "evt-1",
    title: "Annual Sports Day & Athletics Meet",
    description: "A grand day of track events, gymnastics display, march past, and inter-house championship trophies.",
    date: "2025-10-24",
    time: "08:30 AM - 04:00 PM",
    location: "Apex Athletics Stadium",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "evt-2",
    title: "Global Cultural & Heritage Fest",
    description: "Celebrating diversity through food stalls, traditional dance performances, music, and international art exhibits.",
    date: "2025-11-12",
    time: "10:00 AM - 05:00 PM",
    location: "School Amphitheatre & Grounds",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "evt-3",
    title: "National Science & Innovation Summit",
    description: "Keynote talks by eminent scientists, live coding challenges, and interactive space exploration booths.",
    date: "2025-11-28",
    time: "09:00 AM - 03:30 PM",
    location: "Main Convention Hall",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "evt-4",
    title: "Alumni Leadership Colloquium",
    description: "Distinguished alumni share career insights and mentorship advice with high school seniors.",
    date: "2025-12-05",
    time: "11:00 AM - 02:00 PM",
    location: "Apex Digital Library Auditorium",
    category: "Career",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialFaculty = [
  {
    id: "fac-1",
    name: "Dr. Robert Sterling",
    subject: "Advanced Physics & Astronomy",
    qualification: "Ph.D. in Theoretical Physics (MIT)",
    experience: "16 Years",
    email: "robert.sterling@apexacademy.edu",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    description: "Passionate about astrophysics, quantum mechanics, and guiding students into premier university research programs."
  },
  {
    id: "fac-2",
    name: "Prof. Sarah Jenkins",
    subject: "Mathematics & Computer Science",
    qualification: "M.S. Computer Science (Stanford)",
    experience: "12 Years",
    email: "sarah.jenkins@apexacademy.edu",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    description: "Specializes in algorithmic thinking, robotics lab coaching, and competitive mathematics."
  },
  {
    id: "fac-3",
    name: "Elena Rostova",
    subject: "World History & International Relations",
    qualification: "M.A. European History (Oxford)",
    experience: "14 Years",
    email: "elena.rostova@apexacademy.edu",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    description: "Head of Model United Nations Club. Mentors students in diplomacy, debate, and global historical analysis."
  },
  {
    id: "fac-4",
    name: "Marcus Thorne",
    subject: "Chemistry & Environmental Science",
    qualification: "M.Sc. Biochemistry (UC Berkeley)",
    experience: "10 Years",
    email: "marcus.thorne@apexacademy.edu",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    description: "Leads school sustainability initiatives and organic chemistry lab projects."
  },
  {
    id: "fac-5",
    name: "Grace Lin",
    subject: "English Literature & Creative Writing",
    qualification: "M.A. English Literature (Harvard)",
    experience: "9 Years",
    email: "grace.lin@apexacademy.edu",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    description: "Editor-in-Chief of the Apex Literary Review. Inspires young writers and poets."
  }
];

export const initialFacilities = [
  {
    id: "facil-1",
    name: "Next-Gen STEM & AI Laboratory",
    category: "Academic",
    description: "Equipped with 3D printers, IoT hardware kits, humanoid robots, and high-performance workstation PCs for hands-on machine learning experiments.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "facil-2",
    name: "Olympic-Standard Aquatic Center",
    category: "Sports",
    description: "Temperature-controlled 50-meter 8-lane swimming pool with certified lifeguard supervision and digital timing equipment.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "facil-3",
    name: "Central Knowledge Hub & e-Library",
    category: "Academic",
    description: "Over 45,000 physical volumes, quiet study pods, access to IEEE/JSTOR digital archives, and e-reader lending library.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "facil-4",
    name: "Performing Arts & Visual Media Studio",
    category: "Arts",
    description: "A 600-seater acoustic auditorium, green-screen audio/video recording suite, orchestral rehearsal hall, and ceramic pottery studio.",
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "facil-5",
    name: "Sports Complex & Turf Stadium",
    category: "Sports",
    description: "Synthetic athletic track, FIFA-standard football ground, indoor basketball courts, tennis courts, and fitness gymnasium.",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "facil-6",
    name: "Smart Organic Cafeteria",
    category: "Amenities",
    description: "Hygienic dining facility serving balanced, nutritionist-designed organic meals and fresh juices with automated cashless payments.",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialCourses = [
  {
    id: "crs-1",
    name: "Primary Elementary Program (Grades 1 - 5)",
    code: "PEP-101",
    level: "Primary",
    duration: "5 Academic Years",
    description: "Focuses on foundational literacy, numeracy, experiential science, arts, and emotional intelligence in an inquiry-based environment.",
    subjects: ["English", "Mathematics", "Environmental Science", "Computer Fundamentals", "Visual Arts", "Physical Education", "Second Language"]
  },
  {
    id: "crs-2",
    name: "Middle Years IB & National Prep (Grades 6 - 8)",
    code: "MYP-201",
    level: "Middle",
    duration: "3 Academic Years",
    description: "Develops critical thinking, interdisciplinary STEM projects, language mastery, and digital citizenship.",
    subjects: ["Physics", "Chemistry", "Biology", "Algebra & Geometry", "World History", "Geography", "Python Programming", "Foreign Languages"]
  },
  {
    id: "crs-3",
    name: "Senior High Science Stream (Grades 9 - 12)",
    code: "SHS-SCI",
    level: "Secondary",
    duration: "4 Academic Years",
    description: "Rigorous preparation for university engineering, medicine, and pure science careers with advanced laboratory immersion.",
    subjects: ["Advanced Physics", "Organic & Inorganic Chemistry", "Calculus & Statistics", "Computer Science / Biology", "English Rhetoric"]
  },
  {
    id: "crs-4",
    name: "Senior High Commerce & Economics (Grades 9 - 12)",
    code: "SHS-COM",
    level: "Secondary",
    duration: "4 Academic Years",
    description: "Designed for future entrepreneurs and finance leaders. Covers accounting, macroeconomics, business law, and data analytics.",
    subjects: ["Accountancy", "Business Studies", "Economics", "Applied Mathematics", "Entrepreneurship", "Financial Markets"]
  },
  {
    id: "crs-5",
    name: "Humanities & Liberal Arts (Grades 9 - 12)",
    code: "SHS-HUM",
    level: "Secondary",
    duration: "4 Academic Years",
    description: "Prepares students for law, media, psychology, and public policy through intensive writing, debate, and social research.",
    subjects: ["Psychology", "Sociology", "Political Science", "World Literature", "Fine Arts", "Mass Communication"]
  }
];

export const initialAchievements = [
  {
    id: "ach-1",
    title: "1st Rank in National Science Olympiad 2025",
    description: "Apex student team secured top national rank among 4,000 participating schools across the country.",
    date: "2025-08-18",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ach-2",
    title: "Best Eco-Friendly Green School Award",
    description: "Recognized by the Ministry of Education for zero-waste campus management and 100kW solar energy initiative.",
    date: "2025-06-05",
    category: "Institutional",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ach-3",
    title: "International Robotics Championship Winner",
    description: "Robotics Club 'Apex Automation' bagged 1st prize in Autonomous Navigation at Tokyo Robotics Expo.",
    date: "2025-05-14",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ach-4",
    title: "State Championship Basketball Winners",
    description: "Boys U-17 Basketball team defeated Central High 68-54 in an intense championship final.",
    date: "2025-03-22",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialGallery = [
  {
    id: "gal-1",
    title: "Annual Sports Meet 2025",
    description: "Grand march past during opening ceremony",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-2",
    title: "Robotics & Innovation Lab",
    description: "Students testing autonomous drone prototype",
    category: "Academics",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-3",
    title: "Cultural Festival Dance Performance",
    description: "Traditional classical fusion dance ensemble",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-4",
    title: "Central Library Quiet Zone",
    description: "Students collaborating on research papers",
    category: "Campus",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-5",
    title: "Visual Art Exhibition",
    description: "Oil paintings and sculptures by Grade 11 artists",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-6",
    title: "Graduation Ceremony 2025",
    description: "Class of 2025 celebrating cap toss",
    category: "Events",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialApplications = [
  {
    id: "APP-2025-001",
    studentId: "std-demo-1",
    fullName: "Rahul Sharma",
    dateOfBirth: "2010-05-14",
    gender: "Male",
    email: "student@example.com",
    phone: "+1 (555) 234-5678",
    address: "124 Parkview Heights, Apartment 4B",
    city: "Metro City",
    state: "State Province",
    pinCode: "560001",
    fatherName: "Vikram Sharma",
    motherName: "Sunita Sharma",
    guardianPhone: "+1 (555) 987-6543",
    guardianEmail: "vikram.sharma@example.com",
    previousSchool: "St. Jude Grammar School",
    previousClass: "Grade 8",
    percentage: "94.5%",
    classApplied: "Senior High Science Stream (Grade 9)",
    message: "Seeking admission for my son Rahul in the science stream with computer science focus.",
    status: "Under Review", // Options: "Pending", "Under Review", "Approved", "Rejected"
    submittedAt: "2025-09-18T10:30:00.000Z",
    documents: [
      { name: "Birth_Certificate.pdf", url: "#" },
      { name: "Report_Card_Grade8.pdf", url: "#" }
    ]
  },
  {
    id: "APP-2025-002",
    studentId: "std-demo-2",
    fullName: "Ananya Patel",
    dateOfBirth: "2012-11-20",
    gender: "Female",
    email: "ananya.patel@example.com",
    phone: "+1 (555) 456-7890",
    address: "88 Orchid Avenue",
    city: "Green Valley",
    state: "State Province",
    pinCode: "560045",
    fatherName: "Rajesh Patel",
    motherName: "Priya Patel",
    guardianPhone: "+1 (555) 876-5432",
    guardianEmail: "rajesh.patel@example.com",
    previousSchool: "Oakridge International",
    previousClass: "Grade 6",
    percentage: "91.0%",
    classApplied: "Middle Years IB (Grade 7)",
    message: "Ananya is enthusiastic about joining the school debate and swimming team.",
    status: "Approved",
    submittedAt: "2025-09-15T14:20:00.000Z",
    documents: [
      { name: "Transfer_Certificate.pdf", url: "#" }
    ]
  },
  {
    id: "APP-2025-003",
    studentId: "std-demo-3",
    fullName: "David Miller",
    dateOfBirth: "2009-03-08",
    gender: "Male",
    email: "david.m@example.com",
    phone: "+1 (555) 345-6789",
    address: "12 Riverbank Road",
    city: "Metro City",
    state: "State Province",
    pinCode: "560012",
    fatherName: "Edward Miller",
    motherName: "Sarah Miller",
    guardianPhone: "+1 (555) 654-3210",
    guardianEmail: "edward.m@example.com",
    previousSchool: "Lincoln High School",
    previousClass: "Grade 9",
    percentage: "88.2%",
    classApplied: "Senior High Commerce Stream (Grade 10)",
    message: "Interested in economics and football program.",
    status: "Pending",
    submittedAt: "2025-09-21T09:15:00.000Z",
    documents: []
  }
];

export const initialUsers = [
  {
    uid: "admin-demo-id",
    name: "System Admin",
    email: "admin@example.com",
    phone: "+1 (800) 555-0000",
    role: "admin",
    createdAt: "2025-01-01T00:00:00.000Z"
  },
  {
    uid: "std-demo-1",
    name: "Rahul Sharma",
    email: "student@example.com",
    phone: "+1 (555) 234-5678",
    role: "student",
    createdAt: "2025-09-18T10:00:00.000Z"
  }
];
