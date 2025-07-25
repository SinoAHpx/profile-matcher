'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useUserProfileStore } from '@/stores/user-profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { profile } = useUserProfileStore();

  return (
    <div className="container max-w-md mx-auto p-4 h-[calc(100vh-4rem)] overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle>个人资料</CardTitle>
          <CardDescription>您的帐户信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">电子邮件</label>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium">状态</label>
            <p className="text-sm text-muted-foreground">{user ? '已登录' : '访客'}</p>
          </div>
          
          {profile && (
            <>
              <div>
                <label className="text-sm font-medium">性别</label>
                <p className="text-sm text-muted-foreground">{profile.gender || '未指定'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">年龄范围</label>
                <p className="text-sm text-muted-foreground">{profile.ageRange || '未指定'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">爱好</label>
                <p className="text-sm text-muted-foreground">
                  {profile.hobbies.length > 0 ? profile.hobbies.join(', ') : '未选择'}
                </p>
              </div>
              {profile.bio && (
                <div>
                  <label className="text-sm font-medium">个人简介</label>
                  <p className="text-sm text-muted-foreground">{profile.bio}</p>
                </div>
              )}
            </>
          )}
          
          <Button onClick={logout} variant="destructive" className="w-full">
            登出
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}