"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useActivityStore } from '@/stores/activityStore';
import { AdvancedInput } from '@/components/ui/advanced-input';
// import Hobbies from '@/components/hobbies';
import Skills from '@/components/skills';

export default function IntroductionPage() {
  const router = useRouter()
  const {
    currentActivityId,
    getActivityById,
    setActivityIntroduction,
    setCurrentActivityId,
  } = useActivityStore()

  // 不论有没有 activityId，都要保持 Hook 调用顺序
  const currentActivity = currentActivityId !== null ? getActivityById(currentActivityId) : undefined
  const initialMessage = currentActivity?.introduction?.message || ''
  const [message, setMessage] = useState(initialMessage)

  // 如果没有正在进行的活动 ID，则跳回活动列表
  useEffect(() => {
    if (currentActivityId === null) {
      router.replace('/activity')
    }
  }, [currentActivityId, router])

  if (currentActivityId === null) {
    // 仍然渲染一个空 div，保证 hooks 数量一致即可
    return <div />
  }

  const handleNext = () => {
    // 保存用户的自我介绍到当前活动
    setActivityIntroduction(currentActivityId, { message })
    // 清空当前活动 ID，避免重复
    setCurrentActivityId(null)
    // 跳转回该活动的队伍页
    router.push(`/activity/${currentActivityId}/teams`)
  }

  const handlePrevious = () => {
    // 取消填写，返回活动列表
    setCurrentActivityId(null)
    router.push('/activity')
  }

  return (
    <div className="flex flex-col h-full items-center justify-between p-12 pt-25">
      <div className="flex flex-col items-start w-full max-w-md">
        <h2 className="text-2xl text-[#cbcbcb] mb-8">在本次活动中</h2>
        <h1 className="text-6xl font-bold mb-8">介绍你</h1>
      </div>

      <div className="w-full max-w-md space-y-6">
        <Textarea
          placeholder="说说你自己吧"
          className="w-full h-[320px] resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <AdvancedInput className='h-15' title="自我介绍">
          <Skills />
        </AdvancedInput>
      </div>

      <div className="flex w-full justify-center space-x-8 mt-4">
        <Button
          className="flex-1 h-15"
          variant="outline"
          onClick={handlePrevious}
        >
          取消
        </Button>
        <Button
          className="flex-1 h-15"
          onClick={handleNext}
        >
          完成
        </Button>
      </div>
    </div>
  );
}
