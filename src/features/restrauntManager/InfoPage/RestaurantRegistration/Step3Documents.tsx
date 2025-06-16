import React from "react";
import FileUploadCard from "./FileUploadCard";
import DocumentNotes from "./DocumentNotes";
import type { UploadedFiles } from "../../../../types";

interface Step3DocumentsProps {
  uploadedFiles: UploadedFiles;
  onFileUpload: (key: keyof UploadedFiles | string, file: File) => void;
}

const Step3Documents: React.FC<Step3DocumentsProps> = ({
  uploadedFiles,
  onFileUpload,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">Required Documents</h3>
        <p className="text-gray-600 mb-6">
          Please upload the following documents for verification
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadCard
            title="FSSAI License"
            description="Upload your valid FSSAI license (PDF/JPG)"
            fileKey="fssaiLicense"
            accept=".pdf,.jpg,.jpeg,.png"
            uploadedFile={uploadedFiles.fssaiLicense}
            onFileUpload={onFileUpload}
          />
          <FileUploadCard
            title="PAN Card"
            description="Upload restaurant/business PAN card"
            fileKey="panCard"
            accept=".pdf,.jpg,.jpeg,.png"
            uploadedFile={uploadedFiles.panCard}
            onFileUpload={onFileUpload}
          />
          <FileUploadCard
            title="Menu Card"
            description="Upload current menu with prices (PDF/JPG)"
            fileKey="menuCard"
            accept=".pdf,.jpg,.jpeg,.png"
            uploadedFile={uploadedFiles.menuCard}
            onFileUpload={onFileUpload}
          />
          <FileUploadCard
            title="Restaurant Photos"
            description="Upload interior/exterior photos"
            fileKey="restaurantPhotos"
            accept=".jpg,.jpeg,.png"
            uploadedFile={uploadedFiles.restaurantPhotos}
            onFileUpload={onFileUpload}
          />
        </div>

        <DocumentNotes />
      </div>
    </div>
  );
};

export default Step3Documents;
