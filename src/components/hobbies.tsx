"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const categories = [
  { id: "body", name: "身" },
  { id: "mind", name: "脑" },
  { id: "heart", name: "心" },
  { id: "hands", name: "手" },
];

const hobbiesData = {
  body: [
    { id: 1, name: "瑜伽" },
    { id: 2, name: "游泳" },
    { id: 3, name: "跑步" },
    { id: 4, name: "健身" },
    { id: 5, name: "舞蹈" },
    { id: 6, name: "篮球" },
    { id: 7, name: "足球" },
    { id: 8, name: "网球" },
    { id: 9, name: "乒乓球" },
    { id: 10, name: "羽毛球" },
    { id: 11, name: "滑板" },
    { id: 12, name: "攀岩" },
    { id: 13, name: "武术" },
    { id: 14, name: "骑行" },
    { id: 15, name: "徒步" },
    { id: 16, name: "滑雪" },
    { id: 17, name: "高尔夫" },
    { id: 18, name: "排球" },
  ],
  mind: [
    { id: 19, name: "写作" },
    { id: 20, name: "阅读" },
    { id: 21, name: "摄影" },
    { id: 22, name: "绘画" },
    { id: 23, name: "下棋" },
    { id: 24, name: "冥想" },
    { id: 25, name: "学习语言" },
    { id: 26, name: "解谜" },
    { id: 27, name: "数独" },
    { id: 28, name: "记忆训练" },
    { id: 29, name: "辩论" },
    { id: 30, name: "哲学思考" },
    { id: 31, name: "科普研究" },
    { id: 32, name: "历史探索" },
    { id: 33, name: "创意写作" },
    { id: 34, name: "战略游戏" },
  ],
  heart: [
    { id: 35, name: "志愿服务" },
    { id: 36, name: "音乐欣赏" },
    { id: 37, name: "园艺" },
    { id: 38, name: "宠物饲养" },
    { id: 39, name: "烹饪" },
    { id: 40, name: "茶艺" },
    { id: 41, name: "手帐" },
    { id: 42, name: "剧本杀" },
    { id: 43, name: "收藏" },
    { id: 44, name: "占星" },
    { id: 45, name: "冥想" },
    { id: 46, name: "心理学" },
    { id: 47, name: "社交" },
    { id: 48, name: "旅行" },
    { id: 49, name: "摄影" },
    { id: 50, name: "艺术鉴赏" },
  ],
  hands: [
    { id: 51, name: "绘画" },
    { id: 52, name: "书法" },
    { id: 53, name: "编程" },
    { id: 54, name: "手工艺" },
    { id: 55, name: "木工" },
    { id: 56, name: "陶艺" },
    { id: 57, name: "编织" },
    { id: 58, name: "折纸" },
    { id: 59, name: "缝纫" },
    { id: 60, name: "烘焙" },
    { id: 61, name: "园艺" },
    { id: 62, name: "乐器演奏" },
    { id: 63, name: "模型制作" },
    { id: 64, name: "首饰制作" },
    { id: 65, name: "皮革工艺" },
    { id: 66, name: "雕刻" },
  ],
};

import { useProfileStore } from "@/stores/profileStore";

export default function Hobbies() {
  const [activeTab, setActiveTab] = React.useState("mind");
  const hobbies = useProfileStore((state) => state.aboutYou.hobbies);
  const toggleHobby = useProfileStore((state) => state.toggleHobby);

  // Calculate the height for 4 rows (4 items per row * button height)
  const gridItemHeight = 44; // Approximate height of each button
  const gapSize = 16; // gap-4 = 1rem = 16px
  const maxVisibleRows = 4;
  const maxContentHeight = (maxVisibleRows * gridItemHeight) + ((maxVisibleRows - 1) * gapSize) + 48; // +48px for padding

  return (
    <div className="max-w-4xl h-80 mx-auto">
      <div
        className="flex rounded-b-lg bg-[#FEFEFE]"
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          minHeight: '280px' // Ensure consistent height
        }}
      >
        {/* Left Column - Fixed 4 tabs */}
        <div className="w-20 flex-shrink-0 py-6">
          <div className="flex flex-col space-y-3 items-center h-full justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg text-lg font-medium transition-colors ${
                  activeTab === category.id
                    ? "bg-[#F4F4F4] text-[#CBCBCB]"
                    : "text-[#CBCBCB] hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mx-4 my-auto h-48 w-[1.5px] bg-[#CBCBCB]"></div>

        {/* Right Column - Fixed 4 columns with overflow */}
        <div className="flex-1 py-6">
          <ScrollArea className="h-full pr-6" style={{ maxHeight: `${maxContentHeight}px` }}>
            <div className="grid grid-cols-3 gap-4">
              {hobbiesData[activeTab as keyof typeof hobbiesData].map(
                (hobby) => (
                  <Button
                    key={hobby.id}
                    variant="ghost"
                    className={`h-11 text-sm justify-center cursor-pointer font-normal transition-colors ${
                      hobbies.includes(hobby.name)
                        ? "bg-[#F4F4F4] text-[#333333]"
                        : "text-[#CBCBCB] hover:bg-gray-100"
                    }`}
                    onClick={() => toggleHobby(hobby.name)}
                  >
                    {hobby.name}
                  </Button>
                )
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
