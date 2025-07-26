import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface Member {
  id: number;
  name: string;
  avatar: string;
  quote: string;
  mbti: string;
  description: string;
  tags: string[];
}

interface MemberCardProps {
  member: Member;
  onClick?: () => void;
}

export default function MemberCard({ member, onClick }: MemberCardProps) {
  return (
    <Card
      key={member.id}
      onClick={onClick}
      className={`border-none ${onClick ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
    >
      <CardContent>
        <div className="flex gap-3">
          {/* Avatar */}
          <Avatar className="my-auto h-12 w-12 flex-shrink-0">
            <AvatarImage className="object-cover" src={member.avatar} alt={member.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-medium">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          {/* Member info */}
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <p className="text-xs text-gray-600 mb-1 line-clamp-1">
                <span className="text-xl text-[#d9d9d9] italic font-serif">“ </span>
                <span className="text-xs font-medium">{member.quote}</span>
                <span className="text-xl text-[#d9d9d9] italic font-serif"> ”</span>
              </p>
            </div>

            <p className="text-[10px] text-gray-700 line-clamp-2">
              {`${member.mbti} / ${member.description}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}