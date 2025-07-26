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
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <Card key={member.id} className="border-none">
      <CardContent >
        <div className="flex gap-4">
          {/* Avatar */}
          <Avatar className="my-auto h-15 w-15 flex-shrink-0">
            <AvatarImage className="object-cover" src={member.avatar} alt={member.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-medium">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          {/* Member info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                <span className="text-2xl text-[#d9d9d9] italic font-serif">“ </span>
                <span className="text-sm font-semibold">{member.quote}</span>
                <span className="text-2xl text-[#d9d9d9] italic font-serif"> ”</span>
              </p>
            </div>

            <p className="text-xs text-gray-700 line-clamp-2">
              {`${member.mbti} / ${member.description}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}