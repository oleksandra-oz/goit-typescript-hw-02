import React from "react";
import s from "./LoaderMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button className={s.button} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
