import { User } from "./index";

export type Recipe = {
    id: number;
    name: string;
    description: string;
    image: string;
    status: string;
    user: User;
};

export type Recipes = {
    current_page: number;
    data: Recipe[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
