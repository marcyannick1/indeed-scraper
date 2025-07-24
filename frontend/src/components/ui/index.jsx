import { Wifi, Home, MapPin as MapPinIcon } from "lucide-react";

export const getContractColor = (type) => {
  switch (type) {
    case "CDI":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Freelance":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Stage":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getWorkModeIcon = (mode) => {
  switch (mode) {
    case "Remote":
      return <Wifi className="w-4 h-4" />;
    case "Hybride":
      return <Home className="w-4 h-4" />;
    case "Sur site":
    default:
      return <MapPinIcon className="w-4 h-4" />;
  }
};

export const getWorkModeColor = (mode) => {
  switch (mode) {
    case "Remote":
      return "bg-green-100 text-green-800 border-green-200";
    case "Hybride":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Sur site":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
