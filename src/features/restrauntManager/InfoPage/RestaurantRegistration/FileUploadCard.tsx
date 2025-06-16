import React from "react";
import { Upload, Check } from "lucide-react";

interface FileUploadCardProps {
  title: string;
  description: string;
  fileKey: string;
  accept?: string;
  uploadedFile: File | null;
  onFileUpload: (key: string, file: File) => void;
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({
  title,
  description,
  fileKey,
  accept = "*/*",
  uploadedFile,
  onFileUpload,
}) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
      <input
        type="file"
        id={fileKey}
        accept={accept}
        onChange={(e) =>
          e.target.files?.[0] && onFileUpload(fileKey, e.target.files[0])
        }
        className="hidden"
      />
      <label htmlFor={fileKey} className="cursor-pointer">
        <div className="flex flex-col items-center space-y-2">
          {uploadedFile ? (
            <Check className="w-8 h-8 text-green-500" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400" />
          )}
          <div>
            <p className="font-medium text-gray-700">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
            {uploadedFile && (
              <p className="text-sm text-green-600 mt-1">
                ✓ {uploadedFile.name}
              </p>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default FileUploadCard;
