import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BasicInfo {
  name: string;
  age: string;
  location: string;
}

interface AboutYou {
  hobbies: number[];
  mbti: string;
  quote: string;
}

interface TellYou {
  message: string;
}

interface ProfileState {
  basicInfo: BasicInfo;
  aboutYou: AboutYou;
  tellYou: TellYou;
  
  // Actions for basic info
  setBasicInfo: (info: Partial<BasicInfo>) => void;
  
  // Actions for about you
  setHobbies: (hobbies: number[]) => void;
  toggleHobby: (hobbyId: number) => void;
  setMbti: (mbti: string) => void;
  setQuote: (quote: string) => void;
  
  // Actions for tell you
  setTellYouMessage: (message: string) => void;
  
  // Reset actions
  resetProfile: () => void;
}

const initialBasicInfo: BasicInfo = {
  name: '',
  age: '',
  location: '',
};

const initialAboutYou: AboutYou = {
  hobbies: [],
  mbti: '',
  quote: '',
};

const initialTellYou: TellYou = {
  message: '',
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      basicInfo: initialBasicInfo,
      aboutYou: initialAboutYou,
      tellYou: initialTellYou,
      
      setBasicInfo: (info) =>
        set((state) => ({
          basicInfo: { ...state.basicInfo, ...info },
        })),
      
      setHobbies: (hobbies) =>
        set((state) => ({
          aboutYou: { ...state.aboutYou, hobbies },
        })),
      
      toggleHobby: (hobbyId) =>
        set((state) => {
          const currentHobbies = state.aboutYou.hobbies;
          const newHobbies = currentHobbies.includes(hobbyId)
            ? currentHobbies.filter((id) => id !== hobbyId)
            : [...currentHobbies, hobbyId];
          return {
            aboutYou: { ...state.aboutYou, hobbies: newHobbies },
          };
        }),
      
      setMbti: (mbti) =>
        set((state) => ({
          aboutYou: { ...state.aboutYou, mbti },
        })),
      
      setQuote: (quote) =>
        set((state) => ({
          aboutYou: { ...state.aboutYou, quote },
        })),
      
      setTellYouMessage: (message) =>
        set(() => ({
          tellYou: { message },
        })),
      
      resetProfile: () =>
        set({
          basicInfo: initialBasicInfo,
          aboutYou: initialAboutYou,
          tellYou: initialTellYou,
        }),
    }),
    {
      name: 'profile-store',
    }
  )
);