"use client";

import React from "react";
import { Color, Card } from "../types.js";

export default function CardView({ card, hidden = false, onClick, selected }: { card: Card, hidden?: boolean, onClick?: () => void, selected?: boolean }) {
  const colors: Record<Color, string> = {
    red: "#e74c3c",
    blue: "#3498db",
    yellow: "#f1c40f",
    green: "#27ae60",
    orange: "#e67e22",
    purple: "#9b59b6",
    pink: "#fd79a8",
    black: "#2d3436",
  };
  return (
    <div
      onClick={onClick}
      style={{
        width: 48,
        height: 72,
        borderRadius: 8,
        background: colors[card.color],
        color: "#fff",
        border: selected ? "3px solid #222" : "2px solid #fff",
        boxShadow: selected ? "0 0 8px #222" : "0 2px 6px #aaa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 24,
        margin: 2,
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        userSelect: "none",
      }}
    >
      {hidden ? <span style={{fontSize:18}}>?</span> : card.number}
      <span style={{
        position: "absolute",
        bottom: 4,
        right: 6,
        fontSize: 10,
        opacity: 0.7,
        textTransform: "capitalize"
      }}>{hidden ? "" : card.color}</span>
    </div>
  );
}
