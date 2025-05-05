import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "services",
      title: "Services",
    },
    {
      id: "tech",
      title: "Technologies",
    },
    {
      id: "team",
      title: "Team",
    },
    {
      id: "contact",
      title: "Contact",
    },
    {
      id: "footer",
      title: "Footer",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "React Native Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Content Creator",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "Enterprise Solutions Division",
      company_name: "TechVision S&S",
      icon: meta,
      iconBg: "#383E56",
      date: "2021 - Present",
      points: [
        "Leading development of scalable enterprise solutions using React.js, Node.js, and cloud technologies",
        "Successfully delivered custom ERP systems resulting in 35% improvement in client operational efficiency",
        "Implemented microservices architecture for improved system scalability and maintenance",
        "Managed team of 12 developers across multiple high-value projects",
      ],
    },
    {
      title: "Web Applications Division",
      company_name: "TechVision S&S",
      icon: tesla,
      iconBg: "#E6DEDD",
      date: "2020 - Present",
      points: [
        "Specialized in developing responsive, high-performance web applications using modern frameworks",
        "Delivered 20+ successful client projects with 98% satisfaction rate",
        "Pioneered implementation of PWA technology improving mobile user engagement by 45%",
        "Established best practices for code quality and performance optimization",
      ],
    },
    {
      title: "Innovation Lab",
      company_name: "TechVision S&S",
      icon: shopify,
      iconBg: "#383E56",
      date: "2019 - Present",
      points: [
        "Research and development of cutting-edge web technologies and frameworks",
        "Created proprietary component library reducing development time by 40%",
        "Developed AI-powered solutions for business process automation",
        "Led workshops and training sessions for emerging technologies",
      ],
    },
    {
      title: "Client Success Division",
      company_name: "TechVision S&S",
      icon: starbucks,
      iconBg: "#E6DEDD",
      date: "2018 - Present",
      points: [
        "Managed end-to-end client relationships and project delivery",
        "Achieved 95% client retention rate through excellent service delivery",
        "Implemented agile methodologies improving project delivery times by 30%",
        "Established comprehensive testing and quality assurance protocols",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "TechVision S&S delivered an exceptional e-commerce platform that exceeded our expectations. Their innovative solutions and attention to detail resulted in a 40% increase in our online sales.",
      name: "Michael Chen",
      designation: "CEO",
      company: "GlobalTech Solutions",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      testimonial:
        "The team at TechVision S&S transformed our legacy system into a modern, scalable application. Their expertise in React and Node.js was evident throughout the project.",
      name: "Sarah Martinez",
      designation: "CTO",
      company: "InnovateX",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      testimonial:
        "Working with TechVision S&S was a game-changer for our startup. Their Three.js implementations brought our product visualization to life, leading to a 60% improvement in user engagement.",
      name: "James Wilson",
      designation: "Product Director",
      company: "TechStart Inc",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Enterprise Resource Hub",
      description:
        "Cloud-based enterprise resource planning system with real-time analytics, automated workflow management, and integrated business intelligence tools that improved client efficiency by 35%.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "nodejs",
          color: "green-text-gradient",
        },
        {
          name: "mongodb",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://techvision.com/erp",
    },
    {
      name: "Smart Analytics Platform",
      description:
        "AI-powered analytics platform that processes big data to provide actionable business insights, featuring machine learning algorithms and predictive modeling capabilities.",
      tags: [
        {
          name: "python",
          color: "blue-text-gradient",
        },
        {
          name: "tensorflow",
          color: "green-text-gradient",
        },
        {
          name: "aws",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://techvision.com/analytics",
    },
    {
      name: "Digital Transformation Suite",
      description:
        "Comprehensive digital transformation platform that integrates legacy systems with modern cloud infrastructure, enabling seamless business process automation and digital workflow management.",
      tags: [
        {
          name: "microservices",
          color: "blue-text-gradient",
        },
        {
          name: "kubernetes",
          color: "green-text-gradient",
        },
        {
          name: "docker",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://techvision.com/transform",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };