"use client";

import { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Fascinate } from "next/font/google";

interface ContactProps {}

const Page: FC<ContactProps> = () => {
    const [isLoading, setLoading] = useState(false);
    const [_isLoading, _setLoading] = useState(false);
    const [__isLoading, __setLoading] = useState(false);
    const [contacts, setContacts] = useState<any>([]);
    const [editContactData, setEditContactData] = useState<any>();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        info: "",
    });

    const [contactInfo, setContactInfo] = useState<any>();
    // const [contactData, setContactData] = useState<any>();

    const handleOnChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const _handleOnChange = (e: any) => {
        setEditContactData({
            ...editContactData,
            [e.target.name]: e.target.value,
        });
    };

    const disableBtn = () => {
        return (
            formData.fullName === "" ||
            formData.email === "" ||
            formData.mobile === "" ||
            formData.info === ""
        );
    };
    const _disableBtn = () => {
        return (
            editContactData?.fullName === "" ||
            editContactData?.email === "" ||
            editContactData?.mobile === "" ||
            editContactData?.info === ""
        );
    };

    const handleDisplayContactInfotModal = (contactFullName: string) => {
        const modal = document.getElementById(
            "my_modal_5_contact_info"
        ) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
        getContactInfo(contactFullName);
    };

    const handleEditModal = (contact: any) => {
        const modal = document.getElementById(
            "my_modal_5"
        ) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
        setEditContactData({
            fullName: contact.full_name,
            mobile: contact.phone,
            info: contact.info,
            email: contact.email,
        });
    };

    const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    const accessToken = Cookies.get("access_token");

    const getContactInfo = async (fullName: string) => {
        __setLoading(true);
        setContactInfo(null);
        try {
            const response = await fetch(
                `${baseURL}/api/contacts/${fullName}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${accessToken}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setContactInfo(data);
                __setLoading(false);
            } else {
                const data = await response.json();
                toast.error(data.message, { duration: 5000 });
                __setLoading(false);
            }
        } catch (error) {
            console.log(error);
            __setLoading(false);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const interPhone = `+233${formData.mobile.slice(1)}`;
        try {
            _setLoading(true);
            const response = await fetch(`${baseURL}/api/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
                body: JSON.stringify({
                    full_name: formData.fullName,
                    email: formData.email,
                    info: formData.info,
                    phone: interPhone,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setContacts((prev: any) => [...prev, data]);
                // getContacts();
                setFormData({
                    fullName: "",
                    email: "",
                    mobile: "",
                    info: "",
                });
                toast.success("Contact saved successfully", { duration: 5000 });
                _setLoading(false);
            } else {
                const data = await response.json();
                toast.error(data.detail, { duration: 5000 });
                _setLoading(false);
            }
        } catch (error) {
            console.log(error);
            _setLoading(false);
        }
    };

    const deleteContact = async (fullName: string) => {
        try {
            setLoading(true);
            const response = await fetch(
                `${baseURL}/api/contacts/${fullName}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${accessToken}`,
                    },
                }
            );
            if (response.ok) {
                getContacts();
                setFormData({
                    fullName: "",
                    email: "",
                    mobile: "",
                    info: "",
                });
                setLoading(false);
                toast.success("Contact deleted successfully", {
                    duration: 4500,
                });
            } else {
                const data = await response.json();
                toast.error(data.detail, { duration: 5000 });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = async () => {
        setLoading(true);
        try {
            setLoading(true);
            const response = await fetch(`${baseURL}/api/contacts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setContacts(data);
                setLoading(false);
            } else {
                const data = await response.json();
                toast.error(data.detail, { duration: 5000 });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleEdit = async (e: any, fullName: string) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(
                `${baseURL}/api/contacts/${fullName}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${accessToken}`,
                    },
                    body: JSON.stringify({
                        full_name: editContactData.fullName,
                        email: editContactData.email,
                        info: editContactData.info,
                        phone: editContactData.mobile,
                    }),
                }
            );
            if (response.ok) {
                getContacts();
                toast.success("Contact updated successfully", {
                    duration: 5000,
                });
                setLoading(false);
            } else {
                const data = await response.json();
                toast.error(data.detail, { duration: 5000 });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="container py-12 px-8">
            <h1 className="font-bold text-3xl mb-8"> Contacts </h1>

            <div className="flex items-start gap-20">
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
                            type="text"
                            className="grow"
                            placeholder="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleOnChange}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            type="text"
                            className="grow"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleOnChange}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                            />
                        </svg>

                        <input
                            type="text"
                            className="grow"
                            placeholder="Mobile Number"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleOnChange}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                            />
                        </svg>

                        <input
                            type="text"
                            className="grow"
                            placeholder="Info"
                            name="info"
                            value={formData.info}
                            onChange={handleOnChange}
                        />
                    </label>

                    <button
                        disabled={disableBtn() || _isLoading}
                        onClick={handleSubmit}
                        className="btn bg-orange-500 text-white"
                    >
                        {_isLoading ? (
                            <div className="flex items-center justify-center">
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        ) : (
                            "Create"
                        )}
                    </button>
                </div>

                <div className="w-full">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Full Name</th>
                                    <th>Mobile</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading ? (
                                    <span className="loading loading-dots loading-lg"></span>
                                ) : (
                                    contacts &&
                                    contacts.map(
                                        (contact: any, index: number) => {
                                            return (
                                                <>
                                                    <tr
                                                        key={index}
                                                        className="cursor-pointer hover:bg-orange-200"
                                                        onClick={() =>
                                                            handleDisplayContactInfotModal(
                                                                contact.full_name
                                                            )
                                                        }
                                                    >
                                                        <th>{index + 1}</th>
                                                        <td>
                                                            {contact.full_name}
                                                        </td>
                                                        <td>{contact.phone}</td>
                                                        <td className="flex items-center gap-4 hover:cursor-pointer">
                                                            <svg
                                                                onClick={() => {
                                                                    handleEditModal(
                                                                        contact
                                                                    );
                                                                }}
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
                                                                onClick={() =>
                                                                    deleteContact(
                                                                        contact.full_name
                                                                    )
                                                                }
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
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        {editContactData && editContactData.fullName}
                    </h3>
                    <div className="py-4">
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
                                    type="text"
                                    className="grow"
                                    placeholder="Full Name"
                                    name="fullName"
                                    value={editContactData?.fullName}
                                    onChange={_handleOnChange}
                                />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Email"
                                    name="email"
                                    value={editContactData?.email}
                                    onChange={_handleOnChange}
                                />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                                    />
                                </svg>

                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Mobile Number"
                                    name="mobile"
                                    value={editContactData?.mobile}
                                    onChange={_handleOnChange}
                                />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                                    />
                                </svg>

                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Info"
                                    name="info"
                                    value={editContactData?.info}
                                    onChange={_handleOnChange}
                                />
                            </label>

                            <button
                                disabled={_disableBtn() || isLoading}
                                onClick={(e) =>
                                    handleEdit(e, editContactData.fullName)
                                }
                                className="btn bg-orange-500 text-white"
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner loading-md"></span>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog
                id="my_modal_5_contact_info"
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <div className="py-4">
                        <div className="flex flex-col gap-6">
                            <label className="flex items-center gap-2">
                                <div className="overflow-x-auto">
                                    <h3 className="w-full text-center">
                                        Contact Information
                                    </h3>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Full Name</th>
                                                <td>
                                                    {contactInfo?.full_name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{contactInfo?.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone</th>
                                                <td>{contactInfo?.phone}</td>
                                            </tr>
                                            <tr>
                                                <th>Info</th>
                                                <td>{contactInfo?.info}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Page;
