import React from "react";
import { AlertCircle } from "lucide-react";

const DocumentNotes: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="flex items-start space-x-2">
        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
        <div>
          <p className="font-medium text-yellow-800">Important Notes:</p>
          <ul className="text-sm text-yellow-700 mt-1 space-y-1">
            <li>• All documents should be clear and readable</li>
            <li>
              • FSSAI license should be valid and match restaurant address
            </li>
            <li>• Maximum file size: 5MB per document</li>
            <li>• Accepted formats: PDF, JPG, PNG</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentNotes;
