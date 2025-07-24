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
    text: 'Help me plan a team project',
    icon: <Wand2 className="h-4 w-4" />
  },
  {
    id: '2',
    text: 'Suggest team roles for a web app',
    icon: <Brain className="h-4 w-4" />
  },
  {
    id: '3',
    text: 'How to improve team collaboration?',
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
        content: "Hello! I'm your AI assistant here to help with team collaboration, project planning, and campaign strategy. How can I assist you today?",
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
        "Great question! For team collaboration, I'd recommend establishing clear communication channels and regular check-ins. Consider using tools like daily standups and shared project boards.",
        "For project planning, start with defining your MVP (Minimum Viable Product) and break it down into smaller, manageable tasks. Use the SMART framework for goal setting.",
        "Team roles for a web app typically include: Frontend Developer, Backend Developer, UI/UX Designer, and Product Manager. Consider your team's strengths when assigning roles.",
        "To improve team collaboration, implement these practices: 1) Daily standups 2) Weekly retrospectives 3) Clear documentation 4) Regular feedback sessions 5) Shared goals and metrics."
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
    <div className="container max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Bot className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">AI Assistant</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Ask me anything about team collaboration, project planning, or campaign strategy
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
                    <span className="text-sm text-muted-foreground">AI is thinking...</span>
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
              placeholder="Ask me anything about team collaboration..."
              className="min-h-[40px] max-h-[120px] resize-none"
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
          Powered by AI • Responses are simulated for demo purposes
        </p>
      </div>
    </div>
  );
}