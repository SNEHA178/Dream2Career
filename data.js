// Dream2Career Static Structured Datasets

const INTERESTS_LIST = [
    { id: "coding", name: "Coding & Software" },
    { id: "design", name: "UI/UX & Creative Design" },
    { id: "data_analysis", name: "Data & Numbers" },
    { id: "security", name: "Cybersecurity & Networking" },
    { id: "business_strategy", name: "Business Strategy & Consulting" },
    { id: "marketing", name: "Digital Marketing & Branding" },
    { id: "problem_solving", name: "Algorithm & Architecture" }
];

const SUBJECTS_LIST = [
    { id: "computer_science", name: "Computer Science" },
    { id: "mathematics", name: "Mathematics & Statistics" },
    { id: "art_design", name: "Art & Graphic Design" },
    { id: "business", name: "Business & Management" },
    { id: "communication", name: "Media & Communications" }
];

const STRENGTHS_LIST = [
    { id: "logical", name: "Logical Reasoning" },
    { id: "creativity", name: "Creative Thinking" },
    { id: "analytical", name: "Analytical Thinking" },
    { id: "communication", name: "Verbal & Written Communication" },
    { id: "leadership", name: "Leadership & Organization" },
    { id: "detail_oriented", name: "Attention to Detail" }
];

const SKILLS_LIST = [
    // Tech & Coding
    "HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "Java", "C++", "SQL", "NoSQL", 
    "Git", "Docker", "REST APIs", "AWS Cloud", "Linux System Administration",
    // Data & AI
    "Pandas", "Scikit-Learn", "Machine Learning", "Neural Networks", "Data Visualization", "R Programming", "Excel",
    // UI/UX & Design
    "Figma", "User Research", "Wireframing", "Color Theory", "Typography", "Illustrator",
    // Marketing & Business
    "SEO", "Google Analytics", "Copywriting", "Social Media Ads", "Financial Modeling", "Market Research", "Agile/Scrum", "Requirements Gathering", "UML Modeling",
    // Security
    "Penetration Testing", "Cryptography", "Firewall Setup", "Ethical Hacking", "Threat Modeling"
];

const CERTIFICATIONS_DB = [
    {
        id: "google-ux",
        name: "Google UX Design Professional Certificate",
        provider: "Google",
        duration: "3-6 Months",
        difficulty: "Beginner",
        benefits: "Covers the UX design process, Figma, wireframing, and portfolio building.",
        careers: ["ui-ux-designer"]
    },
    {
        id: "google-analytics",
        name: "Google Digital Marketing & E-commerce Certificate",
        provider: "Google",
        duration: "3 Months",
        difficulty: "Beginner",
        benefits: "Teaches email marketing, SEO, Google Ads, and e-commerce store optimization.",
        careers: ["digital-marketer"]
    },
    {
        id: "google-data-analytics",
        name: "Google Data Analytics Professional Certificate",
        provider: "Google",
        duration: "6 Months",
        difficulty: "Beginner",
        benefits: "Covers SQL, R Programming, Tableau, and data cleaning methodology.",
        careers: ["data-scientist", "business-analyst"]
    },
    {
        id: "aws-cloud-practitioner",
        name: "AWS Certified Cloud Practitioner",
        provider: "AWS",
        duration: "1-2 Months",
        difficulty: "Beginner",
        benefits: "Validates overall understanding of AWS Cloud platform and services.",
        careers: ["software-engineer", "web-developer", "ai-engineer", "cybersecurity-analyst"]
    },
    {
        id: "aws-solutions-architect",
        name: "AWS Certified Solutions Architect - Associate",
        provider: "AWS",
        duration: "3-4 Months",
        difficulty: "Intermediate",
        benefits: "Validates ability to design secure, robust, and scalable cloud systems.",
        careers: ["software-engineer", "ai-engineer"]
    },
    {
        id: "microsoft-azure-ai",
        name: "Microsoft Certified: Azure AI Engineer Associate",
        provider: "Microsoft",
        duration: "3 Months",
        difficulty: "Intermediate",
        benefits: "Teaches cognitive services, machine learning, and natural language processing solutions.",
        careers: ["ai-engineer"]
    },
    {
        id: "microsoft-power-bi",
        name: "Microsoft Certified: Power BI Data Analyst Associate",
        provider: "Microsoft",
        duration: "2 Months",
        difficulty: "Intermediate",
        benefits: "Teaches data modeling, visualization, and dashboard deployment using Power BI.",
        careers: ["business-analyst", "data-scientist"]
    },
    {
        id: "ibm-data-science",
        name: "IBM Data Science Professional Certificate",
        provider: "IBM",
        duration: "5-6 Months",
        difficulty: "Beginner",
        benefits: "Covers Python, SQL, data analysis, visualization, and machine learning models.",
        careers: ["data-scientist"]
    },
    {
        id: "ibm-cybersecurity",
        name: "IBM Cybersecurity Analyst Professional Certificate",
        provider: "IBM",
        duration: "4 Months",
        difficulty: "Beginner",
        benefits: "Covers security analyst tools, network security, threat intelligence, and forensics.",
        careers: ["cybersecurity-analyst"]
    }
];

const PROJECTS_DB = [
    // Software Engineer
    {
        id: "se-proj-1",
        name: "Multi-threaded Web Crawler",
        description: "Build a command-line tool that concurrently crawls websites up to a specified depth and indexes hyperlinks.",
        difficulty: "Intermediate",
        skills: ["Java", "Multithreading", "Data Structures", "Git"],
        estimatedTime: "20 Hours",
        careerId: "software-engineer"
    },
    {
        id: "se-proj-2",
        name: "Distributed Key-Value Store",
        description: "Implement a fault-tolerant in-memory key-value database replicated across nodes with raft-like consensus.",
        difficulty: "Advanced",
        skills: ["Go", "Sockets", "Concurrency", "System Design"],
        estimatedTime: "40 Hours",
        careerId: "software-engineer"
    },
    {
        id: "se-proj-3",
        name: "Personal Library Cataloger",
        description: "Create a console-based CRUD application that stores and searches library books in a local database.",
        difficulty: "Beginner",
        skills: ["Python", "SQLite", "OOP Concepts"],
        estimatedTime: "8 Hours",
        careerId: "software-engineer"
    },
    // Web Developer
    {
        id: "web-proj-1",
        name: "SaaS Dashboard Interface",
        description: "Create a fully responsive dashboard using HTML, CSS grid/flexbox, dynamic chart displays, and theme switching.",
        difficulty: "Beginner",
        skills: ["HTML", "CSS", "JavaScript"],
        estimatedTime: "12 Hours",
        careerId: "web-developer"
    },
    {
        id: "web-proj-2",
        name: "E-Commerce REST API",
        description: "Design a complete backend with JWT authentication, order processing, product management, and database storage.",
        difficulty: "Intermediate",
        skills: ["Node.js", "Express", "NoSQL", "REST APIs"],
        estimatedTime: "25 Hours",
        careerId: "web-developer"
    },
    {
        id: "web-proj-3",
        name: "Real-time Collaborative Whiteboard",
        description: "Develop a multi-user sketch board using WebSockets where changes synchronize instantly across all browsers.",
        difficulty: "Advanced",
        skills: ["React", "Node.js", "WebSockets", "Docker"],
        estimatedTime: "45 Hours",
        careerId: "web-developer"
    },
    // AI Engineer
    {
        id: "ai-proj-1",
        name: "Sentiment Classifier for Movie Reviews",
        description: "Train a NLP model to predict movie review polarities (positive/negative) using text classification algorithms.",
        difficulty: "Beginner",
        skills: ["Python", "Scikit-Learn", "REST APIs"],
        estimatedTime: "10 Hours",
        careerId: "ai-engineer"
    },
    {
        id: "ai-proj-2",
        name: "Autonomous Drone Path Finder",
        description: "Implement reinforcement learning (Q-Learning) to guide an agent through a customizable grid maze obstacles.",
        difficulty: "Intermediate",
        skills: ["Python", "Machine Learning", "Neural Networks"],
        estimatedTime: "30 Hours",
        careerId: "ai-engineer"
    },
    {
        id: "ai-proj-3",
        name: "Custom Object Detection Pipeline",
        description: "Collect images, annotate them, and fine-tune a YOLO/SSD network to identify custom items in real-time video feeds.",
        difficulty: "Advanced",
        skills: ["Python", "Docker", "Neural Networks", "AWS Cloud"],
        estimatedTime: "50 Hours",
        careerId: "ai-engineer"
    },
    // Data Scientist
    {
        id: "ds-proj-1",
        name: "Housing Price Analysis",
        description: "Clean a real estate dataset, handle missing variables, perform EDA, and train a regression model to estimate house values.",
        difficulty: "Beginner",
        skills: ["Python", "Pandas", "Data Visualization"],
        estimatedTime: "12 Hours",
        careerId: "data-scientist"
    },
    {
        id: "ds-proj-2",
        name: "Customer Segmentation Engine",
        description: "Cluster retail clients using K-Means and RFM metrics to reveal purchasing cohorts for targeted marketing campaigns.",
        difficulty: "Intermediate",
        skills: ["Python", "Scikit-Learn", "SQL"],
        estimatedTime: "20 Hours",
        careerId: "data-scientist"
    },
    {
        id: "ds-proj-3",
        name: "Interactive Climate Trend Dashboard",
        description: "Aggregate global temperature records and develop a multi-layered dashboard tracking temperature anomalies over 100 years.",
        difficulty: "Advanced",
        skills: ["Python", "Data Visualization", "AWS Cloud"],
        estimatedTime: "35 Hours",
        careerId: "data-scientist"
    },
    // Cybersecurity Analyst
    {
        id: "cy-proj-1",
        name: "Network Traffic Sniffer",
        description: "Build a script that captures network packets, analyzes headers, and logs source/destination IPs and protocols.",
        difficulty: "Intermediate",
        skills: ["Python", "Linux System Administration", "Firewall Setup"],
        estimatedTime: "18 Hours",
        careerId: "cybersecurity-analyst"
    },
    {
        id: "cy-proj-2",
        name: "Zero-Trust Infrastructure Blueprint",
        description: "Draft, configure, and secure a multi-tier server environment incorporating isolated subnets, WAF, and identity federation.",
        difficulty: "Advanced",
        skills: ["AWS Cloud", "Linux System Administration", "Firewall Setup", "Cryptography"],
        estimatedTime: "30 Hours",
        careerId: "cybersecurity-analyst"
    },
    {
        id: "cy-proj-3",
        name: "Vulnerability Scanning Script",
        description: "Write a utility that probes local ports and reports banners, flags, and common system misconfigurations.",
        difficulty: "Beginner",
        skills: ["Python", "Linux System Administration"],
        estimatedTime: "8 Hours",
        careerId: "cybersecurity-analyst"
    },
    // UI/UX Designer
    {
        id: "ui-proj-1",
        name: "Local Ride-Sharing Mobile App Design",
        description: "Conduct user research, design wireframes, create high-fidelity screens, and build an interactive prototype in Figma.",
        difficulty: "Intermediate",
        skills: ["Figma", "User Research", "Wireframing", "Color Theory"],
        estimatedTime: "22 Hours",
        careerId: "ui-ux-designer"
    },
    {
        id: "ui-proj-2",
        name: "SaaS Design System Setup",
        description: "Formulate a modular design kit including typography scales, spacing grids, dynamic components, states, and light/dark modes.",
        difficulty: "Advanced",
        skills: ["Figma", "Typography", "Color Theory"],
        estimatedTime: "35 Hours",
        careerId: "ui-ux-designer"
    },
    {
        id: "ui-proj-3",
        name: "Redesigning a Local Restaurant Website",
        description: "Evaluate user pain points, design a modern landing page wireframe, and create asset guides for web developers.",
        difficulty: "Beginner",
        skills: ["Figma", "Typography", "Wireframing"],
        estimatedTime: "10 Hours",
        careerId: "ui-ux-designer"
    },
    // Digital Marketer
    {
        id: "dm-proj-1",
        name: "E-Commerce SEO Campaign Plan",
        description: "Conduct comprehensive keyword research, draft page optimization frameworks, and propose backlink and content plans.",
        difficulty: "Beginner",
        skills: ["SEO", "Copywriting", "Market Research"],
        estimatedTime: "14 Hours",
        careerId: "digital-marketer"
    },
    {
        id: "dm-proj-2",
        name: "Social Ad Funnel Construction",
        description: "Plan, mock-up, and layout a budget optimization framework for a paid media acquisition campaign targeting three user tiers.",
        difficulty: "Intermediate",
        skills: ["Social Media Ads", "Copywriting", "Google Analytics"],
        estimatedTime: "20 Hours",
        careerId: "digital-marketer"
    },
    {
        id: "dm-proj-3",
        name: "Comprehensive Brand Growth Audit",
        description: "Analyze a business's digital presence, traffic sources, content quality, and competitor ads; deliver a strategic roadmap.",
        difficulty: "Advanced",
        skills: ["Google Analytics", "Market Research", "SEO", "Copywriting"],
        estimatedTime: "30 Hours",
        careerId: "digital-marketer"
    },
    // Business Analyst
    {
        id: "ba-proj-1",
        name: "Enterprise Workflow Redesign",
        description: "Map existing (As-Is) inventory procurement processes and diagram the proposed streamlined (To-Be) state using BPMN guidelines.",
        difficulty: "Beginner",
        skills: ["Requirements Gathering", "UML Modeling", "Agile/Scrum"],
        estimatedTime: "12 Hours",
        careerId: "business-analyst"
    },
    {
        id: "ba-proj-2",
        name: "Financial SaaS Feasibility Study",
        description: "Compose user stories, document functional requirements, draft system use-cases, and design acceptance test sheets.",
        difficulty: "Intermediate",
        skills: ["Requirements Gathering", "Agile/Scrum", "UML Modeling"],
        estimatedTime: "24 Hours",
        careerId: "business-analyst"
    },
    {
        id: "ba-proj-3",
        name: "Corporate Spending Dashboard",
        description: "Import financial reports, model budget categories, and deploy interactive visualization dashboards for executive review.",
        difficulty: "Advanced",
        skills: ["Excel", "Data Visualization", "Market Research", "Agile/Scrum"],
        estimatedTime: "30 Hours",
        careerId: "business-analyst"
    }
];

const CAREERS_DB = [
    {
        id: "software-engineer",
        name: "Software Engineer",
        category: "Tech & Development",
        icon: "bi-cpu",
        description: "Designs, builds, and tests software applications. Focuses on system architecture, code quality, and engineering principles to solve complex digital problems.",
        skills: ["Java", "Python", "C++", "SQL", "Git", "Docker", "REST APIs"],
        tools: ["VS Code", "IntelliJ", "GitKraken", "Docker Desktop", "Postman"],
        matching: {
            interests: ["coding", "problem_solving"],
            subjects: ["computer_science", "mathematics"],
            strengths: ["logical", "detail_oriented"]
        },
        learningPath: {
            beginner: ["Basics of Programming (Python/Java)", "Object-Oriented Programming (OOP) Concepts", "Version Control with Git & GitHub", "Basic Data Structures (Arrays, Lists, Stacks)"],
            intermediate: ["Algorithms & Advanced Data Structures", "Relational Databases & SQL queries", "RESTful API Development & Architecture", "Software Testing (Unit, Integration)"],
            advanced: ["Docker & Containerization basics", "System Design & Scalability Patterns", "CI/CD Deployment Pipelines", "Introduction to Cloud Infrastructures (AWS/Azure)"],
            industryReady: ["Writing clean, dry, maintainable code", "Agile Software Development workflows", "Contributing to Open Source or team mock-projects", "Mock System Design Interviews"]
        }
    },
    {
        id: "web-developer",
        name: "Web Developer",
        category: "Tech & Development",
        icon: "bi-globe",
        description: "Creates responsive websites and web applications. Combines frontend interfaces that engage visitors with robust, reliable backend servers and APIs.",
        skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "NoSQL", "Git", "REST APIs"],
        tools: ["VS Code", "Chrome DevTools", "npm", "Postman", "GitHub"],
        matching: {
            interests: ["coding", "design"],
            subjects: ["computer_science", "communication"],
            strengths: ["logical", "creativity"]
        },
        learningPath: {
            beginner: ["HTML5 & semantic structure", "CSS3 basics, Flexbox, Grid & Responsive Web Design", "Core JavaScript Syntax & DOM Manipulation", "Intro to command line & Git"],
            intermediate: ["Frontend Frameworks (React/Vue)", "State Management & Routing", "Node.js & Express.js backend foundations", "Database interaction with SQL/NoSQL"],
            advanced: ["Authentication systems (JWT/OAuth)", "State, API & DB optimization strategies", "Web Performance optimization & caching", "Deploying to Cloud/PaaS (Netlify, Vercel, Render)"],
            industryReady: ["Web Accessibility (a11y) standards", "Fullstack integrations & End-to-End Testing", "API documentation (Swagger/Postman)", "Portfolio site featuring 3 major fullstack projects"]
        }
    },
    {
        id: "ai-engineer",
        name: "AI Engineer",
        category: "Artificial Intelligence",
        icon: "bi-robot",
        description: "Develops machine learning models, neural networks, and applications to mimic human intelligence. Converts raw research into productionized smart services.",
        skills: ["Python", "REST APIs", "AWS Cloud", "Pandas", "Scikit-Learn", "Machine Learning", "Neural Networks"],
        tools: ["Jupyter Notebooks", "PyTorch / TensorFlow", "Google Colab", "Docker", "Hugging Face"],
        matching: {
            interests: ["coding", "data_analysis", "problem_solving"],
            subjects: ["computer_science", "mathematics"],
            strengths: ["logical", "analytical"]
        },
        learningPath: {
            beginner: ["Advanced Python programming & libraries", "Linear Algebra, Calculus & probability concepts", "Introduction to Data Science & Cleaning data", "Standard ML algorithms (Regression, Decision Trees)"],
            intermediate: ["Training models using Scikit-Learn", "Deep Learning basics & Artificial Neural Networks", "Natural Language Processing (NLP) & Computer Vision basics", "Evaluating models with proper test suites"],
            advanced: ["Deploying ML models via APIs (FastAPI/Flask)", "Managing models with Docker", "Introduction to cloud platforms (AWS Sagemaker/Azure ML)", "Fine-tuning pre-trained models (LLMs)"],
            industryReady: ["MLOps (Machine Learning Operations) foundations", "Bias detection & Ethical AI testing", "Scalable model serving environments", "End-to-End AI deployment portfolio project"]
        }
    },
    {
        id: "data-scientist",
        name: "Data Scientist",
        category: "Data Science",
        icon: "bi-graph-up-arrow",
        description: "Extracts insights from structured and unstructured data. Uses statistical methodologies, visualization, and ML models to guide corporate decisions.",
        skills: ["Python", "SQL", "Pandas", "Scikit-Learn", "Data Visualization", "R Programming", "Excel", "Machine Learning"],
        tools: ["Jupyter Notebooks", "Tableau / Power BI", "Anaconda", "SQL Developer", "Git"],
        matching: {
            interests: ["data_analysis", "problem_solving"],
            subjects: ["mathematics", "computer_science"],
            strengths: ["analytical", "detail_oriented"]
        },
        learningPath: {
            beginner: ["Statistical Foundations & Hypothesis testing", "Python/R basics and programming basics", "Manipulating data with Pandas & NumPy", "Basic SQL database queries"],
            intermediate: ["Exploratory Data Analysis (EDA)", "Advanced Data Visualization (Seaborn/Tableau)", "Feature engineering & preprocessing pipelines", "Supervised Machine Learning basics"],
            advanced: ["Unsupervised learning & clustering (K-Means)", "Time series forecasting algorithms", "Dealing with Big Data tools (Spark/Hadoop basics)", "Building production-grade data pipelines"],
            industryReady: ["Translating raw insights into business metrics", "Data Storytelling & Executive presentation skills", "Setting up reproducible notebook environments", "Deploying interactive dashboards for stakeholders"]
        }
    },
    {
        id: "cybersecurity-analyst",
        name: "Cybersecurity Analyst",
        category: "Tech & Development",
        icon: "bi-shield-lock",
        description: "Protects systems, networks, and data from digital breaches. Establishes firewall policies, tracks threats, monitors access, and recovers from security failures.",
        skills: ["Linux System Administration", "AWS Cloud", "Penetration Testing", "Cryptography", "Firewall Setup", "Ethical Hacking", "Threat Modeling"],
        tools: ["Kali Linux", "Wireshark", "Nmap", "Metasploit", "Burp Suite"],
        matching: {
            interests: ["security", "problem_solving"],
            subjects: ["computer_science"],
            strengths: ["logical", "detail_oriented"]
        },
        learningPath: {
            beginner: ["CompTIA A+ and Network+ fundamentals", "Linux Operating System command-line operations", "Networking protocols (TCP/IP, DNS, Subnets)", "Basics of Information Security policies"],
            intermediate: ["Vulnerability assessments & port scanning", "Configuring Firewalls & VPN networks", "Scripting for security automation (Python/Bash)", "Symmetric & Asymmetric Cryptography foundations"],
            advanced: ["Threat hunting, intrusion detection, & SIEM systems", "Ethical Hacking & Basic Penetration Testing", "Cloud security architectures (AWS IAM/VPC)", "Digital Forensics & Incident Response steps"],
            industryReady: ["GDPR, SOC2, HIPAA compliance frameworks", "Incident response planning & tabletop walkthroughs", "Performing penetration test reviews and reports", "Completing CTF (Catch the Flag) challenges"]
        }
    },
    {
        id: "ui-ux-designer",
        name: "UI/UX Designer",
        category: "Creative & Design",
        icon: "bi-palette",
        description: "Designs the aesthetics and user experience of digital applications. Leads user research, details user flows, sketches wireframes, and compiles high-fidelity interfaces.",
        skills: ["Figma", "User Research", "Wireframing", "Color Theory", "Typography", "Illustrator"],
        tools: ["Figma", "Adobe Creative Cloud", "Miro", "Zeplin", "Pen & Paper"],
        matching: {
            interests: ["design"],
            subjects: ["art_design", "communication"],
            strengths: ["creativity", "detail_oriented"]
        },
        learningPath: {
            beginner: ["Design thinking philosophy and cycles", "Figma interface and component layout tools", "Color theory & UI typography standards", "Sketching simple user journeys & wireframes"],
            intermediate: ["Interactive prototyping & micro-interactions", "User research methodologies & drafting personas", "Usability testing & feedback iteration loops", "Responsive grid design rules (Web/Mobile)"],
            advanced: ["Setting up Design Systems (Styles, Variables)", "Information Architecture & Card Sorting models", "Accessibility (WCAG) compliance in visual designs", "Developer handoff & redlining specs"],
            industryReady: ["UX case studies detailing research process", "Personal portfolio highlighting 3 real-world projects", "Co-designing with web developers & understanding CSS", "Client presentation & stakeholder reasoning"]
        }
    },
    {
        id: "digital-marketer",
        name: "Digital Marketer",
        category: "Business & Marketing",
        icon: "bi-megaphone",
        description: "Promotes services and products online. Directs search engine visibility (SEO), handles pay-per-click ads, leads email campaigns, and audits engagement metrics.",
        skills: ["SEO", "Google Analytics", "Copywriting", "Social Media Ads", "Market Research"],
        tools: ["Google Search Console", "Meta Ads Manager", "SEMrush", "Mailchimp", "Canva"],
        matching: {
            interests: ["marketing"],
            subjects: ["communication", "business"],
            strengths: ["communication", "creativity"]
        },
        learningPath: {
            beginner: ["Marketing fundamentals & customer lifecycles", "On-page & Off-page SEO rules", "Content marketing structures & Copywriting basics", "Social media profile optimization"],
            intermediate: ["Google Analytics & Conversion tracking", "Setting up Meta Ads & Google AdWords", "Email marketing segmentation & campaign setup", "Key Performance Indicator (KPI) frameworks"],
            advanced: ["A/B Testing copy and landing pages", "Search engine optimization audits & competitor logs", "Marketing automation tools & integration setups", "Influencer & affiliate campaign execution"],
            industryReady: ["Drafting complete multi-channel marketing campaigns", "Budget allocation & ROAS (Return on Ad Spend) audits", "Understanding marketing legal frameworks (CAN-SPAM/GDPR)", "Presenting visual growth audits to actual clients"]
        }
    },
    {
        id: "business-analyst",
        name: "Business Analyst",
        category: "Business & Marketing",
        icon: "bi-briefcase",
        description: "Bridges the gap between business needs and technology. Analyzes workflows, writes software specifications, guides project scopes, and tests end-user deliverables.",
        skills: ["SQL", "Excel", "Data Visualization", "Agile/Scrum", "Requirements Gathering", "UML Modeling", "Market Research"],
        tools: ["Microsoft Excel", "Jira / Confluence", "Draw.io / Lucidchart", "Power BI", "Slack"],
        matching: {
            interests: ["business_strategy", "data_analysis"],
            subjects: ["business", "mathematics", "computer_science"],
            strengths: ["leadership", "analytical", "communication"]
        },
        learningPath: {
            beginner: ["Business Analysis Core Standards (BABOK guide)", "Requirements Gathering techniques (interviews/workshops)", "Agile methodologies & Scrum framework rules", "Advanced Excel (Pivot Tables, VLOOKUP, charts)"],
            intermediate: ["Writing User Stories & Acceptance Criteria", "Business Process Modeling (BPMN diagrams, Flowcharts)", "UML diagrams (Use Case, Activity diagrams)", "Introduction to SQL databases for analysis"],
            advanced: ["Data analysis & dashboard reporting in Power BI/Tableau", "Agile product backlog management in Jira", "Gap Analysis & Feasibility Study frameworks", "Software testing protocols (UAT/Acceptance)"],
            industryReady: ["Stakeholder communication & negotiating scope", "Writing complete Business Requirements Documents (BRD)", "Facilitating user acceptance testing sessions", "Case study demonstrating complex workflow improvement"]
        }
    }
];

const INTERVIEWS_DB = {
    "software-engineer": {
        tech: [
            { q: "What is the difference between an Abstract Class and an Interface?", a: "An abstract class allows you to create functional methods with implementations and subclass structures, while supporting single inheritance. An interface is a contract that defining classes must implement, supports multiple inheritance, and generally contains only method signatures." },
            { q: "Explain the difference between SQL and NoSQL databases.", a: "SQL (relational) databases are table-based with strict schema structures, support ACID transactions, and scale vertically. NoSQL (non-relational) databases can be document-based, key-value, or graph-based, support dynamic schemas, are optimized for unstructured data, and scale horizontally." },
            { q: "What is a deadlock and how can it be prevented?", a: "A deadlock occurs when two or more threads are blocked forever, each waiting for resources held by the other. It can be prevented by avoiding circular wait, acquiring resources in a globally synchronized order, implementing lock timeouts, or checking lock availability (e.g., tryLock)." }
        ],
        hr: [
            { q: "Tell me about a time you faced a technical conflict in a team. How did you resolve it?", a: "Focus on active listening, listing the pros/cons of each approach objectively, consulting documentation or benchmarking performance, and aligning with the team's overarching project deadlines." },
            { q: "How do you handle working on a codebase that has minimal documentation?", a: "State that you analyze tests to observe the expected behavior, write small scripts to trace functions, run debuggers, document classes as you learn them, and ask team members for targeted high-level context." }
        ],
        aptitude: [
            { q: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", a: "Speed = 60 * (5/18) m/s = 16.67 m/s. Length = Speed * Time = 16.67 * 9 = 150 meters." },
            { q: "Find the missing number in the series: 2, 6, 12, 20, 30, ?, 56", a: "The difference increases by 2 each step: +4, +6, +8, +10. The next difference is +12. 30 + 12 = 42." }
        ],
        gd: [
            "Monolithic vs. Microservices Architecture: What dictates the shift?",
            "Is AI writing code a threat or a booster for entry-level Software Engineers?",
            "Open Source Contribution: Should it be mandatory for tech resumes?"
        ]
    },
    "web-developer": {
        tech: [
            { q: "What is the event loop in JavaScript?", a: "The event loop is a mechanism that allows JavaScript to perform non-blocking I/O operations despite being single-threaded. It constantly monitors the Call Stack and the Callback Queue. If the Call Stack is empty, it pushes the first task from the queue onto the stack." },
            { q: "Explain CSS Specificity and how it works.", a: "Specificity is the weight applied to a CSS rule by the browser. It is calculated using four categories: Inline styles (1000), IDs (100), Classes/Attributes/Pseudo-classes (10), and Elements/Pseudo-elements (1). A higher specificity rule always overrides a lower one." },
            { q: "What is the difference between Server-Side Rendering (SSR) and Client-Side Rendering (CSR)?", a: "SSR generates the full HTML for a page on the server and delivers it to the browser, offering faster initial loads and better SEO. CSR downloads a bare HTML wrapper and JavaScript bundle, rendering content inside the browser dynamically, which offers smoother page transitions but slower initial loads." }
        ],
        hr: [
            { q: "How do you stay updated with the rapidly changing web development ecosystems?", a: "Mention reading blogs (Dev.to, CSS-Tricks, Medium), following release notes of major libraries, subscribing to tech newsletters (Bytes, JavaScript Weekly), and building side projects to test new libraries." },
            { q: "How do you handle a client who changes web design requirements mid-development?", a: "Explain that you keep transparent records, detail how changes impact timelines and budgets, suggest modular updates, and work to align on documented scope adjustments through collaborative wireframes." }
        ],
        aptitude: [
            { q: "A website's page speed was optimized, reducing load time from 4 seconds to 1.5 seconds. What is the percentage improvement?", a: "Change = 4 - 1.5 = 2.5 seconds. Percentage decrease = (2.5 / 4) * 100 = 62.5% improvement." },
            { q: "If 12 web developers can complete a portal in 8 days, how many days will 6 developers take?", a: "Total work = 12 * 8 = 96 developer-days. Days for 6 developers = 96 / 6 = 16 days." }
        ],
        gd: [
            "No-code and Low-code tools: Will they replace Web Developers?",
            "Mobile-first vs. Desktop-first design: Which is more vital in today's market?",
            "Framework overload: Are developers spending too much time learning tools instead of core JS?"
        ]
    },
    "ai-engineer": {
        tech: [
            { q: "What is the difference between supervised and unsupervised learning?", a: "Supervised learning trains a model on labeled datasets where inputs map to target outcomes. Unsupervised learning trains on unlabeled data, finding hidden patterns, clusters, or structures without external labels." },
            { q: "What is overfitting and how do you prevent it in neural networks?", a: "Overfitting happens when a model learns noise in training data, failing to generalize to new data. Prevent it using regularization (L1/L2), Dropout layers, Early Stopping, gathering more training data, or simplifying model complexity." },
            { q: "Explain the difference between a Transformer model and a Recurrent Neural Network (RNN).", a: "RNNs process data sequentially, making them slow and limited in tracking long-range dependencies. Transformers use Self-Attention mechanisms to process all tokens in parallel, which scales better and captures deep semantic context over long sequences." }
        ],
        hr: [
            { q: "How do you explain a complex AI neural network outcome to a non-technical manager?", a: "Emphasize focusing on inputs and business-meaningful outputs rather than mathematical formulas. Use analogies (e.g. comparing nodes to filters or decisions) and show charts comparing predictions with actual trends." },
            { q: "How do you handle ethical dilemmas in AI, such as training bias in a model?", a: "Mention inspecting input datasets for class imbalances, using fairness toolkits, implementing bias mitigation methods, documenting training constraints in Model Cards, and advocating for diverse testing groups." }
        ],
        aptitude: [
            { q: "A classification model makes 90 correct predictions out of 120 cases. What is its accuracy?", a: "Accuracy = Correct / Total = 90 / 120 = 0.75 = 75%." },
            { q: "If the probability of an event A is 0.6 and event B is 0.4, and they are independent, what is the probability of both occurring?", a: "P(A and B) = P(A) * P(B) = 0.6 * 0.4 = 0.24." }
        ],
        gd: [
            "Artificial General Intelligence (AGI): Are we near it, or is it pure hype?",
            "AI Ethics: Who is responsible for AI errors—the creator, company, or model?",
            "ChatGPT and LLMs: Creative companion or academic plagiarism hazard?"
        ]
    },
    "data-scientist": {
        tech: [
            { q: "Explain the Central Limit Theorem and why it is important.", a: "The Central Limit Theorem states that as sample size grows, the sampling distribution of the sample mean approaches a normal distribution, regardless of the population's distribution shape. It permits parametric testing on non-normal distributions." },
            { q: "What is the difference between Covariance and Correlation?", a: "Covariance indicates the direction of the linear relationship between two variables (unbounded scale). Correlation measures both direction and strength, normalized between -1 and +1, making it scale-invariant." },
            { q: "What is the bias-variance tradeoff?", a: "Bias represents errors from simple models that underfit. Variance represents errors from complex models that overfit. The tradeoff is the sweet spot where total error (Bias² + Variance + Irreducible Noise) is minimized." }
        ],
        hr: [
            { q: "What do you do if your model's accuracy drops when tested on live production data?", a: "State that you analyze differences between training and production distributions (data drift), review outlier frequencies, check if input telemetry is corrupted, and consider model retraining with newer inputs." },
            { q: "Describe a project where your data analysis directly drove a business decision.", a: "Prepare a story explaining: the problem (e.g. drop in retention), your analysis (e.g. churn clustering), your recommendation (e.g. targeting specific cohorts), and the business result (e.g. reduced churn by 12%)." }
        ],
        aptitude: [
            { q: "The mean weight of a class of 20 students is 50 kg. If a teacher's weight is added, the mean increases by 1 kg. What is the teacher's weight?", a: "Total weight of students = 20 * 50 = 1000 kg. New mean = 51 kg for 21 people. Total new weight = 21 * 51 = 1071 kg. Teacher's weight = 1071 - 1000 = 71 kg." },
            { q: "Out of a sample of 250 users, 15 clicked an ad. What is the Click-Through Rate (CTR)?", a: "CTR = (15 / 250) * 100 = 6%." }
        ],
        gd: [
            "Data Privacy vs. Corporate Analytics: Where do we draw the line?",
            "Are Data Scientists being replaced by Automated ML tools (AutoML)?",
            "Can data visualization be misleading, and how do we enforce transparency?"
        ]
    },
    "cybersecurity-analyst": {
        tech: [
            { q: "What is the difference between Symmetric and Asymmetric Cryptography?", a: "Symmetric cryptography uses the same key for both encryption and decryption, making it fast but difficult to distribute keys securely. Asymmetric uses a public key to encrypt and a private key to decrypt, which simplifies key exchange but is computationally slower." },
            { q: "What is a Man-in-the-Middle (MITM) attack and how is it prevented?", a: "A MITM attack is where an attacker eavesdrops or alters communication between two endpoints. It is prevented using secure network protocols (HTTPS, SSH), implementing public-key pinning, using VPNs, and enforcing strong certificate validations." },
            { q: "Explain the difference between a Vulnerability Assessment and a Penetration Test.", a: "A vulnerability assessment is a passive scan that lists and categorizes known security flaws without exploitation. A penetration test is an active simulation that exploits vulnerabilities to gauge real-world access and network exposure." }
        ],
        hr: [
            { q: "How do you explain the necessity of complex security controls to employees who find them annoying?", a: "Frame security as an enabler rather than a barrier. Use real-world breach scenarios to show costs, organize interactive security training, and work to streamline workflows to reduce user friction." },
            { q: "How do you manage stress during an active cybersecurity incident?", a: "Discuss following incident response playbooks strictly, dividing investigation tasks clearly, keeping transparent logs of events, and focusing on containment first before analyzing root causes." }
        ],
        aptitude: [
            { q: "A company's system is attacked. The server logs register 150 failed login attempts per minute. How many attempts occur in an hour?", a: "Attempts per hour = 150 * 60 = 9000 failed attempts." },
            { q: "An encryption algorithm can crack a key in 2^10 steps. A new version increases safety to 2^14 steps. By what factor did safety increase?", a: "Factor = 2^14 / 2^10 = 2^4 = 16 times safer." }
        ],
        gd: [
            "Ransomware attacks: Should companies pay the ransom or refuse on principle?",
            "Social engineering vs. Software vulnerabilities: What is the weakest link?",
            "Biometric security (FaceID/Fingerprints): Is it a privacy breach or ultimate safety?"
        ]
    },
    "ui-ux-designer": {
        tech: [
            { q: "What is the difference between UI and UX?", a: "UI (User Interface) focuses on the visual look, feel, layout, and interactive elements of a screen. UX (User Experience) focuses on the overall feel, utility, hierarchy, and ease of navigation in a user's entire product journey." },
            { q: "What are the core design principles of Gestalt?", a: "Gestalt principles describe how human eyes perceive visual elements. Key principles include Proximity (close items are grouped), Similarity (similar items share functions), Continuity (flowing lines guide eyes), and Closure (brains fill in missing gaps)." },
            { q: "Explain visual hierarchy and how you establish it.", a: "Visual hierarchy is the arrangement of elements in order of importance. It is established using size contrasts, weight differences, color accents, whitespace, alignments, and positioning to direct user attention naturally." }
        ],
        hr: [
            { q: "How do you handle negative feedback from a client on a design you spent weeks creating?", a: "Highlight that you separate yourself from your designs. Probe for the root causes of their concerns (e.g. usability issues, target demographics) and propose alternative mocks based on actual user testing data." },
            { q: "Tell me about a time you had to compromise on design because of technical limitations.", a: "Mention discussing limitations early with developers, prioritizing core accessibility and user flows, simplifying complex animations, and adapting ideas without losing essential usability." }
        ],
        aptitude: [
            { q: "A designer increases the padding around a button from 8px to 14px. By what percentage did the padding increase?", a: "Increase = 14 - 8 = 6px. Percentage increase = (6 / 8) * 100 = 75%." },
            { q: "If a user journey map has 15 steps and user testing identifies 3 redundant steps, by what percentage is the flow simplified?", a: "Simplification = (3 / 15) * 100 = 20% reduction." }
        ],
        gd: [
            "Dark Patterns in UX: Ethical design vs. short-term conversion metrics.",
            "Minimalist UI design: Has it gone too far, making layouts confusing?",
            "AI in Design: Will tools like Midjourney or Figma AI phase out designers?"
        ]
    },
    "digital-marketer": {
        tech: [
            { q: "What is SEO and what are the main elements of On-Page SEO?", a: "SEO (Search Engine Optimization) is the process of improving organic site traffic. On-Page SEO elements include keyword placements, H1-H3 structures, descriptive alt tags for images, schema markup, loading speeds, and writing meta titles and descriptions." },
            { q: "Explain the marketing funnel and its stages.", a: "A marketing funnel outlines the customer journey: Awareness (TOFU - learning about the brand), Consideration (MOFU - researching products), Decision/Purchase (BOFU - converting), and Retention/Loyalty (post-purchase engagement)." },
            { q: "What is the difference between organic traffic and paid search?", a: "Organic traffic comes from users clicking links in search engines naturally without direct cost to the business. Paid search displays ads at the top of results pages, charging the business per click (CPC)." }
        ],
        hr: [
            { q: "How do you pitch a budget increase for a digital ad campaign that has a low immediate return?", a: "Emphasize lifetime customer value (LTV) and long-term search engine awareness. Present data on top-of-funnel customer gains and forecast how conversion rates will grow over time." },
            { q: "How do you handle an ad campaign that completely fails to meet its KPIs?", a: "Discuss stopping low-performing ads immediately, performing audits on target demographics, analyzing user behaviors on landing pages, adjusting ad creatives, and testing options with minor budgets." }
        ],
        aptitude: [
            { q: "An ad campaign costs $500 and generates 25 product sales worth $40 each. What is the Return on Ad Spend (ROAS)?", a: "Revenue = 25 * 40 = $1000. ROAS = Revenue / Cost = 1000 / 500 = 2.0x (or 200%)." },
            { q: "If an email newsletter has 5000 subscribers and 250 open the email, what is the Open Rate?", a: "Open Rate = (250 / 5000) * 100 = 5%." }
        ],
        gd: [
            "Data privacy regulations (GDPR/iOS 14+): Is targeted social advertising dead?",
            "Influencer Marketing: Genuine brand builder or expensive vanity exercise?",
            "Organic SEO vs. Paid Ads: Where should early-stage startups invest first?"
        ]
    },
    "business-analyst": {
        tech: [
            { q: "What is the difference between functional and non-functional requirements?", a: "Functional requirements describe what a system must do (e.g., 'User can add items to cart'). Non-functional requirements specify how the system performs or behaves (e.g., 'Page must load under 2 seconds', 'System must support SOC2 security')." },
            { q: "What is BPMN and why is it used?", a: "BPMN (Business Process Model and Notation) is a standardized visual language for diagramming business processes. It maps workflows sequentially, aligning developers, project leads, and stakeholders on operational paths." },
            { q: "Explain the difference between Agile and Waterfall methodologies.", a: "Waterfall is sequential and rigid; it gathers all requirements upfront, then builds, tests, and deploys, which is risky for dynamic products. Agile is iterative and collaborative, breaking projects into sprints with constant feedback and updates." }
        ],
        hr: [
            { q: "How do you handle a stakeholder who insists on adding features that will delay the project launch?", a: "Use impact matrices to show delays visually, document requirements in backlog items for future sprints, align their requests with baseline project goals, and suggest MVP alternatives." },
            { q: "How do you ensure developer teams interpret user stories correctly?", a: "Discuss holding grooming sessions, providing clear acceptance criteria using Gherkin format (Given-When-Then), attaching wireframes, and answering developer queries in real-time." }
        ],
        aptitude: [
            { q: "A project's tasks take 12, 18, and 30 days. If they must run in sequence, what is the total duration?", a: "Duration = 12 + 18 + 30 = 60 days." },
            { q: "If a workflow optimization saves an analyst 3 hours in a 40-hour work week, what is the productivity gain?", a: "Gain = (3 / 40) * 100 = 7.5%." }
        ],
        gd: [
            "Agile vs. Scrum: Is framework rigidity hurting developer productivity?",
            "Scope Creep: Is it a failure of analysis or an inevitable reality of business growth?",
            "Artificial Intelligence in Business Analysis: Will AI write specifications better than BAs?"
        ]
    }
};
