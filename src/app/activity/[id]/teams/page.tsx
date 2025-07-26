'use client'

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/BottomNavigation";
import TeamCard from "@/components/TeamCard";
import MemberCard from "@/components/MemberCard";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CreateTeamDialog } from "@/components/CreateTeamDialog";
import { useActivityStore } from '@/stores/activityStore'

export default function TeamsPage() {
    const params = useParams();
    const activityId = params.id as string;
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    // 新增：当前激活的tab，"teams" 或 "members"
    const [activeTab, setActiveTab] = useState<'teams' | 'members'>("teams");
    const router = useRouter();

    const activityIdNum = Number(activityId);

    // 获取所有 teams/members，然后 useMemo 过滤，避免 zustand selector 每次返回新数组导致 "getSnapshot" 警告
    const allTeams = useActivityStore(state => state.teams)
    const allMembers = useActivityStore(state => state.members)

    const teams = React.useMemo(() => allTeams.filter(t => t.activityId === activityIdNum), [allTeams, activityIdNum])
    const members = React.useMemo(() => allMembers.filter(m => m.activityId === activityIdNum), [allMembers, activityIdNum])
    const addTeam = useActivityStore(state => state.addTeam);
    const setMembers = useActivityStore(state => state.setMembers);
    const setTeams = useActivityStore(state => state.setTeams);

    // Fetch members from mock API (只在首次加载且本地没有成员数据时请求)
    useEffect(() => {
        if (members.length === 0) {
            fetch(`/api/members?activityId=${activityId}`)
                .then(res => res.json())
                .then((data) => {
                    setMembers(data)
                })
                .catch(console.error)
        }
        if (teams.length === 0) {
            fetch(`/api/teams?activityId=${activityId}`)
                .then(res => res.json())
                .then((data) => setTeams(data))
                .catch(console.error)
        }
    }, [activityId, members.length, teams.length, setMembers, setTeams])

    const handleCreateTeam = (teamData: { name: string; description: string }) => {
        addTeam({
            activityId: activityIdNum,
            title: teamData.name,
            description: teamData.description,
            color: 'bg-[#488ccd]',
            dots: [0, 0, 0, 0]
        })
    };


    return (
        <div className="bg-white min-h-screen flex flex-col px-4">
            {/* Blur overlay */}
            {isPopoverOpen && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
            )}

            {/* 小精灵组件 */}
            <div className="fixed -right-4 top-[60%] transform -translate-y-1/2 z-999">
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                        <button className="w-16 h-16 rounded-full focus:outline-none">
                            <Image width={64} height={64} src="/echo.svg" alt="小精灵" className="w-16 h-16" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="left"
                        align="start"
                        sideOffset={8}
                        className="bg-transparent border-none shadow-none p-0 w-auto"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-white text-sm bg-black/30 px-2 py-1 rounded whitespace-nowrap">快速匹配</span>
                                <Button
                                    className="w-16 h-16 rounded-full bg-[#5c5c5c] border-none shadow-lg flex items-center justify-center"
                                    onClick={() => setIsPopoverOpen(false)}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white text-sm bg-black/30 px-2 py-1 rounded whitespace-nowrap">创建队伍</span>
                                <Button
                                    className="w-16 h-16 rounded-full bg-[#5c5c5c] border-none shadow-lg flex items-center justify-center"
                                    onClick={() => {
                                        setIsPopoverOpen(false)
                                        setIsCreateModalOpen(true)
                                    }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6" />
                                        <path d="M23 11h-6" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white text-sm bg-black/30 px-2 py-1 rounded whitespace-nowrap">进入广场</span>
                                <Button
                                    className="w-16 h-16 rounded-full bg-[#5c5c5c] border-none shadow-lg flex items-center justify-center"
                                    onClick={() => setIsPopoverOpen(false)}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <rect x="3" y="3" width="7" height="7" />
                                        <rect x="14" y="3" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" />
                                        <rect x="3" y="14" width="7" height="7" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="max-w-[402px] mx-auto w-full flex flex-col flex-1 px-4 py-6 pt-15 pb-40">
                {/* Tab Header */}
                <div className="flex items-center space-x-2 mb-4 select-none">
                    <button
                        className={`text-2xl font-bold transition-colors ${activeTab === 'teams' ? 'text-[#000000]' : 'text-[#d9d9d9]'}`}
                        onClick={() => setActiveTab('teams')}
                    >
                        队伍
                    </button>
                    <span className="text-2xl font-bold text-[#d9d9d9]">/</span>
                    <button
                        className={`text-2xl font-bold transition-colors ${activeTab === 'members' ? 'text-[#000000]' : 'text-[#d9d9d9]'}`}
                        onClick={() => setActiveTab('members')}
                    >
                        选手
                    </button>
                </div>
                {/* Search bar */}
                <div className="flex flex-col gap-4 mb-6">
                    <Input
                        className="px-6 py-3 rounded-full flex-1 border-1 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-auto text-[#cacaca] placeholder:text-[#cacaca]"
                        placeholder={activeTab === 'teams' ? '搜索队伍' : '搜索选手'}
                    />
                </div>

                {/* Content container */}
                {activeTab === 'teams' ? (
                    <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                        <div className="flex flex-wrap gap-4">
                            {teams.map((card) => (
                                <TeamCard
                                    key={card.id}
                                    id={card.id}
                                    title={card.title}
                                    description={card.description}
                                    color={card.color}
                                    dots={card.dots}
                                    activityId={activityId}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                        {members.map(member => (
                            <MemberCard
                                key={member.id}
                                member={member}
                                onClick={() => router.push(`/viewer/${member.id}`)}
                            />
                        ))}
                    </div>
                )}

                {/* Bottom Navigation */}
                <BottomNavigation className="pb-10" />
            </div>

            {/* Create Team Modal */}
            <CreateTeamDialog
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onCreateTeam={handleCreateTeam}
                activityId={activityId}
            />
        </div>
    );
}
