"use client";
import React, { useState } from "react";

export default function CouponCodePage() {
  const [code, setCode] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-10 w-full max-w-sm mx-4 flex flex-col items-center">
        <div className="text-xl font-bold text-gray-900 mb-8">请输入活动码</div>
        <input
          type="text"
          placeholder="活动码"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="w-full h-12 rounded-lg border border-gray-200 px-4 text-lg focus:outline-none focus:border-blue-400 bg-gray-50 placeholder-gray-400 transition"
        />
      </div>
    </div>
  );
}
