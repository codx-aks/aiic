import React, { useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  "All",
  "Academic / Research / Innovation / Invention",
  "Corporate / Industry",
  "Entrepreneurial Venture",
  "Public Administration",
  "Service to the Society",
];

const AWARDEES = [
  // 2025 ------
  {
    name: "Dr. Ramkumar Narayanswamy",
    batch: "UG/ECE/1984",
    current: "Fellow and Head of Technical Marketing, NIL Technologies Aps, USA",
    category: "Academic / Research / Innovation / Invention",
    year: 2025,
    photo: "/daa2025/daa1.jpg",
  },
  {
    name: "Mr. N Surendran",
    batch: "UG/Mechanical/1986",
    current: "Retd., Project Director SpaDex, ISRO, GoI",
    category: "Academic / Research / Innovation / Invention",
    year: 2025,
    photo: "/daa2025/daa2.jpg",
  },
  {
    name: "Mr. Gajraj Singh Rathore",
    batch: "UG/MME/1985",
    current: "Whole Time Director & Chief Operating Officer, JSW Steels Ltd., Mumbai",
    category: "Corporate / Industry",
    year: 2025,
    photo: "/daa2025/daa3.jpg",
  },
  {
    name: "Dr. Raja Gunasingh Kasilingam",
    batch: "UG/Industrial Engineering/1980",
    current: "President, Revenue Technology Services, USA",
    category: "Corporate / Industry",
    year: 2025,
    photo: "/daa2025/daa4.jpg",
  },
  {
    name: "Mr. Venkatesh Jayaraman",
    batch: "UG/CIVIL/1984",
    current: "Chief Operating Officer, Bioxgreen Technology Pvt Ltd., Chennai",
    category: "Corporate / Industry",
    year: 2025,
    photo: "/daa2025/daa5.jpg",
  },
  {
    name: "Mr. Nipun Mehrotra",
    batch: "UG/EEE/1983 ",
    current: "CEO and Founder, The Agri Collaboratory, Bengaluru",
    category: "Corporate / Industry",
    year: 2025,
    photo: "/daa2025/daa6.jpg",
  },
  {
    name: "Mr. Vishwanathan Shankar",
    batch: "UG/Industrial Engineering/1979",
    current: "Retd., Chief Information Officer, Sundaram Clayton Ltd., Chennai",
    category: "Corporate / Industry",
    year: 2025,
    photo: "/daa2025/daa7.jpg",
  },
  {
    name: "Mr. G V Ravi Shankar",
    batch: "UG/CSE/1999",
    current: "Managing Director & Partner, Peak XV Partners, Bengaluru",
    category: "Corporate / Industry",
    year: 2025,
    photo: "/daa2025/daa8.jpg",
  },
  {
    name: "Ms. K Hema Rao",
    batch: "UG/EEE/1989",
    current: "Chief Service Officer & Board of Director, 3S Touch Service Solutions Pvt Ltd., Bengaluru",
    category: "Corporate / Industry",
    year: 2025,
    photo: "/daa2025/daa9.jpg",
  },
  {
    name: "Mr. S Jayaraman",
    batch: "UG/EEE/1984",
    current: "CEO, Sajas Electricals Group Companies, Trichy",
    category: "Entrepreneurial Venture",
    year: 2025,
    photo: "/daa2025/daa10.jpg",
  },
  {
    name: "(Late) Mr. K Ravi Ramachandran",
    batch: "UG/EEE/1986",
    current: "Retd., Principal Commissioner of Income Tax, GoI",
    category: "Public Administration",
    year: 2025,
    photo: "/daa2025/daa11.jpg",
  },
  {
    name: "Dr. Srinivasan Ram Ramanujam",
    batch: "UG/Chemical/1974",
    current: "Drs. Ram and Thaila Ramanujam Foundation, USA",
    category: "Service to the Society",
    year: 2025,
    photo: "/daa2025/daa13.jpg",
  },
  {
    name: "Mr. S N Srikanth",
    batch: "UG/Mechanical/1979",
    current: "Chairman and Managing Director, Hauer-Diana Group, Chennai",
    category: "Service to the Society",
    year: 2025,
    photo: "/daa2025/daa13.jpg",
  },



  // 2024 ------
  {
    name: "Mr. Siva Namasivayam",
    batch: "UG/CSE/1985",
    current: "CEO and Founder, Cohere Health, USA",
    category: "Entrepreneurial Venture",
    year: 2024,
    photo: "/daa2024/daa1.jpeg",
  },
  {
    name: "Mr. Saikumar G",
    batch: "UG/Industrial Engineering/1981",
    current: "Senior Advocate, Supreme Court of India New Delhi",
    category: "Public Administration",
    year: 2024,
    photo: "/daa2024/daa2.jpeg",
  },
  {
    name: "Mr. Tirumanjanam Kannan Rengarajan",
    batch: "UG/Mechanical/1983",
    current: "Retd. Corporate Vice President Microsoft Corporation, USA",
    category: "Corporate / Industry",
    year: 2024,
    photo: "/daa2024/daa3.jpeg",
  },
  {
    name: "Mr. Suresh Krishna",
    batch: "UG/Mechanical/1991",
    current: "President and CEO Northern Tool & Equipment, USA",
    category: "Corporate / Industry",
    year: 2024,
    photo: "/daa2024/daa4.jpeg",
  },
  {
    name: "Mr. Shyam Ramamurthy",
    batch: "UG/Chemical/1984",
    current: "Founder, Catalynk Business Solutions, Chennai",
    category: "Entrepreneurial Venture",
    year: 2024,
    photo: "/daa2024/daa5.jpeg",
  },
  {
    name: "Mr. Ramaswamy Visweswaran",
    batch: "UG/MME/1984",
    current: "Managing Director Arjas Modern Steel Private Limited, Bengaluru",
    category: "Corporate / Industry",
    year: 2024,
    photo: "/daa2024/daa6.jpeg",
  },
  {
    name: "Mr. K V Subramaniam",
    batch: "UG/Chemical/1979",
    current: "President, Reliance Industries Limited, Mumbai",
    category: "Corporate / Industry",
    year: 2024,
    photo: "/daa2024/daa7.jpeg",
  },
  {
    name: "Dr. Hari Mahadevan",
    batch: "UG/Chemical/1983",
    current: "Founder, Mahadevan Consulting LLC, USA",
    category: "Corporate / Industry",
    year: 2024,
    photo: "/daa2024/daa8.jpeg",
  },
  {
    name: "Prof. Naresh Bhatnagar",
    batch: "UG/Production/1984-85",
    current: "Professor, IIT Delhi",
    category: "Academic / Research / Innovation / Invention",
    year: 2024,
    photo: "/daa2024/daa9.jpeg",
  },
  {
    name: "Dr. Jegan Lal L",
    batch: "UG/Mechanical/1984",
    current: "Retd., Deputy Director, Systems Reliability & Quality Assurance, LPSC, ISRO, Trivandrum",
    category: "Academic / Research / Innovation / Invention",
    year: 2024,
    photo: "/daa2024/daa10.jpeg",
  },
  {
    name: "Mr. K V Balasubramaniam",
    batch: "UG/Mechanical/1979",
    current: "Advisor for Life Sciences Companies Retd. CEO, Bharat Serums & Vaccines, Mumbai",
    category: "Corporate / Industry",
    year: 2024,
    photo: "/daa2024/daa11.jpeg",
  },
  {
    name: "Prof. Devesh Ranjan",
    batch: "UG/Mechanical/2003",
    current: "Professor, Georgia Institute of Technology, USA",
    category: "Academic / Research / Innovation / Invention",
    year: 2024,
    photo: "/daa2024/daa12.jpeg",
  },




// 2023 -------



  {
    name: "Mr. Baskar Subramanian",
    batch: "UG/ECE/1984",
    current: "Executive Advisor, Tetherfi",
    category: "Academic / Research / Innovation / Invention",
    year: 2023,
    photo: "/daa2023/daa1.jpeg",
  },
  {
    name: "Mr. Krishna Sai",
    batch: "UG/ECE/1990",
    current: "Managing Director, Hello Telecom",
    category: "Corporate / Industry",
    year: 2023,
    photo: "/daa2023/daa2.jpeg",
  },
  {
    name: "Mr. L Adimoolam",
    batch: "UG/Mechanical/1985",
    current: "Business & Technical Head, Dinamalar",
    category: "Entrepreneurial Venture",
    year: 2023,
    photo: "/daa2023/daa3.jpeg",
  },
  {
    name: "Dr. K Venkatramani",
    batch: "UG/EEE/1984",
    current: "Founder & CEO, WorkEQ (Formerly ReturnSafe)",
    category: "Public Administration",
    year: 2023,
    photo: "/daa2023/daa4.jpeg",
  },
  {
    name: "Mr. Hemant Kulkarni",
    batch: "UG/MME/1983",
    current: "Managing Director, SAAF Energy and CEO, Alliance Thermal Engineers",
    category: "Academic / Research / Innovation / Invention",
    year: 2023,
    photo: "/daa2023/daa5.jpeg",
  },
  {
    name: "Mr. K Selvaraj IPS",
    batch: "UG/Mechanical/1983",
    current: "Retd., Director General of Police, Indian Police Service",
    category: "Corporate / Industry",
    year: 2023,
    photo: "/daa2023/daa6.jpeg",
  },
  {
    name: "Mr. Subramanian K",
    batch: "UG/Production/1986",
    current: "Pr. Accountant General Audit, Comptroller and Auditor General of India",
    category: "Entrepreneurial Venture",
    year: 2023,
    photo: "/daa2023/daa7.jpeg",
  },
  {
    name: "Mr. Nishant Saxena",
    batch: "UG/Production/1998",
    current: "CEO International – Europe and Emerging Markets (Global Management Council Member), Cipla Ltd",
    category: "Public Administration",
    year: 2023,
    photo: "/daa2023/daa8.jpeg",
  },
  {
    name: "Mr. Venkat Krishnaswamy",
    batch: "UG/ECE/1974",
    current: "Retd., Vice Chairman, Healthcare and Life Sciences Cognizant",
    category: "Academic / Research / Innovation / Invention",
    year: 2023,
    photo: "/daa2023/daa9.jpeg",
  },
  {
    name: "Mr. G Krishnakumar",
    batch: "UG/EEE/1986",
    current: "Chairman & MD, BPCL",
    category: "Academic / Research / Innovation / Invention",
    year: 2023,
    photo: "/daa2023/daa10.jpeg",
  },
  {
    name: "Mr. Arul Sezhian",
    batch: "UG/EEE/1983",
    current: "Executive Director (Retd.,), ONGC",
    category: "Academic / Research / Innovation / Invention",
    year: 2023,
    photo: "/daa2023/daa11.jpeg",
  },
  {
    name: "Mr. P Veeramuthuvel",
    batch: "PG (Industrial Engg.)/ 2003",
    current: "Project Director, Chandrayaan 3, ISRO",
    category: "Academic / Research / Innovation / Invention",
    year: 2023,
    photo: "/daa2023/daa12.jpeg",
  },
  {
    name: "Mr. Sembiam R Rengarajan",
    batch: "UG/ECE/1971",
    current: "Professor, California State University, USA",
    category: "Academic / Research / Innovation / Invention",
    year: 2023,
    photo: "/daa2023/daa13.jpeg",
  },



// 2022 -------




  {
    name: "Mr. Richard Sekar",
    batch: "UG/Production/1983",
    current: "Founder, Agni Youth",
    category: "Academic / Research / Innovation / Invention",
    year: 2022,
    photo: "/daa2022/daa1.jpeg",
  },
  {
    name: "Mr. Senthilkumar Meiyappan V",
    batch: "UG/CSE/1985",
    current: "Co-Founder and Board Member, Qube Cinema",
    category: "Corporate / Industry",
    year: 2022,
    photo: "/daa2022/daa2.jpeg",
  },
  {
    name: "Mr. Sunil Kumar Gupta",
    batch: "UG/CSE/1985",
    current: "Co-Founder & CEO, QuNu Labs Private Limited",
    category: "Entrepreneurial Venture",
    year: 2022,
    photo: "/daa2022/daa3.jpeg",
  },
  {
    name: "Mr. Koteswara Rao Cherukuri",
    batch: "UG/CSE/1986",
    current: "Co-Founder & Executive Chairman, Zipstack",
    category: "Public Administration",
    year: 2022,
    photo: "/daa2022/daa4.jpeg",
  },
  {
    name: "Dr. Varun Kapoor IPS",
    batch: "UG/Production/1989",
    current: "Additional Director General of Police, Indore",
    category: "Academic / Research / Innovation / Invention",
    year: 2022,
    photo: "/daa2022/daa5.jpeg",
  },
  {
    name: "Mr. N Shenbaga Murthy",
    batch: "UG/Chemical/1973",
    current: "Director (Technical, Process), AshPhil Consultancy",
    category: "Corporate / Industry",
    year: 2022,
    photo: "/daa2022/daa6.jpeg",
  },
  {
    name: "Dr. K Kothandaraman",
    batch: "UG/Chemical/1973",
    current: "Director (Technical, Process), AshPhil Consultancy",
    category: "Entrepreneurial Venture",
    year: 2022,
    photo: "/daa2022/daa7.jpeg",
  },
  {
    name: "Mr. Sanjay Khanna",
    batch: "UG/Chemical/1991",
    current: "Director (Refineries), BPCL",
    category: "Public Administration",
    year: 2022,
    photo: "/daa2022/daa8.jpeg",
  },
  {
    name: "Dr. M S Sundaram",
    batch: "UG/Chemical/1974",
    current: "Managing Director, J P Mukherji & Associates Private Limited",
    category: "Academic / Research / Innovation / Invention",
    year: 2022,
    photo: "/daa2022/daa9.jpeg",
  },
  {
    name: "Mr. T T Ramgopal",
    batch: "UG/EEE/1984",
    current: "Global Head, Android Partnership and Engineering, Google",
    category: "Academic / Research / Innovation / Invention",
    year: 2022,
    photo: "/daa2022/daa10.jpeg",
  },
  {
    name: "Dr. (Late) Venkat Venkataraman",
    batch: "UG/Chemical/1982",
    current: "Executive Vice President & CTO, Bloom Energy",
    category: "Academic / Research / Innovation / Invention",
    year: 2022,
    photo: "/daa2022/daa11.jpeg",
  },
  {
    name: "Dr. Sadasivan Shankar",
    batch: "UG/Chemical/1983",
    current: "Research Technology Manager, Stanford University",
    category: "Academic / Research / Innovation / Invention",
    year: 2022,
    photo: "/daa2022/daa12.jpeg",
  },
  {
    name: "Dr. Janakarajan Ramkumar",
    batch: "UG/Production Engineering/1996",
    current: "Professor, IIT Kanpur",
    category: "Academic / Research / Innovation / Invention",
    year: 2022,
    photo: "/daa2022/daa13.jpeg",
  },






  {
    name: "Mr. Karthikeyan Krishnaswamy",
    batch: "UG/CSE/1985",
    current: "Promoter, K Ventures",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa1.jpeg",
  },
  {
    name: "Mr. Srivatsan K",
    batch: "UG/Chemical/1974",
    current: "Subhasri Pigments Pvt. Ltd., Ankleshwar, Gujarat",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa2.jpeg",
  },
  {
    name: "Dr. P T R Palanivel Thiagarajan",
    batch: "UG/Chemical/1987",
    current: "Minister of Finance & Human Resources Management, Government of Tamil Nadu",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa3.jpeg",
  },
  {
    name: "Dr. Raj Iyer",
    batch: "UG/EEE/1992",
    dept: "Computer Science & Engineering",
    current: "Chief Information Officer, US Army, Pentagon, USA",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa4.jpeg",
  },
  {
    name: "Mr. Shanmugharaj M",
    batch: "UG/ECE/1979",
    dept: "Computer Science & Engineering",
    current: "CEO, Acacia Communications, USA",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa5.jpeg",
  },
  {
    name: "Mr. V Gopi Suresh Kumar",
    batch: "UG/Civil/1984",
    dept: "Computer Science & Engineering",
    current: "Director (Projects)/ CMD (Officiating), RITES Ltd.",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa6.jpeg",
  },
  {
    name: "Mr. Saumen Bhaumik",
    batch: "UG/EEE/1989",
    dept: "Computer Science & Engineering",
    current: "CEO – Eye Care Division Titan Company Ltd.",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa7.jpeg",
  },
  {
    name: "Mr. Srinivas K",
    batch: "UG/Mechanical/1984",
    dept: "Computer Science & Engineering",
    current: "MD & CEO, India1 Payments Ltd.",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa8.jpeg",
  },
  {
    name: "Dr. Karuppaiah N",
    batch: "UG/Mechanical/1984",
    dept: "Computer Science & Engineering",
    current: "Additional Director/ Centre Head, NATRAX, Indore",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa9.jpeg",
  },
  {
    name: "Mr. Govind Iyer",
    batch: "UG/Mechanical/1984",
    dept: "Computer Science & Engineering",
    current: "Consultant/ Partner, Egon Zehnder",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa10.jpeg",
  },
  {
    name: "Dr. Jeyakar Vedamanickkam",
    batch: "UG/EEE/1976",
    dept: "Computer Science & Engineering",
    current: "Retd GM Aerospace HAL (Hindustan Aeronautics Ltd.)",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa11.jpeg",
  },
  {
    name: "Mr. Gopinath Kallayil",
    batch: "UG/ECE/1984",
    dept: "Computer Science & Engineering",
    current: "Chief Evangelist, Digital Transformation and Strategy, Google, USA",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa12.jpeg",
  },
  {
    name: "Dr. Karthikeyani A V",
    batch: "UG/Chemical/1991",
    dept: "Computer Science & Engineering",
    current: "Dy. General Manager, IOC (R&D), Faridabad",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa13.jpeg",
  },
  {
    name: "Dr. Ranga Godavarti",
    batch: "UG/Chemical/1990",
    dept: "Computer Science & Engineering",
    current: "Research & Development and Drug Substance Supply, Pfizer, USA",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa14.jpeg",
  },
  {
    name: "Dr. Murali Sitaraman",
    batch: "UG/EEE/1983",
    dept: "Computer Science & Engineering",
    current: "Professor, Clemson University, USA",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa15.jpeg",
  },

  {
    name: "Mr. Seetharaman Narayanan",
    batch: "UG/Mechanical/1984",
    dept: "Computer Science & Engineering",
    current: "Senior Principal Scientist, Adobe Inc., USA",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/daa2021/daa16.jpeg",
  },






  {
    name: "Mrs. Sapna Behar",
    batch: "UG/EEE/1990",
    dept: "Computer Science & Engineering",
    current: "Partner & Founder Director – ICARUSNOVA PVT LTD & ICARUS DESIGN PVT LTD",
    category: "Academic / Research / Innovation / Invention",
    year: 2020,
    photo: "/daa2020/daa1.jpeg",
  },
  {
    name: "Mr. Rajendra K Aryal",
    batch: "UG/Civil/1991",
    dept: "Computer Science & Engineering",
    current: "Representative/ Country Director – Food and Agriculture Organization of United Nations (FAO)",
    category: "Academic / Research / Innovation / Invention",
    year: 2020,
    photo: "/daa2020/daa2.jpeg",
  },
  {
    name: "Late Kadiresan Annamalai",
    batch: "UG/ECE/1976",
    dept: "Computer Science & Engineering",
    current: "SENIOR DIRECTOR OF MARKETING – PERICOM/DIODES INC.",
    category: "Academic / Research / Innovation / Invention",
    year: 2020,
    photo: "/daa2020/daa3.jpeg",
  },
  {
    name: "Mr. Rajesh Gopinathan",
    batch: "UG/EEE/1994",
    dept: "Computer Science & Engineering",
    current: "Chief Executive Officer & Managing Director – Tata Consultancy Services",
    category: "Academic / Research / Innovation / Invention",
    year: 2020,
    photo: "/daa2020/daa4.jpeg",
  },
  {
    name: "Mr. V Srinivasan",
    batch: "UG/Chemical/1974",
    dept: "Computer Science & Engineering",
    current: "Chief controller/Dy. Director , Outstanding Scientist – VIKRAM SARABHAI SPACE CENTRE, ISRO, THIRUVANANTHAPURAM, KERALA",
    category: "Academic / Research / Innovation / Invention",
    year: 2020,
    photo: "/daa2020/daa5.jpeg",
  },
  {
    name: "Dr. Anantha R Sethuraman",
    batch: "UG/MME/1982",
    dept: "Computer Science & Engineering",
    current: "General Manager – Applied Materials Inc.",
    category: "Academic / Research / Innovation / Invention",
    year: 2020,
    photo: "/daa2020/daa6.jpeg",
  },
  {
    name: "Dr. N Anantharaman",
    batch: "UG/Chemical/1977",
    dept: "Computer Science & Engineering",
    current: "Retired Professor (HAG) from NIT Tiruchirappalli",
    category: "Academic / Research / Innovation / Invention",
    year: 2020,
    photo: "/daa2020/daa7.jpeg",
  },
  {
    name: "Prof. Sethu Vijayakumar",
    batch: "UG/CSE/1992",
    dept: "Computer Science & Engineering",
    current: "Program co-Director for AI -The Alan Turing Institute, London, UK",
    category: "Academic / Research / Innovation / Invention",
    year: 2020,
    photo: "/daa2020/daa8.jpeg",
  },
  {
    name: "Dr. Sathiya keerthi Selvaraj",
    batch: "UG/Mechanical/1980",
    dept: "Computer Science & Engineering",
    current: "Principal Staff Scientist, AI Group, LinkedIn Corporation, Sunnyvale, California. USA.",
    category: "Academic / Research / Innovation / Invention",
    year: 2020,
    photo: "/daa2020/daa9.jpeg",
  },

  {
    name: "Mr. Sivasankar Jayagopal",
    batch: "UG/CSE/1991",
    current: "FOUNDER CHAIRMAN - WINVINAYA FOUNDATION",
    category: "Academic / Research / Innovation / Invention",
    year: 2020,
    photo: "/daa2020/daa10.jpeg",
  },










  {
    name: "Mr. Elangovan Kulandaivelu",
    batch: "UG/Production/1990",
    dept: "Computer Science & Engineering",
    current: "COO, Zinnea Whitefield Rising, Dakshina Pinakini Rejuvenation Trust, Federation of Bangalore Lakes, Chennai",
    category: "Academic / Research / Innovation / Invention",
    year: 2019,
    photo: "/daa2019/daa1.jpeg",
  },
  {
    name: "Late Rajan Narayanan",
    batch: "UG/ECE/1979",
    dept: "Computer Science & Engineering",
    current: "Founder Director, Second Avenue Consulting (and LEGO Serious Play Facilitator)",
    category: "Academic / Research / Innovation / Invention",
    year: 2019,
    photo: "/daa2019/daa2.jpeg",
  },
  {
    name: "Captain Manivannan Ponniah IAS",
    batch: "UG/Chemical/1994",
    dept: "Computer Science & Engineering",
    current: "Secretary to Govt. of Karnataka",
    category: "Academic / Research / Innovation / Invention",
    year: 2019,
    photo: "/daa2019/daa3.jpeg",
  },
  {
    name: "Rear Admiral Sreekumar Nair",
    batch: "UG/ECE/1986",
    dept: "Computer Science & Engineering",
    current: "Assistant Chief of Materials (IT & Systems",
    category: "Academic / Research / Innovation / Invention",
    year: 2019,
    photo: "/daa2019/daa4.jpeg",
  },
  {
    name: "Mrs. Pongumatla Bharathi IAS",
    batch: "UG/CSE/1995",
    dept: "Computer Science & Engineering",
    current: "Joint CEO, Election Commission of India, Gujarat",
    category: "Academic / Research / Innovation / Invention",
    year: 2019,
    photo: "/daa2019/daa5.jpeg",
  },
  {
    name: "Mr. Ansa Sekharan",
    batch: "UG/CSE/1990",
    dept: "Computer Science & Engineering",
    current: "Exec VP/Global Chief Customer Success at Informatica, California",
    category: "Academic / Research / Innovation / Invention",
    year: 2019,
    photo: "/daa2019/daa6.jpeg",
  },
  {
    name: "Major General Suresh Krishnan (Retd)",
    batch: "UG/MME/1975",
    dept: "Computer Science & Engineering",
    current: "President, Autism Society of India, Bangalore",
    category: "Academic / Research / Innovation / Invention",
    year: 2019,
    photo: "/daa2019/daa7.jpeg",
  },
  {
    name: "Mr. Anantha Radhakrishnan",
    batch: "UG/Mechanical/1988",
    dept: "Computer Science & Engineering",
    current: "CEO & MD at Infosys BPM Ltd, Bangalore",
    category: "Academic / Research / Innovation / Invention",
    year: 2019,
    photo: "/daa2019/daa8.jpeg",
  },
  {
    name: "Prof. Jayant Rajgopal",
    batch: "UG/Chemical/1980",
    dept: "Computer Science & Engineering",
    current: "Professor, University of Pittsburgh",
    category: "Academic / Research / Innovation / Invention",
    year: 2019,
    photo: "/daa2019/daa9.jpeg",
  },
  {
    name: "Mr. Aravind Soundararajan",
    batch: "UG/ECE/1990",
    dept: "Computer Science & Engineering",
    current: "Vice President, Engineering of Reliance Jio Infocomm Ltd, Bangalore, India",
    category: "Academic / Research / Innovation / Invention",
    year: 2019,
    photo: "/daa2019/daa10.jpeg",
  },
  {
    name: "Prof. Ram Vasu Mohan",
    batch: "UG/Mechanical/1985",
    dept: "Computer Science & Engineering",
    current: "Professor, Joint School of Nanoscience/Nano Engineering, North Carolina",
    category: "Academic / Research / Innovation / Invention",
    year: 2019,
    photo: "/daa2019/daa11.jpeg",
  },






  {
    name: "Shri. Srihari Balakrishnan",
    batch: "UG/Chemical Engg./1990",
    dept: "Computer Science & Engineering",
    current: "Managing Director (Sri Kannapiran Mills Ltd & KG Denim Ltd)",
    category: "Academic / Research / Innovation / Invention",
    year: 2018,
    photo: "/daa2018/daa1.jpeg",
  },
  {
    name: "Shri. Swaminathan Jayaraman",
    batch: "UG/Chemical Engg./1986",
    dept: "Computer Science & Engineering",
    current: "Founder and CEO of Vascular Concepts Ltd",
    category: "Academic / Research / Innovation / Invention",
    year: 2018,
    photo: "/daa2018/daa2.jpeg",
  },
  {
    name: "Shri. Rajamanohar R",
    batch: "UG/EEE/1980",
    dept: "Computer Science & Engineering",
    current: "Executive Director, BHEL",
    category: "Academic / Research / Innovation / Invention",
    year: 2018,
    photo: "/daa2018/daa3.jpeg",
  },
  {
    name: "Dr. Raghupathy Venkat Giridhar",
    batch: "UG/ECE/1980",
    dept: "Computer Science & Engineering",
    current: "Vice President and Director, Intel Corporation, USA",
    category: "Academic / Research / Innovation / Invention",
    year: 2018,
    photo: "/daa2018/daa4.jpeg",
  },
  {
    name: "Shri. Subrahmanian K",
    batch: "UG/Mechanical Engg/ 1980",
    dept: "Computer Science & Engineering",
    current: "Executive Vice Chairman, AFCONS Infrastructure Limited",
    category: "Academic / Research / Innovation / Invention",
    year: 2018,
    photo: "/daa2018/daa5.jpeg",
  },
  {
    name: "Dr. Jayshree Seth",
    batch: "UG/Chemical Engg./1989",
    dept: "Computer Science & Engineering",
    current: "Corporate Scientist & Chief Science Advocate (3M)",
    category: "Academic / Research / Innovation / Invention",
    year: 2018,
    photo: "/daa2018/daa6.jpeg",
  },
  {
    name: "Dr. Kumar Balachandran",
    batch: "UG/ECE/1986",
    dept: "Computer Science & Engineering",
    current: "Principal Researcher and Expert at Ericsson Research",
    category: "Academic / Research / Innovation / Invention",
    year: 2018,
    photo: "/daa2018/daa7.jpeg",
  },





  {
    name: "Shri. R.Vasudevan",
    batch: "UG/Chemical Engg./1976",
    dept: "Computer Science & Engineering",
    category: "Academic / Research / Innovation / Invention",
    year: 2017,
    photo: "/daa2017/daa1.jpeg",
  },
  {
    name: "Shri. Saibal Mitra",
    batch: "UG/Chemical Engg./1988",
    dept: "Computer Science & Engineering",
    current: "Corrosion Consultant at NDTCCS",
    category: "Academic / Research / Innovation / Invention",
    year: 2017,
    photo: "/daa2017/daa2.jpeg",
  },
  {
    name: "Shri. A. Vijayarajan",
    batch: "UG/ECE/1976",
    dept: "Computer Science & Engineering",
    current: "Founder & CTO, InnAccel",
    category: "Academic / Research / Innovation / Invention",
    year: 2017,
    photo: "/daa2017/daa3.jpeg",
  },
  {
    name: "Shri. Prabhu G Kumar",
    batch: "UG/CSE/1988",
    dept: "Computer Science & Engineering",
    current: "Cofounder, Logic Information Systems & HealthBPM",
    category: "Academic / Research / Innovation / Invention",
    year: 2017,
    photo: "/daa2017/daa4.jpeg",
  },
  {
    name: "Shri. Nagraj Murthy",
    batch: "UG/ECE/1981",
    dept: "Computer Science & Engineering",
    category: "Academic / Research / Innovation / Invention",
    year: 2017,
    photo: "/daa2017/daa5.jpeg",
  },
  {
    name: "Ms. Srimathi Shivashankar",
    batch: "UG/CSE/1990",
    dept: "Computer Science & Engineering",
    current: "Executive Vice President at HCL Technologies",
    category: "Academic / Research / Innovation / Invention",
    year: 2017,
    photo: "/daa2017/daa6.jpeg",
  },
  {
    name: "Dr. Sridhar Mahadevan",
    batch: "UG/ECE/1981",
    dept: "Computer Science & Engineering",
    current: "Director of Data Science Lab at Adobe",
    category: "Academic / Research / Innovation / Invention",
    year: 2017,
    photo: "/daa2017/daa7.jpeg",
  },
  {
    name: "Dr. Jayant Ramakrishnan",
    batch: "UG/Mechanical Engg./1981",
    dept: "Computer Science & Engineering",
    current: "Chief Operating Officer (COO) at Bastion Technologies",
    category: "Academic / Research / Innovation / Invention",
    year: 2017,
    photo: "/daa2017/daa8.jpeg",
  },



{
    name: "K.P. Ananthakrishnan",
    batch: "UG/ECE/1972",
    current: "Executive Vice President (R&D), ICOMM Tele Limited, Hyderabad",
    category: "Academic / Research",
    year: 2016,
    photo: "/daa2016/daa1.jpg",
  },
  {
    name: "Krishnaswamy Sampath",
    batch: "UG/Chemical/1976",
    current: "Research and Development Head, ExxonMobil",
    category: "Academic / Research",
    year: 2016,
    photo: "/daa2016/daa2.jpg",
  },
  {
    name: "Kumar Venkatramani",
    batch: "UG/ECE/1981",
    current: "President & CEO, Silicon Ideas",
    category: "Academic / Research",
    year: 2016,
    photo: "/daa2016/daa3.jpg",
  },
  {
    name: "Dr. Nagraj Balakrishnan",
    batch: "UG/Mechanical/1981",
    current: "Dean, College of Business, University of Michigan - Dearborn",
    category: "Academic / Research",
    year: 2016,
    photo: "/daa2016/daa4.jpg",
  },
  {
    name: "Dr. Paul Devadoss Ezhilchelvan",
    batch: "UG/EEE/1981",
    current: "Reader (Junior Full Professor), School of Computing Science, Newcastle University, UK",
    category: "Academic / Research",
    year: 2016,
    photo: "/daa2016/daa5.jpg",
  },
  {
    name: "Rathina Gandhi Sivakumar",
    batch: "UG/ECE/1990",
    current: "Chief Architect, IBM",
    category: "Academic / Research",
    year: 2016,
    photo: "/daa2016/daa6.jpg",
  },
  {
    name: "Dr. A. H. Yegneswaran",
    batch: "UG/Metallurgy/1972",
    current: "Scientist G (Retired), RRL, CSIR",
    category: "Academic / Research",
    year: 2016,
    photo: "/daa2016/daa7.jpg",
  },
  {
    name: "Balu Narasimhan Manohar",
    batch: "UG/ECE/1977",
    current: "MD & CEO, Stempeutics Research, Bangalore",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa8.jpg",
  },
  {
    name: "Balu Srinivasan",
    batch: "UG/Mechanical/1981",
    current: "CIO, TVS & Sons",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa9.jpg",
  },
  {
    name: "Deepak Bhasin",
    batch: "UG/Chemical/1976",
    current: "Global Director, Koch Industries Inc.",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa10.jpg",
  },
  {
    name: "Dr. N. Kamakodi",
    batch: "UG/Chemical/1995",
    current: "MD & CEO, City Union Bank Ltd.",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa11.jpg",
  },
  {
    name: "U. Narendra Nayak",
    batch: "UG/ECE/1981",
    current: "Managing Director, BlackBerry India Pvt Ltd",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa12.jpg",
  },
  {
    name: "Philip Jacob",
    batch: "UG/ECE/1977",
    current: "Executive Director, Bharat Electronics Limited",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa13.jpg",
  },
  {
    name: "S. Ramasamy",
    batch: "UG/Chemical Engineering/1977",
    current: "Executive Director (Info. Systems) Advisor (IS)",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa14.jpg",
  },
  {
    name: "Ramchand Karunakaran",
    batch: "UG/Civil Engineering/1976",
    current: "CEO of IL&FS and MD of IL&FS Transportation Networks Limited (ITNL)",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa15.jpg",
  },
  {
    name: "Sajiv K. Menon",
    batch: "UG/Chemical/1980",
    current: "Managing Director, Nitta Gelatin India Limited",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa16.jpg",
  },
  {
    name: "S. Sridharan",
    batch: "UG/Mechanical/1972",
    current: "Advisor to High Energy Batteries (India) Ltd. (formerly Managing Director)",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa17.jpg",
  },
  {
    name: "P. Srikar Reddy",
    batch: "UG/ECE/1980",
    current: "MD & CEO, Member Board of Directors, Sonata Software",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa18.jpg",
  },
  {
    name: "S. Vaitheeswaran",
    batch: "UG/Industrial Engineering/1980",
    current: "MD & CEO, Manipal Global Education Services",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa19.jpg",
  },
  {
    name: "N. Venkataraman (Tram)",
    batch: "UG/EEE/1981",
    current: "President, Scope eKnowledge – A Quatrro Group Company",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa20.jpg",
  },
  {
    name: "K. Venkatasubramanian",
    batch: "UG/EEE/1981",
    current: "Vice President, IT, Juniper Networks, USA",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa21.jpg",
  },
  {
    name: "Dr. S. Venkatasubramanian",
    batch: "UG/Mechanical/1972",
    current: "Vice President, Quest Global, US; Founder President, ASE Technologies",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa22.jpg",
  },
  {
    name: "Dr. Krishnaswamy Venkatesh Prasad",
    batch: "UG/ECE/1975",
    current: "Senior Technical Leader and Member of the Technology Advisory Board, Ford Motor Company",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa23.jpg",
  },
  {
    name: "Arjun Raman",
    batch: "UG/ECE/1972",
    current: "Director, Technical Program Management, Google, CA",
    category: "Corporate / Industry",
    year: 2016,
    photo: "/daa2016/daa24.jpg",
  },
  {
    name: "K. Alagesan",
    batch: "UG/Production/1981",
    current: "Director (Production), ITI Limited",
    category: "Public Administration",
    year: 2016,
    photo: "/daa2016/daa25.jpg",
  },
  {
    name: "Ganapathy Subramaniam",
    batch: "UG/EEE/1989",
    current: "Chairman, Cirel Systems; Founder CEO, Cosmic Circuits",
    category: "Entrepreneurial Venture",
    year: 2016,
    photo: "/daa2016/daa26.jpg",
  },
  {
    name: "A. Kathir Kamanathan",
    batch: "UG/ECE/1984",
    current: "CEO, Chella Software Private Limited",
    category: "Entrepreneurial Venture",
    year: 2016,
    photo: "/daa2016/daa27.jpg",
  },
  {
    name: "K. Mahalingam",
    batch: "UG/Chemical/1985",
    current: "Partner / Director, TSM Group of Companies",
    category: "Entrepreneurial Venture",
    year: 2016,
    photo: "/daa2016/daa28.jpg",
  },
  {
    name: "P. Mukund",
    batch: "UG/Mechanical/1980",
    current: "MD, Igarashi Motors India Limited",
    category: "Entrepreneurial Venture",
    year: 2016,
    photo: "/daa2016/daa29.jpg",
  },
  {
    name: "T.S. Ramji",
    batch: "UG/Metallurgy/1977",
    current: "CEO & Founder Director, Worldwide Technologies and Trade",
    category: "Entrepreneurial Venture",
    year: 2016,
    photo: "/daa2016/daa30.jpg",
  },

  {
    name: "Dr. Venkat Selvamanickam",
    batch: "UG/Mechanical/1986",
    current: "M.D. Anderson Chair Professor; Professor of Physics / Chemical Eng, Maths Eng (joint appointments) & Director, Applied Research Hub, Texas Centre for Superconductivity",
    category: "Academic / Research",
    year: 2014,
    photo: "/daa2014/daa1.jpg",
  },
  {
    name: "Dr. A. S. Ananth",
    batch: "UG/Mechanical Engineering/1976",
    current: "Prof. Information Science & Digital Commerce, Co-Director, Centre for Digital Enterprise, Auckland, New Zealand",
    category: "Academic / Research",
    year: 2014,
    photo: "/daa2014/daa2.jpg",
  },
  {
    name: "Dr. S. Gomathinayagam",
    batch: "UG/Civil Engineering/1979",
    current: "Executive Director & CEO, Centre for Wind Energy Technology (C-WET)",
    category: "Academic / Research",
    year: 2014,
    photo: "/daa2014/daa3.jpg",
  },
  {
    name: "Dr. Madhavan Swaminathan",
    batch: "UG/ECE/1985",
    current: "Director, Interconnect & Packaging Center, GT and John Pippin Chair in Electromagnetics at Georgia Institute of Technology, USA",
    category: "Academic / Research",
    year: 2014,
    photo: "/daa2014/daa4.jpg",
  },
  {
    name: "Dr. Suresh K. Sitaraman",
    batch: "UG/Mechanical Engineering/1982",
    current: "Professor in Mechanical Engineering, Georgia Institute of Technology, Atlanta, USA",
    category: "Academic / Research",
    year: 2014,
    photo: "/daa2014/daa5.jpg",
  },
  {
    name: "Shekar Viswanathan",
    batch: "UG/Chemical Engineering/1977",
    current: "Professor, Department of Applied Engineering & Director of Corporate & Military Outreach, National University California",
    category: "Academic / Research",
    year: 2014,
    photo: "/daa2014/daa6.jpg",
  },
  {
    name: "Dr. Kumar Ramaswamy",
    batch: "UG/ECE (Honors)/1986",
    current: "President & Board Member of both igolgi Inc. & Zipreel Inc.",
    category: "Academic / Research",
    year: 2014,
    photo: "/daa2014/daa7.jpg",
  },
  {
    name: "Alexander Koshi",
    batch: "UG/Chemical Engineering/1972",
    current: "Koshy Cement Consulting, India",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa8.jpg",
  },
  {
    name: "Dr. Srikanth Padmanabhan",
    batch: "UG/Mechanical Engineering/1985",
    current: "President, Cummins Emission Solutions, USA",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa9.jpg",
  },
  {
    name: "Subrahmanyan Ramnath",
    batch: "UG/Mechanical/1977",
    current: "Director, Deloitte & Touche LLP, USA; Strategic Advisor at global financial institutions",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa10.jpg",
  },
  {
    name: "Ranaveer Sinha",
    batch: "UG/Mechanical Engineering/1976",
    current: "Managing Director, TATA-HITACHI Construction Co. Ltd.",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa11.jpg",
  },
  {
    name: "T. V. Narendran",
    batch: "UG/Mechanical/1986",
    current: "Managing Director, Tata Steel, India & South-East Asia",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa12.jpg",
  },
  {
    name: "Murti Venkatram Sriram",
    batch: "UG/Metallurgy/1977",
    current: "Chief Technical Officer, Arcelor Mittal",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa13.jpg",
  },
  {
    name: "N. S. Kannan",
    batch: "UG/Mechanical/1986",
    current: "Executive Director, ICICI Bank Limited",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa14.jpg",
  },
  {
    name: "L. Pugazhenthy",
    batch: "UG/Metallurgical Engineering/1972",
    current: "Executive Director, Indian Lead Zinc Development Association (ILZDA)",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa15.jpg",
  },
  {
    name: "Shri Shyam Srinivasan",
    batch: "UG/Production Engineering/1984",
    current: "MD & CEO, Federal Bank",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa16.jpg",
  },
  {
    name: "Jitender Balakrishnan",
    batch: "UG/Mechanical Engineering/1972",
    current: "Advisor/Mentor of various companies including Sunil Bharti Mittal, Aditya Birla & Essar Groups",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa17.jpg",
  },
  {
    name: "Ravi Viswanathan",
    batch: "UG/ECE/1984",
    current: "President - Growth Markets & Head Chennai Operations, Tata Consultancy Services",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa18.jpg",
  },
  {
    name: "Ajit Mathai",
    batch: "UG/Industrial Engineering/1985",
    current: "Director, Deloitte Touche Tohmatsu, India",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa19.jpg",
  },
  {
    name: "K. Rajaram",
    batch: "UG/Metallurgical Engineering/1977",
    current: "Chief Executive Officer, M/s Al Nabooda Automobiles LLC, Dubai",
    category: "Corporate / Industry",
    year: 2014,
    photo: "/daa2014/daa20.jpg",
  },
  {
    name: "C. Kandasamy",
    batch: "UG/Civil Engineering/1975",
    current: "Former Director General (Road Development) & Special Secretary to GOI; Ex-Member (Technical), NHAI",
    category: "Public Administration",
    year: 2014,
    photo: "/daa2014/daa21.jpg",
  },
  {
    name: "N. Sethurathinam",
    batch: "UG/Mechanical Engineering/1976",
    current: "Executive Director (Maintenance & Inspection), IOCL, Head Quarters",
    category: "Public Administration",
    year: 2014,
    photo: "/daa2014/daa22.jpg",
  },
  {
    name: "Commodore K. S. Subramanian, NM, IN (Retd)",
    batch: "UG/Mechanical Engineering/1977",
    current: "Director, Hindustan Shipyard, Vizag; Deputy Director General (Naval Projects)",
    category: "Public Administration",
    year: 2014,
    photo: "/daa2014/daa23.jpg",
  },
  {
    name: "S. Ganesh",
    batch: "UG/Metallurgical Engineering/1972",
    current: "CMD, Liners India Ltd.",
    category: "Entrepreneurial Venture",
    year: 2014,
    photo: "/daa2014/daa24.jpg",
  },
  {
    name: "Ravindra Sannareddy (Ravi)",
    batch: "UG/Civil Engineering/1984",
    current: "Co-Founder & Managing Director, Sri City",
    category: "Entrepreneurial Venture",
    year: 2014,
    photo: "/daa2014/daa25.jpg",
  },
  {
    name: "Satya Prabhakar",
    batch: "UG/ECE/1985",
    current: "Founder, Sulekha.com",
    category: "Entrepreneurial Venture",
    year: 2014,
    photo: "/daa2014/daa26.jpg",
  },
  {
    name: "Raja Sankaran",
    batch: "UG/Industrial Engineering/1984",
    current: "Founder & MD, Infologix Software Solution (P) Ltd.",
    category: "Entrepreneurial Venture",
    year: 2014,
    photo: "/daa2014/daa27.jpg",
  },
  {
    name: "S. Ganesan",
    batch: "UG/Electrical Engineering/1977",
    current: "Managing Director, MEGAWIN SWITCHGEAR (P) LTD., Salem",
    category: "Entrepreneurial Venture",
    year: 2014,
    photo: "/daa2014/daa28.jpg",
  },
  {
    name: "N. Raghupathy (Narayanamurthy Raghupathy)",
    batch: "UG/Chemical Engineering/1976",
    current: "Co-Founder & Senior VP, Customer Services & Operations, Reflexis Systems, Boston, USA",
    category: "Entrepreneurial Venture",
    year: 2014,
    photo: "/daa2014/daa29.jpg",
  },
  {
    name: "K. Sampath Kumar",
    batch: "UG/Metallurgy/1977",
    current: "Co-founder, Providers Skill Academy (P) Ltd.; Associated with NSDC",
    category: "Service to Society at Large",
    year: 2014,
    photo: "/daa2014/daa30.jpg",
  },
  {
    name: "KV Vishnu Raju",
    batch: "UG/Chemical Engineering/1985",
    current: "Chairman, Sri Vishnu Educational Society",
    category: "Service to Society at Large",
    year: 2014,
    photo: "/daa2014/daa31.jpg",
  },
  {
    name: "Suresh Keerthi",
    batch: "UG/ECE/1972",
    current: "Director at Large, Rotary District 3310; Serial Entrepreneur & Social Worker, Singapore",
    category: "Service to Society at Large",
    year: 2014,
    photo: "/daa2014/daa32.jpg",
  },
  {
    name: "Dr. U. Balachandran",
    batch: "UG/Metallurgy/1975",
    current: "Sr. Director, Argonne National Lab, Chicago, USA",
    category: "Academic / Research",
    year: 2013,
    photo: "/daa2013/daa1.jpg",
  },
  {
    name: "Dr. S.V. Sreenivasan",
    batch: "UG/Mechanical Engineering/1987",
    current: "Thornton Centennial Professor of Mechanical Engineering, University of Texas, Austin",
    category: "Academic / Research",
    year: 2013,
    photo: "/daa2013/daa2.jpg",
  },
  {
    name: "Late Dr. Panyam R. Ramprasad",
    batch: "UG/Chemical Engineering/1976",
    current: "Program Director and Associate Director, DRDL",
    category: "Academic / Research",
    year: 2013,
    photo: "/daa2013/daa3.jpg",
  },
  {
    name: "Dr. S. Suresh",
    batch: "UG/Mechanical Engineering/1974",
    current: "Retired as GM and Head, WRI, BHEL",
    category: "Academic / Research",
    year: 2013,
    photo: "/daa2013/daa4.jpg",
  },
  {
    name: "Dr. Krishnan Balasubramanian",
    batch: "UG/Mechanical Engineering/1984",
    current: "Dean, Industrial Consultancy and Sponsored Research, IIT Madras",
    category: "Academic / Research",
    year: 2013,
    photo: "/daa2013/daa5.jpg",
  },
  {
    name: "R. Krishnan",
    batch: "UG/Electrical and Electronics/1976",
    current: "Director (HR), BHEL",
    category: "Corporate / Industry",
    year: 2013,
    photo: "/daa2013/daa6.jpg",
  },
  {
    name: "Dr. Praveen Vishakantaiah",
    batch: "UG/Electronics and Communication Engineering/1987",
    current: "President, Intel India",
    category: "Corporate / Industry",
    year: 2013,
    photo: "/daa2013/daa7.jpg",
  },
  {
    name: "Subrahmanyan Srinivasan",
    batch: "UG/Chemical Engineering/1972",
    current: "CEO, IFFCO Kisan Sanchar Ltd.",
    category: "Corporate / Industry",
    year: 2013,
    photo: "/daa2013/daa8.jpg",
  },
  {
    name: "N. Chandrasekaran",
    batch: "PG/Master of Computer Applications/1986",
    current: "Chief Executive Officer (CEO) and Managing Director (MD), TCS",
    category: "Corporate / Industry",
    year: 2013,
    photo: "/daa2013/daa9.jpg",
  },
  {
    name: "V. Nandakumar",
    batch: "UG/Mechanical Engineering/1971",
    current: "Director, ESSAR; formerly CMD, MECON",
    category: "Corporate / Industry",
    year: 2013,
    photo: "/daa2013/daa10.jpg",
  },
  {
    name: "M. Henry Mohan",
    batch: "UG/Electronics and Communication Engineering/1977",
    current: "Sr. Director, Motorola, Chennai",
    category: "Corporate / Industry",
    year: 2013,
    photo: "/daa2013/daa11.jpg",
  },
  {
    name: "K. Muralidharan",
    batch: "UG/Electronics and Communication Engineering/1977",
    current: "Founder Chairman, Sankara Eye Foundation, USA",
    category: "Service to Society",
    year: 2013,
    photo: "/daa2013/daa12.jpg",
  },
  {
    name: "R. Sundar",
    batch: "UG/Electronics and Communication Engineering/1977",
    current: "Co-founder, Mastek Ltd. and Board Member, Sankara Eye Foundation",
    category: "Service to Society",
    year: 2013,
    photo: "/daa2013/daa13.jpg",
  },
  {
    name: "K. Ravi Kumar",
    batch: "UG/Mechanical Engineering/1976",
    current: "Founder Chairman, Loadstar Equipment Pvt. Ltd.; formerly Founder, Indital Construction Machinery",
    category: "Entrepreneurial Venture",
    year: 2013,
    photo: "/daa2013/daa14.jpg",
  },
  {
    name: "B.V. Ramanan",
    batch: "UG/Chemical Engineering/1981",
    current: "Chairman and Managing Director, Livia Polymer Bottles Pvt. Ltd.",
    category: "Entrepreneurial Venture",
    year: 2013,
    photo: "/daa2013/daa15.jpg",
  },
  {
    name: "Oscar G. Concessao",
    batch: "UG/Architecture/1986",
    current: "Founder, OCI Architects",
    category: "Entrepreneurial Venture",
    year: 2013,
    photo: "/daa2013/daa16.jpg",
  },
  {
    name: "Ponni M. Concessao",
    batch: "UG/Architecture/1987",
    current: "Co-Founder, OCI Architects",
    category: "Entrepreneurial Venture",
    year: 2013,
    photo: "/daa2013/daa17.jpg",
  },
  {
    name: "Ron Parmar (L. Ramesh Kumar)",
    batch: "UG/Chemical Engineering/1987",
    current: "Chairman & Founder, W2bi and AetherPal",
    category: "Entrepreneurial Venture",
    year: 2013,
    photo: "/daa2013/daa18.jpg",
  },
  {
    name: "Sundaram Ravi",
    batch: "UG/Chemical Engineering/1975",
    current: "Managing Director, Mercuri Goldmann (India) Pvt. Ltd.",
    category: "Entrepreneurial Venture",
    year: 2013,
    photo: "/daa2013/daa19.jpg",
  },
  {
    name: "Air Marshal P. Kanakaraj",
    batch: "UG/Mechanical Engineering/1977",
    current: "Air Marshal, Indian Air Force",
    category: "Public Administration",
    year: 2013,
    photo: "/daa2013/daa20.jpg",
  },
  {
    name: "Rear Admiral (Retd.) Rakesh Bajaj VSM",
    batch: "UG/Electronics and Telecom/1976",
    current: "Director (Corporate Planning and Personnel), Mazagon Dock Ltd.",
    category: "Public Administration",
    year: 2013,
    photo: "/daa2013/daa21.jpg",
  },
  {
    name: "Rajkumar Chellaraj",
    batch: "UG/Chemical Engineering/1977",
    current: "CFO and Associate Dean (Finance and Administration), Stanford University",
    category: "Public Administration",
    year: 2013,
    photo: "/daa2013/daa22.jpg",
  },
  {
    name: "Dr. Senthil Nathan",
    batch: "UG/Civil Engineering/1979",
    current: "Vice Provost – Planning and Institutional Effectiveness, Higher College of Technology, UAE",
    category: "Public Administration",
    year: 2013,
    photo: "/daa2013/daa23.jpg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2009,
    photo: "/daa2009/daa1.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2009,
    photo: "/daa2009/daa2.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2009,
    photo: "/daa2009/daa3.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2009,
    photo: "/daa2009/daa4.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2009,
    photo: "/daa2009/daa5.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2009,
    photo: "/daa2009/daa6.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2009,
    photo: "/daa2009/daa7.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa1.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa2.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa3.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa4.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa5.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa6.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa7.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa8.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa9.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa10.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa11.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa12.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa13.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2008,
    photo: "/daa2008/daa14.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa1.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa2.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa3.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa4.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa5.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa6.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa7.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa8.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa9.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa10.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa11.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa12.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa13.jpeg",
  },
  {
    name: "Mr. Karthik Jayaram",
    batch: "CSE, 2000",
    dept: "Computer Science & Engineering",
    current: "CTO, CloudWorks",
    category: "Academic / Research / Innovation / Invention",
    year: 2007,
    photo: "/daa2007/daa14.jpeg",
  },


];

function classNames(...s) {
  return s.filter(Boolean).join(" ");
}

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "shrink-0 rounded-full px-3.5 py-1.5 text-sm transition border",
        active
          ? "bg-amber-900 text-white border-amber-900 shadow"
          : "bg-white text-amber-900 border-amber-200 hover:bg-amber-50"
      )}
    >
      {children}
    </button>
  );
}

function AwardeeCard({ a }) {
  const [err, setErr] = useState(false);
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow hover:shadow-lg transition">
      <div className="relative aspect-[4/5] w-full">
        {!err ? (
          <img
            src={a.photo}
            alt={a.name}
            loading="lazy"
            onError={() => setErr(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-amber-50 text-amber-900">
            <span className="text-sm">Photo unavailable</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="pointer-events-none absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold leading-tight">{a.name}</h3>
            <p className="text-[13px] text-white/90">
              {a.batch}
            </p>
            <p className="mt-2 text-[13px] leading-5 text-white/95">{a.current}</p>
            <div className="mt-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium text-amber-900">
              {a.category}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="mt-16 grid place-items-center text-center">
      <div className="rounded-2xl border border-amber-200/70 bg-white px-6 py-10 shadow max-w-lg">
        <div className="mx-auto h-12 w-12 rounded-full bg-amber-50 grid place-items-center text-amber-900">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>
        <h4 className="mt-4 font-semibold text-amber-900">No results</h4>
        <p className="mt-1 text-sm text-stone-600">Try another category or search term.</p>
      </div>
    </div>
  );
}

export default function DAA() {
  const DATA = useMemo(
    () =>
      AWARDEES.map((a, i) => ({
        ...a,
        year: typeof a.year === "string" ? parseInt(a.year, 10) : a.year,
        _id: i, 
      })),
    []
  );

  const yearsDesc = useMemo(
    () => Array.from(new Set(DATA.map((a) => a.year))).sort((a, b) => b - a),
    [DATA]
  );

  const [year, setYear] = useState(() => yearsDesc[0]);
  const [category, setCategory] = useState("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!yearsDesc.includes(year)) {
      setYear(yearsDesc[0]);
    }
  }, [yearsDesc, year]);

  const inYear = useMemo(() => DATA.filter((a) => a.year === year), [DATA, year]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return inYear.filter((a) => {
      const okCat = category === "All" || a.category === category;
      const okQ =
        !ql ||
        a.name.toLowerCase().includes(ql) ||
        a.batch.toLowerCase().includes(ql) ||
        a.current.toLowerCase().includes(ql);
      return okCat && okQ;
    });
  }, [inYear, category, q]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <p className="text-amber-100/90 text-xs tracking-wider uppercase">Awards</p>
                <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                  Distinguished Alumni Awards (DAA)
                </h1>
                <p className="mt-3 max-w-3xl text-amber-100/90">
                  Honouring alumni who elevate society and the profession through leadership,
                  research, innovation, entrepreneurship, and public service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-12 items-stretch rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-4 sm:p-6 shadow-[0_10px_28px_rgba(180,83,9,.08)]">
          <div className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow">
              <img
                src="/daa.jpeg"
                alt="DAA Ceremony"
                className="aspect-[4/3] w-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </figure>
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-serif text-2xl text-amber-900">About DAA</h2>
            <p className="mt-3 text-[15px] leading-7 text-stone-800">
              The Institute derives its strength from the achievements of its Alumni. Alumni have a definite role in the
              growth of an Institution. NIT Tiruchirappalli (REC Tiruchirappalli) having the glorious history of providing
              technical education in the country has a large number of Alumni who have excelled in their chosen fields in
              India and abroad. The Institute would like to honour her outstanding Alumni by presenting them with the
              Distinguished Alumni Awards for excellence in Academic, Research, Managerial Contribution, Entrepreneurship,
              Public Administration, Service to the Society etc. These awards have been given since 2007 and the awards are
              distributed annually in a ceremony held at the Institute.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORIES.slice(1).map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-900"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-6">
        <div className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-4 sm:p-6 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((c) => (
                <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </Chip>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={`Search within ${year} (name, dept, batch, role)`}
                className="w-80 rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm outline-none ring-amber-300 focus:ring"
              />
              <button
                onClick={() => setQ("")}
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="mt-3 text-xs text-stone-600">
            Year <span className="font-semibold text-amber-900">{year}</span> • Showing{" "}
            <span className="font-medium text-amber-900">{filtered.length}</span> awardee
            {filtered.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-28">
        {filtered.length ? (
          <section className="mt-8">
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((a) => (
                <AwardeeCard key={a._id} a={a} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyState />
        )}
      </main>

      <div className="fixed inset-x-0 bottom-3 z-[100]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-amber-200/70 bg-white/95 backdrop-blur shadow-lg p-2">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="px-2 text-xs font-semibold tracking-wider text-amber-900">YEAR</span>
              {yearsDesc.map((y) => (
                <Chip key={y} active={year === y} onClick={() => setYear(y)}>
                  {y}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
