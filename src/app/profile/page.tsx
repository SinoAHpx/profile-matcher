"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProfileStore } from "@/stores/profileStore";
import BottomNavigation from "@/components/BottomNavigation";

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
    
        <BottomNavigation />
      </div>
    </div>
  );
};

export default ProfilePage;
