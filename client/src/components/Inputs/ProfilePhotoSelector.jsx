import React, { useEffect, useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    if (typeof image === "string") {
      setPreviewUrl(image);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div className="w-20 h-20 flex items-center justify-center bg-[#F0F8FF] rounded-full relative shadow-[6px_6px_14px_rgba(70,130,180,0.25),-6px_-6px_14px_rgba(255,255,255,0.9)]">
          <LuUser className="text-4xl text-[#4682B4]" />
          <button
            type="button"
            onClick={onChooseFile}
            aria-label="Upload profile photo"
            className="w-8 h-8 flex items-center justify-center text-white rounded-full absolute -bottom-1 -right-1 shadow-[3px_3px_7px_rgba(70,130,180,0.3),-3px_-3px_7px_rgba(255,255,255,0.9)] active:shadow-[inset_2px_2px_5px_rgba(45,95,135,0.4)] transition-shadow"
            style={{ backgroundColor: "#4682B4" }}
          >
            <LuUpload size={14} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover shadow-[6px_6px_14px_rgba(70,130,180,0.25),-6px_-6px_14px_rgba(255,255,255,0.9)]"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            aria-label="Remove profile photo"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 shadow-[3px_3px_7px_rgba(0,0,0,0.2)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3)] transition-shadow"
          >
            <LuTrash size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
