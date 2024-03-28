import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = () => {
    return (
        <div className="container py-12">
            <h1 className="font-bold text-3xl mb-8"> Templates </h1>
            <div className="flex flex-col gap-6 mr-8">
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                    >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Template Name"
                    />
                </label>

                <select className="select select-bordered w-full ">
                    <option disabled selected>
                        Add fields
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>

                <textarea
                    className="textarea textarea-bordered w-full flex-auto h-40"
                    placeholder="Message body"
                ></textarea>

                <button className="btn btn-primary">Save</button>
            </div>
        </div>
    );
};

export default Page;
