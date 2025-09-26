// "use client"

type CardColor = {
    id: number,
    bgColor: string,
    txtColor: string
};

export type CardData = {
    value: number,
    color: CardColor,
    className?: string;
    style?: React.CSSProperties;
};

export const colors: CardColor[] = [
    {id: 0, bgColor: "#ff71a3ff", txtColor: "#000000"},
    {id: 1, bgColor: "#ff4b37ff", txtColor: "#000000"},
    {id: 2, bgColor: "#ff9129ff", txtColor: "#000000"},
    {id: 3, bgColor: "#ffd631ff", txtColor: "#000000"},
    {id: 4, bgColor: "#27ae60ff", txtColor: "#ffffff"},
    {id: 5, bgColor: "#4db2ffff", txtColor: "#ffffff"},
    {id: 6, bgColor: "#a321d6ff", txtColor: "#ffffff"},
    {id: 7, bgColor: "#2d3436ff", txtColor: "#ffffff"}
];

function cardStyle(position: number) {
    return "border-4 rounded-lg flex items-center justify-center " + (
        position % 2 == 0 ? "w-20 h-16" : "w-16 h-20"
    );
}

export function CardBack({ position }: {position: number}) {
    return (
        <div className={cardStyle(position)} style={{ backgroundColor: "#3730a3" }}>
            <span style={{ color: "#ffffff" }}> BLUE?! </span>
        </div>
    );
}

export default function Card({ card, position }: {card: CardData, position: number}) {
    return (
        <div className={cardStyle(position)} style={{ backgroundColor: card.color.bgColor }}>
            <span style={{ color: card.color.txtColor }}>{card.value}</span>
        </div>
    );
}