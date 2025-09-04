import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner';

const ImageUpload = ({ onImageUploaded, multiple = false }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      const formData = new FormData();
      
      if (multiple) {
        Array.from(files).forEach(file => {
          formData.append('images', file);
        });
      } else {
        formData.append('image', files[0]);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/${multiple ? 'images' : 'image'}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('clerk-session-token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      if (result.success) {
        if (multiple) {
          onImageUploaded(result.images);
        } else {
          onImageUploaded({
            imageUrl: result.imageUrl,
            key: result.key,
            url: result.url
          });
        }
      } else {
        throw new Error(result.error || 'Upload failed');
      }
      
      toast.success(result.message || 'Image uploaded successfully');
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInput = (e) => {
    handleFileUpload(e.target.files);
  };

  return (
    <Card className={`p-6 border-2 border-dashed transition-colors ${
      dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
    }`}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="text-center"
      >
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">
            {uploading ? 'Uploading...' : 'Upload Images'}
          </p>
          <p className="text-sm text-gray-500">
            Drag and drop images here, or click to select
          </p>
        </div>

        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileInput}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          
          <Button
            asChild
            disabled={uploading}
            className="w-full"
          >
            <label htmlFor="image-upload" className="cursor-pointer">
              {uploading ? 'Uploading...' : 'Choose Images'}
            </label>
          </Button>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Supports: JPG, PNG, WebP (Max 10MB each)
        </p>
      </div>
    </Card>
  );
};

export default ImageUpload;
