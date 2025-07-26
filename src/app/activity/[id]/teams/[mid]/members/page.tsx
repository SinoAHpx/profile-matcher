'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MemberCard from '@/components/MemberCard';

interface Member {
  id: number;
  name: string;
  avatar: string;
  quote: string;
  mbti: string;
  description: string;
  tags: string[];
}

const mockMembers: Member[] = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "/avatar.webp",
    quote: "代码改变世界，创意改变生活",
    mbti: "INTJ",
    description: "全栈开发者，专注AI与Web3的交叉创新",
    tags: ["React", "Python"]
  },
  {
    id: 2,
    name: "Sarah Wang",
    avatar: "/avatar.webp",
    quote: "设计不仅是美学，更是解决问题的艺术",
    mbti: "ENFP",
    description: "UI/UX设计师，擅长用户研究和交互设计",
    tags: ["Figma", "Design"]
  },
  {
    id: 3,
    name: "Mike Zhang",
    avatar: "/avatar.webp",
    quote: "数据是新的石油，算法是新的引擎",
    mbti: "INTP",
    description: "机器学习工程师，专注NLP和推荐系统",
    tags: ["ML", "TensorFlow"]
  },
  {
    id: 4,
    name: "Emma Liu",
    avatar: "/avatar.webp",
    quote: "产品经理的核心是用户价值的传递",
    mbti: "ENTJ",
    description: "产品经理，擅长需求分析和产品规划",
    tags: ["Product", "Strategy"]
  }
];

export default function TeamMembersPage() {
  const params = useParams();
  const router = useRouter();
  const activityId = params.id as string;
  const teamId = params.mid as string;

  const handleBack = () => {
    router.push(`/activity/${activityId}/teams`);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col px-6">
      <div className="max-w-[402px] mx-auto w-full flex flex-col flex-1 px-4 py-6 pt-15">

        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="p-2 mr-3 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-[#000000]">队伍成员</h1>
        </div>

        {/* Members list */}
        <div className="flex flex-col gap-8 mb-8">
          {mockMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-4 mt-auto pb-6">
          <button className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
            加入队伍
          </button>
          <button className="w-full py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
            退出队伍/解散队伍
          </button>
        </div>
      </div>
    </div>
  );
}
