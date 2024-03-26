import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Recipes } from "@/types/recipes";
import Header from "@/Components/Header";
import { useForm } from "@inertiajs/react";

export default function Welcome({
    auth,
    recipes,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    recipes: Recipes;
}>) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        ingredients: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("user-recipes.store"), { onSuccess: () => reset() });
    };
    
    return (
        <>
            <Head title="User dashboard" />

            <Header auth={auth} />

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
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </label>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
           
        </>
    );
}
