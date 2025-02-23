export interface Game {
    name: string;
    path: string;
    icon: string;
    description: string;
    age: number;
}

export interface GameCollection {
    games: Game[];
}

export const gameCollection: GameCollection = {
    games: [
        {
            name: "Jigsaw",
            path: "/5-10/games/jigsaw",
            icon: "/assets/jigsaw/animals/cat.jpg",
            description: "Arrange scattered pieces to complete a full picture.",
            age: 5
        },
        {
            name: "Memory",
            path: "/3-5/games/memory",
            icon: "/assets/animals/cat.jpg",
            description: "Match pairs of cards by remembering their positions.",
            age: 3
        },
        {
            name: "Sound Quest",
            path: "/jigsaw",
            icon: "/assets/animals/cat.jpg",
            description: "Match sounds to the pictures correctly.",
            age: 3
        },
        {
            name: "Crossword",
            path: "/5-10/games/jigsaw",
            icon: "/assets/animals/cat.jpg",
            description: "Fill the grid using suitable numbers or operators",
            age: 5
        },
        {
            name: "Scrabble",
            path: "/jigsaw",
            icon: "/assets/animals/cat.jpg",
            description: "Fix mixed-up letters to make a real word with the help of a description.",
            age: 3
        },
        {
            name: "Food Stack",
            path: "/5-10/games/jigsaw",
            icon: "/assets/animals/cat.jpg",
            description: "Pick only the healthy foods from the choices given.",
            age: 5
        }
    ]
}