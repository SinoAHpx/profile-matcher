'use client'

import { Menu, Plus, Mic, Image, Type, User, Users } from 'lucide-react';
import { useState } from 'react';
import { Message } from '@/components/chat/Message';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function ChatPage() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleCommunityClick = () => {
    router.push('/activity');
  };

  return (
    <div className=" bg-gradient-to-t from-[#D9D9D9 84%] to-[#818181] h-screen overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between pt-26 px-10 relative">
        <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <PopoverTrigger asChild>
            <button className="focus:outline-none">
              <Menu className="h-8 w-8" color='#cbcbcb' />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={8}
            className="bg-transparent border-none shadow-none p-0 w-auto z-30"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleProfileClick}
                  className="w-16 h-16 rounded-full bg-[#5c5c5c] flex items-center justify-center shadow-lg hover:bg-[#5c5c5c]/90 transition-colors"
                >
                  <User className="h-6 w-6 text-white" />
                </button>
                <span className="text-white text-sm bg-black/30 px-2 py-1 rounded whitespace-nowrap">Me</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCommunityClick}
                  className="w-16 h-16 rounded-full bg-[#5c5c5c] flex items-center justify-center shadow-lg hover:bg-[#5c5c5c]/90 transition-colors"
                >
                  <Users className="h-6 w-6 text-white" />
                </button>
                <span className="text-white text-sm bg-black/30 px-2 py-1 rounded whitespace-nowrap">社群</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Plus className="h-8 w-8 " color='#cbcbcb' />
      </header>

      {/* Overlay Blur */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Chat Area */}
      <main className="flex-1 p-4 space-y-6 overflow-y-auto pb-40">
        {/* Ego Voice Message */}
        <Message
          type="ego"
          bubbleType="voice"
          content=""
          duration="0:00 / 0:49"
        />

        {/* Echo Text Message */}
        <Message
          type="echo"
          bubbleType="text"
          content="说话主体：通常是自我 (Ego) 或超我 (Superego) 的声音。
被倾听者：仍是自我, 但在当下被分裂为“执行我(acting ego)”与“观察我(observing ego)”。
心理动力：
自我必须在本我冲动和超我要求之间调停, 于是产生“自我劝说”式对话。超我是最早由父母/文化内化的, 所以听起来往往带有权威、道德或苛责口吻。"
        />

        {/* Ego Image Message */}
        <Message
          type="ego"
          bubbleType="image"
          content="Here's a diagram explaining ego psychology"
          imageUrl="/api/placeholder/200/150"
        />

        {/* Ego Text Message */}
        <Message
          type="ego"
          bubbleType="text"
          content="I understand, this is a complex psychological process."
        />
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex flex-col items-center p-4 space-y-4 bg-transparent">
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow">
            <Type className="h-6 w-6" />
          </button>
          <button className="w-20 h-20 rounded-full bg-gray-600 dark:bg-gray-500 flex items-center justify-center shadow-lg">
            <Mic className="h-8 w-8 text-white" />
          </button>
          <button className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow">
            {/* eslint-disable-next-line jsx-a11y/alt-text*/}
            <Image className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-gray-400">向下滑动回到Ego</p>
      </footer>
    </div>
  )
}