import { Building2, MapPin, Euro, Users, Calendar } from "lucide-react";
import { formatSalary, formatDate } from "../utils";
import {
  getWorkModeIcon,
  getContractColor,
  getWorkModeColor,
} from "./ui/index";

export default function Card({ job, index, navigateToJob }) {
  return (
    <div
      key={job.id}
      className="bg-white/70 border-white/20 hover:bg-white/90 backdrop-blur-sm rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
      onClick={() => navigateToJob(job)}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {job.title}
              </h3>
              <div className="flex items-center text-gray-600 mt-1">
                <Building2 className="w-4 h-4 mr-2" />
                <span className="font-medium">{job.company}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getContractColor(
                  job.contractType
                )}`}
              >
                {job.contractType}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getWorkModeColor(
                  job.workMode
                )}`}
              >
                {getWorkModeIcon(job.workMode)}
                {job.workMode}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
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

          <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 bg-blue-100 text-blue-800 border-blue-200 rounded-full text-sm font-medium border"
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
              console.log(
                `Postulation rapide pour: ${job.title} (ID: ${job.id})`
              );
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
            className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
          >
            Détails
          </button>
        </div>
      </div>
    </div>
  );
}
