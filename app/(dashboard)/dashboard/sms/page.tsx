import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = () => {
    return (
        <div className="container py-12">
            <h1 className="font-bold text-3xl mb-8"> SMS </h1>

            <div className="flex items-start gap-20 mx-auto w-full">
                <div className="flex items-start gap-6 mb-20 w-full m-5">
                    <div className="flex flex-col gap-5 items-center justify-center w-full">
                        <textarea
                            className="textarea textarea-bordered w-full flex-auto h-40"
                            placeholder="Compose message"
                        ></textarea>
                        <button className="btn btn-primary w-full">
                            Sumbit
                        </button>
                    </div>

                    <div className="flex flex-col justify-center items-center w-full">
                        <select className="select select-bordered w-full mb-5 ">
                            <option disabled selected>
                                Select contacts
                            </option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>

                        <div className="max-w-xl overflow-auto h-24 border rounded-md p-5 flex gap-3">
                            <span className="hover:cursor-pointer p-2 rounded-full bg-gray-700 text-sm text-white">
                                Network
                            </span>
                            <span className="p-2 rounded-full bg-gray-700 text-sm text-white">
                                Network
                            </span>
                            <span className="p-2 rounded-full bg-gray-700 text-sm text-white">
                                Network
                            </span>
                            <span className="p-2 rounded-full bg-gray-700 text-sm text-white">
                                Network
                            </span>
                            <span className="p-2 rounded-full bg-gray-700 text-sm text-white">
                                Network
                            </span>
                            <span className="p-2 rounded-full bg-gray-700 text-sm text-white">
                                Network
                            </span>
                            <span className="p-2 rounded-full bg-gray-700 text-sm text-white">
                                Network
                            </span>
                            <span className="p-2 rounded-full bg-gray-700 text-sm text-white">
                                Network
                            </span>
                            <span className="p-2 rounded-full bg-gray-700 text-sm text-white">
                                Network
                            </span>
                            <span className="p-2 rounded-full bg-gray-700 text-sm text-white">
                                Network
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Content</th>
                                <th>Sent at</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td className="flex items-start gap-4 hover:cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        />
                                    </svg>

                                    <img
                                        className="w-9 h-9 hover:cursor-pointer"
                                        src="https://static.thenounproject.com/png/509072-200.png"
                                        alt=""
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Page;
