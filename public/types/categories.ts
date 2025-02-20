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
