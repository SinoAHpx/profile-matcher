"use client";
import React, { useState } from "react";
import VoiceAgentButton from "@/components/VoiceAgentButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";

const activities = [
  {
    color: "border-orange-400",
    title: "AdeventureX",
    time: "7.23-7.27",
    location: "杭州",
    desc: "全国最大的露营松",
    beta: false,
  },
  {
    color: "border-blue-400",
    title: "年轻人入乡",
    time: "7.23-7.27",
    location: "昆山",
    desc: "小红村大会与旅行宇宙社会创新节",
    beta: false,
  },
  {
    color: "border-gray-500",
    title: "羽毛球混双",
    time: "7月28日  3km",
    location: "杭州市余杭区未来科技城体育馆",
    desc: "",
    beta: true,
  },
];

export default function ActivityPage() {
  const [showJoinOrCreate, setShowJoinOrCreate] = useState(false);
  const [showCouponCode, setShowCouponCode] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* 顶部搜索框 */}
      <div className="px-4 pt-12">
        <div className="w-full max-w-md mx-auto">
          <Input
            placeholder="点击搜索"
            disabled
            className="text-center text-gray-400"
          />
        </div>
      </div>

      {/* 顶部 banner 占位 */}
      <div className="pt-1 px-4">
        <div className="w-[315px] h-[120px] rounded-xl bg-gray-100 mb-6 mx-auto relative flex items-center justify-center">
          {/* 居中➕按钮 */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-blue-400 bg-white text-blue-500 text-3xl shadow hover:bg-blue-50 transition"
            onClick={() => setShowJoinOrCreate(true)}
          >
            ＋
          </Button>
        </div>

        {/* 热门活动标题 */}
        <div className="text-2xl font-bold mb-4">热门活动</div>

        {/* 活动卡片列表 */}
        <div className="space-y-4">
          {activities.map((item, idx) => (
            <Card
              key={idx}
              className="p-4 flex items-start gap-3 shadow-sm cursor-pointer"
              onClick={() => {
                if (item.title === 'AdeventureX') setShowDetail(true);
              }}
            >
              <div className={`w-1.5 h-12 rounded-full ${item.color}`} />
              <div className="flex-1">
                <div className="font-bold text-lg leading-tight mb-1">{item.title}</div>
                <div className="text-sm text-gray-600 flex items-center">
                  {item.time}
                  <span className="ml-4">{item.location}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
              </div>
              {item.beta && (
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">
                  内测
                </span>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* 底部导航 */}
      <BottomNavigation className="pb-10" />

      <VoiceAgentButton />

      {/* 弹窗区域 */}
      <JoinOrCreateModal
        open={showJoinOrCreate}
        onJoin={() => {
          setShowJoinOrCreate(false);
          setShowCouponCode(true);
        }}
        onCreate={() => {
          // 可跳转或弹窗
        }}
      />
      <CouponCodeModal open={showCouponCode} onClose={() => setShowCouponCode(false)} />
      <ActivityDetailModal open={showDetail} onClose={() => setShowDetail(false)} />
    </div>
  );
}

function JoinOrCreateModal({ open, onJoin, onCreate }: { open: boolean; onJoin: () => void; onCreate: () => void }) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">选择操作</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Card className="p-4 hover:bg-gray-100 transition cursor-pointer" onClick={onJoin}>
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white border">⭐</span>
              <div>
                <p className="font-semibold text-gray-900">参加活动</p>
                <p className="text-sm text-gray-500">通过活动码参加现有的活动</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 hover:bg-gray-100 transition cursor-pointer" onClick={onCreate}>
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white border">➕</span>
              <div>
                <p className="font-semibold text-gray-900">发布活动</p>
                <p className="text-sm text-gray-500">以个人名义发布活动</p>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CouponCodeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [code, setCode] = useState("");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>请输入活动码</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="活动码"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={onClose}>确认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ActivityDetailModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[360px] p-0 bg-[#F5F5F5]">
        <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden p-0">
          {/* Header */}
          <div className="flex items-center pt-6 px-6">
            <div className="w-1.5 h-8 rounded-full bg-orange-400 mr-3" />
            <div className="text-2xl font-bold text-gray-800">AdeventureX</div>
          </div>
          <div className="flex items-center px-6 mt-2 mb-4">
            <div className="text-base text-gray-700">7.23-7.27</div>
            <div className="ml-6 text-base text-gray-700">杭州</div>
          </div>
          {/* Poster */}
          <div className="flex justify-center px-6">
            <div className="w-full">
              <div className="w-full h-[96px] bg-black rounded-xl flex items-center justify-center">
                {/* 中心星星icon，可换成图片 */}
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <line x1="24" y1="12" x2="24" y2="36" stroke="#fff" strokeWidth="2"/>
                  <line x1="12" y1="24" x2="36" y2="24" stroke="#fff" strokeWidth="2"/>
                  <line x1="16" y1="16" x2="32" y2="32" stroke="#fff" strokeWidth="2"/>
                  <line x1="32" y1="16" x2="16" y2="32" stroke="#fff" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="px-6 py-4 text-xs text-gray-800 leading-relaxed">
            <div>
              从今日起，我们将招募 800 名具有情感、设计、或其他能力的年轻城市志愿者，前往与母亲河的沿岸，并邀请他们在今年 7 月 23 日至 27 日来到中国杭州参与 AdeventureX 2025 线下体验。
            </div>
            <div className="mt-2">
              在这五天，我们将提供中国最好的创造场所之一、无限的努力、硬件、灵感的碰撞和创意，深度的技术讲座，有趣的「脑洞」活动。所有的参与者将会有1对1导师组小队，相互 9 到 11 席，一起带领完成体验、研讨、成果并进行技术创新。你可以获得最好的创意迸发和现实的实现力加成。
            </div>
            <div className="mt-2">
              同时，我们也欢迎所有对 AdeventureX 2025 感兴趣的朋友来现场，亲眼见证中国年轻人创业创新，可以去潜力打响下一个奇迹的时代。
            </div>
          </div>
          {/* 灰色按钮 */}
          <div className="px-6 pb-6">
            <Button disabled className="w-full h-12 rounded-lg bg-gray-200 text-gray-500 text-base font-semibold cursor-not-allowed">
              此活动不对外开放
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
