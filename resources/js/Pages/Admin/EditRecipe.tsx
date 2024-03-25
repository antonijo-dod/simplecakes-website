import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Recipe } from "@/types/recipes";
import { useForm } from "@inertiajs/react";

export default function EditRecipe({
    auth,
    recipe,
}: PageProps & { recipe: Recipe }) {
    const { data, setData, patch, errors } = useForm({
        name: recipe.name,
        status: recipe.status,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route("adminRecipes.update", recipe.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit recipe
                </h2>
            }
        >
            <Head title="New Recipe" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        {/* Create a daisy UI form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-8 divide-y divide-gray-200"
                        >
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">
                                        Recipe name
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full max-w-xs"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Status</span>
                                </div>
                                <select
                                    className="select select-bordered"
                                    defaultValue={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </label>
                            {errors.name && (
                                <p className="text-red-600">{errors.name}</p>
                            )}
                            <button className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
