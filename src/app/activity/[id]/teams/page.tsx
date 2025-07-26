'use client'

import React, { useState } from "react";
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

export default function TeamsPage() {
    const params = useParams();
    const activityId = params.id as string;
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    // 新增：当前激活的tab，"teams" 或 "members"
    const [activeTab, setActiveTab] = useState<'teams' | 'members'>("teams");
    const router = useRouter();

    const handleCreateTeam = (teamData: { name: string; description: string }) => {
        console.log('Creating team:', { ...teamData, activityId })
        // Add your team creation logic here
    };

    // Team card data
    const teamCards = [
        {
            id: 1,
            title: "具身机器人+洗澡",
            description: "智能硬件招募 组队",
            color: "bg-[#488ccd]",
            dots: [1, 1, 1, 0],
        },
        {
            id: 2,
            title: "招Web3开发/后端",
            description: "这边还差一名队友\n已经有较为成熟创意",
            color: "bg-[#488ccd]",
            dots: [1, 1, 1, 0],
        },
        {
            id: 3,
            title: "准备做ai生成游戏",
            description:
                "希望你具备扎实工程基础与极强学习能力的开发，非常熟悉cursor等AI IDE",
            color: "bg-[#f5894f]",
            dots: [1, 1, 0, 0],
        },
        {
            id: 4,
            title: "招募平面设计师",
            description: "招募平面设计师和AI提示词大神 欢迎来端点B 找我们",
            color: "bg-[#f5894f]",
            dots: [1, 1, 0, 0],
        },
        {
            id: 5,
            title: "浙大CS研0 LLM方向",
            description: "找一位会UI的和一位和CV方向的队友",
            color: "bg-[#488ccd]",
            dots: [1, 1, 1, 0],
        },
        {
            id: 6,
            title: "想佛系组队",
            description: "不准备想什么idea，准备到了现场现想",
            color: "bg-[#f5894f]",
            dots: [1, 1, 0, 0],
        },
        {
            id: 7,
            title: "准备做ai生成游戏",
            description:
                "希望你具备扎实工程基础与极强学习能力的开发，非常熟悉cursor等AI IDE",
            color: "bg-[#f5894f]",
            dots: [1, 1, 0, 0],
        },
        {
            id: 8,
            title: "招Web3开发/后端",
            description: "这边还差一名队友\n已经有较为成熟创意",
            color: "bg-[#488ccd]",
            dots: [1, 1, 1, 0],
        },
        {
            id: 9,
            title: "招Web3开发/后端",
            description: "这边还差一名队友\n已经有较为成熟创意",
            color: "bg-[#488ccd]",
            dots: [1, 1, 1, 0],
        },
        {
            id: 10,
            title: "招Web3开发/后端",
            description: "这边还差一名队友\n已经有较为成熟创意",
            color: "bg-[#488ccd]",
            dots: [1, 1, 1, 0],
        },
        {
            id: 11,
            title: "招Web3开发/后端",
            description: "这边还差一名队友\n已经有较为成熟创意",
            color: "bg-[#488ccd]",
            dots: [1, 1, 1, 0],
        },
        {
            id: 12,
            title: "招Web3开发/后端",
            description: "这边还差一名队友\n已经有较为成熟创意",
            color: "bg-[#488ccd]",
            dots: [1, 1, 1, 0],
        },
        {
            id: 13,
            title: "招Web3开发/后端",
            description: "这边还差一名队友\n已经有较为成熟创意",
            color: "bg-[#488ccd]",
            dots: [1, 1, 1, 0],
        },
        {
            id: 14,
            title: "招Web3开发/后端",
            description: "这边还差一名队友\n已经有较为成熟创意",
            color: "bg-[#488ccd]",
            dots: [1, 1, 1, 0],
        },
        {
            id: 15,
            title: "招Web3开发/后端",
            description: "这边还差一名队友\n已经有较为成熟创意",
            color: "bg-[#488ccd]",
            dots: [1, 1, 1, 0],
        },
    ];

    // Members data（临时静态数据）
    const members = [
        {
            id: 1,
            name: "阿尔法",
            avatar: "/avatar.webp",
            quote: "热爱挑战，期待合作！",
            mbti: "INTJ",
            description: "算法工程师 / LLM Enthusiast",
            tags: ["LLM", "Go", "AI"]
        },
        {
            id: 2,
            name: "贝塔",
            avatar: "/avatar.webp",
            quote: "设计即生活。",
            mbti: "ENFP",
            description: "产品设计师 / Web3 Lover",
            tags: ["Design", "Figma"]
        },
        {
            id: 3,
            name: "查理",
            avatar: "/avatar.webp",
            quote: "代码改变世界。",
            mbti: "ISTP",
            description: "全栈开发 / DevOps",
            tags: ["React", "Docker"]
        },
        {
            id: 4,
            name: "达尔文",
            avatar: "/avatar.webp",
            quote: "创新源于好奇心。",
            mbti: "ENTJ",
            description: "创业者 / 商业策略",
            tags: ["Startup", "Strategy"]
        },
    ];


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
                            {teamCards.map((card) => (
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
