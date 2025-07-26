import React from "react";

interface CloseButtonProps {
  onClick?: () => void;
  className?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className = "" }) => (
  <button
    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 z-30 shadow ${className}`}
    aria-label="关闭"
    onClick={onClick}
    type="button"
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.47 4.47l7.06 7.06M11.53 4.47l-7.06 7.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </button>
);

export default CloseButton;
