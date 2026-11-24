const createModules = (definitions, startId) => {
  let lessonId = startId;

  return definitions.map((module, index) => ({
    id: index + 1,
    title: module.title,
    lessons: module.lessons.map((item) => ({
      id: lessonId++,
      title: item[0],
      duration: item[1],
      type: item[2],
    })),
  }));
};

export const curriculumData = {
  1: createModules(
    [
      {
        title: "Getting started",
        lessons: [
          ["Welcome", "5 minutes", "Video"],
          ["Setup", "10 minutes", "Video"],
          ["What is React?", "8 minutes", "Article"],
          ["First component", "12 minutes", "Video"],
        ],
      },
      {
        title: "JavaScript essentials",
        lessons: [
          ["ES6", "15 minutes", "Video"],
          ["Array methods", "12 minutes", "Video"],
          ["Destructuring", "8 minutes", "Article"],
          ["Async JS", "18 minutes", "Video"],
          ["Practice", "10 minutes", "Resource"],
        ],
      },
      {
        title: "React fundamentals",
        lessons: [
          ["JSX", "12 minutes", "Video"],
          ["Components", "15 minutes", "Video"],
          ["Props", "10 minutes", "Article"],
          ["Understanding React hooks", "18 minutes", "Video"],
        ],
      },
      {
        title: "Hooks & state management",
        lessons: [
          ["useState", "15 minutes", "Video"],
          ["useEffect", "18 minutes", "Video"],
          ["Context", "12 minutes", "Article"],
          ["Redux Toolkit", "20 minutes", "Video"],
          ["Practice", "10 minutes", "Resource"],
        ],
      },
      {
        title: "Build a real project",
        lessons: [
          ["Planning", "12 minutes", "Video"],
          ["API integration", "20 minutes", "Video"],
          ["Testing", "10 minutes", "Article"],
          ["Deployment", "15 minutes", "Video"],
          ["Final practice", "20 minutes", "Resource"],
          ["Project review", "15 minutes", "Video"],
        ],
      },
    ],
    100
  ),

  2: createModules(
    [
      {
        title: "Introduction to product design",
        lessons: [
          ["What is product design?", "10 minutes", "Video"],
          ["Design thinking", "15 minutes", "Article"],
          ["Design process", "12 minutes", "Video"],
          ["Design principles", "15 minutes", "Video"],
        ],
      },
      {
        title: "User research",
        lessons: [
          ["Understanding users", "12 minutes", "Video"],
          ["User interviews", "15 minutes", "Article"],
          ["Research methods", "18 minutes", "Video"],
          ["Creating personas", "12 minutes", "Resource"],
          ["User journey mapping", "15 minutes", "Video"],
        ],
      },
      {
        title: "Wireframing and prototyping",
        lessons: [
          ["Introduction to wireframes", "10 minutes", "Video"],
          ["Low fidelity design", "15 minutes", "Video"],
          ["High fidelity design", "18 minutes", "Video"],
          ["Prototyping basics", "15 minutes", "Article"],
        ],
      },
      {
        title: "UI design fundamentals",
        lessons: [
          ["Typography", "12 minutes", "Video"],
          ["Color theory", "15 minutes", "Article"],
          ["Layout and spacing", "12 minutes", "Video"],
          ["Visual hierarchy", "15 minutes", "Video"],
        ],
      },
      {
        title: "Final design project",
        lessons: [
          ["Project planning", "10 minutes", "Video"],
          ["Design execution", "20 minutes", "Video"],
          ["Usability testing", "15 minutes", "Article"],
          ["Final presentation", "15 minutes", "Resource"],
        ],
      },
    ],
    200
  ),

  3: createModules(
    [
      {
        title: "Node.js fundamentals",
        lessons: [
          ["Introduction to Node.js", "10 minutes", "Video"],
          ["Node.js installation", "10 minutes", "Video"],
          ["Modules and npm", "15 minutes", "Article"],
          ["Event loop", "18 minutes", "Video"],
        ],
      },
      {
        title: "Core Node.js concepts",
        lessons: [
          ["File system", "15 minutes", "Video"],
          ["Path module", "10 minutes", "Article"],
          ["Events and EventEmitter", "15 minutes", "Video"],
          ["Streams and buffers", "18 minutes", "Video"],
        ],
      },
      {
        title: "Express.js",
        lessons: [
          ["Introduction to Express", "12 minutes", "Video"],
          ["Routing", "15 minutes", "Video"],
          ["Middleware", "18 minutes", "Article"],
          ["Error handling", "15 minutes", "Video"],
          ["REST APIs", "20 minutes", "Video"],
        ],
      },
      {
        title: "MongoDB and Mongoose",
        lessons: [
          ["MongoDB basics", "15 minutes", "Video"],
          ["CRUD operations", "18 minutes", "Video"],
          ["Mongoose schemas", "15 minutes", "Article"],
          ["Relationships and populate", "20 minutes", "Video"],
        ],
      },
      {
        title: "Authentication and deployment",
        lessons: [
          ["JWT authentication", "18 minutes", "Video"],
          ["Password hashing", "12 minutes", "Article"],
          ["API security", "15 minutes", "Video"],
          ["Deployment", "20 minutes", "Video"],
        ],
      },
    ],
    300
  ),

  4: createModules(
    [
      {
        title: "TypeScript introduction",
        lessons: [
          ["What is TypeScript?", "10 minutes", "Video"],
          ["Installation and setup", "12 minutes", "Video"],
          ["Basic types", "15 minutes", "Article"],
          ["Type inference", "12 minutes", "Video"],
        ],
      },
      {
        title: "Advanced types",
        lessons: [
          ["Union and intersection types", "15 minutes", "Video"],
          ["Type aliases", "10 minutes", "Article"],
          ["Interfaces", "15 minutes", "Video"],
          ["Generics", "20 minutes", "Video"],
        ],
      },
      {
        title: "Functions and classes",
        lessons: [
          ["Function types", "12 minutes", "Video"],
          ["Optional parameters", "10 minutes", "Article"],
          ["Classes and objects", "15 minutes", "Video"],
          ["Inheritance", "15 minutes", "Video"],
        ],
      },
      {
        title: "Advanced TypeScript features",
        lessons: [
          ["Utility types", "15 minutes", "Video"],
          ["Type guards", "12 minutes", "Article"],
          ["Modules", "15 minutes", "Video"],
          ["Decorators", "18 minutes", "Video"],
        ],
      },
      {
        title: "Practical TypeScript project",
        lessons: [
          ["Project setup", "10 minutes", "Video"],
          ["Building components", "20 minutes", "Video"],
          ["Type safety", "15 minutes", "Article"],
          ["Final project", "20 minutes", "Resource"],
        ],
      },
    ],
    400
  ),

  5: createModules(
    [
      {
        title: "Design system basics",
        lessons: [
          ["What is a design system?", "10 minutes", "Video"],
          ["Design principles", "12 minutes", "Article"],
          ["Design tokens", "15 minutes", "Video"],
          ["Design documentation", "10 minutes", "Video"],
        ],
      },
      {
        title: "Color and typography",
        lessons: [
          ["Color palettes", "12 minutes", "Video"],
          ["Typography scales", "15 minutes", "Video"],
          ["Spacing systems", "12 minutes", "Article"],
          ["Accessibility", "15 minutes", "Video"],
        ],
      },
      {
        title: "Reusable components",
        lessons: [
          ["Buttons and inputs", "15 minutes", "Video"],
          ["Cards and layouts", "12 minutes", "Video"],
          ["Component variants", "18 minutes", "Article"],
          ["Component libraries", "15 minutes", "Video"],
        ],
      },
      {
        title: "Documentation and collaboration",
        lessons: [
          ["Component documentation", "12 minutes", "Video"],
          ["Design handoff", "15 minutes", "Article"],
          ["Team collaboration", "12 minutes", "Video"],
          ["Version management", "15 minutes", "Video"],
        ],
      },
      {
        title: "Final design system",
        lessons: [
          ["Planning the system", "10 minutes", "Video"],
          ["Building components", "20 minutes", "Video"],
          ["Testing the system", "15 minutes", "Article"],
          ["Final presentation", "15 minutes", "Resource"],
        ],
      },
    ],
    500
  ),

  6: createModules(
    [
      {
        title: "Python fundamentals",
        lessons: [
          ["Introduction to Python", "10 minutes", "Video"],
          ["Installing Python", "10 minutes", "Video"],
          ["Variables and data types", "15 minutes", "Article"],
          ["Input and output", "12 minutes", "Video"],
        ],
      },
      {
        title: "Control flow",
        lessons: [
          ["Conditional statements", "12 minutes", "Video"],
          ["For and while loops", "15 minutes", "Video"],
          ["Break and continue", "10 minutes", "Article"],
          ["Practice problems", "15 minutes", "Resource"],
        ],
      },
      {
        title: "Functions and collections",
        lessons: [
          ["Functions", "15 minutes", "Video"],
          ["Lists and tuples", "15 minutes", "Video"],
          ["Dictionaries and sets", "15 minutes", "Article"],
          ["Lambda functions", "12 minutes", "Video"],
        ],
      },
      {
        title: "Object-oriented programming",
        lessons: [
          ["Classes and objects", "15 minutes", "Video"],
          ["Constructors", "12 minutes", "Article"],
          ["Inheritance", "15 minutes", "Video"],
          ["Polymorphism", "15 minutes", "Video"],
        ],
      },
      {
        title: "Python project",
        lessons: [
          ["Project planning", "10 minutes", "Video"],
          ["File handling", "15 minutes", "Video"],
          ["Building the project", "20 minutes", "Video"],
          ["Final practice", "15 minutes", "Resource"],
        ],
      },
    ],
    600
  ),

  7: createModules(
    [
      {
        title: "HTML fundamentals",
        lessons: [
          ["Introduction to HTML", "10 minutes", "Video"],
          ["HTML document structure", "12 minutes", "Video"],
          ["Elements and attributes", "15 minutes", "Article"],
          ["Forms and inputs", "15 minutes", "Video"],
        ],
      },
      {
        title: "CSS fundamentals",
        lessons: [
          ["Introduction to CSS", "10 minutes", "Video"],
          ["Selectors and properties", "15 minutes", "Video"],
          ["Box model", "12 minutes", "Article"],
          ["Colors and typography", "15 minutes", "Video"],
        ],
      },
      {
        title: "Layouts",
        lessons: [
          ["Display properties", "12 minutes", "Video"],
          ["Flexbox", "15 minutes", "Video"],
          ["CSS Grid", "18 minutes", "Video"],
          ["Positioning", "12 minutes", "Article"],
        ],
      },
      {
        title: "Responsive design",
        lessons: [
          ["Media queries", "15 minutes", "Video"],
          ["Responsive units", "12 minutes", "Article"],
          ["Mobile-first design", "15 minutes", "Video"],
          ["Responsive practice", "15 minutes", "Resource"],
        ],
      },
      {
        title: "Build a website",
        lessons: [
          ["Website planning", "10 minutes", "Video"],
          ["Building the layout", "20 minutes", "Video"],
          ["Adding responsiveness", "15 minutes", "Video"],
          ["Final website", "20 minutes", "Resource"],
        ],
      },
    ],
    700
  ),
};