// Internationalization (i18n) System

export type Locale = 'en' | 'zh'

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      projects: 'Projects',
      writing: 'Writing',
      about: 'About',
    },
    // Hero Section
    hero: {
      subtitle: 'Tsinghua University · Intelligent Engineering (Class of 2021)',
      description: 'I like to design and build things. A Product PM with engineering implementation skills and an Automation + Design cross-disciplinary background. Currently focused on building AI-powered products that create meaningful impact.',
      viewProjects: 'View Projects',
    },
    // Sections
    sections: {
      projects: 'Projects',
      projectsDesc: 'Products and tools I\'ve built',
      experience: 'Experience',
      experienceDesc: 'Leadership roles and entrepreneurial ventures',
      awards: 'Awards & Recognition',
      awardsDesc: 'Competition achievements and honors',
      writing: 'Writing',
      writingDesc: 'Thoughts on AI, technology, and building products',
      contact: 'Let\'s Connect',
      contactDesc: 'I\'m always interested in discussing AI products, startup ideas, or potential collaborations. Feel free to reach out through any of the channels below.',
    },
    // Common
    common: {
      viewAll: 'View all',
      learnMore: 'Learn more',
      viewAllProjects: 'View all projects',
      viewFullExperience: 'View full experience',
      viewAllArticles: 'View all articles',
      emailMe: 'Email Me',
      currentFocus: 'Current Focus',
      sideProjects: 'Side Projects',
      allProjects: 'All Projects',
      allProjectsDesc: 'A collection of projects I\'ve worked on',
      featuredProjects: 'Featured Projects',
      sideProjectsDesc: 'Side explorations and experiments',
      backToProjects: 'Back to Projects',
      projectDetails: 'Project Details',
      keyFeatures: 'Key Features',
      challenges: 'Challenges & Solutions',
      techStack: 'Technology Stack',
      links: 'Links',
      status: 'Status',
      timeline: 'Timeline',
      featured: 'Featured',
      articles: 'Articles',
      articlesDesc: 'Thoughts on AI, technology, and product building',
      backToWriting: 'Back to Writing',
      aboutMe: 'About Me',
      aboutMeDesc: 'Learn more about my background and interests',
      personalProfile: 'Personal Profile',
      eventsHosted: 'Events Hosted',
      technicalStack: 'Technical Stack',
      contactInfo: 'Contact',
      navigation: 'Navigation',
      connect: 'Connect',
    },
    // Footer
    footer: {
      tagline: 'Create value for the world before AGI is achieved',
    },
  },
  zh: {
    // Navigation
    nav: {
      home: '首页',
      projects: '项目',
      writing: '文章',
      about: '关于',
    },
    // Hero Section
    hero: {
      subtitle: '清华大学 · 智能工程与创新设计（2021级）',
      description: '我喜欢设计和构建产品。拥有自动化+设计跨学科背景的产品经理，具备工程实现能力。目前专注于构建有意义影响力的 AI 产品。',
      viewProjects: '查看项目',
    },
    // Sections
    sections: {
      projects: '项目',
      projectsDesc: '我构建的产品和工具',
      experience: '经历',
      experienceDesc: '领导角色与创业经历',
      awards: '荣誉与奖项',
      awardsDesc: '比赛成就和荣誉',
      writing: '文章',
      writingDesc: '关于 AI、技术和产品构建的思考',
      contact: '联系我',
      contactDesc: '我很乐意讨论 AI 产品、创业想法或潜在合作。欢迎通过以下任何渠道联系我。',
    },
    // Common
    common: {
      viewAll: '查看全部',
      learnMore: '了解更多',
      viewAllProjects: '查看全部项目',
      viewFullExperience: '查看完整经历',
      viewAllArticles: '查看全部文章',
      emailMe: '发送邮件',
      currentFocus: '当前重点',
      sideProjects: '副项目',
      allProjects: '全部项目',
      allProjectsDesc: '我参与过的项目合集',
      featuredProjects: '重点项目',
      sideProjectsDesc: '副业探索与实验',
      backToProjects: '返回项目',
      projectDetails: '项目详情',
      keyFeatures: '核心功能',
      challenges: '挑战与解决方案',
      techStack: '技术栈',
      links: '链接',
      status: '状态',
      timeline: '时间线',
      featured: '精选',
      articles: '文章',
      articlesDesc: '关于 AI、技术和产品构建的思考',
      backToWriting: '返回文章',
      aboutMe: '关于我',
      aboutMeDesc: '了解更多我的背景和兴趣',
      personalProfile: '个人简介',
      eventsHosted: '组织的活动',
      technicalStack: '技术栈',
      contactInfo: '联系方式',
      navigation: '导航',
      connect: '联系',
    },
    // Footer
    footer: {
      tagline: '在 AGI 来临之前为世界创造价值',
    },
  },
}

export function getTranslations(locale: Locale) {
  return translations[locale]
}
