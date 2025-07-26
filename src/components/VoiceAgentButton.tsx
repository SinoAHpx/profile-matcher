"use client";import React, { useRef, useState } from "react";

const BUTTON_SIZE = 64;

export default function VoiceAgentButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ y: 400 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ y: 0 });

  // 鼠标拖动
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    offset.current = {
      y: e.clientY - pos.y,
    };
    document.body.style.userSelect = "none";
  };
  // 触摸拖动
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    const touch = e.touches[0];
    offset.current = {
      y: touch.clientY - pos.y,
    };
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPos({
      y: e.clientY - offset.current.y,
    });
  };
  const handleTouchMove = (e: TouchEvent) => {
    if (!dragging) return;
    const touch = e.touches[0];
    setPos({
      y: touch.clientY - offset.current.y,
    });
  };
  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = "";
  };
  const handleTouchEnd = () => {
    setDragging(false);
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dragging]);

  return (
    <div
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: "fixed",
        right: 30,
        top: pos.y,
        zIndex: 50,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        cursor: "grab",
        borderRadius: "50%",
        boxShadow: "0 4px 16px 0 rgba(0,0,0,0.08)",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src="/echo.svg" alt="voice agent" style={{ width: 40, height: 40 }} />
    </div>
  );
}
