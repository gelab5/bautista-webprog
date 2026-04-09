const articles = [
  {
    name: "getting-started-with-react",
    title: "Getting Started with React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    content: [
      "React is a JavaScript library for building user interfaces, maintained by Meta. It uses a component-based architecture that makes it easy to build and maintain complex UIs.",
      "Getting started is easy — you can scaffold a new React app using Vite: run npm create vite@latest my-app -- --template react, then cd my-app and npm install.",
      "React's core concepts include components, props, and state. Components are reusable building blocks, props pass data between them, and state manages dynamic data within a component.",
      "Once you understand the basics, you can explore hooks like useState and useEffect to add interactivity and side effects to your functional components."
    ]
  },
  {
    name: "why-i-use-tailwind-css",
    title: "Why I Use Tailwind CSS",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80",
    content: [
      "Tailwind CSS is a utility-first CSS framework that lets you style elements directly in your JSX using class names — no need to switch between CSS files.",
      "Unlike Bootstrap which gives you pre-built components, Tailwind gives you low-level utility classes so you can build completely custom designs without fighting the framework.",
      "It works perfectly with React and Vite. Just install it, configure it, and you're ready to style at lightning speed.",
      "Once you get used to utility classes, going back to traditional CSS feels slow. Tailwind has genuinely changed how I approach frontend development."
    ]
  },
  {
    name: "setting-up-vite-for-react",
    title: "Setting Up Vite for React",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&q=80",
    content: [
      "Vite is a modern build tool that offers near-instant hot module replacement (HMR), making your development experience much faster than older tools like Create React App.",
      "To set up Vite with React, run: npm create vite@latest my-app -- --template react. Then navigate into the folder and run npm install to install dependencies.",
      "You can also add Tailwind CSS to your Vite project by installing it via npm and configuring the tailwind.config.js and index.css files.",
      "Vite's speed and simplicity make it the go-to choice for modern React projects. It's lightweight, fast, and easy to configure for both small and large applications."
    ]
  },
  {
    name: "life-as-an-it-student",
    title: "Life as an IT Student",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    content: [
      "Being an IT student means constantly learning — new languages, new frameworks, new tools. It can be overwhelming at first, but it gets better as you build your foundation.",
      "Balancing theory from school and hands-on practice is the key to growth. Make sure to build personal projects alongside your coursework to reinforce what you learn.",
      "Time management is everything. Between coding assignments, quizzes, and lab activities, staying organized with a planner or task manager can save you a lot of stress.",
      "Most importantly — don't be afraid to ask for help. Join coding communities, connect with classmates, and remember that every expert was once a beginner."
    ]
  },
  {
    name: "understanding-react-routing",
    title: "Understanding React Routing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    content: [
      "React Router is the standard library for handling navigation in React apps. It lets you create multiple pages without full page reloads, giving users a smooth experience.",
      "With React Router v6, you use the Routes and Route components to define your app's paths. Each route maps a URL path to a specific component.",
      "Dynamic routing lets you create routes with parameters like /articles/:name, where :name changes based on which article the user clicks.",
      "The useParams hook lets you access those URL parameters inside your component, making it easy to fetch and display the right content for each route."
    ]
  },
];

export default articles;