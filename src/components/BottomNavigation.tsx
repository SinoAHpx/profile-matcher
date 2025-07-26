"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface AdditionalButton {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

interface BottomNavigationProps {
  className?: string;
  additionalButtons?: AdditionalButton[];
}

const BottomNavigation = ({ className = "", additionalButtons = [] }: BottomNavigationProps) => {
  const router = useRouter();

  const handleSelfClick = () => {
    router.push("/chat");
  };

  const handleCommunityClick = () => {
    router.push("/activity");
  };

  const renderButton = (label: string, icon: React.ReactNode, onClick: () => void, isActive = false) => (
    <button 
      className="text-center"
      onClick={onClick}
    >
      <div className={`w-16 h-16 ${isActive ? 'bg-blue-100 border-blue-500' : 'bg-white'} border-1 ${isActive ? 'border-blue-500' : 'border-[#c5c5c5]'} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow`}>
        {icon}
      </div>
      <p className={isActive ? 'text-blue-600 font-semibold' : ''}>{label}</p>
    </button>
  );

  return (
    <>
      <div className={`fixed -bottom-5 left-0 right-0 flex justify-center gap-10 items-center p-4 bg-gradient-to-t from-white to-transparent z-40 ${className}`}>
        {renderButton("自我", <div className="w-8 h-8 bg-[#707070] rounded-full"></div>, handleSelfClick)}
        {renderButton("社群", 
          <div className="w-8 h-8 relative flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * 2 * Math.PI;
              const x = Math.cos(angle) * 10;
              const y = Math.sin(angle) * 10;
              return (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-gray-400"
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
          </div>, 
          handleCommunityClick
        )}
        {additionalButtons.map((button) => renderButton(button.label, button.icon, button.onClick, button.isActive))
        }
      </div>
    </>
  );
};

export default BottomNavigation;