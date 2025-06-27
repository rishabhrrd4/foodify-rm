// import { useCallback, useRef, useState } from 'react';
// import { FaUpload, FaImage } from 'react-icons/fa';

// interface ImageUploaderProps {
//   imageUrl: string;
//   onImageChange: (base64Url: string) => void;
//   onError: (message: string) => void;
//   placeholderImg: string;
//   disabled?: boolean;
// }

// const ImageUploader = ({
//   imageUrl,
//   onImageChange,
//   onError,
//   placeholderImg,
//   disabled = false,
// }: ImageUploaderProps) => {
//   const [isDragOver, setIsDragOver] = useState(false);
//   const [isProcessingImage, setIsProcessingImage] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const convertFileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const validateImageFile = (file: File): boolean => {
//     const maxSize = 5 * 1024 * 1024; // 5MB
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

//     if (!allowedTypes.includes(file.type)) {
//       onError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
//       return false;
//     }

//     if (file.size > maxSize) {
//       onError('Image size must be less than 5MB');
//       return false;
//     }

//     return true;
//   };

//   const handleImageUpload = async (file: File) => {
//     if (!validateImageFile(file)) return;

//     setIsProcessingImage(true);
//     onError('');

//     try {
//       const base64Url = await convertFileToBase64(file);
//       onImageChange(base64Url);
//     } catch (error) {
//       onError('Failed to process image. Please try again.');
//     } finally {
//       setIsProcessingImage(false);
//     }
//   };

//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);

//     const files = Array.from(e.dataTransfer.files);
//     if (files.length > 0) {
//       handleImageUpload(files[0]);
//     }
//   }, []);

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       handleImageUpload(files[0]);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onImageChange(e.target.value);
//   };

//   return (
//     <div className="space-y-4">
//       <label className="block text-sm font-medium text-gray-700">
//         Food Image
//       </label>
      
//       {/* Image Preview */}
//       {imageUrl && (
//         <div className="relative">
//           <img
//             src={imageUrl}
//             alt="Food item preview"
//             className="w-full h-32 object-cover rounded-lg border border-gray-300"
//             onError={(e) => {
//               const target = e.target as HTMLImageElement;
//               target.src = placeholderImg;
//             }}
//           />
//           <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
//             <FaImage className="text-white text-sm" />
//           </div>
//         </div>
//       )}

//       {/* Drag and Drop Zone */}
//       <div
//         className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
//           isDragOver
//             ? 'border-orange-500 bg-orange-50'
//             : 'border-gray-300 hover:border-gray-400'
//         } ${isProcessingImage ? 'opacity-50 pointer-events-none' : ''}`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           onChange={handleFileSelect}
//           className="hidden"
//           disabled={disabled || isProcessingImage}
//         />
        
//         {isProcessingImage ? (
//           <div className="flex flex-col items-center">
//             <svg className="animate-spin h-8 w-8 text-orange-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             <p className="text-sm text-gray-600">Processing image...</p>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center">
//             <FaUpload className="h-8 w-8 text-gray-400 mb-2" />
//             <p className="text-sm text-gray-600 mb-1">
//               <button
//                 type="button"
//                 onClick={triggerFileInput}
//                 className="text-orange-600 hover:text-orange-500 font-medium"
//                 disabled={disabled}
//               >
//                 Click to upload
//               </button>
//               {' '}or drag and drop
//             </p>
//             <p className="text-xs text-gray-500">
//               PNG, JPG, GIF up to 5MB
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Manual URL Input */}
//       <div className="pt-2 border-t border-gray-200">
//         <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-600 mb-1">
//           Or enter image URL
//         </label>
//         <input
//           id="imageUrl"
//           name="imageUrl"
//           type="text"
//           value={imageUrl}
//           onChange={handleUrlChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
//           placeholder="https://example.com/image.jpg"
//           disabled={disabled}
//         />
//       </div>
//     </div>
//   );
// };

// export default ImageUploader;





import { useCallback, useRef, useState } from 'react';
import { FaUpload, FaImage } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  imageUrl: string;
  onImageChange: (base64Url: string) => void;
  onError: (message: string) => void;
  placeholderImg: string;
  disabled?: boolean;
}

const ImageUploader = ({
  imageUrl,
  onImageChange,
  onError,
  placeholderImg,
  disabled = false,
}: ImageUploaderProps) => {
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const validateImageFile = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    // Check if the file type is in our allowed types
    const isValidType = allowedTypes.some(type => {
      // Handle both the explicit type and the extension
      return file.type === type || 
             file.name.toLowerCase().endsWith(type.replace('image/', '.')) ||
             (type === 'image/jpg' && file.name.toLowerCase().endsWith('.jpg')) ||
             (type === 'image/jpeg' && file.name.toLowerCase().endsWith('.jpeg'));
    });

    if (!isValidType) {
      onError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return false;
    }

    if (file.size > maxSize) {
      onError('Image size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleImageUpload = async (file: File) => {
    if (!validateImageFile(file)) return;

    setIsProcessingImage(true);
    onError('');

    try {
      const base64Url = await convertFileToBase64(file);
      onImageChange(base64Url);
    } catch (error) {
      onError('Failed to process image. Please try again.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0];
      if (rejection.errors.some((e: any) => e.code === 'file-invalid-type')) {
        onError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      } else if (rejection.errors.some((e: any) => e.code === 'file-too-large')) {
        onError('Image size must be less than 5MB');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      handleImageUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    disabled: disabled || isProcessingImage,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageChange(e.target.value);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Food Image
      </label>
      
      {/* Image Preview */}
      {imageUrl && (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Food item preview"
            className="w-full h-32 object-cover rounded-lg border border-gray-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = placeholderImg;
            }}
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
            <FaImage className="text-white text-sm" />
          </div>
        </div>
      )}

      {/* Drag and Drop Zone */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragActive
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isProcessingImage ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/png, image/gif, image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || isProcessingImage}
        />
        <input {...getInputProps()} />
        
        {isProcessingImage ? (
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-orange-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-sm text-gray-600">Processing image...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FaUpload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-1">
              <button
                type="button"
                onClick={triggerFileInput}
                className="text-orange-600 hover:text-orange-500 font-medium"
                disabled={disabled}
              >
                Click to upload
              </button>
              {' '}or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF, WEBP up to 5MB
            </p>
          </div>
        )}
      </div>

      {/* Manual URL Input */}
      <div className="pt-2 border-t border-gray-200">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-600 mb-1">
          Or enter image URL
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          value={imageUrl}
          onChange={handleUrlChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
          placeholder="https://example.com/image.jpg"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ImageUploader;