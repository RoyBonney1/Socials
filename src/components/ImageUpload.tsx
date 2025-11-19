"use client";

import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint?: string;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const openWidget = () => {
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        cropping: false,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          onChange(result.info.secure_url);
        }
      }
    );

    widget.open();
  };

  if (value) {
    return (
      <div className="relative size-40">
        <img
          src={value}
          alt="Upload"
          className="rounded-md size-40 object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={openWidget}
      className="w-full p-4 border rounded-md text-center"
    >
      Upload Image
    </button>
  );
}
