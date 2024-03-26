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
    console.log(recipes);
    return (
        <>
            <Head title="User dashboard" />

            <Header auth={auth} />
            <h1 className="text-3xl font-bold text-center mt-8">
                Welcome to the User Dashboard
            </h1>
            <div className="container mx-auto">
                <p className="text-center mt-4">{auth.user.name}</p>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <div className="flex justify-end">
                                <Link
                                    href={route("user-recipes.create")}
                                    className="btn btn-primary"
                                >
                                    Create Recipe
                                </Link>
                            </div>
                            {/* Render all posts, but first check does the recipes is not undefined or null, and if the array is emppty show no posts, and if they exist just render them */}
                            {recipes ? (
                                recipes.length === 0 ? (
                                    <p>No recipes found</p>
                                ) : (
                                    <RecipeTable recipes={recipes} />
                                )
                            ) : (
                                "Something went wrong"
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const RecipeTable = ({ recipes }: { recipes: Recipes }) => {
    return (
        <form>
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                        <tr key={recipe.id}>
                            <th>{recipe.id}</th>
                            <td>{recipe.name}</td>
                            <td>{recipe.status}</td>
                            <td>
                                <Link
                                    href={route("user-recipes.edit", recipe.id)}
                                    className="btn btn-sm"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
    );
};