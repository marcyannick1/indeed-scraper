import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Euro,
  Building2,
  Clock,
  Users,
  Filter,
  Briefcase,
  Star,
  ArrowLeft,
  Sun,
  Moon,
  Home,
  Wifi,
  MapPinIcon,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Card from "./components/Card";
import { formatSalary, formatDate } from "./utils";

const JobSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [contractFilter, setContractFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [salaryMin, setSalaryMin] = useState(20000);
  const [salaryMax, setSalaryMax] = useState(80000);
  const [workModeFilter, setWorkModeFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Fonction pour parser l'URL et extraire l'ID de l'offre
  const getJobIdFromUrl = () => {
    const path = window.location.pathname;
    const match = path.match(/\/details\/job\/(\d+)$/);
    return match ? parseInt(match[1]) : null;
  };

  // Fonction pour mettre à jour l'URL
  const updateUrl = (jobId) => {
    const baseUrl =
      window.location.origin + window.location.pathname.split("/details")[0];
    if (jobId) {
      const newUrl = `${baseUrl}/details/job/${jobId}`;
      window.history.pushState({ jobId }, "", newUrl);
    } else {
      window.history.pushState({ jobId: null }, "", baseUrl);
    }
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
        const job = jobOffers.find((j) => j.id === jobId);
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

    window.addEventListener("popstate", handlePopState);

    // Vérifier l'URL au chargement initial
    const jobId = getJobIdFromUrl();
    if (jobId) {
      const job = jobOffers.find((j) => j.id === jobId);
      if (job) {
        setSelectedJob(job);
      } else {
        // Si l'offre n'existe pas, nettoyer l'URL
        updateUrl(null);
      }
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Mettre à jour le titre de la page selon la vue actuelle
  useEffect(() => {
    if (selectedJob) {
      document.title = `${selectedJob.title} - ${selectedJob.company} | JobFinder Pro`;
    } else {
      document.title = "JobFinder Pro - Trouvez votre emploi idéal";
    }
  }, [selectedJob]);


  const filteredJobs = useMemo(() => {
    return jobOffers.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesLocation =
        !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesContract =
        !contractFilter || job.contractType === contractFilter;
      const matchesExperience =
        !experienceFilter || job.experience.includes(experienceFilter);
      const matchesSalary =
        job.salaryMin >= salaryMin && job.salaryMax <= salaryMax;
      const matchesWorkMode =
        !workModeFilter || job.workMode === workModeFilter;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesContract &&
        matchesExperience &&
        matchesSalary &&
        matchesWorkMode
      );
    });
  }, [
    searchTerm,
    locationFilter,
    contractFilter,
    experienceFilter,
    salaryMin,
    salaryMax,
    workModeFilter,
    jobOffers,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setContractFilter("");
    setExperienceFilter("");
    setSalaryMin(20000);
    setSalaryMax(80000);
    setWorkModeFilter("");
  };

  // Page détail d'offre
  if (selectedJob) {
    return (
      <div
        className={`min-h-screen ${
          darkMode
            ? "dark bg-gray-900"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
        }`}
      >
        <div
          className={`${
            darkMode ? "bg-gray-800/80" : "bg-white/80"
          } backdrop-blur-md border-b ${
            darkMode ? "border-gray-700/20" : "border-white/20"
          } sticky top-0 z-50`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={navigateToList}
                className={`flex items-center space-x-2 ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors duration-200`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour aux offres</span>
              </button>
              <div className="flex items-center space-x-4">
                <div
                  className={`hidden md:block text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span className="flex items-center">
                    <Building2 className="w-4 h-4 mr-1" />
                    {selectedJob.company}
                  </span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  } transition-all duration-200`}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div
            className={`${
              darkMode
                ? "bg-gray-800/70 border-gray-700/20"
                : "bg-white/70 border-white/20"
            } backdrop-blur-sm rounded-2xl p-8 shadow-xl`}
          >
            {/* Header de l'offre */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <h1
                  className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-4`}
                >
                  {selectedJob.title}
                </h1>
                <div
                  className={`flex items-center ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } mb-4`}
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  <span className="text-lg font-medium">
                    {selectedJob.company}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                  <div
                    className={`flex items-center ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedJob.location}
                  </div>
                  <div
                    className={`flex items-center ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <Euro className="w-4 h-4 mr-1" />
                    {formatSalary(selectedJob.salary)}
                  </div>
                  <div
                    className={`flex items-center ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <Users className="w-4 h-4 mr-1" />
                    {selectedJob.experience}
                  </div>
                  <div
                    className={`flex items-center ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(selectedJob.publishDate)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getContractColor(
                      selectedJob.contractType
                    )}`}
                  >
                    {selectedJob.contractType}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${getWorkModeColor(
                      selectedJob.workMode
                    )}`}
                  >
                    {getWorkModeIcon(selectedJob.workMode)}
                    {selectedJob.workMode}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Postuler maintenant
                </button>
                <button
                  className={`px-8 py-4 border ${
                    darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  } rounded-xl font-medium transition-all duration-200`}
                >
                  Sauvegarder
                </button>
              </div>
            </div>

            {/* Description complète */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-4`}
                >
                  Description du poste
                </h2>
                <div
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } whitespace-pre-line leading-relaxed mb-8`}
                >
                  {selectedJob.fullDescription}
                </div>

                <h3
                  className={`text-lg font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-4`}
                >
                  Compétences requises
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedJob.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 ${
                        darkMode
                          ? "bg-blue-900/30 text-blue-300 border-blue-700"
                          : "bg-blue-100 text-blue-800 border-blue-200"
                      } rounded-full text-sm font-medium border`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sidebar entreprise */}
              <div
                className={`${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50/50 border-gray-200"
                } rounded-xl p-6 border h-fit`}
              >
                <h3
                  className={`text-lg font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  } mb-4`}
                >
                  À propos de l'entreprise
                </h3>
                <div className="space-y-3">
                  <div>
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Taille :
                    </span>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-800"
                      } font-medium`}
                    >
                      {selectedJob.companyInfo.size}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Secteur :
                    </span>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-800"
                      } font-medium`}
                    >
                      {selectedJob.companyInfo.sector}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Description :
                    </span>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } text-sm leading-relaxed mt-1`}
                    >
                      {selectedJob.companyInfo.description}
                    </p>
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
    <div
      className={`min-h-screen ${
        darkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      }`}
    >
      {/* Header */}

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div
          className={`${
            darkMode
              ? "bg-gray-800/70 border-gray-700/20"
              : "bg-white/70 border-white/20"
          } backdrop-blur-sm rounded-2xl p-8 mb-8 border shadow-xl`}
        >
          <h2
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-6 text-center`}
          >
            Trouvez votre emploi idéal
          </h2>

          {/* Filtres principaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? "text-gray-400" : "text-gray-400"
                } w-5 h-5`}
              />
              <input
                type="text"
                placeholder="Poste, compétence, entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700/80 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400"
                    : "border-gray-200 bg-white/80 focus:ring-blue-500 focus:border-transparent"
                } focus:ring-2 transition-all duration-200`}
              />
            </div>

            <div className="relative">
              <MapPin
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? "text-gray-400" : "text-gray-400"
                } w-5 h-5`}
              />
              <input
                type="text"
                placeholder="Ville, région..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                  darkMode
                    ? "border-gray-600 bg-gray-700/80 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400"
                    : "border-gray-200 bg-white/80 focus:ring-blue-500 focus:border-transparent"
                } focus:ring-2 transition-all duration-200`}
              />
            </div>

            <select
              value={contractFilter}
              onChange={(e) => setContractFilter(e.target.value)}
              className={`px-4 py-3 rounded-xl border ${
                darkMode
                  ? "border-gray-600 bg-gray-700/80 text-white focus:ring-blue-400 focus:border-blue-400"
                  : "border-gray-200 bg-white/80 focus:ring-blue-500 focus:border-transparent"
              } focus:ring-2 transition-all duration-200`}
            >
              <option value="">Type de contrat</option>
              <option value="CDI">CDI</option>
              <option value="Freelance">Freelance</option>
              <option value="Stage">Stage</option>
            </select>

            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className={`px-4 py-3 rounded-xl border ${
                darkMode
                  ? "border-gray-600 bg-gray-700/80 text-white focus:ring-blue-400 focus:border-blue-400"
                  : "border-gray-200 bg-white/80 focus:ring-blue-500 focus:border-transparent"
              } focus:ring-2 transition-all duration-200`}
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
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              } transition-all duration-200`}
            >
              <Filter className="w-4 h-4" />
              <span>Filtres avancés</span>
              {showAdvancedFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {(searchTerm ||
              locationFilter ||
              contractFilter ||
              experienceFilter ||
              workModeFilter ||
              salaryMin !== 20000 ||
              salaryMax !== 80000) && (
              <button
                onClick={resetFilters}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  darkMode
                    ? "text-red-400 hover:bg-red-900/20"
                    : "text-red-600 hover:bg-red-50"
                } transition-all duration-200`}
              >
                <X className="w-4 h-4" />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>

          {/* Filtres avancés */}
          {showAdvancedFilters && (
            <div
              className={`mt-6 p-6 ${
                darkMode
                  ? "bg-gray-700/50 border-gray-600"
                  : "bg-gray-50/50 border-gray-200"
              } rounded-xl border`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mode de travail */}
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Mode de travail
                  </label>
                  <select
                    value={workModeFilter}
                    onChange={(e) => setWorkModeFilter(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      darkMode
                        ? "border-gray-600 bg-gray-700/80 text-white focus:ring-blue-400 focus:border-blue-400"
                        : "border-gray-200 bg-white/80 focus:ring-blue-500 focus:border-transparent"
                    } focus:ring-2 transition-all duration-200`}
                  >
                    <option value="">Tous les modes</option>
                    <option value="Remote">100% Remote</option>
                    <option value="Hybride">Hybride</option>
                    <option value="Sur site">Sur site</option>
                  </select>
                </div>

                {/* Fourchette salariale */}
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
                    Fourchette salariale (€/an)
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Minimum
                        </label>
                        <input
                          type="range"
                          min="20000"
                          max="80000"
                          step="5000"
                          value={salaryMin}
                          onChange={(e) =>
                            setSalaryMin(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <span
                          className={`text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {salaryMin.toLocaleString()} €
                        </span>
                      </div>
                      <div className="flex-1">
                        <label
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Maximum
                        </label>
                        <input
                          type="range"
                          min="20000"
                          max="80000"
                          step="5000"
                          value={salaryMax}
                          onChange={(e) =>
                            setSalaryMax(parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <span
                          className={`text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {salaryMax.toLocaleString()} €
                        </span>
                      </div>
                    </div>
                    <div
                      className={`text-center text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {salaryMin === salaryMax
                        ? `Exactement ${salaryMin.toLocaleString()} €`
                        : `Entre ${salaryMin.toLocaleString()} € et ${salaryMax.toLocaleString()} €`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Card filteredJobs={filteredJobs} darkMode={darkMode} />

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div
              className={`w-20 h-20 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              } rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <Search
                className={`w-10 h-10 ${
                  darkMode ? "text-gray-600" : "text-gray-400"
                }`}
              />
            </div>
            <h3
              className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-2`}
            >
              Aucune offre trouvée
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobSearchApp;
