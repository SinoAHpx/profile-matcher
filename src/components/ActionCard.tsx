import React from "react";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, title, subtitle, onClick }) => (
  <button
    className="flex items-center gap-4 bg-gray-100 rounded-xl p-4 w-full hover:bg-gray-200 transition focus:outline-none"
    onClick={onClick}
    type="button"
  >
    <span className="text-3xl flex items-center justify-center w-12 h-12 bg-white rounded-full border border-gray-200">
      {icon}
    </span>
    <div className="text-left">
      <div className="font-bold text-lg text-gray-900 mb-1">{title}</div>
      <div className="text-gray-500 text-sm">{subtitle}</div>
    </div>
  </button>
);

export default ActionCard;
