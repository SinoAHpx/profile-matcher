import { Menu, Plus, Mic, Image, Type } from 'lucide-react';
import { MessageBubble } from '@/components/chat/MessageBubble';

export default function ChatPage() {
  return (
    <div className=" bg-gradient-to-t from-[#D9D9D9 84%] to-[#818181] h-screen overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between py-26 px-10">
        <Menu className="h-8 w-8" color='#cbcbcb' />
        <Plus className="h-8 w-8 " color='#cbcbcb' />
      </header>

      {/* Chat Area */}
      <main className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Ego Voice Message */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-white"></div>
          <div>
            <p className="font-semibold mb-2">Ego</p>
            <MessageBubble 
              type="voice" 
              content="" 
              sender="user" 
              duration="0:00 / 0:49" 
            />
          </div>
        </div>

        {/* Echo Text Message */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600"></div>
          <div>
            <p className="font-semibold mb-2">Echo</p>
            <MessageBubble 
              type="text" 
              sender="llm" 
              content="说话主体：通常是自我 (Ego) 或超我 (Superego) 的声音。
被倾听者：仍是自我, 但在当下被分裂为“执行我(acting ego)”与“观察我(observing ego)”。
心理动力：
自我必须在本我冲动和超我要求之间调停, 于是产生“自我劝说”式对话。超我是最早由父母/文化内化的, 所以听起来往往带有权威、道德或苛责口吻。" 
            />
          </div>
        </div>

        {/* Example text message from user */}
        <div className="flex items-start gap-3 justify-end">
          <div className="w-10 h-10 rounded-full bg-white order-2"></div>
          <div className="order-1">
            <p className="font-semibold mb-2 text-right">You</p>
            <MessageBubble 
              type="text" 
              sender="user" 
              content="I understand, this is a complex psychological process." 
            />
          </div>
        </div>

        {/* Example image message */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-white"></div>
          <div>
            <p className="font-semibold mb-2">Ego</p>
            <MessageBubble 
              type="image" 
              sender="user" 
              content="Here's a diagram explaining ego psychology" 
              imageUrl="/api/placeholder/200/150" 
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center p-4 space-y-4">
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
        <p className="text-xs text-gray-500 dark:text-gray-400">向下滑动回到Ego</p>
      </footer>
    </div>
  );
}