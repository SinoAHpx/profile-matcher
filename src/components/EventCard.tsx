import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Check } from "lucide-react";

interface EventCardProps {
  name: string;
  date: string;
  location: string;
  description: string;
  hasBeta?: boolean;
  color?: string;
  isFavorite?: boolean;
  isRegistered?: boolean;
  onToggleFavorite?: () => void;
  onRegister?: () => void;
}

const colorClasses = [
  "bg-[#f5894f]",
  "bg-[#488ccd]", 
  "bg-[#a7a7a7]",
  "bg-[#ff6b6b]",
  "bg-[#4ecdc4]",
  "bg-[#45b7d1]",
  "bg-[#96ceb4]",
  "bg-[#feca57]",
  "bg-[#ff9ff3]",
  "bg-[#54a0ff]"
];

const getRandomColor = () => {
  return colorClasses[Math.floor(Math.random() * colorClasses.length)];
};

export default function EventCard({ 
  name, 
  date, 
  location, 
  description, 
  hasBeta = false, 
  color,
  isFavorite = false,
  isRegistered = false,
  onToggleFavorite,
  onRegister
}: EventCardProps) {
  const colorClass = color || getRandomColor();

  return (
    <Card className="flex flex-col w-full items-start gap-2.5 px-3 py-[15px] bg-white rounded-xl shadow-lg border-0">
      <CardContent className="flex w-full items-center justify-between p-0">
        <div className="inline-flex items-center gap-[15px]">
          <div
            className={`w-1 h-[60px] ${colorClass} rounded`}
          />
          <div className="flex flex-col items-start gap-[15px]">
            <div className="font-bold text-black text-base">
              {name}
            </div>
            <div className="flex items-start gap-[15px]">
              <div className="font-light text-black text-sm">
                {date}
              </div>
              <div className="font-light text-black text-sm">
                {location}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[120px] font-light text-[#cacaca] text-[10px] leading-[18px] text-right">
          {description}
          {hasBeta && (
            <div className="flex items-center justify-end mt-2">
              <div className="w-[18px] h-[18px] bg-[#d9d9d9] rounded-[9px]" />
              <div className="ml-2 font-light text-[#cacaca] text-xs">
                Beta
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            {onToggleFavorite && (
              <button
                onClick={onToggleFavorite}
                className={`p-1 rounded-full transition-colors ${
                  isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                }`}
                aria-label="Toggle favorite"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}
            
            {onRegister && (
              <button
                onClick={onRegister}
                className={`p-1 rounded-full transition-colors ${
                  isRegistered ? 'text-green-500' : 'text-gray-400 hover:text-green-400'
                }`}
                aria-label="Register for activity"
              >
                <Check className={`w-4 h-4 ${isRegistered ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}