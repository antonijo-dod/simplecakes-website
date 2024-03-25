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
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                        <tr key={recipe.id}>
                            <th>{recipe.id}</th>
                            <td>
                                <Link
                                    className="link "
                                    href={route("adminRecipes.edit", recipe.id)}
                                >
                                    {recipe.name}
                                </Link>
                            </td>
                            <td>{recipe.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
    );
};