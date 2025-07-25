'use client';

import { useState, useEffect } from 'react';

interface StatusBarProps {
  className?: string;
}

export default function StatusBar({ className = '' }: StatusBarProps) {
  const [time, setTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [networkType, setNetworkType] = useState('5G');
  const [signalStrength, setSignalStrength] = useState(4);
  const [wifiConnected, setWifiConnected] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    // Simulate battery level changes
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => {
        const newLevel = prev - Math.random() * 0.5;
        return Math.max(0, Math.min(100, newLevel));
      });
    }, 30000);

    // Simulate charging status
    const chargingInterval = setInterval(() => {
      setIsCharging(Math.random() > 0.8);
    }, 60000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(batteryInterval);
      clearInterval(chargingInterval);
    };
  }, []);

  const renderSignalBars = () => {
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-0.5 rounded-full transition-all duration-300 ${
          i < signalStrength ? 'bg-white' : 'bg-white/30'
        }`}
        style={{
          height: `${8 + i * 2}px`,
          marginRight: i < 3 ? '1px' : '0'
        }}
      />
    ));
  };

  const renderBatteryIcon = () => {
    const batteryColor = batteryLevel > 20 ? 'bg-white' : 'bg-red-500';
    
    return (
      <div className="relative flex items-center">
        <div className="w-5 h-2.5 border border-white/60 rounded-sm relative flex items-center px-0.5">
          <div 
            className={`h-1.5 rounded-sm transition-all duration-300 ${batteryColor}`}
            style={{ width: `${batteryLevel * 0.65}px` }}
          />
        </div>
        <div className="w-0.5 h-1.5 bg-white/60 rounded-r-sm ml-px" />
        {isCharging && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="h-11 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 text-white text-sm font-medium">
        {/* Left side: Time */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold tracking-wide">{time}</span>
        </div>

        {/* Right side: Status indicators */}
        <div className="flex items-center space-x-2">
          {/* Network type */}
          <span className="text-xs font-semibold tracking-wide">{networkType}</span>
          
          {/* Signal bars */}
          {!wifiConnected && (
            <div className="flex items-end space-x-px">
              {renderSignalBars()}
            </div>
          )}
          
          {/* WiFi icon */}
          {wifiConnected && (
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-6.938-4h13.855c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          )}
          
          {/* Battery */}
          {renderBatteryIcon()}
        </div>
      </div>
    </div>
  );
}