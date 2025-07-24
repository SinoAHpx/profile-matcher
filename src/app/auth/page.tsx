'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

type User = {
  email: string;
  password: string;
  name: string;
};

// Simulated user storage
const users: User[] = [
  { email: 'demo@example.com', password: 'password123', name: 'Demo User' }
];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setMessage('Login successful!');
    } else {
      setMessage('Invalid email or password');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (users.find(u => u.email === formData.email)) {
      setMessage('User already exists');
      return;
    }

    const newUser: User = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    users.push(newUser);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setMessage('Registration successful!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setMessage('');
  };

  if (isLoggedIn && currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-light">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground">
              {currentUser.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="w-full"
            >
              Sign out
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-0 shadow-none">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-light">
            {isLogin ? 'Welcome back' : 'Create account'}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isLogin ? 'Sign in to your account' : 'Enter your details to create your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-normal">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="h-10"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-normal">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-normal">
                Password
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
                  Confirm password
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
            >
              {isLogin ? 'Sign in' : 'Create account'}
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
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Button>
          
          {isLogin && (
            <p className="text-xs text-center text-muted-foreground">
              Demo: demo@example.com / password123
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}