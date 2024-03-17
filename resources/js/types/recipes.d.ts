import { User } from "./index";

export type Recipe = {
    id: number;
    name: string;
    description: string;
    image: string;
    status: string;
    user: User;
};

export type Recipes = Recipe[];
