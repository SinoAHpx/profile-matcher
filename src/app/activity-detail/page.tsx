"use client";
import React from "react";

import CloseButton from "@/components/CloseButton";

export default function ActivityDetailPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center" style={{ background: '#F5F5F5' }} >
      {/* 居中弹出卡片 */}
      <div className="w-[315px] h-[540px] rounded-2xl bg-white shadow-lg flex flex-col items-center px-4 pt-6 pb-6 relative" >
        {/* 关闭按钮组件 */}
        <CloseButton onClick={() => window.history.back()} />
        {/* 活动卡头部 */}
        <div className="flex w-full items-start mb-4">
          {/* 彩条 */}
          <div className="w-1.5 h-12 rounded-full bg-orange-400 mr-3 mt-1" />
          <div>
            <div className="font-bold text-lg leading-tight mb-1">AdeventureX</div>
            <div className="text-sm text-gray-600 flex items-center">
              7.23-7.27
              <span className="ml-4">杭州</span>
            </div>
          </div>
        </div>
        {/* 海报图片 */}
        <div className="w-full flex justify-center mb-4">
          <img
            src="/poster.svg"
            alt="活动海报"
            className="w-[255px] h-[100px] object-cover rounded-lg"
          />
        </div>

        {/* 正文描述 - 与海报左右对齐 */}
        <div className="w-[255px] mx-auto mb-2">
          <div className="text-xs text-gray-700 leading-relaxed mb-2">
            从今日起，我们将甄选 800 名具有经验、设计、或其他能力的年轻城市志愿者，前往与母亲河的沿岸，并邀请他们在今年 7 月 23 日至 27 日来到中国杭州参与 AdeventureX 2025 线下体验。
          </div>
          <div className="text-xs text-gray-700 leading-relaxed mb-2">
            在过去，我们举办中国最盛大的创意创新活动之一，无限的努力、汗水，还为城市和世界带来了独特的交流并产生积极的影响。我们期待你的到来，一同探索、创造、成长，开启新的篇章。每一位参与者都将获得独特的体验和成长机会。
          </div>
          <div className="text-xs text-gray-700 leading-relaxed mb-2">
            同时，我们也欢迎所有对 AdeventureX 2025 感兴趣的朋友关注活动，或在社交平台上互动讨论。可以共同为创作下一个奇迹的时代。
          </div>
        </div>
        {/* 灰色按钮（卡片底部，固定位置） */}
        <div className="flex-1" />
        <button className="w-[255px] mx-auto h-48 rounded-lg bg-gray-100 text-gray-500 text-base font-semibold mb-2 block">此活动不对外开放</button>
      </div>
    </div>
  );
}
