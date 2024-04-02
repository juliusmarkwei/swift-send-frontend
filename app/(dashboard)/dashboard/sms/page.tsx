"use client";

import { FC, SetStateAction, useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface PageProps {}

const Page: FC<PageProps> = () => {
    const [isLoading, setLoading] = useState(false);
    const [_isLoading, _setLoading] = useState(false);
    const [contacts, setContacts] = useState<any>([]);
    const [messageLogs, setMessageLogs] = useState<any>();
    const [editMessageLogs, setEditMessageLogs] = useState<any>({
        message: "",
        messageLogId: null,
    });
    const [chosenContacts, setChosenContacts] = useState<any>([]);
    const [contactList, setContactList] = useState<any>([]);
    const [message, setMessage] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [isQuickSMS, setIsQuickSMS] = useState<boolean>(true);
    const [isBulkSMS, setIsBulkSMS] = useState<boolean>(false);
    const [showTemplates, setShowTemplates] = useState<boolean>(false);
    const [templates, setTemplates] = useState<any>([
        "Hello world",
        "All developers",
        "Security specialist",
        "Exams approaching",
        "Upcoming Election",
    ]);
    const [selectedTemplate, setSelectedTemplate] = useState<any>();
    const [TemplateContacts, setTemplateContacts] = useState<any>([]);
    const [chosenTemplateContacts, setChosenTemplateContacts] = useState<any>(
        []
    );
    const [templateContactList, setTemplateContactList] = useState<any>([]);

    const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        getContacts();
    }, []);

    const handleEditModal = (messageLogContent: any, index: any) => {
        const modal = document.getElementById(
            "my_modal_5"
        ) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }

        setEditMessageLogs({ message: messageLogContent, messageLogId: index });
    };

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

    const handleSelectChange = (event: any) => {
        const option = event.target.value;
        const parsedData = JSON.parse(option);

        // Check if the chosenContacts already includes the selected contact
        const isContactSelected = chosenContacts.some(
            (contact: any) => contact.phone === parsedData.phone
        );

        if (!isContactSelected) {
            // Add the selected contact to chosenContacts
            setChosenContacts((prev: any) => [...prev, parsedData]);
            // Update contactList to include the selected contact
            setContactList((prev: any) => [...prev, parsedData.phone]);
        } else {
            toast.error("Contact already selected", { duration: 5000 });
        }
    };

    const handleSubmit = async () => {
        _setLoading(true);
        try {
            const response = await fetch(`${baseURL}/api/send-message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
                body: JSON.stringify({
                    message,
                    contacts: contactList,
                }),
            });
            if (response.ok) {
                toast.success("Message sent!", { duration: 5000 });
                setMessage("");
                setChosenContacts([]);
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

    // ========================== CHOOSE BETWENN QUCIK OR BULK SMS START ==================================
    const handleQuick = () => {
        setIsQuickSMS(true);
        setIsBulkSMS(false);
    };

    const handleBulk = () => {
        setIsBulkSMS(true);
        setIsQuickSMS(false);
    };
    // ========================== CHOOSE BETWENN QUCIK OR BULK SMS END ==================================

    // ========================================= BULK SMS LOGICS START =================================
    const handleSearchChange = (e: any) => {
        setShowTemplates(true);
        setSearch(e.target.value);
    };

    const filterTemplates = templates
        ? templates.filter((template: any) =>
              template.toLowerCase().includes(search.toLowerCase())
          )
        : ["No matching templates"];

    const _handleSelectChange = (event: any) => {
        const option = event.target.value;
        const parsedData = JSON.parse(option);

        // Check if the chosenContacts already includes the selected contact
        const isContactSelected = chosenContacts.some(
            (contact: any) => contact.phone === parsedData.phone
        );

        if (!isContactSelected) {
            // Add the selected contact to chosenContacts
            setChosenTemplateContacts((prev: any) => [...prev, parsedData]);
            // Update contactList to include the selected contact
            setTemplateContactList((prev: any) => [...prev, parsedData.phone]);
        } else {
            toast.error("Contact already selected", { duration: 5000 });
        }
    };

    const _handleSubmitTemplate = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${baseURL}/api/templates/${templates}/send`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${accessToken}`,
                    },
                }
            );
            if (response.ok) {
                toast.success("Message sent!", { duration: 5000 });
                setMessage("");
                setChosenContacts([]);
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

    const _handleTemplateContactsUpdate = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${baseURL}/api/templates/${templates}/contacts`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${accessToken}`,
                    },
                    body: JSON.stringify({
                        contacts: templateContactList,
                    }),
                }
            );
            if (response.ok) {
                toast.success("Message sent!", { duration: 5000 });
                setMessage("");
                setChosenContacts([]);
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

    // ========================================= BULK SMS LOGICS END =================================

    return (
        <div className="container py-12 px-8">
            <h1 className="font-bold text-3xl mb-8"> SMS </h1>

            <div>
                {/* Tabs for quick or bulk SMS */}
                <div className="flex items-center justify-start gap-5">
                    <div
                        onClick={handleQuick}
                        className={`${
                            isQuickSMS ? "bg-orange-500 text-white" : ""
                        }  hover:cursor-pointer border rounded-md py-2 px-5`}
                    >
                        Quick SMS
                    </div>
                    <div
                        onClick={handleBulk}
                        className={`${
                            isBulkSMS ? "bg-orange-500 text-white" : ""
                        } hover:cursor-pointer border rounded-md py-2 px-5`}
                    >
                        SMS Template
                    </div>
                </div>

                {isQuickSMS && (
                    <div className="flex items-start gap-20 justify-between w-full">
                        <div className="flex items-start gap-6 mb-20 w-full m-5">
                            <div className="flex flex-col gap-5 items-center justify-center w-full">
                                <textarea
                                    className="textarea textarea-bordered w-full flex-auto h-40"
                                    placeholder="Compose message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <button
                                    disabled={isLoading || !message}
                                    onClick={handleSubmit}
                                    className="btn bg-orange-500 w-full text-white"
                                >
                                    {_isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <span className="loading loading-spinner loading-md"></span>
                                        </div>
                                    ) : (
                                        "Sumbit"
                                    )}
                                </button>
                            </div>

                            <div className="flex flex-col justify-center items-center w-full">
                                <select
                                    onChange={handleSelectChange}
                                    className="select select-bordered w-full mb-5 "
                                >
                                    <option disabled selected>
                                        Select contacts
                                    </option>
                                    {contacts &&
                                        contacts.map(
                                            (contact: any, index: number) => {
                                                const contactString =
                                                    JSON.stringify(contact);

                                                return (
                                                    <option
                                                        key={index}
                                                        value={contactString}
                                                    >
                                                        {contact.full_name}
                                                    </option>
                                                );
                                            }
                                        )}
                                </select>

                                <div className="w-[576px] overflow-auto h-15 border rounded-md p-2 flex items-center gap-x-3">
                                    {chosenContacts &&
                                        chosenContacts.map(
                                            (contact: any, index: number) => {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="w-20 text-center hover:cursor-pointer p-2 rounded-md bg-gray-700 text-sm text-white"
                                                    >
                                                        {contact.full_name}
                                                    </span>
                                                );
                                            }
                                        )}
                                    {chosenContacts &&
                                        chosenContacts.length == 0 && (
                                            <span className="p-2 rounded-md bg-orange-500 text-sm text-white">
                                                No contacts
                                            </span>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isBulkSMS && (
                    <div className="flex items-start justify-around gap-5 w-full mx-auto mt-5">
                        <div className="w-full">
                            <div className="relative mb-5">
                                <input
                                    className="outline-none border focus-within:border-orange-500 rounded-md p-3 mb-3 w-full"
                                    type="search"
                                    onChange={handleSearchChange}
                                    value={search}
                                    name="search"
                                    placeholder="Search Templates"
                                />
                                {showTemplates && search.length > 0 && (
                                    <div>
                                        <ul className="p-3 rounded-md space-y-3 h-[40dvh] overflow-auto border bg-white w-full z-40 absolute">
                                            {filterTemplates.map(
                                                (
                                                    template: any,
                                                    index: number
                                                ) => {
                                                    return (
                                                        <li
                                                            onClick={() => {
                                                                setSelectedTemplate(
                                                                    template
                                                                );
                                                                setShowTemplates(
                                                                    false
                                                                );
                                                            }}
                                                            className="hover:cursor-pointer hover:bg-orange-400 hover:text-white p-2 rounded-sm"
                                                            key={index}
                                                        >
                                                            {template}
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                )}

                                {selectedTemplate &&
                                    selectedTemplate.length > 0 && (
                                        <div className="relative flex items-center">
                                            <div
                                                className="bg-orange-500 text-white
                                border rounded-md py-2 px-5 w-full"
                                            >
                                                {selectedTemplate}
                                            </div>
                                            <span
                                                className={`
                                                    absolute right-5 font-bold hover:cursor-pointer text-white`}
                                                onClick={() =>
                                                    setSelectedTemplate([])
                                                }
                                            >
                                                X
                                            </span>
                                        </div>
                                    )}
                            </div>

                            <button
                                onClick={_handleSubmitTemplate}
                                disabled={
                                    isLoading ||
                                    (selectedTemplate &&
                                        selectedTemplate.length === 0) ||
                                    (contactList && contactList.length === 0)
                                }
                                className="btn bg-orange-500 w-full text-white"
                            >
                                Send
                            </button>
                        </div>

                        <div>
                            <div className="flex flex-col justify-center items-center w-full">
                                <select
                                    onChange={_handleSelectChange}
                                    className="select select-bordered w-full mb-5 "
                                >
                                    <option disabled selected>
                                        Select contacts
                                    </option>
                                    {contacts &&
                                        contacts.map(
                                            (contact: any, index: number) => {
                                                const contactString =
                                                    JSON.stringify(contact);

                                                return (
                                                    <option
                                                        key={index}
                                                        value={contactString}
                                                    >
                                                        {contact.full_name}
                                                    </option>
                                                );
                                            }
                                        )}
                                </select>

                                <div className="w-[576px] overflow-auto h-15 border rounded-md p-2 flex items-center gap-x-3 mb-5">
                                    {chosenTemplateContacts &&
                                        chosenTemplateContacts.map(
                                            (contact: any, index: number) => {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="w-20 text-center hover:cursor-pointer p-2 rounded-md bg-orange-500 text-sm text-white"
                                                    >
                                                        {contact.full_name}
                                                    </span>
                                                );
                                            }
                                        )}
                                    {chosenTemplateContacts &&
                                        chosenTemplateContacts.length == 0 && (
                                            <span className="p-2 rounded-md bg-orange-500 text-sm text-white">
                                                No contacts
                                            </span>
                                        )}
                                </div>

                                <button
                                    onClick={_handleTemplateContactsUpdate}
                                    disabled={
                                        isLoading ||
                                        (contactList &&
                                            contactList.length === 0)
                                    }
                                    className="btn bg-orange-500 w-full text-white"
                                >
                                    Update Contact List
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
