import type { Resource, Internship, Quiz, CareerRoadmap, Badge, Student, ExamQuestion } from './types';

export const mockResources: Resource[] = [
  { id: 1, type: 'PDF', title: 'Advanced React Patterns', description: 'A deep dive into hooks, context, and performance.', uploader: 'Jane Doe', thumbnail: 'https://picsum.photos/seed/react/300/200', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 2, type: 'Video', title: 'Data Structures in 2 Hours', description: 'Comprehensive video covering all major data structures.', uploader: 'John Smith', thumbnail: 'https://picsum.photos/seed/dsa/300/200', url: 'https://www.youtube.com/embed/RBSGKlAcrPw' },
  { id: 3, type: 'Image', title: 'UI/UX Design Principles', description: 'Infographic on key design principles.', uploader: 'Alice Johnson', thumbnail: 'https://picsum.photos/seed/uiux/300/200', url: 'https://picsum.photos/seed/uiux/800/600' },
  { id: 4, type: 'File', title: 'Machine Learning Dataset', description: 'CSV file for ML practice.', uploader: 'Bob Brown', thumbnail: 'https://picsum.photos/seed/ml/300/200', url: 'https://raw.githubusercontent.com/plotly/datasets/master/iris-data.csv' }
];

export const mockInternships: Internship[] = [
    { id: 1, title: 'Frontend Development Challenge', company: 'Vercel', duration: '2 Weeks', description: 'Build a mini-clone of a popular web app to showcase your React skills.', skills: ['React', 'TypeScript', 'Tailwind CSS'], points: 500, badgeId: 5 },
    { id: 2, title: 'Data Analysis Hackathon', company: 'Kaggle', duration: '1 Week', description: 'Analyze a real-world dataset and present your findings for a prize.', skills: ['Python', 'Pandas', 'Matplotlib'], points: 400, badgeId: 6 },
    { id: 3, title: 'UX Case Study Project', company: 'Figma', duration: '3 Weeks', description: 'Design a mobile app from ideation to high-fidelity prototype.', skills: ['UX Research', 'Wireframing', 'Prototyping'], points: 450, badgeId: 7 }
];

export const mockQuizzes: Quiz[] = [
  { id: 1, title: 'JavaScript Fundamentals', subject: 'Programming', questions: [
    { question: 'What is a closure?', options: ['A function having access to the parent scope', 'A type of loop', 'A data structure', 'A CSS property'], correctAnswer: 0 },
    { question: 'Which keyword is used to declare a constant variable?', options: ['var', 'let', 'const', 'static'], correctAnswer: 2 },
    { question: 'What does `===` operator check for?', options: ['Value equality', 'Type equality', 'Value and type equality', 'None of the above'], correctAnswer: 2 },
    { question: 'Which of the following is NOT a JavaScript data type?', options: ['String', 'Number', 'Boolean', 'Character'], correctAnswer: 3 },
    { question: 'What method converts a JSON string into a JavaScript object?', options: ['JSON.stringify()', 'JSON.parse()', 'JSON.object()', 'JSON.convert()'], correctAnswer: 1 },
    { question: 'What is the purpose of `this` keyword?', options: ['Refers to the current function', 'Refers to the global object', 'Refers to the object it belongs to', 'Refers to the parent object'], correctAnswer: 2 },
    { question: 'How do you write a single-line comment in JavaScript?', options: ['// comment', '/* comment */', '<!-- comment -->', '# comment'], correctAnswer: 0 },
    { question: 'What is an arrow function?', options: ['A function declared with the `arrow` keyword', 'A compact alternative to a traditional function expression', 'A function that always returns a value', 'A function used for drawing arrows'], correctAnswer: 1 },
    { question: 'Which built-in method returns the length of a string?', options: ['size', 'length', 'count', 'index'], correctAnswer: 1 },
    { question: 'What does `NaN` stand for?', options: ['Not a Number', 'No applicable Name', 'Not a Node', 'New an New'], correctAnswer: 0 }
  ]},
  { id: 2, title: 'World History Basics', subject: 'History', questions: [
    { question: 'When did World War II end?', options: ['1942', '1945', '1950', '1939'], correctAnswer: 1 },
    { question: 'Who was the first emperor of Rome?', options: ['Julius Caesar', 'Nero', 'Augustus', 'Constantine'], correctAnswer: 2 },
    { question: 'The ancient city of Rome was built on how many hills?', options: ['Five', 'Seven', 'Ten', 'Three'], correctAnswer: 1 },
    { question: 'What was the Renaissance a rebirth of?', options: ['Art and learning', 'Religion', 'Warfare', 'Politics'], correctAnswer: 0 },
    { question: 'Who discovered America in 1492?', options: ['Ferdinand Magellan', 'Marco Polo', 'Vasco da Gama', 'Christopher Columbus'], correctAnswer: 3 },
    { question: 'In which country did the Industrial Revolution begin?', options: ['USA', 'France', 'Great Britain', 'Germany'], correctAnswer: 2 },
    { question: 'What empire was ruled by Genghis Khan?', options: ['The Ottoman Empire', 'The Roman Empire', 'The Mongol Empire', 'The British Empire'], correctAnswer: 2 },
    { question: 'The Great Wall of China was primarily built to protect against who?', options: ['The Japanese', 'The Mongols', 'The Russians', 'The Koreans'], correctAnswer: 1 },
    { question: 'What is the oldest known civilization?', options: ['Ancient Egypt', 'Ancient Greece', 'Mesopotamia', 'Indus Valley'], correctAnswer: 2 },
    { question: 'Who wrote the Declaration of Independence?', options: ['George Washington', 'Benjamin Franklin', 'Thomas Jefferson', 'John Adams'], correctAnswer: 2 }
  ]},
  { id: 3, title: 'General Science', subject: 'Science', questions: [
    { question: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'O2', 'NaCl'], correctAnswer: 0 },
    { question: 'What planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1 },
    { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Cell Membrane'], correctAnswer: 2 },
    { question: 'What force keeps us on the ground?', options: ['Magnetism', 'Friction', 'Gravity', 'Inertia'], correctAnswer: 2 },
    { question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Quartz', 'Diamond'], correctAnswer: 3 },
    { question: 'How many bones are in the adult human body?', options: ['206', '216', '196', '300'], correctAnswer: 0 },
    { question: 'What is the main gas found in the air we breathe?', options: ['Oxygen', 'Hydrogen', 'Carbon Dioxide', 'Nitrogen'], correctAnswer: 3 },
    { question: 'What is the boiling point of water in Celsius?', options: ['90°C', '100°C', '110°C', '120°C'], correctAnswer: 1 },
    { question: 'Which of these is a mammal?', options: ['Shark', 'Lizard', 'Dolphin', 'Frog'], correctAnswer: 2 },
    { question: 'What is the study of plants called?', options: ['Zoology', 'Botany', 'Geology', 'Astronomy'], correctAnswer: 1 }
  ]}
];

export const mockRoadmaps: CareerRoadmap[] = [
    { id: 1, domain: 'Engineering', title: 'Full-Stack Web Developer', steps: [
        { title: 'Learn HTML, CSS, & JavaScript', description: 'Master the fundamentals of the web.' },
        { title: 'Choose a Frontend Framework', description: 'Specialize in React, Vue, or Angular.' },
        { title: 'Learn Backend Development', description: 'Understand Node.js, Python/Django, or Go.' },
        { title: 'Master Databases', description: 'Work with SQL (PostgreSQL) and NoSQL (MongoDB).' },
        { title: 'Deploy Your Applications', description: 'Learn about Docker, CI/CD, and cloud platforms.' }
    ]},
    { id: 2, domain: 'Arts', title: 'Digital Illustrator', steps: [
        { title: 'Master Drawing Fundamentals', description: 'Practice perspective, anatomy, and composition.' },
        { title: 'Learn Digital Tools', description: 'Become proficient in Procreate, Photoshop, or Clip Studio Paint.' },
        { title: 'Develop Your Style', description: 'Experiment to find your unique artistic voice.' },
        { title: 'Build a Portfolio', description: 'Showcase your best work to attract clients.' }
    ]}
];

export const mockBadges: Badge[] = [
    { id: 1, name: 'Quiz Whiz', icon: '🧠', description: 'Ace 5 quizzes in a row.' },
    { id: 2, name: 'First Contribution', icon: '🚀', description: 'Upload your first resource.' },
    { id: 3, name: 'Project Pioneer', icon: '🛠️', description: 'Complete your first micro-internship.' },
    { id: 4, name: 'Roadmap Runner', icon: '🗺️', description: 'Complete a career roadmap.' },
    { id: 5, name: 'React Ranger', icon: '⚛️', description: 'Complete a React-based project.' },
    { id: 6, name: 'Python Pro', icon: '🐍', description: 'Complete a Python-based project.' },
    { id: 7, name: 'Design Virtuoso', icon: '🎨', description: 'Complete a UX/UI design project.' },
];

export const mockExamPrep = [
    { name: 'IELTS', description: 'Comprehensive materials for the International English Language Testing System.', icon: '🇬🇧' },
    { name: 'UPSC', description: 'Mock tests and study guides for the Union Public Service Commission exams.', icon: '🇮🇳' },
    { name: 'GRE', description: 'Practice questions and strategies for the Graduate Record Examinations.', icon: '🎓' },
    { name: 'GMAT', description: 'Resources to help you ace the Graduate Management Admission Test.', icon: '💼' }
];

export const mockExamQuestions: { [key: string]: ExamQuestion[] } = {
    'IELTS': [
        { question: 'Which sentence is grammatically correct?', options: ['He go to the store.', 'She is going to the store.', 'They goes to the store.', 'I going to the store.'], correctAnswer: 1, explanation: 'The present continuous tense "is going" is the correct form for the subject "She".' },
        { question: 'Choose the best synonym for "ubiquitous".', options: ['Rare', 'Everywhere', 'Hidden', 'Difficult'], correctAnswer: 1, explanation: '"Ubiquitous" means present, appearing, or found everywhere.' },
    ],
    'GRE': [
        { question: 'If 5x + 3 = 18, what is the value of x?', options: ['2', '3', '4', '5'], correctAnswer: 1, explanation: 'Subtract 3 from both sides to get 5x = 15. Then divide by 5 to get x = 3.' },
        { question: 'ANALOGY: ODIOUS : REPULSIVE', options: ['CHARMING : ATTRACTIVE', 'BORING : EXCITING', 'QUICK : SLOW', 'SAD : HAPPY'], correctAnswer: 0, explanation: 'This is a synonym analogy. Odious and repulsive mean the same thing, just as charming and attractive do.' },
    ]
};


export const mockLanguages = [
    { name: 'Japanese', level: 'Beginner', progress: 45, icon: '🇯🇵' },
    { name: 'Korean', level: 'Intermediate', progress: 70, icon: '🇰🇷' },
    { name: 'German', level: 'Beginner', progress: 20, icon: '🇩🇪' },
    { name: 'Spanish', level: 'Advanced', progress: 95, icon: '🇪🇸' },
    { name: 'French', level: 'Intermediate', progress: 60, icon: '🇫🇷' },
    { name: 'Mandarin', level: 'Beginner', progress: 15, icon: '🇨🇳' },
    { name: 'Arabic', level: 'Beginner', progress: 25, icon: '🇸🇦' }
];

export const mockLeaderboardData: Student[] = [
    { id: 1, name: 'Sarah Day', points: 8500, avatar: 'https://picsum.photos/seed/user1/100/100' },
    { id: 2, name: 'Ben Carter', points: 7200, avatar: 'https://picsum.photos/seed/user2/100/100' },
    { id: 3, name: 'Alex Morgan', points: 4250, avatar: 'https://picsum.photos/seed/user/100/100' },
    { id: 4, name: 'Chloe Lim', points: 3800, avatar: 'https://picsum.photos/seed/user4/100/100' },
    { id: 5, name: 'David Lee', points: 2100, avatar: 'https://picsum.photos/seed/user5/100/100' },
];