'use client'

import React from "react";
import { useParams } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import TeamCard from "@/components/TeamCard";

export default function TeamsPage() {
    const params = useParams();
    const activityId = params.id as string;

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
    ];

    // Navigation items
    const navItems = [
        { id: 1, name: "自我", selected: false },
        { id: 2, name: "ADVX", selected: true },
        { id: 3, name: "社群", selected: false },
    ];


    return (
        <div className="bg-white min-h-screen flex flex-col">
            <div className="max-w-[402px] mx-auto w-full flex flex-col flex-1 px-4 py-6 pt-15">

                {/* Header section */}
                <div className="flex flex-col gap-4 mb-6">

                    {/* Search bar */}
                    {/* <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-full border border-[#d9d9d9]">
                        <Search className="w-4 h-4 text-[#cacaca]" />
                        
                    </div> */}

                    <Input
                        className="px-6 py-3 rounded-full flex-1 border-1 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-auto text-[#cacaca] placeholder:text-[#cacaca]"
                        placeholder="点击搜索"
                    />
                </div>

                {/* Team cards container */}
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

                {/* Bottom Navigation */}
                <BottomNavigation className="pb-10" />    
            </div>
        </div>
    );
}
