'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfileStore } from '@/stores/user-profile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

const hobbyOptions = [
  'Reading', 'Gaming', 'Music', 'Sports', 'Cooking', 'Travel', 'Photography',
  'Art', 'Fitness', 'Technology', 'Movies', 'Gardening', 'Writing', 'Dancing'
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
    bio: profile?.bio || ''
  });

  useEffect(() => {
    // Redirect if guide is already completed
    if (hasCompletedGuide()) {
      router.push('/home');
    }
  }, [router, hasCompletedGuide]);

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
      // Save to Zustand store and redirect
      completeGuide(formData);
      router.push('/home');
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
          <CardTitle className="text-2xl">Welcome! 👋</CardTitle>
          <CardDescription>Let\'s get to know you better</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={progress} className="w-full" />
          <p className="text-center text-sm text-muted-foreground">
            Step {step} of 3
          </p>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Basic Information</h3>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age Range</Label>
                <Select
                  value={formData.ageRange}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, ageRange: value }))}
                >
                  <SelectTrigger id="age">
                    <SelectValue placeholder="Select your age range" />
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
              <h3 className="font-semibold">Your Hobbies</h3>
              <p className="text-sm text-muted-foreground">Select all that apply</p>
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
              <h3 className="font-semibold">Tell us about yourself</h3>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio (optional)</Label>
                <Input
                  id="bio"
                  type="text"
                  placeholder="Share something interesting about yourself..."
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.bio.length}/100 characters
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-sm">Summary</h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>Gender: {formData.gender || 'Not specified'}</p>
                  <p>Age: {formData.ageRange || 'Not specified'}</p>
                  <p>Hobbies: {formData.hobbies.length > 0 ? formData.hobbies.join(', ') : 'None selected'}</p>
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
                Back
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
              {step === 3 ? 'Complete Setup' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}