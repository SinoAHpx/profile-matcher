"use client";

import Hobbies from "@/components/hobbies";
import { AdvancedInput } from "@/components/ui/advanced-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfileStore } from "@/stores/profileStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavigation from "@/components/BottomNavigation";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function TestPage() {
  const { basicInfo, aboutYou, tellYou, resetProfile } = useProfileStore();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col bg-[#FFF] justify-start overflow-auto container mx-auto p-4 pt-16 space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Profile Store 测试页面</h1>

          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={basicInfo.avatar || undefined} alt="头像" />
                  <AvatarFallback className="bg-gray-100 text-gray-400 text-sm">
                    头像
                  </AvatarFallback>
                </Avatar>
              </div>
              <p><strong>姓名:</strong> {basicInfo.name || "未填写"}</p>
              <p><strong>密码:</strong> {basicInfo.password || "未填写"}</p>
              <p><strong>一个词描述自己:</strong> {basicInfo.oneWordDescription || "未填写"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About You</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <strong>兴趣爱好:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {aboutYou.hobbies.length > 0 ? (
                    aboutYou.hobbies.map((hobby, index) => (
                      <Badge key={index} variant="secondary">{hobby}</Badge>
                    ))
                  ) : (
                    <span className="text-gray-500">未选择任何爱好</span>
                  )}
                </div>
              </div>
              <p><strong>MBTI:</strong> {aboutYou.mbti || "未填写"}</p>
              <p><strong>想说的话:</strong> {aboutYou.quote || "未填写"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tell You</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>消息:</strong> {tellYou.message || "未填写"}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-4">功能测试</h2>

            <AdvancedInput className="h-15" title="选择爱好">
              <Hobbies />
            </AdvancedInput>

            <div className="space-y-2 mt-4">
              <Input
                className="h-15"
                placeholder="输入姓名测试"
                value={basicInfo.name}
                onChange={(e) => useProfileStore.getState().setBasicInfo({ name: e.target.value })}
              />
              <Input
                className="h-15"
                placeholder="输入密码测试"
                value={basicInfo.password}
                onChange={(e) => useProfileStore.getState().setBasicInfo({ password: e.target.value })}
              />
              <Input
                className="h-15"
                placeholder="输入一个词描述自己测试"
                value={basicInfo.oneWordDescription}
                onChange={(e) => useProfileStore.getState().setBasicInfo({ oneWordDescription: e.target.value })}
              />
              <Input
                className="h-15"
                placeholder="输入MBTI测试"
                value={aboutYou.mbti}
                onChange={(e) => useProfileStore.getState().setMbti(e.target.value)}
              />
              <Input
                className="h-15"
                placeholder="输入想说的话测试"
                value={aboutYou.quote}
                onChange={(e) => useProfileStore.getState().setQuote(e.target.value)}
              />
              <Input
                className="h-15"
                placeholder="输入tell you消息测试"
                value={tellYou.message}
                onChange={(e) => useProfileStore.getState().setTellYouMessage(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={resetProfile}
          variant="destructive"
          className="h-15"
        >
          重置所有数据
        </Button>

        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">扩展底部导航预览</h2>
          <p className="text-gray-600">请查看页面底部的扩展导航栏</p>
        </div>
      </div>

      <BottomNavigation
        additionalButtons={[
          {
            id: "home",
            label: "首页",
            icon: <Home className="w-5 h-5" />,
            onClick: () => router.push("/"),
            isActive: false
          },
        ]}
      />
    </>

  );
}
