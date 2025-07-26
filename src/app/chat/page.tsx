'use client'

import { Menu, Plus, Mic, Image, Type, User, Users, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/components/chat/Message';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function ChatPage() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 控制文字输入 Popover
  const [isTextOpen, setIsTextOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  // 新消息输入内容
  const [newMessage, setNewMessage] = useState('');

  // 聊天消息列表
  type ChatMessage = {
    type: 'ego' | 'echo';
    bubbleType: 'text' | 'voice' | 'image';
    id: number;
    content: string;
    duration?: string;
    imageUrl?: string;
    audioUrl?: string;
    timestamp?: string;
    isLoading?: boolean;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: Date.now() + 1,
      type: 'echo',
      bubbleType: 'text',
      content:
        '说话主体：通常是自我 (Ego) 或超我 (Superego) 的声音。\n被倾听者：仍是自我, 但在当下被分裂为“执行我(acting ego)”与“观察我(observing ego)”。\n心理动力：\n自我必须在本我冲动和超我要求之间调停, 于是产生“自我劝说”式对话。超我是最早由父母/文化内化的, 所以听起来往往带有权威、道德或苛责口吻。',
    },
  ]);

  // 滚动容器引用
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 当消息更新时自动滚到底部
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleCommunityClick = () => {
    router.push('/activity');
  };

  // 工具函数: 将 Blob/File 转为 base64（去除 data:*;base64, 前缀）
  const toBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const res = reader.result as string;
        resolve(res.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  // 共用的发送函数
  const sendToLLM = async (
    placeholderId: number,
    options: { text?: string; audioBase64?: string; imageBase64?: string }
  ) => {
    interface Payload {
      model: string;
      user: string;
      messages: { role: string; content: string }[];
      return_audio: boolean;
      audio_base64?: string;
      image_base64?: string;
    }

    const payload: Payload = {
      model: 'gpt-4o-mini',
      user: 'demo-user',
      messages: [],
      return_audio: false,
    };

    if (options.text) {
      payload.messages.push({ role: 'user', content: options.text });
    }
    if (options.audioBase64) {
      payload.audio_base64 = options.audioBase64;
    }
    if (options.imageBase64) {
      payload.image_base64 = options.imageBase64;
    }

    // 如果既没有文本也没有其他模态, 则直接返回
    if (!payload.messages.length && !payload.audio_base64 && !payload.image_base64) return;

    try {
      const res = await fetch('http://localhost:8001/v1/chat/multimodal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content ?? data?.reply ?? '...';
      setMessages((prev) =>
        prev.map((m) => (m.id === placeholderId ? { ...m, content: reply, isLoading: false } : m))
      );
    } catch (e) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholderId ? { ...m, content: '出错了，请稍后重试', isLoading: false } : m
        )
      );
    }
  };

  const handleSendMessage = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      type: 'ego',
      bubbleType: 'text',
      content: trimmed,
    };

    const placeholderId = Date.now() + 1;
    const placeholderMsg: ChatMessage = {
      id: placeholderId,
      type: 'echo',
      bubbleType: 'text',
      content: '',
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMsg, placeholderMsg]);

    setNewMessage('');
    setIsTextOpen(false);

    // 调用多模态接口 (仅文本)
    sendToLLM(placeholderId, { text: trimmed });
  };

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // 发送语音消息（MVP: 使用固定时长演示）
  const handleSendVoice = () => {
    if (isRecording) {
      // stop
      mediaRecorderRef.current?.stop();
    } else {
      // start
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        // 选择浏览器支持的音频 MIME 类型
        const preferredTypes = [
          'audio/webm;codecs=opus',
          'audio/webm',
          'audio/mp4',
        ];
        const mimeType = preferredTypes.find((t) => MediaRecorder.isTypeSupported(t)) || '';

        const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
        mediaRecorderRef.current = mediaRecorder;

        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size) chunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: mimeType || 'audio/webm' });
          const url = URL.createObjectURL(blob);

          const userMsg: ChatMessage = {
            id: Date.now(),
            type: 'ego',
            bubbleType: 'voice',
            content: '',
            audioUrl: url,
          };

          const placeholderId = Date.now() + 1;
          const placeholderMsg: ChatMessage = {
            id: placeholderId,
            type: 'echo',
            bubbleType: 'text',
            content: '',
            isLoading: true,
          };

          setMessages((prev) => [...prev, userMsg, placeholderMsg]);
          setIsVoiceOpen(false);
          setIsRecording(false);

          // 转 base64 并发送
          toBase64(blob).then((base64) => sendToLLM(placeholderId, { audioBase64: base64 }));
        };
        mediaRecorder.start();
        setIsRecording(true);
      });
    }
  };

  // 图片文件选择
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    const userMsg: ChatMessage = {
      id: Date.now(),
      type: 'ego',
      bubbleType: 'image',
      content: file.name,
      imageUrl: url,
    };

    const placeholderId = Date.now() + 1;
    const placeholderMsg: ChatMessage = {
      id: placeholderId,
      type: 'echo',
      bubbleType: 'text',
      content: '',
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMsg, placeholderMsg]);
    setIsImageOpen(false);

    toBase64(file).then((base64) => sendToLLM(placeholderId, { imageBase64: base64 }));
  };

  return (
    <div className=" bg-gradient-to-t from-[#D9D9D9 84%] to-[#818181] h-screen overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between pt-26 px-10 relative">
        <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <PopoverTrigger asChild>
            <button className="focus:outline-none">
              <Menu className="h-8 w-8" color='#cbcbcb' />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={8}
            className="bg-transparent border-none shadow-none p-0 w-auto z-30"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleProfileClick}
                  className="w-16 h-16 rounded-full bg-[#5c5c5c] flex items-center justify-center shadow-lg hover:bg-[#5c5c5c]/90 transition-colors"
                >
                  <User className="h-6 w-6 text-white" />
                </button>
                <span className="text-white text-sm bg-black/30 px-2 py-1 rounded whitespace-nowrap">Me</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCommunityClick}
                  className="w-16 h-16 rounded-full bg-[#5c5c5c] flex items-center justify-center shadow-lg hover:bg-[#5c5c5c]/90 transition-colors"
                >
                  <Users className="h-6 w-6 text-white" />
                </button>
                <span className="text-white text-sm bg-black/30 px-2 py-1 rounded whitespace-nowrap">社群</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Plus className="h-8 w-8 " color='#cbcbcb' />
      </header>

      {/* Overlay Blur */}
      {(isMenuOpen || isTextOpen || isVoiceOpen || isImageOpen) && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
          onClick={() => {
            setIsMenuOpen(false);
            setIsTextOpen(false);
            setIsVoiceOpen(false);
            setIsImageOpen(false);
          }}
        />
      )}

      {/* Chat Area */}
      <main ref={chatContainerRef} className="flex-1 p-4 space-y-6 overflow-y-auto pb-40">
        {messages.map((msg) => (
          <Message key={msg.id} {...msg} />
        ))}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex flex-col items-center p-4 space-y-4 bg-transparent">
        <div className="flex items-center gap-4">
          {/* 文字聊天 */}
          <Popover open={isTextOpen} onOpenChange={setIsTextOpen}>
            <PopoverTrigger asChild>
              <button className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow">
                <Type className="h-6 w-6" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="center"
              sideOffset={8}
              className="bg-white rounded-xl p-4 shadow-lg w-72 z-30"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="输入消息..."
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-gray-600 rounded-full hover:bg-gray-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </PopoverContent>
          </Popover>

          {/* 语音聊天 */}
          <Popover open={isVoiceOpen} onOpenChange={setIsVoiceOpen}>
            <PopoverTrigger asChild>
              <button className="w-20 h-20 rounded-full bg-gray-600 dark:bg-gray-500 flex items-center justify-center shadow-lg">
                <Mic className="h-8 w-8 text-white" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="center"
              sideOffset={8}
              className="bg-white rounded-xl p-4 shadow-lg w-64 z-30"
            >
              {isRecording ? (
                <>
                  <p className="text-sm mb-3 text-red-500">录音中... 点击停止并发送</p>
                  <button
                    onClick={handleSendVoice}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                  >
                    停止并发送
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm mb-3">点击开始录音</p>
                  <button
                    onClick={handleSendVoice}
                    className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                  >
                    开始录音
                  </button>
                </>
              )}
            </PopoverContent>
          </Popover>

          {/* 图片聊天 */}
          <Popover open={isImageOpen} onOpenChange={setIsImageOpen}>
            <PopoverTrigger asChild>
              <button className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow">
                {/* eslint-disable-next-line jsx-a11y/alt-text*/}
                <Image className="h-6 w-6" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="center"
              sideOffset={8}
              className="bg-white rounded-xl p-4 shadow-lg w-72 z-30"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm"
              />
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-gray-400">向下滑动回到Ego</p>
      </footer>
    </div>
  )
}