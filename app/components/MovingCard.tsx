"use client";

import React from "react";

export default function MovingCard({ from, to }: { from: number, to: number }) {
  // Map player index to grid positions
  const gridPos: Record<number, {top: number | string, left: number | string}> = {
    0: { top: 0, left: "50%" },    // Top
    1: { top: "50%", left: 0 },    // Left
    2: { top: "50%", left: "100%" }, // Right
    3: { top: "100%", left: "50%" }, // Bottom
  };
  // Simple animation: move from -> to
  return (
    <div style={{
      position: "absolute",
      top: gridPos[from].top,
      left: gridPos[from].left,
      transition: "all 0.8s",
      zIndex: 10,
      width: 48,
      height: 72,
      transform: `translate(${typeof gridPos[to].left === "number" ? gridPos[to].left - (typeof gridPos[from].left === "number" ? gridPos[from].left : 0) : 0}px, ${typeof gridPos[to].top === "number" ? gridPos[to].top - (typeof gridPos[from].top === "number" ? gridPos[from].top : 0) : 0}px)`
    }}>
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: 8,
        background: "#888",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 24,
        boxShadow: "0 2px 6px #aaa",
        userSelect: "none"
      }}>
        ?
      </div>
    </div>
  );
}
