import { Menu, Plus, Mic, Image, Type } from 'lucide-react';

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
        {/* Ego Message */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-white"></div>
          <div>
            <p className="font-semibold">Ego</p>
            <div className="mt-1 flex items-center gap-2 bg-white dark:bg-gray-700 rounded-full p-2 shadow">
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-800 dark:border-l-white border-b-[6px] border-b-transparent"></div>
              </div>
              <span className="text-sm">0:00 / 0:49</span>
              <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-600 rounded-full">
                <div className="w-1/4 h-full bg-gray-400 dark:bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Echo Message */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600"></div>
          <div>
            <p className="font-semibold">Echo</p>
            <div className="mt-1 bg-white dark:bg-gray-700 rounded-lg p-3 text-sm max-w-xs">
              <p><strong>说话主体：</strong>通常是自我 (Ego) 或超我 (Superego) 的声音。</p>
              <p><strong>被倾听者：</strong>仍是自我, 但在当下被分裂为“执行我(acting ego)”与“观察我(observing ego)”。</p>
              <p><strong>心理动力：</strong></p>
              <p>自我必须在本我冲动和超我要求之间调停, 于是产生“自我劝说”式对话。超我是最早由父母/文化内化的, 所以听起来往往带有权威、道德或苛责口吻。</p>
            </div>
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