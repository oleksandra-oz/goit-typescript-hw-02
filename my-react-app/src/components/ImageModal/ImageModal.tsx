import React from "react";
import s from "./ImageModal.module.css";

interface ImageModalProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, altText, onClose }) => {
  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal}>
        <img src={imageUrl} alt={altText} className={s.image} />
      </div>
    </div>
  );
};

export default ImageModal;
