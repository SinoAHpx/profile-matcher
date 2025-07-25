'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfileStore, UserProfile } from '@/stores/user-profile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

const hobbyOptions = [
  '阅读', '游戏', '音乐', '运动', '烹饪', '旅行', '摄影',
  '艺术', '健身', '科技', '电影', '园艺', '写作', '跳舞'
];

const ageRanges = [
  '18-24', '25-34', '35-44', '45-54', '55-64', '65+'
];

export default function GuidePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { profile, completeGuide, hasCompletedGuide } = useUserProfileStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: profile?.gender || '',
    ageRange: profile?.ageRange || '',
    hobbies: profile?.hobbies || [] as string[],
    bio: profile?.story || ''
  });

  // useEffect(() => {
  //   // Redirect if guide is already completed
  //   if (hasCompletedGuide()) {
  //     router.push('/home');
  //   }
  // }, [router, hasCompletedGuide]);

  const handleHobbyToggle = (hobby: string) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby]
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save to Zustand store
      const profileData: UserProfile = {
        avatar: profile?.avatar || '',
        nickname: profile?.nickname || '',
        gender: formData.gender,
        ageRange: formData.ageRange,
        hobbies: formData.hobbies,
        mbti: profile?.mbti || '',
        quote: profile?.quote || '',
        story: formData.bio,
        completed: true
      };
      completeGuide(profileData);
      // Note: Auto-redirect to home page is disabled
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="container max-w-md mx-auto p-4">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">欢迎！ 👋</CardTitle>
          <CardDescription>让我们更好地了解你</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={progress} className="w-full" />
          <p className="text-center text-sm text-muted-foreground">
            第 {step} 步，共 3 步
          </p>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold">基本信息</h3>
              <div className="space-y-2">
                <Label htmlFor="gender">性别</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="选择你的性别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">男性</SelectItem>
                    <SelectItem value="female">女性</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                    <SelectItem value="prefer-not-to-say">不愿透露</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">年龄范围</Label>
                <Select
                  value={formData.ageRange}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, ageRange: value }))}
                >
                  <SelectTrigger id="age">
                    <SelectValue placeholder="选择你的年龄范围" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRanges.map(range => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold">你的爱好</h3>
              <p className="text-sm text-muted-foreground">选择所有适用的</p>
              <div className="grid grid-cols-2 gap-3">
                {hobbyOptions.map(hobby => (
                  <div key={hobby} className="flex items-center space-x-2">
                    <Checkbox
                      id={hobby}
                      checked={formData.hobbies.includes(hobby)}
                      onCheckedChange={() => handleHobbyToggle(hobby)}
                    />
                    <Label
                      htmlFor={hobby}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {hobby}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold">介绍一下你自己</h3>
              <div className="space-y-2">
                <Label htmlFor="bio">简介（可选）</Label>
                <Input
                  id="bio"
                  type="text"
                  placeholder="分享一些关于你自己的有趣事情..."
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.bio.length}/100 个字符
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-sm">摘要</h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>性别: {formData.gender || '未指定'}</p>
                  <p>年龄: {formData.ageRange || '未指定'}</p>
                  <p>爱好: {formData.hobbies.length > 0 ? formData.hobbies.join(', ') : '未选择'}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                返回
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && (!formData.gender || !formData.ageRange)) ||
                (step === 2 && formData.hobbies.length === 0)
              }
              className="flex-1"
            >
              {step === 3 ? '完成设置' : '下一步'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}