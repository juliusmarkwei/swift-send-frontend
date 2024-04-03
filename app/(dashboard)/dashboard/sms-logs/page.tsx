"use client";

import { FC, useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface PaegeProps {}

const Page = () => {
    const [isLoading, setLoading] = useState(false);
    const [_isLoading, _setLoading] = useState(false);
    const [messageLogs, setMessageLogs] = useState<any>();
    const [editMessageLogs, setEditMessageLogs] = useState<any>({
        message: "",
        messageLogId: null,
    });

    const [messageLogDetail, setMessageLogDetail] = useState<any>();

    const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        getMessageLogs();
    }, []);

    const handleDisplayRecipientModal = (messageLogId: any) => {
        const modal = document.getElementById(
            "my_modal_5_contact"
        ) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
        getMessageLogDetail(messageLogId);
    };

    const getMessageLogDetail = async (messageLogId: any) => {
        try {
            _setLoading(true);
            const response = await fetch(
                `${baseURL}/api/message-logs/${messageLogId}`,
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
                setMessageLogDetail(data);
                _setLoading(false);
            } else {
                const data = await response.json();
                toast.error("An error occured", { duration: 5000 });
                _setLoading(false);
            }
        } catch (error) {
            console.log(error);
            _setLoading(false);
        }
    };

    const handleOnChange = (e: any) => {
        setEditMessageLogs((prev: any) => ({
            ...prev,
            message: e.target.value,
        }));
    };

    const getMessageLogs = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${baseURL}/api/message-logs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setMessageLogs(data);
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

    const handleResend = async (messageId: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${baseURL}/api/message-logs/${messageId}/resend`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${accessToken}`,
                    },
                }
            );
            if (response.ok) {
                toast.success("Message sent! 😊", { duration: 5000 });
                getMessageLogs();
                setLoading(false);
            } else {
                const data = await response.json();
                toast.error(data.message, { duration: 5000 });
                setLoading(false);
            }
        } catch (error) {
            console.log("An error occured");
            setLoading(false);
        }
    };

    const handleEdit = async (editedMessageLog: string, messageId: number) => {
        try {
            setLoading(true);
            const response = await fetch(
                `${baseURL}/api/message-logs/${messageId}/edit-resend`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${accessToken}`,
                    },
                    body: JSON.stringify({
                        content: editedMessageLog,
                    }),
                }
            );
            if (response.ok) {
                toast.success("Message resent! ↩️", { duration: 5000 });
                getMessageLogs();
                setLoading(false);
            } else {
                const data = await response.json();
                toast.error(data.message, { duration: 5000 });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleEditModal = (messageLogContent: any, index: number) => {
        const modal = document.getElementById(
            "my_modal_5"
        ) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }

        setEditMessageLogs({ message: messageLogContent, messageLogId: index });
    };

    return (
        <div className="container py-12 px-8">
            <h1 className="font-bold text-3xl mb-8"> SMS Logs </h1>

            {/* MESSAGE LOGS TABLE */}
            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Message</th>
                                <th>Sent at</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {messageLogs && messageLogs.length > 0
                                ? messageLogs.map(
                                      (messageLog: any, index: number) => {
                                          return (
                                              <tr
                                                  className="hover:cursor-pointer"
                                                  onClick={() =>
                                                      handleDisplayRecipientModal(
                                                          messageLog.id
                                                      )
                                                  }
                                              >
                                                  <th>{index + 1}</th>
                                                  <td>{messageLog.content}</td>
                                                  <td>
                                                      {new Date(
                                                          messageLog.sent_at
                                                      ).toLocaleDateString()}
                                                  </td>
                                                  <td className="flex items-start gap-4 hover:cursor-pointer">
                                                      <svg
                                                          onClick={() => {
                                                              handleEditModal(
                                                                  messageLog.content,
                                                                  messageLog.id
                                                              );
                                                          }}
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
                                                          onClick={() =>
                                                              handleResend(
                                                                  messageLog.id
                                                              )
                                                          }
                                                          className="w-9 h-9 hover:cursor-pointer"
                                                          src="https://static.thenounproject.com/png/509072-200.png"
                                                          alt=""
                                                      />
                                                  </td>
                                              </tr>
                                          );
                                      }
                                  )
                                : ""}
                        </tbody>
                    </table>
                </div>
                <div>
                    <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <div className="modal-box">
                            <div className="py-4">
                                <div className="flex flex-col gap-6">
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                                            />
                                        </svg>

                                        <input
                                            type="text"
                                            className="grow"
                                            placeholder="Full Name"
                                            name="fullName"
                                            value={editMessageLogs.message}
                                            onChange={handleOnChange}
                                        />
                                    </label>

                                    <button
                                        disabled={isLoading}
                                        onClick={() =>
                                            handleEdit(
                                                editMessageLogs.message,
                                                editMessageLogs.messageLogId
                                            )
                                        }
                                        className="btn btn-primary"
                                    >
                                        Send
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
                        id="my_modal_5_contact"
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <div className="modal-box">
                            <div className="py-4">
                                <div className="flex flex-col gap-6">
                                    <main>
                                        <div className="overflow-x-auto">
                                            <table className="table table-zebra">
                                                {/* head */}
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Full Name</th>
                                                        <th>Status</th>
                                                        <th>Phone</th>
                                                    </tr>
                                                </thead>

                                                {messageLogDetail &&
                                                    messageLogDetail.recipients.map(
                                                        (
                                                            recipients: any,
                                                            index: number
                                                        ) => {
                                                            return (
                                                                <tbody>
                                                                    <tr>
                                                                        {_isLoading ? (
                                                                            <span className="flex justify-center items-center loading loading-spinner loading-md"></span>
                                                                        ) : (
                                                                            <>
                                                                                <th>
                                                                                    {index +
                                                                                        1}
                                                                                </th>
                                                                                <td>
                                                                                    {recipients.contact_info &&
                                                                                    recipients.contact_info !=
                                                                                        null
                                                                                        ? recipients
                                                                                              .contact_info
                                                                                              .full_name
                                                                                        : "Empty"}
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        recipients.status
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {recipients.contact_info &&
                                                                                    recipients.contact_info !=
                                                                                        null
                                                                                        ? recipients
                                                                                              .contact_info
                                                                                              .phone
                                                                                        : "Empty"}
                                                                                </td>
                                                                            </>
                                                                        )}
                                                                    </tr>
                                                                </tbody>
                                                            );
                                                        }
                                                    )}
                                            </table>
                                        </div>
                                    </main>
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
            </div>
        </div>
    );
};

export default Page;
