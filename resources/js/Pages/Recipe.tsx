import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Header from "@/Components/Header";

type Recipe = {
    id: number;
    name: string;
    description: string;
    ingredients: string;
    steps: string;
    image: string;
    user_id: number;
    created_at: string;
    updated_at: string;
};

export default function Welcome({
    auth,
    recipe,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    recipe: Recipe;
}>) {
    return (
        <>
            <Head title="Welcome" />

            <Header auth={auth} />
            <div className="container mx-auto">
                <h1>Recipe title: <b>{recipe.name}</b></h1>
                <p>Recipe description: {recipe.description}</p>
            </div>
        </>
    );
}
