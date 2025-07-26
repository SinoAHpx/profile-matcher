import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BasicInfo {
  name: string;
  password: string;
  oneWordDescription: string;
  avatar: string | null;
}

interface AboutYou {
  hobbies: string[];
  mbti: string;
  quote: string;
}

interface TellYou {
  message: string;
}

interface IntroduceYou {
  skills: string[];
  message: string;
}

interface ProfileState {
  basicInfo: BasicInfo;
  aboutYou: AboutYou;
  tellYou: TellYou;
  introduceYou: IntroduceYou;
  
  // Actions for basic info
  setBasicInfo: (info: Partial<BasicInfo>) => void;
  
  // Actions for about you
  setHobbies: (hobbies: string[]) => void;
  toggleHobby: (hobbyName: string) => void;
  setMbti: (mbti: string) => void;
  setQuote: (quote: string) => void;
  
  // Actions for tell you
  setTellYouMessage: (message: string) => void;
  
  // Actions for introduce you
  setSkills: (skills: string[]) => void;
  toggleSkill: (skillName: string) => void;
  setIntroduceYouMessage: (message: string) => void;
  
  // Reset actions
  resetProfile: () => void;
}

const initialBasicInfo: BasicInfo = {
  name: '',
  password: '',
  oneWordDescription: '',
  avatar: null,
};

const initialAboutYou: AboutYou = {
  hobbies: [],
  mbti: '',
  quote: '',
};

const initialTellYou: TellYou = {
  message: '',
};

const initialIntroduceYou: IntroduceYou = {
  skills: [],
  message: '',
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      basicInfo: initialBasicInfo,
      aboutYou: initialAboutYou,
      tellYou: initialTellYou,
      introduceYou: initialIntroduceYou,
      
      setBasicInfo: (info) =>
        set((state) => ({
          basicInfo: { ...state.basicInfo, ...info },
        })),
      
      setHobbies: (hobbies) =>
        set((state) => ({
          aboutYou: { ...state.aboutYou, hobbies },
        })),
      
      toggleHobby: (hobbyName) =>
        set((state) => {
          const currentHobbies = state.aboutYou.hobbies;
          const newHobbies = currentHobbies.includes(hobbyName)
            ? currentHobbies.filter((name) => name !== hobbyName)
            : [...currentHobbies, hobbyName];
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
        set((state) => ({
          tellYou: { ...state.tellYou, message },
        })),

      setSkills: (skills) =>
        set((state) => ({
          introduceYou: { ...state.introduceYou, skills },
        })),
      
      toggleSkill: (skillName) =>
        set((state) => {
          const currentSkills = state.introduceYou.skills;
          const newSkills = currentSkills.includes(skillName)
            ? currentSkills.filter((name) => name !== skillName)
            : [...currentSkills, skillName];
          return {
            introduceYou: { ...state.introduceYou, skills: newSkills },
          };
        }),

      setIntroduceYouMessage: (message) =>
        set((state) => ({
          introduceYou: { ...state.introduceYou, message },
        })),
      
      resetProfile: () =>
        set({
          basicInfo: initialBasicInfo,
          aboutYou: initialAboutYou,
          tellYou: initialTellYou,
          introduceYou: initialIntroduceYou,
        }),
    }),
    {
      name: 'profile-store',
    }
  )
);