import React from "react";
import { AlertTriangle } from "lucide-react";

export default function Error() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Une erreur est survenue
      </h3>
      <p className="text-gray-600">Veuillez réessayer ou revenir plus tard.</p>
    </div>
  );
}
