import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
  getLastMessages: (count: number) => ChatMessage[];
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,

      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      setLoading: (loading) => set({ isLoading: loading }),

      clearMessages: () => set({ messages: [] }),

      getLastMessages: (count) => {
        const { messages } = get();
        return messages.slice(-count);
      },
    }),
    {
      name: 'chat-store',
    }
  )
);