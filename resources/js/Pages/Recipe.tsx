import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Recipes } from "@/types/recipes";
import Header from "@/Components/Header";

export default function Welcome({
    auth,
    recipes,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    recipes: Recipes;
}>) {
    return (
        <>
            <Head title="Welcome" />

            <Header auth={auth} />
            <div className="container mx-auto">
                <h1>Recipe single</h1>
            </div>
        </>
    );
}
