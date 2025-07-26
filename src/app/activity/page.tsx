import React from "react";

const activities = [
  {
    color: "border-orange-400",
    title: "AdeventureX",
    time: "7.23-7.27",
    location: "杭州",
    desc: "全国最大的露营松",
    beta: false,
  },
  {
    color: "border-blue-400",
    title: "年轻人入乡",
    time: "7.23-7.27",
    location: "昆山",
    desc: "小红村大会与旅行宇宙社会创新节",
    beta: false,
  },
  {
    color: "border-gray-500",
    title: "羽毛球混双",
    time: "7月28日  3km",
    location: "杭州市余杭区未来科技城体育馆",
    desc: "",
    beta: true,
  },
];

import VoiceAgentButton from "@/components/VoiceAgentButton";

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* 顶部 banner 占位 */}
      <div className="pt-8 px-4">
        <div className="w-[315px] h-[120px] rounded-xl bg-gray-100 mb-6 mx-auto" />
        {/* 热门活动标题 */}
        <div className="text-2xl font-bold mb-4">热门活动</div>
        {/* 活动卡片列表 */}
        <div className="space-y-4">
          {activities.map((item, idx) => (
            <div
              key={item.title}
              className="flex items-center bg-white rounded-xl shadow-sm p-4 relative"
              style={{ boxShadow: "0 2px 12px 0 rgba(0,0,0,0.04)" }}
            >
              {/* 左侧彩条 */}
              <div
                className={`absolute left-0 top-4 bottom-4 w-1.5 rounded-full ${item.color}`}
              />
              <div className="pl-4 flex-1">
                <div className="flex items-center mb-1">
                  <span className="font-bold text-base mr-2">{item.title}</span>
                  {item.beta && (
                    <span className="ml-2 text-xs text-gray-400 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-gray-300 mr-1 inline-block" />
                      Beta
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 flex items-center mb-1">
                  <span>{item.time}</span>
                  {item.location && <span className="ml-4">{item.location}</span>}
                </div>
                {item.desc && (
                  <div className="text-xs text-gray-400">{item.desc}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 底部导航栏 */}
      <div className="w-full px-10 pb-6 pt-8 flex justify-between items-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mb-1">
            <div className="w-4 h-4 rounded-full bg-gray-400" />
          </div>
          <span className="text-xs text-gray-400">自我</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-1 border-2 border-blue-400">
            {/* 社群图标 */}
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center relative">
              {/* dots */}
              <div className="absolute left-1 top-1 w-1 h-1 bg-orange-400 rounded-full" />
              <div className="absolute right-1 top-1 w-1 h-1 bg-blue-400 rounded-full" />
              <div className="absolute left-1 bottom-1 w-1 h-1 bg-gray-400 rounded-full" />
              <div className="absolute right-1 bottom-1 w-1 h-1 bg-orange-400 rounded-full" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full" />
            </div>
          </div>
          <span className="text-xs text-blue-500 font-bold">社群</span>
        </div>
      </div>
      <VoiceAgentButton />
    </div>
  );
}
