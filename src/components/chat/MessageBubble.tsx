import React from 'react';
import { Play, Image as ImageIcon } from 'lucide-react';

export type MessageType = 'text' | 'voice' | 'image';

interface MessageBubbleProps {
  type: MessageType;
  content: string;
  sender: 'user' | 'llm';
  timestamp?: string;
  duration?: string; // for voice messages
  imageUrl?: string; // for image messages
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  type,
  content,
  sender,
  timestamp,
  duration,
  imageUrl,
}) => {
  const isUser = sender === 'user';

  const baseClasses = "max-w-xs rounded-2xl p-4 shadow-sm";
  const userClasses = isUser 
    ? "bg-gradient-to-br from-gray-600 to-gray-700 text-white ml-auto" 
    : "bg-gradient-to-br from-gray-500 to-gray-600 text-white";
  
  const alignmentClasses = isUser ? "flex justify-end" : "flex justify-start";

  const renderContent = () => {
    switch (type) {
      case 'text':
        return (
          <div className={`${baseClasses} ${userClasses}`}>
            <p className="text-sm">{content}</p>
            {timestamp && (
              <p className="text-xs opacity-70 mt-1 text-right">{timestamp}</p>
            )}
          </div>
        );

      case 'voice':
        return (
          <div className={`${baseClasses} ${userClasses} flex items-center gap-3`}>
            <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <Play className="w-4 h-4 text-white ml-0.5" />
            </button>
            <div className="flex-1">
              <div className="h-1 bg-white/30 rounded-full">
                <div className="w-1/4 h-full bg-white rounded-full"></div>
              </div>
              <p className="text-xs mt-1">{duration || '0:00 / 0:00'}</p>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className={`${baseClasses} ${userClasses} p-2`}>
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Shared image" 
                className="rounded-lg max-w-full h-auto"
              />
            ) : (
              <div className="w-48 h-32 bg-gray-400/50 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-white/70" />
              </div>
            )}
            {content && (
              <p className="text-sm mt-2 px-2">{content}</p>
            )}
            {timestamp && (
              <p className="text-xs opacity-70 mt-1 px-2 text-right">{timestamp}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={alignmentClasses}>
      {renderContent()}
    </div>
  );
};