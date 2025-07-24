'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useUserProfileStore } from '@/stores/user-profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { profile } = useUserProfileStore();

  return (
    <div className="container max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <p className="text-sm text-muted-foreground">{user ? 'Logged in' : 'Guest'}</p>
          </div>
          
          {profile && (
            <>
              <div>
                <label className="text-sm font-medium">Gender</label>
                <p className="text-sm text-muted-foreground">{profile.gender || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Age Range</label>
                <p className="text-sm text-muted-foreground">{profile.ageRange || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Hobbies</label>
                <p className="text-sm text-muted-foreground">
                  {profile.hobbies.length > 0 ? profile.hobbies.join(', ') : 'None selected'}
                </p>
              </div>
              {profile.bio && (
                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <p className="text-sm text-muted-foreground">{profile.bio}</p>
                </div>
              )}
            </>
          )}
          
          <Button onClick={logout} variant="destructive" className="w-full">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}