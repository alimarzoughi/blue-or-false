"use client"

import React from "react"

import { colors } from "./Card"

export default function CardSelector() {
    const [selectedColor, selectColor] = React.useState<string | null>(null);
    const [selectedNumber, selectNumber] = React.useState<number | null>(null);

    const colorCols = [colors.slice(0, 4), colors.slice(4, 8)];
    const numberCols = [[1, 2, 3, 4], [5, 6, 7, 8]];

    function pickColor(color: string) {
        selectColor(color);
        console.log(selectedColor);
    }

    return (
        <div className="flex">
            {colorCols.map((col, i) => 
                <div key={i} className="flex flex-col w-16">
                    {col.map((color) => (
                        <button 
                            key={color.id}
                            className={"border-2 rounded-md transition transform hover:scale-110 hover:ring-2 hover:z-20" + (
                                selectedColor === color.name
                                ? " scale-110 z-20 ring-2"
                                : ""
                            )}
                            style={{ backgroundColor: color.bgColor }}
                            onClick={() => pickColor(color.name)}
                        >
                            <span style={{ color: color.txtColor }}>
                                {color.name}
                            </span>
                        </button>
                    ))}
                </div>
            )}
            {numberCols.map((col, i) =>
                <div key={i} className="flex flex-col w-16">
                    {col.map((n) => (
                        <button
                            key={n}
                            className={"border-2 rounded-md transition transform hover:scale-110 hover:ring-2 hover:z-20" + (
                                selectedNumber === n
                                ? " scale-110 z-20 ring-2"
                                : ""
                            )}
                            onClick={() => selectNumber(n)}
                        >{n}</button>
                    ))}
                </div>
            )}
        </div>
    );
}