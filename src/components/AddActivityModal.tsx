'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useActivityStore } from '@/stores/activityStore'

interface AddActivityModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function AddActivityModal({ open, onOpenChange }: AddActivityModalProps) {
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')

    const { addActivity } = useActivityStore()

    const handleSubmit = () => {
        if (!title.trim()) return

        const newActivity = {
            title: title.trim(),
            date: time.trim() || '待定',
            location: location.trim() || '待定',
            description: description.trim() || '',
            colorClass: 'bg-[#488ccd]', // Default color
        }

        addActivity(newActivity)

        // Reset form
        setTitle('')
        setTime('')
        setLocation('')
        setDescription('')

        // Close modal
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className=" p-0 gap-0" showCloseButton={false}>
                <div className="bg-white rounded-lg overflow-hidden">
                    {/* Header */}
                    <DialogHeader className="p-6 pb-4">
                        <div className="flex items-center justify-start">
                            <div className="w-1 h-[60px] bg-[#a8a8a8] mr-4"></div>

                            <DialogTitle className="text-left text-3xl font-bold text-black">
                                编辑活动名称
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    {/* Content */}
                    <div className="px-6 pb-6 space-y-4">
                        {/* Activity Name Input */}
                        <div>
                            <Input
                                placeholder="活动名称"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border-1 rounded-lg px-4 py-3 text-base"
                            />
                        </div>

                        {/* Time and Location Section */}
                        <div className="space-y-3">

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <Input
                                        placeholder="时间"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="border-1 rounded-lg px-4 py-3 text-base"
                                    />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        placeholder="地点"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="border-1 rounded-lg px-4 py-3 text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <Textarea
                                placeholder="点击添加活动描述"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border-1 rounded-lg px-4 py-3 text-base min-h-[80px] resize-none"
                            />
                        </div>

                        {/* Publish Button */}
                        <Button
                            onClick={handleSubmit}
                            className="w-full h-15"
                            disabled={!title.trim()}
                        >
                            发布活动
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 