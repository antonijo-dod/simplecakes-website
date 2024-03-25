import { Head, Link } from "@inertiajs/react";
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
                <div className="grid grid-cols-3 gap-4 mt-16">
                    {recipes ? (
                        recipes.length === 0 ? (
                            <p>No recipes found</p>
                        ) : (
                            recipes.map((recipe) => (
                                <div
                                    className="card w-96 bg-base-100 shadow-xl"
                                    key={recipe.id}
                                >
                                    <figure>
                                        <img
                                            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                            alt="Shoes"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {recipe.name}
                                        </h2>
                                        <p>{recipe.description}</p>
                                        <div className="card-actions justify-end">
                                            <Link
                                                className="link "
                                                href={route("recipes.show", recipe.slug)}
                                            >
                                                Read more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    ) : (
                        <p>Error loading recipes</p>
                    )}
                </div>
            </div>
        </>
    );
}
