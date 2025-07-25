"use client";

import Hobbies from "@/components/hobbies";
import { AdvancedInput } from "@/components/ui/advanced-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfileStore } from "@/stores/profileStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TestPage() {
  const { basicInfo, aboutYou, tellYou, resetProfile } = useProfileStore();
  
  const hobbiesData = [
    { id: 1, name: "瑜伽" }, { id: 2, name: "游泳" }, { id: 3, name: "跑步" }, { id: 4, name: "健身" },
    { id: 5, name: "舞蹈" }, { id: 19, name: "写作" }, { id: 20, name: "阅读" }, { id: 21, name: "摄影" },
    { id: 35, name: "志愿服务" }, { id: 36, name: "音乐欣赏" }, { id: 51, name: "绘画" }, { id: 53, name: "编程" }
  ];

  const getHobbyNames = (hobbyIds: number[]) => {
    return hobbyIds.map(id => hobbiesData.find(h => h.id === id)?.name || `未知爱好(${id})`);
  };

  return (
    <div className="flex flex-col bg-[#FFF] justify-start overflow-auto container mx-auto p-4 pt-16 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Profile Store 测试页面</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>姓名:</strong> {basicInfo.name || "未填写"}</p>
            <p><strong>年龄:</strong> {basicInfo.age || "未填写"}</p>
            <p><strong>位置:</strong> {basicInfo.location || "未填写"}</p>
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
                  getHobbyNames(aboutYou.hobbies).map((hobby, index) => (
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
          
          <AdvancedInput dialogTitle="选择爱好" className="h-15" title="选择爱好">
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
              placeholder="输入年龄测试" 
              value={basicInfo.age}
              onChange={(e) => useProfileStore.getState().setBasicInfo({ age: e.target.value })}
            />
            <Input 
              className="h-15" 
              placeholder="输入位置测试" 
              value={basicInfo.location}
              onChange={(e) => useProfileStore.getState().setBasicInfo({ location: e.target.value })}
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
    </div>
  );
}
