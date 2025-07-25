'use client';

import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/stores/chat';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Sparkles, Wand2, Brain, MessageCircle } from 'lucide-react';


interface Suggestion {
  id: string;
  text: string;
  icon: React.ReactNode;
}

const quickSuggestions: Suggestion[] = [
  {
    id: '1',
    text: '帮我规划一个团队项目',
    icon: <Wand2 className="h-4 w-4" />
  },
  {
    id: '2',
    text: '为 Web 应用建议团队角色',
    icon: <Brain className="h-4 w-4" />
  },
  {
    id: '3',
    text: '如何改善团队协作？',
    icon: <MessageCircle className="h-4 w-4" />
  }
];

export default function ChatPage() {
  const { messages, isLoading, addMessage, setLoading } = useChatStore();
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        content: "你好！我是你的 AI 助手，可以帮助你进行团队协作、项目规划和活动策略。今天我能为你做些什么？",
        role: 'assistant',
      });
    }
  }, [messages.length, addMessage]);

  const handleSend = async (content?: string) => {
    const messageContent = content || input.trim();
    if (!messageContent) return;

    addMessage({
      content: messageContent,
      role: 'user',
    });
    setInput('');
    setLoading(true);

    // Simulate AI response (in real app, this would be an API call)
    setTimeout(() => {
      const responses = [
        "好问题！对于团队协作，我建议建立清晰的沟通渠道和定期的签到。可以考虑使用每日站会和共享项目板等工具。",
        "对于项目规划，首先要定义你的 MVP（最小可行产品），然后将其分解为更小、更易于管理的任务。使用 SMART 框架设定目标。",
        "Web 应用的团队角色通常包括：前端开发人员、后端开发人员、UI/UX 设计师和产品经理。在分配角色时，请考虑团队成员的优势。",
        "为了改善团队协作，请实施以下实践：1) 每日站会 2) 每周回顾 3) 清晰的文档 4) 定期反馈会议 5) 共享目标和指标。"
      ];

      addMessage({
        content: responses[Math.floor(Math.random() * responses.length)],
        role: 'assistant',
      });
      setLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    handleSend(suggestion.text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container max-w-4xl mx-auto mb-8 flex flex-col p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Bot className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">AI 助手</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          向我询问有关团队协作、项目规划或活动策略的任何问题
        </p>
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {quickSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
              >
                {suggestion.icon}
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                    }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    <span className="text-sm text-muted-foreground">AI 正在思考...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} 
              placeholder="向我询问有关团队协作的任何问题..."
              className="min-h-[40px] max-h-[120px] text-nowrap resize-none"
              rows={1}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <div className="text-center mt-2">
        <p className="text-xs text-muted-foreground">
          由 AI 驱动 • 响应为演示目的模拟
        </p>
      </div>
    </div>
  );
}