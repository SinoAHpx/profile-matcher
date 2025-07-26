import React from 'react';
import { Play, Pause, Image as ImageIcon } from 'lucide-react';

export type MessageType = 'text' | 'voice' | 'image';

interface MessageBubbleProps {
  type: MessageType;
  content: string;
  sender: 'user' | 'llm';
  timestamp?: string;
  duration?: string; // for voice messages
  imageUrl?: string; // for image messages
  audioUrl?: string; // for voice messages
  isLoading?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  type,
  content,
  sender,
  timestamp,
  duration,
  imageUrl,
  audioUrl,
  isLoading = false,
}) => {
  const isUser = sender === 'user';

  const baseClasses = "max-w-xs rounded-2xl p-4 shadow-sm";
  const userClasses = isUser
    ? "bg-[#a8a8a8] text-white ml-auto"
    : "bg-[#a8a8a8] text-white";

  const alignmentClasses = isUser ? "flex justify-end" : "flex justify-start";

  const renderContent = () => {
    switch (type) {
      case 'text':
        return (
          <div className={`${baseClasses} ${userClasses}`}>
            {isLoading ? (
              <p className="text-sm animate-pulse text-gray-300">正在思考...</p>
            ) : (
              <p className="text-sm">{content}</p>
            )}
            {timestamp && (
              <p className="text-xs opacity-70 mt-1 text-right">{timestamp}</p>
            )}
          </div>
        );

      case 'voice': {
        const [isPlaying, setIsPlaying] = React.useState(false);
        const audioRef = React.useRef<HTMLAudioElement>(null);

        const togglePlay = () => {
          if (!audioUrl) return; // 无音频时忽略
          const audio = audioRef.current;
          if (!audio) return;
          if (isPlaying) {
            audio.pause();
          } else {
            audio.play();
          }
        };

        React.useEffect(() => {
          const audio = audioRef.current;
          if (!audio) return;
          const handleEnded = () => setIsPlaying(false);
          const handlePlay = () => setIsPlaying(true);
          const handlePause = () => setIsPlaying(false);
          audio.addEventListener('ended', handleEnded);
          audio.addEventListener('play', handlePlay);
          audio.addEventListener('pause', handlePause);
          return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
          };
        }, []);

        return (
          <div className={`${baseClasses} ${userClasses} flex items-center gap-3`}>
            <button
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${audioUrl ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-500/30 cursor-not-allowed'}`}
              onClick={togglePlay}
              disabled={!audioUrl}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </button>
            <div className="flex-1">
              {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
              <p className="text-xs mt-1">{duration || ''}</p>
            </div>
          </div>
        );
      }

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