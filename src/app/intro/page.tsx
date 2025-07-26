import React from "react";

export default function IntroPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* 顶部内容 */}
      <div className="relative" style={{ minHeight: '260px' }}>
        <div
          className="text-2xl font-bold mb-8 absolute"
          style={{ left: 35, top: 87 }}
        >
          Welcome to
        </div>
        {/* Ego logo */}
        <img
          src="/logo 1.png"
          alt="Ego Logo"
          className="w-[180px] h-[100px] object-contain mb-8 absolute"
          style={{ left: 5, top: 127, pointerEvents: 'none', userSelect: 'none', position: 'absolute' }}
        />
        {/* 副标题 */}
        <div
          className="absolute"
          style={{ left: 35, top: 255 }}
        >
          <div className="text-base font-medium mb-1">Connect to Reflect.</div>
          <div className="text-base">连接为了照见。</div>
        </div>
      </div>
      {/* 底部按钮 */}
      <div className="flex flex-col items-center mb-10">
        <button className="text-base font-bold mb-2">Tell me more</button>
        {/* 下箭头 */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10l5 5 5-5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
