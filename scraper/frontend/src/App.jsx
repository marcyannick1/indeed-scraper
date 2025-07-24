import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Calendar, Euro, Building2, Clock, Users, Filter, Briefcase, Star, ArrowLeft, Sun, Moon, Home, Wifi, MapPinIcon, X, ChevronDown, ChevronUp, MessageCircle, Send, Bot, Minimize2, Maximize2 } from 'lucide-react';

const JobSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [contractFilter, setContractFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [salaryMin, setSalaryMin] = useState(20000);
  const [salaryMax, setSalaryMax] = useState(80000);
  const [workModeFilter, setWorkModeFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Bonjour ! 👋 Je suis votre assistant JobFinder. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Fonction pour parser l'URL et extraire l'ID de l'offre
  const getJobIdFromUrl = () => {
    const path = window.location.pathname;
    const match = path.match(/\/details\/job\/(\d+)$/);
    return match ? parseInt(match[1]) : null;
  };

  // Fonction pour mettre à jour l'URL
  const updateUrl = (jobId) => {
    const baseUrl = window.location.origin + window.location.pathname.split('/details')[0];
    if (jobId) {
      const newUrl = `${baseUrl}/details/job/${jobId}`;
      window.history.pushState({ jobId }, '', newUrl);
    } else {
      window.history.pushState({ jobId: null }, '', baseUrl);
    }
  };

  // Fonction pour naviguer vers une offre
  const navigateToJob = (job) => {
    setSelectedJob(job);
    updateUrl(job.id);
  };

  // Fonction pour revenir à la liste
  const navigateToList = () => {
    setSelectedJob(null);
    updateUrl(null);
  };

  // Gérer la navigation avec les boutons précédent/suivant du navigateur
  useEffect(() => {
    const handlePopState = (event) => {
      const jobId = getJobIdFromUrl();
      if (jobId) {
        const job = jobOffers.find(j => j.id === jobId);
        if (job) {
          setSelectedJob(job);
        } else {
          // Si l'offre n'existe pas, rediriger vers la liste
          navigateToList();
        }
      } else {
        setSelectedJob(null);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Vérifier l'URL au chargement initial
    const jobId = getJobIdFromUrl();
    if (jobId) {
      const job = jobOffers.find(j => j.id === jobId);
      if (job) {
        setSelectedJob(job);
      } else {
        // Si l'offre n'existe pas, nettoyer l'URL
        updateUrl(null);
      }
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Mettre à jour le titre de la page selon la vue actuelle
  useEffect(() => {
    if (selectedJob) {
      document.title = `${selectedJob.title} - ${selectedJob.company} | JobFinder Pro`;
    } else {
      document.title = 'JobFinder Pro - Trouvez votre emploi idéal';
    }
  }, [selectedJob]);

  // Données d'exemple avec mode de travail
  const jobOffers = [
    {
      id: 1,
      title: "Développeur Full Stack React/Node.js",
      company: "TechCorp Solutions",
      location: "Paris, France",
      salary: "45000-55000",
      salaryMin: 45000,
      salaryMax: 55000,
      description: "Nous recherchons un développeur passionné pour rejoindre notre équipe dynamique et travailler sur des projets innovants. Vous travaillerez sur le développement d'applications web modernes en utilisant React et Node.js. L'équipe est composée de 8 développeurs expérimentés qui vous accompagneront dans votre montée en compétences.",
      fullDescription: "En tant que Développeur Full Stack chez TechCorp Solutions, vous serez responsable du développement d'applications web de bout en bout. Vos missions principales incluront :\n\n• Développement frontend avec React, TypeScript et Tailwind CSS\n• Création d'APIs REST avec Node.js et Express\n• Intégration avec des bases de données MongoDB\n• Participation aux code reviews et à l'amélioration continue\n• Collaboration étroite avec l'équipe UX/UI\n• Tests unitaires et d'intégration\n• Maintenance et optimisation des performances\n\nL'entreprise offre un environnement de travail stimulant avec de nombreuses opportunités d'évolution. Nous privilégions l'innovation et encourageons nos équipes à expérimenter avec les dernières technologies.",
      contractType: "CDI",
      experience: "2-5 ans",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      publishDate: "2025-07-20",
      url: "https://example.com/job/1",
      workMode: "Hybride",
      companyInfo: {
        size: "50-200 employés",
        sector: "Technologies de l'information",
        description: "TechCorp Solutions est une entreprise innovante spécialisée dans le développement de solutions digitales pour les PME."
      }
    },
    {
      id: 2,
      title: "Designer UX/UI Senior",
      company: "Creative Agency",
      location: "Lyon, France",
      salary: "40000-50000",
      salaryMin: 40000,
      salaryMax: 50000,
      description: "Rejoignez notre studio créatif et participez à la conception d'expériences utilisateur exceptionnelles...",
      fullDescription: "En tant que Designer UX/UI Senior, vous serez au cœur de la création d'expériences digitales mémorables. Vos responsabilités incluront :\n\n• Recherche utilisateur et analyse des besoins\n• Création de wireframes et prototypes interactifs\n• Design d'interfaces modernes et accessibles\n• Collaboration avec les équipes de développement\n• Tests utilisateurs et itérations\n• Maintenance des design systems\n• Encadrement des designers juniors\n\nNous recherchons une personne créative, méthodique et passionnée par l'expérience utilisateur.",
      contractType: "CDI",
      experience: "5+ ans",
      skills: ["Figma", "Adobe XD", "Prototypage", "Design System"],
      publishDate: "2025-07-19",
      url: "https://example.com/job/2",
      workMode: "Sur site",
      companyInfo: {
        size: "20-50 employés",
        sector: "Design & Créativité",
        description: "Creative Agency est un studio de design réputé travaillant avec des marques prestigieuses."
      }
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "DataLab Innovation",
      location: "Toulouse, France",
      salary: "50000-65000",
      salaryMin: 50000,
      salaryMax: 65000,
      description: "Analysez des données complexes et développez des modèles prédictifs pour nos clients...",
      fullDescription: "En tant que Data Scientist, vous travaillerez sur des projets d'analyse de données variés :\n\n• Collecte et nettoyage de grandes bases de données\n• Développement de modèles de machine learning\n• Création de visualisations de données impactantes\n• Rédaction de rapports d'analyse\n• Présentation des résultats aux clients\n• Veille technologique sur les dernières méthodes\n• Formation des équipes internes\n\nUn poste idéal pour un profil analytique souhaitant avoir un impact business direct.",
      contractType: "CDI",
      experience: "3-7 ans",
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      publishDate: "2025-07-18",
      url: "https://example.com/job/3",
      workMode: "Remote",
      companyInfo: {
        size: "100-500 employés",
        sector: "Data & Analytics",
        description: "DataLab Innovation aide les entreprises à exploiter leurs données pour prendre de meilleures décisions."
      }
    },
    {
      id: 4,
      title: "Chef de Projet Digital",
      company: "Digital Transformation Co",
      location: "Marseille, France",
      salary: "42000-52000",
      salaryMin: 42000,
      salaryMax: 52000,
      description: "Pilotez des projets de transformation digitale et coordonnez des équipes multidisciplinaires...",
      fullDescription: "En tant que Chef de Projet Digital, vous orchestrerez la transformation numérique de nos clients :\n\n• Analyse des besoins clients et définition des objectifs\n• Planification et suivi des projets selon les méthodes Agile\n• Coordination des équipes techniques et créatives\n• Gestion des budgets et des délais\n• Communication avec les stakeholders\n• Formation des utilisateurs finaux\n• Reporting et amélioration continue\n\nUn rôle stratégique au cœur de l'innovation digitale.",
      contractType: "CDI",
      experience: "4-8 ans",
      skills: ["Agile", "Scrum", "Management", "Digital"],
      publishDate: "2025-07-17",
      url: "https://example.com/job/4",
      workMode: "Hybride",
      companyInfo: {
        size: "200+ employés",
        sector: "Conseil & Transformation",
        description: "Digital Transformation Co accompagne les grandes entreprises dans leur mutation digitale."
      }
    },
    {
      id: 5,
      title: "Développeur Mobile Flutter",
      company: "MobileFirst Studio",
      location: "Remote",
      salary: "38000-48000",
      salaryMin: 38000,
      salaryMax: 48000,
      description: "Créez des applications mobiles innovantes avec Flutter et participez à l'évolution de notre stack technique...",
      fullDescription: "En tant que Développeur Mobile Flutter, vous créerez des applications cross-platform performantes :\n\n• Développement d'applications iOS et Android avec Flutter\n• Intégration d'APIs REST et GraphQL\n• Optimisation des performances et de l'UX mobile\n• Tests automatisés et déploiement continu\n• Collaboration avec les designers UX/UI\n• Veille technologique sur l'écosystème mobile\n• Participation aux décisions techniques\n\nRejoignez une équipe passionnée par l'innovation mobile !",
      contractType: "Freelance",
      experience: "1-3 ans",
      skills: ["Flutter", "Dart", "Firebase", "API REST"],
      publishDate: "2025-07-16",
      url: "https://example.com/job/5",
      workMode: "Remote",
      companyInfo: {
        size: "10-20 employés",
        sector: "Développement Mobile",
        description: "MobileFirst Studio développe des applications mobiles pour des startups innovantes."
      }
    },
    {
      id: 6,
      title: "Ingénieur DevOps",
      company: "CloudTech Systems",
      location: "Nantes, France",
      salary: "48000-60000",
      salaryMin: 48000,
      salaryMax: 60000,
      description: "Automatisez le déploiement et la gestion d'infrastructures cloud pour nos applications...",
      fullDescription: "En tant qu'Ingénieur DevOps, vous serez responsable de l'infrastructure et du déploiement :\n\n• Conception et maintenance d'architectures cloud (AWS, Azure)\n• Automatisation des déploiements avec CI/CD\n• Containerisation avec Docker et Kubernetes\n• Monitoring et observabilité des systèmes\n• Sécurisation des infrastructures\n• Optimisation des coûts cloud\n• Support et formation des équipes de développement\n\nUn poste clé pour assurer la scalabilité et la fiabilité de nos services.",
      contractType: "CDI",
      experience: "3-6 ans",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      publishDate: "2025-07-15",
      url: "https://example.com/job/6",
      workMode: "Hybride",
      companyInfo: {
        size: "50-100 employés",
        sector: "Cloud & Infrastructure",
        description: "CloudTech Systems fournit des solutions cloud sécurisées pour les entreprises européennes."
      }
    }
  ];

  const filteredJobs = useMemo(() => {
    return jobOffers.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesContract = !contractFilter || job.contractType === contractFilter;
      const matchesExperience = !experienceFilter || job.experience.includes(experienceFilter);
      const matchesSalary = job.salaryMin >= salaryMin && job.salaryMax <= salaryMax;
      const matchesWorkMode = !workModeFilter || job.workMode === workModeFilter;

      return matchesSearch && matchesLocation && matchesContract && matchesExperience && matchesSalary && matchesWorkMode;
    });
  }, [searchTerm, locationFilter, contractFilter, experienceFilter, salaryMin, salaryMax, workModeFilter, jobOffers]);

  const getContractColor = (type) => {
    const baseClasses = darkMode ? 'border-opacity-20' : 'border-opacity-100';
    switch(type) {
      case 'CDI': return `bg-emerald-100 text-emerald-800 border-emerald-200 ${baseClasses} ${darkMode ? 'dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700' : ''}`;
      case 'Freelance': return `bg-purple-100 text-purple-800 border-purple-200 ${baseClasses} ${darkMode ? 'dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700' : ''}`;
      case 'Stage': return `bg-blue-100 text-blue-800 border-blue-200 ${baseClasses} ${darkMode ? 'dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700' : ''}`;
      default: return `bg-gray-100 text-gray-800 border-gray-200 ${baseClasses} ${darkMode ? 'dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600' : ''}`;
    }
  };

  const getWorkModeIcon = (mode) => {
    switch(mode) {
      case 'Remote': return <Wifi className="w-4 h-4" />;
      case 'Hybride': return <Home className="w-4 h-4" />;
      case 'Sur site': return <MapPinIcon className="w-4 h-4" />;
      default: return <MapPinIcon className="w-4 h-4" />;
    }
  };

  const getWorkModeColor = (mode) => {
    const baseClasses = darkMode ? 'border-opacity-20' : 'border-opacity-100';
    switch(mode) {
      case 'Remote': return `bg-green-100 text-green-800 border-green-200 ${baseClasses} ${darkMode ? 'dark:bg-green-900/30 dark:text-green-300 dark:border-green-700' : ''}`;
      case 'Hybride': return `bg-orange-100 text-orange-800 border-orange-200 ${baseClasses} ${darkMode ? 'dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700' : ''}`;
      case 'Sur site': return `bg-blue-100 text-blue-800 border-blue-200 ${baseClasses} ${darkMode ? 'dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700' : ''}`;
      default: return `bg-gray-100 text-gray-800 border-gray-200 ${baseClasses} ${darkMode ? 'dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600' : ''}`;
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Salaire non communiqué';
    return `${salary.replace('-', ' - ')} €/an`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hier';
    if (diffDays <= 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setContractFilter('');
    setExperienceFilter('');
    setSalaryMin(20000);
    setSalaryMax(80000);
    setWorkModeFilter('');
  };

  // Chatbot logic
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes('salaire') || message.includes('rémunération') || message.includes('paye')) {
      return 'Les salaires varient selon le poste et l\'expérience. Sur notre site, vous pouvez filtrer par fourchette salariale dans les filtres avancés. La plupart de nos offres indiquent une fourchette de rémunération. 💰';
    }

    if (message.includes('remote') || message.includes('télétravail') || message.includes('distance')) {
      return 'Nous avons de nombreuses offres en télétravail ! Utilisez le filtre "Mode de travail" pour trouver des postes 100% remote, hybrides ou sur site. 🏠💻';
    }

    if (message.includes('cv') || message.includes('candidature') || message.includes('postuler')) {
      return 'Pour postuler, cliquez sur "Postuler" sur l\'offre qui vous intéresse. Assurez-vous d\'avoir un CV à jour et une lettre de motivation personnalisée. Bonne chance ! 📄✨';
    }

    if (message.includes('expérience') || message.includes('junior') || message.includes('débutant')) {
      return 'Nous avons des offres pour tous les niveaux ! Utilisez le filtre "Expérience" pour trouver des postes adaptés à votre profil, du junior (1-3 ans) au senior (5+ ans). 🚀';
    }

    if (message.includes('entreprise') || message.includes('société') || message.includes('boite')) {
      return 'Chaque offre contient des informations détaillées sur l\'entreprise. Cliquez sur "Détails" pour voir la taille, le secteur et la description de l\'entreprise. 🏢';
    }

    if (message.includes('localisation') || message.includes('ville') || message.includes('région')) {
      return 'Utilisez le filtre de localisation pour chercher dans une ville ou région spécifique. Nous avons des offres partout en France ! 📍';
    }

    if (message.includes('tech') || message.includes('développeur') || message.includes('informatique')) {
      return 'Nous avons de nombreuses offres tech ! React, Node.js, Python, Flutter... Utilisez la barre de recherche pour filtrer par technologie. 💻🔧';
    }

    if (message.includes('aide') || message.includes('help') || message.includes('comment')) {
      return 'Je peux vous aider avec :\n• Recherche d\'offres par critères\n• Questions sur les salaires\n• Conseils pour postuler\n• Informations sur le télétravail\n• Navigation sur le site\n\nQue souhaitez-vous savoir ? 😊';
    }

    if (message.includes('merci') || message.includes('thanks')) {
      return 'De rien ! Je suis là pour vous aider dans votre recherche d\'emploi. N\'hésitez pas si vous avez d\'autres questions ! 😊🎯';
    }

    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return 'Bonjour ! 👋 Bienvenue sur JobFinder Pro. Je peux vous aider à naviguer sur le site et répondre à vos questions sur la recherche d\'emploi. Comment puis-je vous assister ?';
    }

    // Réponse par défaut
    return 'Je ne suis pas sûr de comprendre votre question. Je peux vous aider avec :\n• La recherche d\'offres\n• Les filtres disponibles\n• Les informations sur les entreprises\n• Les conseils pour postuler\n\nPouvez-vous être plus précis ? 🤔';
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: getBotResponse(chatInput),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 500);

    setChatInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Page détail d'offre
  if (selectedJob) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'}`}>
        <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md border-b ${darkMode ? 'border-gray-700/20' : 'border-white/20'} sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={navigateToList}
                className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour aux offres</span>
              </button>
              <div className="flex items-center space-x-4">
                <div className={`hidden md:block text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="flex items-center">
                    <Building2 className="w-4 h-4 mr-1" />
                    {selectedJob.company}
                  </span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-all duration-200`}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className={`${darkMode ? 'bg-gray-800/70 border-gray-700/20' : 'bg-white/70 border-white/20'} backdrop-blur-sm rounded-2xl p-8 shadow-xl`}>
            {/* Header de l'offre */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                  {selectedJob.title}
                </h1>
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  <Building2 className="w-5 h-5 mr-2" />
                  <span className="text-lg font-medium">{selectedJob.company}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                  <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedJob.location}
                  </div>
                  <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Euro className="w-4 h-4 mr-1" />
                    {formatSalary(selectedJob.salary)}
                  </div>
                  <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Users className="w-4 h-4 mr-1" />
                    {selectedJob.experience}
                  </div>
                  <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(selectedJob.publishDate)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getContractColor(selectedJob.contractType)}`}>
                    {selectedJob.contractType}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${getWorkModeColor(selectedJob.workMode)}`}>
                    {getWorkModeIcon(selectedJob.workMode)}
                    {selectedJob.workMode}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Postuler maintenant
                </button>
                <button className={`px-8 py-4 border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-xl font-medium transition-all duration-200`}>
                  Sauvegarder
                </button>
              </div>
            </div>

            {/* Description complète */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Description du poste</h2>
                <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-line leading-relaxed mb-8`}>
                  {selectedJob.fullDescription}
                </div>

                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Compétences requises</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedJob.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 ${darkMode ? 'bg-blue-900/30 text-blue-300 border-blue-700' : 'bg-blue-100 text-blue-800 border-blue-200'} rounded-full text-sm font-medium border`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sidebar entreprise */}
              <div className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50/50 border-gray-200'} rounded-xl p-6 border h-fit`}>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>À propos de l'entreprise</h3>
                <div className="space-y-3">
                  <div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Taille :</span>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} font-medium`}>{selectedJob.companyInfo.size}</p>
                  </div>
                  <div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Secteur :</span>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} font-medium`}>{selectedJob.companyInfo.sector}</p>
                  </div>
                  <div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Description :</span>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed mt-1`}>{selectedJob.companyInfo.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page principale avec liste des offres
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800/80 border-gray-700/20' : 'bg-white/80 border-white/20'} backdrop-blur-md border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r ${darkMode ? 'from-gray-100 to-gray-400' : 'from-gray-900 to-gray-600'} bg-clip-text text-transparent`}>
                  JobFinder Pro
                </h1>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-6">
                <a
                  href="#/"
                  className={`text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-200 flex items-center space-x-1`}
                >
                  <Home className="w-4 h-4" />
                  <span>Accueil</span>
                </a>
                <a
                  href="#/entreprises"
                  className={`text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-200 flex items-center space-x-1`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Entreprises</span>
                </a>
                <a
                  href="#/connexion"
                  className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors duration-200 flex items-center space-x-1`}
                >
                  <Users className="w-4 h-4" />
                  <span>Connexion</span>
                </a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`hidden lg:flex items-center space-x-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" /> {filteredJobs.length} offres disponibles
                </span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-all duration-200`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile menu button */}
              <button className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <a
                href="#/"
                className={`text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-200 flex items-center space-x-2 py-2`}
              >
                <Home className="w-4 h-4" />
                <span>Accueil</span>
              </a>
              <a
                href="#/entreprises"
                className={`text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-200 flex items-center space-x-2 py-2`}
              >
                <Building2 className="w-4 h-4" />
                <span>Informations sur les entreprises</span>
              </a>
              <a
                href="#/connexion"
                className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors duration-200 flex items-center space-x-2 py-2`}
              >
                <Users className="w-4 h-4" />
                <span>Connexion</span>
              </a>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} pt-2 border-t border-gray-200 dark:border-gray-700`}>
                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1 text-yellow-500" /> {filteredJobs.length} offres disponibles
                </span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className={`${darkMode ? 'bg-gray-800/70 border-gray-700/20' : 'bg-white/70 border-white/20'} backdrop-blur-sm rounded-2xl p-8 mb-8 border shadow-xl`}>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 text-center`}>
            Trouvez votre emploi idéal
          </h2>

          {/* Filtres principaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
              <input
                type="text"
                placeholder="Poste, compétence, entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${darkMode ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400' : 'border-gray-200 bg-white/80 focus:ring-blue-500 focus:border-transparent'} focus:ring-2 transition-all duration-200`}
              />
            </div>

            <div className="relative">
              <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
              <input
                type="text"
                placeholder="Ville, région..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${darkMode ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400' : 'border-gray-200 bg-white/80 focus:ring-blue-500 focus:border-transparent'} focus:ring-2 transition-all duration-200`}
              />
            </div>

            <select
              value={contractFilter}
              onChange={(e) => setContractFilter(e.target.value)}
              className={`px-4 py-3 rounded-xl border ${darkMode ? 'border-gray-600 bg-gray-700/80 text-white focus:ring-blue-400 focus:border-blue-400' : 'border-gray-200 bg-white/80 focus:ring-blue-500 focus:border-transparent'} focus:ring-2 transition-all duration-200`}
            >
              <option value="">Type de contrat</option>
              <option value="CDI">CDI</option>
              <option value="Freelance">Freelance</option>
              <option value="Stage">Stage</option>
            </select>

            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className={`px-4 py-3 rounded-xl border ${darkMode ? 'border-gray-600 bg-gray-700/80 text-white focus:ring-blue-400 focus:border-blue-400' : 'border-gray-200 bg-white/80 focus:ring-blue-500 focus:border-transparent'} focus:ring-2 transition-all duration-200`}
            >
              <option value="">Expérience</option>
              <option value="1">1-3 ans</option>
              <option value="2">2-5 ans</option>
              <option value="3">3-7 ans</option>
              <option value="5">5+ ans</option>
            </select>
          </div>

          {/* Bouton filtres avancés */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} transition-all duration-200`}
            >
              <Filter className="w-4 h-4" />
              <span>Filtres avancés</span>
              {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {(searchTerm || locationFilter || contractFilter || experienceFilter || workModeFilter || salaryMin !== 20000 || salaryMax !== 80000) && (
              <button
                onClick={resetFilters}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'} transition-all duration-200`}
              >
                <X className="w-4 h-4" />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>

          {/* Filtres avancés */}
          {showAdvancedFilters && (
            <div className={`mt-6 p-6 ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50/50 border-gray-200'} rounded-xl border`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mode de travail */}
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Mode de travail
                  </label>
                  <select
                    value={workModeFilter}
                    onChange={(e) => setWorkModeFilter(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'border-gray-600 bg-gray-700/80 text-white focus:ring-blue-400 focus:border-blue-400' : 'border-gray-200 bg-white/80 focus:ring-blue-500 focus:border-transparent'} focus:ring-2 transition-all duration-200`}
                  >
                    <option value="">Tous les modes</option>
                    <option value="Remote">100% Remote</option>
                    <option value="Hybride">Hybride</option>
                    <option value="Sur site">Sur site</option>
                  </select>
                </div>

                {/* Fourchette salariale */}
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Fourchette salariale (€/an)
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Minimum</label>
                        <input
                          type="range"
                          min="20000"
                          max="80000"
                          step="5000"
                          value={salaryMin}
                          onChange={(e) => setSalaryMin(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {salaryMin.toLocaleString()} €
                        </span>
                      </div>
                      <div className="flex-1">
                        <label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Maximum</label>
                        <input
                          type="range"
                          min="20000"
                          max="80000"
                          step="5000"
                          value={salaryMax}
                          onChange={(e) => setSalaryMax(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {salaryMax.toLocaleString()} €
                        </span>
                      </div>
                    </div>
                    <div className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {salaryMin === salaryMax
                        ? `Exactement ${salaryMin.toLocaleString()} €`
                        : `Entre ${salaryMin.toLocaleString()} € et ${salaryMax.toLocaleString()} €`
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              className={`${darkMode ? 'bg-gray-800/70 border-gray-700/20 hover:bg-gray-800/90' : 'bg-white/70 border-white/20 hover:bg-white/90'} backdrop-blur-sm rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer`}
              onClick={() => navigateToJob(job)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors duration-200`}>
                        {job.title}
                      </h3>
                      <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                        <Building2 className="w-4 h-4 mr-2" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getContractColor(job.contractType)}`}>
                        {job.contractType}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getWorkModeColor(job.workMode)}`}>
                        {getWorkModeIcon(job.workMode)}
                        {job.workMode}
                      </span>
                    </div>
                  </div>

                  <div className={`flex flex-wrap items-center gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Euro className="w-4 h-4 mr-1" />
                      {formatSalary(job.salary)}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {job.experience}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(job.publishDate)}
                    </div>
                  </div>

                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 line-clamp-2`}>
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`px-3 py-1 ${darkMode ? 'bg-blue-900/30 text-blue-300 border-blue-700' : 'bg-blue-100 text-blue-800 border-blue-200'} rounded-full text-sm font-medium border`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:ml-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Postulation rapide pour: ${job.title} (ID: ${job.id})`);
                      alert(`Candidature envoyée pour: ${job.title}`);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Postuler
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToJob(job);
                    }}
                    className={`px-6 py-3 border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-xl font-medium transition-all duration-200`}
                  >
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className={`w-20 h-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Search className={`w-10 h-10 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Aucune offre trouvée</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t mt-16`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  JobFinder Pro
                </h3>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                Trouvez votre emploi idéal parmi des milliers d'offres sélectionnées.
                La plateforme de référence pour votre carrière.
              </p>
            </div>

            {/* Liens utiles */}
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Chercheurs d'emploi
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Rechercher un emploi</a></li>
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Conseils CV</a></li>
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Préparer un entretien</a></li>
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Tendances salaires</a></li>
              </ul>
            </div>

            {/* Entreprises */}
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Entreprises
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Publier une offre</a></li>
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Solutions RH</a></li>
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Tarifs</a></li>
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Support</a></li>
              </ul>
            </div>

            {/* À propos */}
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                À propos
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Notre mission</a></li>
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Équipe</a></li>
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Carrières</a></li>
                <li><a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Ligne de séparation */}
          <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} mt-8 pt-8`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2025 JobFinder Pro. Tous droits réservés.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                  Politique de confidentialité
                </a>
                <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                  Conditions d'utilisation
                </a>
                <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {!showChatbot ? (
          <button
            onClick={() => setShowChatbot(true)}
            className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        ) : (
          <div className={`w-80 h-96 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-2xl border flex flex-col overflow-hidden`}>
            {/* Header du chat */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Assistant JobFinder</h3>
                  <p className="text-white/80 text-xs">En ligne</p>
                </div>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : darkMode
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className={`flex-1 px-3 py-2 rounded-xl border ${
                    darkMode
                      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm`}
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatInput.trim()}
                  className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Slider styles for dark mode */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .dark input[type="range"]::-webkit-slider-track {
          background: #374151;
        }
      `}</style>
    </div>
  );
};

export default JobSearchApp;