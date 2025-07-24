import React from "react";
import { Search } from "lucide-react";

export default function Empty() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Aucune offre trouvée
      </h3>
      <p className="text-gray-600">
        Essayez de modifier vos critères de recherche
      </p>
    </div>
  );
}
