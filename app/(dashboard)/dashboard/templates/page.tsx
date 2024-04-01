"use client";

import { FC, SetStateAction, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface PageProps {}

const Page: FC<PageProps> = () => {
    const [name, setName] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [templates, setTemplates] = useState<any>();

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    const access_token = Cookies.get("access_token");

    useEffect(() => {
        getTemplates();
    }, []);

    const handleSelectChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        const option = event.target.value;
        setSelectedOption(event.target.value);
        handleAddField(option);
    };

    const handleTextareaChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setContent(event.target.value);
    };

    const handleAddField = (option: any) => {
        setContent(content + option);
    };

    const getTemplates = async () => {
        setIsLoading(true);
        try {
            setIsLoading(true);
            const response = await fetch(`${baseUrl}/api/templates`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${access_token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setTemplates(data);
                setIsLoading(false);
            } else {
                const data = await response.json();
                toast.error(data.detail, { duration: 5000 });
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${baseUrl}/api/templates`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${access_token}`,
                },
                body: JSON.stringify({ name, content }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setTemplates((prev: any) => [...prev, responseData]);
                setContent("");
                setName("");
                toast.success("Template saved successfully", {
                    duration: 5000,
                });
                setIsLoading(false);
            } else {
                const errorResponse = await response.json();
                toast.error(errorResponse.message, { duration: 5000 });
            }
        } catch (error) {
            toast.error("An error occurred", { duration: 5000 });
            setIsLoading(false);
            console.error("An error occurred", error);
        } finally {
            setIsLoading(false);
        }
    };

    const disableBtn = () => name === "" || content === "";

    return (
        <div className="container py-12 px-8">
            <h1 className="font-bold text-3xl mb-8"> Templates </h1>

            <div className="flex items-start gap-20 mr-8">
                <div className="flex flex-col gap-6">
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="grow"
                            placeholder="Template Name"
                        />
                    </label>

                    <select
                        className="select select-bordered w-full"
                        onChange={handleSelectChange}
                    >
                        <option disabled selected>
                            Add fields
                        </option>
                        <option value="<full_name>">Full Name</option>
                        <option value="<phone>">Phone</option>
                        <option value="<email>">Email</option>
                        <option value="<info>">Info</option>
                    </select>

                    <textarea
                        className="textarea textarea-bordered w-full flex-auto h-40"
                        placeholder="Message body"
                        value={content}
                        onChange={handleTextareaChange}
                    ></textarea>

                    <button
                        disabled={isLoading || disableBtn()}
                        onClick={handleSubmit}
                        className="btn bg-orange-500 text-white"
                    >
                        Save
                    </button>
                </div>

                <div className="w-full">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Template Name</th>
                                    <th>Content</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {templates &&
                                    templates.map(
                                        (template: any, index: number) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <th>{index + 1}</th>
                                                        <td>
                                                            {template.name
                                                                .length > 20
                                                                ? template.name.substring(
                                                                      0,
                                                                      15
                                                                  ) + "..."
                                                                : template.name}
                                                        </td>
                                                        <td>
                                                            {template.content
                                                                .length > 50
                                                                ? template.content.substring(
                                                                      0,
                                                                      40
                                                                  ) + "..."
                                                                : template.content}
                                                        </td>
                                                        <td className="flex items-center gap-4 hover:cursor-pointer">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                                />
                                                            </svg>

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="red"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                                />
                                                            </svg>
                                                        </td>
                                                    </tr>
                                                </>
                                            );
                                        }
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
