import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  gender: string;
  ageRange: string;
  hobbies: string[];
  bio: string;
  completed: boolean;
}

interface UserProfileStore {
  profile: UserProfile | null;
  setProfile: (profile: Partial<UserProfile>) => void;
  completeGuide: (profile: UserProfile) => void;
  resetProfile: () => void;
  hasCompletedGuide: () => boolean;
}

const defaultProfile: UserProfile = {
  gender: '',
  ageRange: '',
  hobbies: [],
  bio: '',
  completed: false,
};

export const useUserProfileStore = create<UserProfileStore>()(
  persist(
    (set, get) => ({
      profile: null,
      
      setProfile: (profile) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...profile } : { ...defaultProfile, ...profile },
        })),

      completeGuide: (profile) =>
        set({
          profile: { ...profile, completed: true },
        }),

      resetProfile: () =>
        set({
          profile: null,
        }),

      hasCompletedGuide: () => {
        const { profile } = get();
        return profile?.completed || false;
      },
    }),
    {
      name: 'user-profile-store',
    }
  )
);