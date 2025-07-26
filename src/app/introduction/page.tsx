"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProfileStore } from '@/stores/profileStore';
import { AdvancedInput } from '@/components/ui/advanced-input';
import Hobbies from '@/components/hobbies';
import Skills from '@/components/skills';

export default function IntroductionPage() {
  const router = useRouter()
  const { introduceYou, setIntroduceYouMessage } = useProfileStore()
  
  const [message, setMessage] = useState(introduceYou.message)

  const handleNext = () => {
    setIntroduceYouMessage(message)
    // 完成流程，可以跳转到 profile 页面或其他页面
    router.push('/profile')
  }

  const handlePrevious = () => {
    setIntroduceYouMessage(message)
    router.push('/about-you')
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
