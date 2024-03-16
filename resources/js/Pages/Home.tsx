import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Recipes } from "@/types/recipes";

export default function Welcome({
    auth,
    recipes,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    recipes: Recipes;
}>) {
    console.log("🚀 ~ recipes:", recipes);
    return (
        <>
            <Head title="Welcome" />

            <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Log in
                        </Link>

                        <Link
                            href={route("register")}
                            className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
            <h1>Welcome to Laravel</h1>
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
                                        <button className="btn btn-primary">
                                            Read more
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <p>Error loading recipes</p>
                )}
            </div>
        </>
    );
}
