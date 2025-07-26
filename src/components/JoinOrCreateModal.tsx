"use client";
import React from "react";
import ActionCard from "./ActionCard";
import { useRouter } from "next/navigation";

interface JoinOrCreateModalProps {
  open: boolean;
  onJoin: () => void;
  onCreate: () => void;
  onClose?: () => void;
}

const StarIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><path d="M14 4l2.917 7.625L25 12.25l-5.5 5.125L20.834 24 14 20.25 7.166 24l1.334-6.625L3 12.25l8.083-0.625L14 4z" stroke="#F59E42" strokeWidth="2" fill="none"/></svg>
);
const PlusIcon = () => (
  <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" stroke="#3B82F6" strokeWidth="2" fill="none"/><path d="M14 9v10M9 14h10" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/></svg>
);

const JoinOrCreateModal: React.FC<JoinOrCreateModalProps> = ({ open, onJoin, onCreate, onClose }) => {
  const router = useRouter();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-xl px-4 py-6 w-[340px] flex flex-col gap-4">
        {/* 左上角返回按钮 */}
        <button
          className="absolute -left-5 -top-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-100 active:bg-gray-200 transition"
          onClick={() => router.push('/activity')}
          aria-label="返回"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <ActionCard
          icon={<StarIcon />}
          title="参加活动"
          subtitle="通过活动码参加现有的活动"
          onClick={onJoin}
        />
        <ActionCard
          icon={<PlusIcon />}
          title="发布活动"
          subtitle="以个人名义发布活动"
          onClick={onCreate}
        />
      </div>
      {onClose && (
        <button
          className="fixed inset-0 w-full h-full cursor-default"
          style={{ background: "transparent" }}
          onClick={onClose}
          aria-label="关闭弹窗"
        />
      )}
    </div>
  );
};

export default JoinOrCreateModal;
