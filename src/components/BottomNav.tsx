import React from "react";

interface BottomNavProps {
  active?: "self" | "community";
  onSelfClick?: () => void;
  onCommunityClick?: () => void;
}

export default function BottomNav({ active = "community", onSelfClick, onCommunityClick }: BottomNavProps) {
  return (
    <div className="w-full px-10 pb-6 pt-8 flex justify-between items-center bg-white">
      <div className="flex flex-col items-center cursor-pointer" onClick={onSelfClick}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${active === "self" ? "bg-blue-100 border-2 border-blue-400" : "bg-gray-200"}`}>
          <div className={`w-4 h-4 rounded-full ${active === "self" ? "bg-blue-400" : "bg-gray-400"}`} />
        </div>
        <span className={`text-xs ${active === "self" ? "text-blue-500 font-bold" : "text-gray-400"}`}>自我</span>
      </div>
      <div className="flex flex-col items-center cursor-pointer" onClick={onCommunityClick}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${active === "community" ? "bg-blue-100 border-2 border-blue-400" : "bg-gray-200"}`}>
          {/* 社群图标 */}
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center relative">
            {/* dots */}
            <div className="absolute left-1 top-1 w-1 h-1 bg-orange-400 rounded-full" />
            <div className="absolute right-1 top-1 w-1 h-1 bg-blue-400 rounded-full" />
            <div className="absolute left-1 bottom-1 w-1 h-1 bg-gray-400 rounded-full" />
            <div className="absolute right-1 bottom-1 w-1 h-1 bg-orange-400 rounded-full" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full" />
          </div>
        </div>
        <span className={`text-xs ${active === "community" ? "text-blue-500 font-bold" : "text-gray-400"}`}>社群</span>
      </div>
    </div>
  );
}
