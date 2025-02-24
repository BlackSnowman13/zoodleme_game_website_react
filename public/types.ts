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

interface Asset {
    name: string;
    url: string;
}

export interface Category {
    categoryName: string;
    assets: Asset[];
}

export interface ImageCollection {
    categories: Category[];
}

export interface Levels {
    level: string;
    difficulty: string;
    rows: number
    columns: number
    totalElements: number
}

export interface MemoryLevelsCollection {
    levels: Levels[];
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

export const imageCollection: ImageCollection = {
    categories: [
        {
            categoryName: "Animals",
            assets: [
                { name: "cat", url: "/assets/jigsaw/animals/cat.jpg" },
                { name: "dog", url: "/assets/jigsaw/animals/dog.jpg" },
                { name: "rabbit", url: "/assets/jigsaw/animals/rabbit.jpg" },
                { name: "squirrel", url: "/assets/jigsaw/animals/squirrel.jpg" }
            ]
        },
        {
            categoryName: "Architecture",
            assets: [
                { name: "building", url: "/assets/jigsaw/architecture/building.jpg" },
                { name: "rainy", url: "/assets/jigsaw/scenery/rainy.jpg" },
                { name: "river", url: "/assets/jigsaw/scenery/river.jpg" },
                { name: "sunrise", url: "/assets/jigsaw/scenery/sunrise.jpg" }
            ]
        },
        {
            categoryName: "Birds",
            assets: [
                { name: "bird-1", url: "/assets/jigsaw/birds/bird-1.jpg" },
                { name: "bird-2", url: "/assets/jigsaw/birds/bird-2.jpg" },
                { name: "bird-3", url: "/assets/jigsaw/birds/bird-3.jpg" }
            ]
        },
        {
            categoryName: "Food",
            assets: [
                { name: "food-1", url: "/assets/jigsaw/food/food-1.jpg" },
                { name: "food-2", url: "/assets/jigsaw/food/food-2.jpg" },
                { name: "food-3", url: "/assets/jigsaw/food/food-3.jpg" },
                { name: "food-4", url: "/assets/jigsaw/food/food-4.jpg" }
            ]
        },
        {
            categoryName: "Scenery",
            assets: [
                { name: "figi", url: "/assets/jigsaw/scenery/fiji.jpg" },
                { name: "rainy", url: "/assets/jigsaw/scenery/rainy.jpg" },
                { name: "river", url: "/assets/jigsaw/scenery/river.jpg" },
                { name: "sunrise", url: "/assets/jigsaw/scenery/sunrise.jpg" }
            ]
        }
    ]
};

export const memoryLevels: MemoryLevelsCollection = {
    levels: [
        {
            level: '1',
            difficulty: 'easy',
            rows: 2,
            columns: 2,
            totalElements: 4
        },
        {
            level: '2',
            difficulty: 'easy',
            rows: 2,
            columns: 2,
            totalElements: 4
        },
        {
            level: '3',
            difficulty: 'mid',
            rows: 3,
            columns: 2,
            totalElements: 6
        },
        {
            level: '4',
            difficulty: 'mid',
            rows: 3,
            columns: 2,
            totalElements: 6
        },
        {
            level: '5',
            difficulty: 'mid',
            rows: 4,
            columns: 3,
            totalElements: 12
        },
        {
            level: '6',
            difficulty: 'mid',
            rows: 4,
            columns: 3,
            totalElements: 12
        },
        {
            level: '7',
            difficulty: 'hard',
            rows: 4,
            columns: 3,
            totalElements: 12
        },
        {
            level: '8',
            difficulty: 'hard',
            rows: 4,
            columns: 3,
            totalElements: 12
        },
        {
            level: '9',
            difficulty: 'hard',
            rows: 5,
            columns: 4,
            totalElements: 20
        },
        {
            level: '10',
            difficulty: 'hard',
            rows: 5,
            columns: 4,
            totalElements: 20
        }
    ]
}