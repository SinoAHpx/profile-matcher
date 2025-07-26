'use client'

import BottomNavigation from "@/components/BottomNavigation";
import EventCard from "@/components/EventCard";
import AddActivityModal from "@/components/AddActivityModal";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActivityStore } from '@/stores/activityStore';
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";

export default function ActivityPage() {
    const {
        searchQuery,
        setSearchQuery,
        getFilteredActivities,
    } = useActivityStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const filteredActivities = getFilteredActivities();

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Empty Content Area with Plus Icon */}
                <div className="rounded-xl">
                    <Card className="bg-[#f3f3f3] border-0 cursor-pointer" onClick={() => setIsModalOpen(true)}>
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
                        {filteredActivities.map((event) => (
                            <EventCard
                                key={event.id}
                                id={event.id}
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

            {/* Add Activity Modal */}
            <AddActivityModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </div>
    );
}
