import React from 'react';
import { MessageBubble, MessageType as BubbleMessageType } from './MessageBubble';

export type MessageType = 'ego' | 'echo';

interface MessageProps {
  type: MessageType;
  bubbleType: BubbleMessageType;
  content: string;
  duration?: string;
  imageUrl?: string;
  audioUrl?: string;
  timestamp?: string;
}

export const Message: React.FC<MessageProps> = ({
  type,
  bubbleType,
  content,
  duration,
  imageUrl,
  audioUrl,
  timestamp,
}) => {
  const isEgo = type === 'ego';

  const avatarClasses = isEgo
    ? 'w-10 h-10 rounded-full bg-white'
    : 'w-10 h-10 rounded-full bg-gray-600';

  const senderName = isEgo ? 'Ego' : 'Echo';
  const sender = isEgo ? 'user' : 'llm';

  return (
    <div className="flex items-start gap-3">
      <div className={avatarClasses}></div>
      <div>
        <p className="font-semibold mb-2">{senderName}</p>
        <MessageBubble
          type={bubbleType}
          content={content}
          sender={sender}
          duration={duration}
          imageUrl={imageUrl}
          audioUrl={audioUrl}
          timestamp={timestamp}
        />
      </div>
    </div>
  );
};