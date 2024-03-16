import { Link, Head } from "@inertiajs/react";
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
            <Head title="User dashboard" />

            <Header auth={auth} />
            <h1 className="text-3xl font-bold text-center mt-8">
                Welcome to the User Dashboard
            </h1>
        </>
    );
}
