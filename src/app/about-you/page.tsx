'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Hobbies from "@/components/hobbies";
import { AdvancedInput } from "@/components/ui/advanced-input";
import { useProfileStore } from '@/stores/profileStore';

export default function Page() {
  const router = useRouter()
  const { aboutYou, setMbti, setQuote } = useProfileStore()
  
  const [mbti, setMbtiLocal] = useState(aboutYou.mbti)
  const [quote, setQuoteLocal] = useState(aboutYou.quote)

  const handleNext = () => {
    setMbti(mbti)
    setQuote(quote)
    router.push('/tell-you')
  }

  const handlePrevious = () => {
    setMbti(mbti)
    setQuote(quote)
    router.push('/basic-info')
  }

  return (
    <div className="flex flex-col h-full items-center justify-between p-12">
      <div className="flex justify-start w-full max-w-md">
        <h1 className="mt-30 text-6xl font-bold mb-8">关于你</h1>
      </div>

      <div className="w-full max-w-md space-y-6">
        <AdvancedInput className="h-15" title="你的兴趣爱好">
          <Hobbies />
        </AdvancedInput>

        <Input 
          placeholder="MBTI" 
          className="w-full h-15" 
          value={mbti}
          onChange={(e) => setMbtiLocal(e.target.value)}
        />

        <Input 
          placeholder="你最想说的一句话" 
          className="w-full h-15" 
          value={quote}
          onChange={(e) => setQuoteLocal(e.target.value)}
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
          下一步
        </Button>
      </div>
    </div>
  );
}
