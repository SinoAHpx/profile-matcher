"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProfileStore } from '@/stores/profileStore';

export default function Page() {
  const router = useRouter()
  const { tellYou, setTellYouMessage } = useProfileStore()
  
  const [message, setMessage] = useState(tellYou.message)

  const handleNext = () => {
    setTellYouMessage(message)
    // 完成流程，可以跳转到 profile 页面或其他页面
    router.push('/profile')
  }

  const handlePrevious = () => {
    setTellYouMessage(message)
    router.push('/about-you')
  }

  return (
    <div className="flex flex-col h-full items-center justify-between p-12">
      <div className="flex justify-start w-full max-w-md">
        <h1 className="mt-10 text-6xl font-bold mb-8">讲述你</h1>
      </div>

      <div className="w-full max-w-md space-y-6">
        <Textarea 
          placeholder="说说你自己吧" 
          className="w-full h-[420px] resize-none" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex w-full justify-center space-x-8 mt-4">
        <Button 
          className="flex-1 h-15" 
          variant="outline"
          onClick={handlePrevious}
        >
          上一步
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
