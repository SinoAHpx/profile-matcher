"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProfileStore } from "@/stores/profileStore";

const ProfilePage = () => {
  const { basicInfo, aboutYou, tellYou } = useProfileStore();
  return (
    <div className="bg-white text-gray-800 flex flex-col items-center font-sans p-10 pb-32 pt-20">
      <div className="w-full max-w-md mx-auto space-y-4">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 p-4">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">
              {basicInfo.name || "未命名用户"}
            </h1>
            <p className="text-gray-500">
              {aboutYou.mbti || ""} {basicInfo.oneWordDescription || ""}
            </p>
          </div>
          <Avatar className="w-30 h-30 ml-auto">
            <AvatarImage
              src={basicInfo.avatar || "./avatar.webp"}
              alt={basicInfo.name || "用户头像"}
              className="object-cover"
            />
            <AvatarFallback>
              {basicInfo.name ? basicInfo.name.charAt(0) : "U"}
            </AvatarFallback>
          </Avatar>
        </div>
    
        {/* Quote */}
        <div className="flex flex-col my-8 px-4 space-y-6">
          <span className="text-8xl h-10 text-gray-300 font-serif">“</span>
          <p className="text-xl font-semibold text-center">
            {aboutYou.quote || "暂无个性签名"}
          </p>
          <span className="text-8xl h-10 text-end text-gray-300 font-serif">
            ”
          </span>
        </div>
    
        {/* Bio */}
        <Card className="my-4 shadow-none border-none">
          <CardContent className="p-4 rounded-lg">
            <p className="text-gray-600 leading-relaxed">
              {tellYou.message || "暂无个人介绍"}
            </p>
          </CardContent>
        </Card>
    
        {/* Hobbies */}
        <div className="flex justify-start p-4 flex-wrap gap-2 overflow-x-auto">
          {aboutYou.hobbies && aboutYou.hobbies.length > 0 ? (
            aboutYou.hobbies.map((hobby, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 rounded-full"
              >
                {hobby}
              </Badge>
            ))
          ) : (
            <span className="text-gray-500">暂无兴趣爱好</span>
          )}
        </div>
    
        {/* 底部导航 */}
        <div className="fixed -bottom-5 left-0 right-0 flex justify-center gap-10 items-center p-4 bg-gradient-to-t from-white to-transparent z-40">
          <button className="text-center">
            <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-8 h-8 bg-[#5c5c5c] rounded-full"></div>
            </div>
            <p>自我</p>
          </button>
          <button className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow">
              {/* 社群 icon */}
              <div className="w-8 h-8 relative flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * 2 * Math.PI;
                  const x = Math.cos(angle) * 10;
                  const y = Math.sin(angle) * 10;
                  return (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-gray-400"
                      style={{
                        top: `calc(50% + ${y}px)`,
                        left: `calc(50% + ${x}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <p>社群</p>
          </button>
        </div>
    
        <div
          className="bottom-0 left-0 right-0 h-40 -mb-30 rounded-t-2xl max-w-md"
          style={{
            background:
              "linear-gradient(to top, #FFF 50%, rgba(92, 92, 92, 0.67))",
          }}
        >
          <div className="text-center p-4 text-[#FFF] mb-4 text-sm">
            向上滑动以探索Echo
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
