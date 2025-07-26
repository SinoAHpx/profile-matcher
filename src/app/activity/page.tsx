import BottomNavigation from "@/components/BottomNavigation";
import EventCard from "@/components/EventCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import React from "react";

export default function ActivityPage() {
    // Event data for mapping
    const events = [
        {
            id: 1,
            title: "AdeventureX",
            date: "7.23-7.27",
            location: "杭州",
            description: "全国最大的黑客松",
            colorClass: "bg-[#f5894f]",
        },
        {
            id: 2,
            title: "年轻人入乡",
            date: "7.23-7.27",
            location: "昆山",
            description: "小红村大会与瓶行宇宙社会创新节",
            colorClass: "bg-[#488ccd]",
        },
        {
            id: 3,
            title: "羽毛球混双",
            date: "7月28日",
            location: "3km",
            description: "杭州市余杭区未来科技城体育馆",
            colorClass: "bg-[#a7a7a7]",
            hasBeta: true,
        },
        {
            id: 4,
            title: "羽毛球混双",
            date: "7月28日",
            location: "3km",
            description: "杭州市余杭区未来科技城体育馆",
            colorClass: "bg-[#a7a7a7]",
            hasBeta: true,
        },
        {
            id: 5,
            title: "羽毛球混双",
            date: "7月28日",
            location: "3km",
            description: "杭州市余杭区未来科技城体育馆",
            colorClass: "bg-[#a7a7a7]",
            hasBeta: true,
        },
        {
            id: 6,
            title: "羽毛球混双",
            date: "7月28日",
            location: "3km",
            description: "杭州市余杭区未来科技城体育馆",
            colorClass: "bg-[#a7a7a7]",
            hasBeta: true,
        },
        {
            id: 7,
            title: "羽毛球混双",
            date: "7月28日",
            location: "3km",
            description: "杭州市余杭区未来科技城体育馆",
            colorClass: "bg-[#a7a7a7]",
            hasBeta: true,
        },

    ];

    return (
        <div className="bg-white min-h-screen flex flex-col p-10 pb-25">
            <div className="max-w-[402px] mx-auto w-full flex flex-col flex-1 px-4 py-6">
                
                {/* Search Bar */}
                <div className="flex w-full items-center gap-2.5 px-0 py-[15px]">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="点击搜索"
                            className="w-full border-1 rounded-full bg-background px-8 py-5"
                        />
                    </div>
                </div>

                {/* Empty Content Area with Plus Icon */}
                <div className="rounded-xl">
                    <Card className="bg-[#f3f3f3] border-0">
                        <CardContent className="flex items-center justify-center h-[120px] p-0">
                            <Plus className="w-10 h-10 text-gray-400" />
                        </CardContent>
                    </Card>
                </div>

                {/* Section Title */}
                <div className="flex w-full items-center gap-2.5 pt-[30px] pb-[15px]">
                    <div className="font-bold text-black text-2xl">
                        热门活动
                    </div>
                </div>

                {/* Event Cards Container */}
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                name={event.title}
                                date={event.date}
                                location={event.location}
                                description={event.description}
                                hasBeta={event.hasBeta}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation className="pb-10" />
        </div>
    );
}
