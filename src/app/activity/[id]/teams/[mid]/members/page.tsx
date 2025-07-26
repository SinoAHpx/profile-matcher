'use client'

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MemberCard from '@/components/MemberCard';
import BottomNavigation from '@/components/BottomNavigation';
import { useActivityStore } from '@/stores/activityStore';

export default function TeamMembersPage() {
  const params = useParams();
  const router = useRouter();
  const activityId = params.id as string;
  const teamId = params.mid as string;

  const allMembers = useActivityStore(state => state.members);
  const setMembers = useActivityStore(state => state.setMembers);

  const members = React.useMemo(() => allMembers.filter(m => m.teamId === Number(teamId)), [allMembers, teamId]);

  // 如果 store 中没有该队伍成员，则从 mock API 获取
  useEffect(() => {
    if (members.length === 0) {
      fetch(`/api/members?teamId=${teamId}`)
        .then(res => res.json())
        .then((data) => setMembers(data))
        .catch(console.error)
    }
  }, [teamId, members.length, setMembers])

  const handleBack = () => {
    router.push(`/activity/${activityId}/teams`);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col px-6">
      <div className="max-w-[402px] mx-auto w-full flex flex-col flex-1 px-4 py-6 pt-15">

        {/* Header */}
        <div className="flex items-center mb-6 justify-between">
          <button
            onClick={handleBack}
            className="p-2 mr-3 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-[#000000]">{`队伍 ${teamId}`}</h1>
        </div>

        {/* Members list */}
        <div className="flex flex-col gap-4 mb-8">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onClick={() => router.push(`/viewer/${member.id}`)}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 mt-auto pb-30">
          <button className="w-full py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
            退出队伍
          </button>
          <button className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
            加入队伍
          </button>

        </div>

        <BottomNavigation className='pb-10' />
      </div>
    </div>
  );
}
