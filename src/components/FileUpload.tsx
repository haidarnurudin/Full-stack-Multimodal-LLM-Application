import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  accept: string;
  icon: React.ReactNode;
  label: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  onFileSelect,
  accept,
  icon,
  label,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { [accept]: [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50/5' : 'border-gray-600 hover:border-gray-500'}
        ${file ? 'bg-green-500/10 border-green-500' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        {icon}
        <span className="text-sm">
          {file ? file.name : isDragActive ? 'Drop here' : label}
        </span>
      </div>
    </div>
  );
};