export type CardColor = {
    id: number,
    name: string,
    bgColor: string,
    txtColor: string
};

export type CardData = {
    value: number,
    color: CardColor
};

export const colors: CardColor[] = [
    {id: 0, name: "Pink", bgColor: "#ff71a3ff", txtColor: "#000000"},
    {id: 1, name: "Red", bgColor: "#ff4b37ff", txtColor: "#000000"},
    {id: 2, name: "Orange", bgColor: "#ff9129ff", txtColor: "#000000"},
    {id: 3, name: "Yellow", bgColor: "#ffd631ff", txtColor: "#000000"},
    {id: 4, name: "Green", bgColor: "#27ae60ff", txtColor: "#ffffff"},
    {id: 5, name: "Blue", bgColor: "#4db2ffff", txtColor: "#ffffff"},
    {id: 6, name: "Purple", bgColor: "#a321d6ff", txtColor: "#ffffff"},
    {id: 7, name: "Black", bgColor: "#2d3436ff", txtColor: "#ffffff"}
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

export default function Card({ card, position, className }: {card: CardData | null, position: number, className?: string}) {
    return (
        <div 
            className={cardStyle(position) + (className ? " " + className : "")}
            style={card 
                ? { backgroundColor: card.color.bgColor }
                : { backgroundColor: "#3730a3" }}
        >
            <span style={card ? { color: card.color.txtColor } : { color: "#ffffff" }}>
                {card ? card.value : "BLUE?!"}
            </span>
        </div>
    );
}
