'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface TeamCardProps {
  id: number;
  title: string;
  description: string;
  color: string;
  dots: number[];
  activityId: string;
}

export default function TeamCard({ id, title, description, color, dots, activityId }: TeamCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/activity/${activityId}/teams/${id}/members`);
  };

  const renderDots = (dots: number[]) => {
    return (
      <div className="flex gap-0.5">
        {dots.map((active, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full ${active ? "bg-[#4CAF50]" : "bg-[#D9D9D9]"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card
      className="flex-1 min-w-[160px] max-w-[calc(50%-8px)] h-[120px] shadow-[0px_4px_36px_0px_rgba(0,0,0,0.05)] rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex flex-col flex-1 gap-2">
          <h3 className="text-[#000000] text-xs font-semibold leading-tight">
            {title}
          </h3>

          <div className={`h-0.5 ${color} rounded-sm`} />

          <p className="text-[#000000] text-[10px] leading-snug flex-1">
            {description.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < description.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>

          <div className="mt-auto">
            {renderDots(dots)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}