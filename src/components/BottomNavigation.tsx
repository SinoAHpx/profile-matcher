"use client";

import { useRouter } from "next/navigation";

interface BottomNavigationProps {
  className?: string;
}

const BottomNavigation = ({ className = "" }: BottomNavigationProps) => {
  const router = useRouter();

  const handleSelfClick = () => {
    router.push("/chat");
  };

  const handleCommunityClick = () => {
    router.push("/activity");
  };

  return (
    <>
      <div className={`fixed -bottom-5 left-0 right-0 flex justify-center gap-10 items-center p-4 bg-gradient-to-t from-white to-transparent z-40 ${className}`}>
        <button 
          className="text-center"
          onClick={handleSelfClick}
        >
          <div className="w-16 h-16 bg-white border-1 border-[#c5c5c5] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-8 h-8 bg-[#707070] rounded-full"></div>
          </div>
          <p>自我</p>
        </button>
        <button 
          className="text-center"
          onClick={handleCommunityClick}
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow">
            {/* 社群 icon */}
            <div className="w-8 h-8 relative flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * 2 * Math.PI;
                const x = Math.cos(angle) * 10;
                const y = Math.sin(angle) * 10;
                return (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-gray-400"
                    style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                );
              })}
            </div>
          </div>
          <p>社群</p>
        </button>
      </div>
    </>
  );
};

export default BottomNavigation;