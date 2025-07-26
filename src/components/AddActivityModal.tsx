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
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Calendar, MapPin } from "lucide-react"
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
            <DialogContent className="max-w-[400px] p-0 gap-0" showCloseButton={false}>
                <div className="bg-white rounded-lg overflow-hidden">
                    {/* Header */}
                    <DialogHeader className="p-6 pb-4">
                        <DialogTitle className="text-center text-xl font-bold text-black">
                            编辑活动名称
                        </DialogTitle>
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
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 text-base">点击编辑时间</span>
                                <span className="text-gray-600 text-base">点击编辑地点</span>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="时间"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="border-0 p-0 h-auto text-base focus-visible:ring-0"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="地点"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="border-0 p-0 h-auto text-base focus-visible:ring-0"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Upload Area */}
                        <Card className="bg-[#f3f3f3] border-0">
                            <CardContent className="flex items-center justify-center h-[120px] p-0">
                                <Plus className="w-10 h-10 text-gray-400" />
                            </CardContent>
                        </Card>

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
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg text-base font-medium"
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