'use client'

import React from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/BottomNavigation";
import TeamCard from "@/components/TeamCard";
import Image from "next/image";

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


    return (
        <div className="bg-white min-h-screen flex flex-col px-4">
            {/* 小精灵组件 */}
            <div className="fixed -right-4 top-[60%] transform -translate-y-1/2 z-10">
                <Image width={64} height={64} src="/echo.svg" alt="小精灵" className="w-16 h-16" />
            </div>
            
            <div className="max-w-[402px] mx-auto w-full flex flex-col flex-1 px-4 py-6 pt-15 pb-40">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-[#000000]">
                        队伍
                    </h1>
                </div>
                {/* Header section */}
                <div className="flex flex-col gap-4 mb-6">

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
