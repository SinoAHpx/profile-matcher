"use client";
import React from "react";
import { useRouter } from "next/navigation";
import JoinOrCreateModal from "@/components/JoinOrCreateModal";

export default function JoinActivityPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      {/* 页面顶部返回按钮 */}
      <button
        className="m-6 px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-2"
        onClick={() => router.push("/activity")}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        返回活动列表
      </button>
      <JoinOrCreateModal
        open={true}
        onJoin={() => router.push("/code")}
        onCreate={() => router.push("/join-activity/create")}
      />
    </div>
  );
}
