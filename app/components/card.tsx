type CardColor = {
    bgColor: string,
    txtColor: string
};

export type CardData = {
    value: number,
    color: CardColor,
    player: number,
    className?: string;
    style?: React.CSSProperties;
};

export const colors: CardColor[] = [
    {bgColor: "#ff71a3ff", txtColor: "#000000"},
    {bgColor: "#ff4b37ff", txtColor: "#000000"},
    {bgColor: "#ff9129ff", txtColor: "#000000"},
    {bgColor: "#ffd631ff", txtColor: "#000000"},
    {bgColor: "#27ae60", txtColor: "#ffffff"},
    {bgColor: "#4db2ff", txtColor: "#ffffff"},
    {bgColor: "#a321d6ff", txtColor: "#ffffff"},
    {bgColor: "#2d3436", txtColor: "#ffffff"}
];

export default function Card({ value, color, player }: CardData) {
    return (
        <div
            className={"border-4 rounded-lg flex items-center justify-center " + (
                player % 2 == 0 ? "w-20 h-16" : "w-16 h-20"
            )}
            style={{ backgroundColor: color.bgColor }}
        >
            <span style={{ color: color.txtColor }}>{value}</span>
        </div>
    );
}