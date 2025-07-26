"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const categories = [
  { id: "technical", name: "技术" },
  { id: "design", name: "设计" },
  { id: "business", name: "商业" },
  { id: "language", name: "语言" },
];

const skillsData = {
  technical: [
    { id: 1, name: "前端开发" },
    { id: 2, name: "后端开发" },
    { id: 3, name: "移动开发" },
    { id: 4, name: "数据库" },
    { id: 5, name: "DevOps" },
    { id: 6, name: "云计算" },
    { id: 7, name: "人工智能" },
    { id: 8, name: "机器学习" },
    { id: 9, name: "数据分析" },
    { id: 10, name: "区块链" },
    { id: 11, name: "网络安全" },
    { id: 12, name: "物联网" },
  ],
  design: [
    { id: 13, name: "UI设计" },
    { id: 14, name: "UX设计" },
    { id: 15, name: "平面设计" },
    { id: 16, name: "插画" },
    { id: 17, name: "动画" },
    { id: 18, name: "3D建模" },
    { id: 19, name: "视频编辑" },
    { id: 20, name: "摄影" },
    { id: 21, name: "品牌设计" },
    { id: 22, name: "产品设计" },
    { id: 23, name: "交互设计" },
    { id: 24, name: "用户研究" },
  ],
  business: [
    { id: 25, name: "产品管理" },
    { id: 26, name: "项目管理" },
    { id: 27, name: "市场营销" },
    { id: 28, name: "数字营销" },
    { id: 29, name: "社交媒体" },
    { id: 30, name: "商业分析" },
    { id: 31, name: "金融分析" },
    { id: 32, name: "创业" },
    { id: 33, name: "销售" },
    { id: 34, name: "运营" },
    { id: 35, name: "人力资源" },
    { id: 36, name: "战略规划" },
  ],
  language: [
    { id: 37, name: "英语" },
    { id: 38, name: "日语" },
    { id: 39, name: "韩语" },
    { id: 40, name: "法语" },
    { id: 41, name: "德语" },
    { id: 42, name: "西班牙语" },
    { id: 43, name: "俄语" },
    { id: 44, name: "葡萄牙语" },
    { id: 45, name: "意大利语" },
    { id: 46, name: "阿拉伯语" },
    { id: 47, name: "翻译" },
    { id: 48, name: "口译" },
  ],
};

import { useProfileStore } from "@/stores/profileStore";
import { useState } from "react";

export default function Skills() {
  const [activeTab, setActiveTab] = useState("technical");
  const selectedSkills = useProfileStore((state) => state.introduceYou.skills);
  const toggleSkill = useProfileStore((state) => state.toggleSkill);

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
              {skillsData[activeTab as keyof typeof skillsData].map(
                (skill) => (
                  <Button
                    key={skill.id}
                    variant="ghost"
                    className={`h-11 text-sm justify-center cursor-pointer font-normal transition-colors ${
                      selectedSkills.includes(skill.name)
                        ? "bg-[#F4F4F4] text-[#333333]"
                        : "text-[#CBCBCB] hover:bg-gray-100"
                    }`}
                    onClick={() => toggleSkill(skill.name)}
                  >
                    {skill.name}
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
