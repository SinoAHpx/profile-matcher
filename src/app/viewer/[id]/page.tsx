'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import React from "react";

interface Member {
    id: number;
    name: string;
    avatar: string;
    quote: string;
    mbti: string;
    description: string;
    tags: string[];
    hobbies?: string[];
}

// 临时 mock 数据，后续可接入接口
const mockMembers: Member[] = [
    {
        id: 1,
        name: "阿尔法",
        avatar: "/avatar.webp",
        quote: "热爱挑战，期待合作！",
        mbti: "INTJ",
        description: "算法工程师 / LLM Enthusiast",
        tags: ["LLM", "Go", "AI"],
        hobbies: ["篮球", "阅读"]
    },
    {
        id: 2,
        name: "贝塔",
        avatar: "/avatar.webp",
        quote: "设计即生活。",
        mbti: "ENFP",
        description: "产品设计师 / Web3 Lover",
        tags: ["Design", "Figma"],
        hobbies: ["绘画", "旅行"]
    },
    {
        id: 3,
        name: "查理",
        avatar: "/avatar.webp",
        quote: "代码改变世界。",
        mbti: "ISTP",
        description: "全栈开发 / DevOps",
        tags: ["React", "Docker"],
        hobbies: ["攀岩", "音乐"]
    },
    {
        id: 4,
        name: "达尔文",
        avatar: "/avatar.webp",
        quote: "创新源于好奇心。",
        mbti: "ENTJ",
        description: "创业者 / 商业策略",
        tags: ["Startup", "Strategy"],
        hobbies: ["围棋", "摄影"]
    },
];

const ViewerPage = () => {
    const params = useParams();
    const memberId = Number(params.id);

    const member = mockMembers.find((m) => m.id === memberId);

    if (!member) {
        return <div className="text-center mt-20">未找到选手信息</div>;
    }

    return (
        <div className="bg-white text-gray-800 flex flex-col items-center font-sans p-10 pt-20 min-h-screen">
            <div className="w-full max-w-md mx-auto space-y-4">
                {/* Profile Header */}
                <div className="flex items-center space-x-4 p-4">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold">{member.name}</h1>
                        <p className="text-gray-500">
                            {member.mbti} {member.description}
                        </p>
                    </div>
                    <Avatar className="w-30 h-30 ml-auto">
                        <AvatarImage src={member.avatar} alt={member.name} className="object-cover" />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>

                {/* Quote */}
                <div className="flex flex-col my-8 px-4 space-y-6">
                    <span className="text-8xl h-10 text-gray-300 font-serif">“</span>
                    <p className="text-xl font-semibold text-center">{member.quote}</p>
                    <span className="text-8xl h-10 text-end text-gray-300 font-serif">”</span>
                </div>

                {/* Bio */}
                <Card className="my-4 shadow-none border-none">
                    <CardContent className="p-4 rounded-lg">
                        <p className="text-gray-600 leading-relaxed">{member.description}</p>
                    </CardContent>
                </Card>

                {/* Hobbies */}
                <div className="flex justify-start p-4 flex-wrap gap-2 overflow-x-auto">
                    {member.hobbies && member.hobbies.length > 0 ? (
                        member.hobbies.map((hobby, index) => (
                            <Badge key={index} variant="outline" className="px-4 py-2 rounded-full">
                                {hobby}
                            </Badge>
                        ))
                    ) : (
                        <span className="text-gray-500">暂无兴趣爱好</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewerPage; 