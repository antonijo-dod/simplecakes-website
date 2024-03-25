import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Recipes } from "@/types/recipes";
import { useForm, router } from "@inertiajs/react";

export default function Dashboard({
    auth,
    recipes,
}: PageProps & { recipes: Recipes }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Recipes
                </h2>
            }
        >
            <Head title="Recipes" />

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
        </AuthenticatedLayout>
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
                        <th>Author</th>
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
                            <td>{recipe.user.name}</td>
                            <td>{recipe.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
    );
};
