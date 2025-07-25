'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const success = await login(formData.email, formData.password);
      if (!success) {
        setMessage('电子邮件或密码无效');
      }
    } catch (error) {
      setMessage('登录时发生错误');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('密码不匹配');
      setIsLoading(false);
      return;
    }

    try {
      const success = await register(formData.name, formData.email, formData.password);
      if (!success) {
        setMessage('注册失败');
      }
    } catch (error) {
      setMessage('注册时发生错误');
    } finally {
      setIsLoading(false);
    }
  };

  // Skip authentication for development
  const skipAuth = async (userType: 'demo' | 'admin' | 'user') => {
    const { authUtils } = await import('@/lib/auth');
    const { useAuthStore } = await import('@/stores/auth');
    const { useUserProfileStore } = await import('@/stores/user-profile');
    
    const store = useAuthStore.getState();
    const userProfileStore = useUserProfileStore.getState();
    
    let user, tokens;
    
    switch (userType) {
      case 'demo':
        user = {
          email: 'demo@example.com',
          name: '演示用户',
          id: 'demo-user-id'
        };
        tokens = {
          accessToken: 'demo-access-token',
          refreshToken: 'demo-refresh-token'
        };
        break;
      case 'admin':
        user = {
          email: 'admin@example.com',
          name: '管理员用户',
          id: 'admin-user-id'
        };
        tokens = {
          accessToken: 'admin-access-token',
          refreshToken: 'admin-refresh-token'
        };
        break;
      case 'user':
      default:
        user = {
          email: 'user@example.com',
          name: '普通用户',
          id: 'user-id-' + Date.now()
        };
        tokens = {
          accessToken: 'user-access-token-' + Date.now(),
          refreshToken: 'user-refresh-token-' + Date.now()
        };
    }
    
    // Set auth data
    authUtils.setAuthData(user, tokens);
    store.setUser(user);
    store.setTokens(tokens.accessToken, tokens.refreshToken);
    
    // Check if user has completed guide
    if (userProfileStore.hasCompletedGuide()) {
      router.push('/home');
    } else {
      router.push('/guide');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-0 shadow-none">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-light">
            {isLogin ? '欢迎回来' : '创建帐户'}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isLogin ? '登录您的帐户' : '输入您的详细信息以创建您的帐户'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-normal">
                  名称
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="张三"
                  className="h-10"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-normal">
                电子邮件
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="zhangsan@example.com"
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-normal">
                密码
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="h-10"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-normal">
                  确认密码
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required={!isLogin}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="h-10"
                />
              </div>
            )}

            {message && (
              <Alert variant={message.includes('successful') ? 'default' : 'destructive'}>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-10 font-normal"
              disabled={isLoading}
            >
              {isLoading ? '处理中...' : (isLogin ? '登录' : '创建帐户')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            variant="ghost"
            className="w-full h-10 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
              setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            }}
          >
            {isLogin ? "没有帐户？" : "已有帐户？"}
          </Button>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="w-full space-y-2 pt-2 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                开发：跳过身份验证
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs"
                  onClick={() => skipAuth('demo')}
                >
                  演示用户
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs"
                  onClick={() => skipAuth('admin')}
                >
                  管理员
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs"
                  onClick={() => skipAuth('user')}
                >
                  普通用户
                </Button>
              </div>
            </div>
          )}
          
          {isLogin && (
            <p className="text-xs text-center text-muted-foreground">
              演示: demo@example.com / password123
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}