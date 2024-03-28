import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
    return (
        <div className="w-full flex h-screen">
            <div className="md:hidden">
                {/* <MobileChatLayout friends={friends} session={session} sidebarOptions={sidebarOptions} unseenRequestCount={unseenRequestCount} /> */}
            </div>
            <div className="hidden md:flex h-full w-full max-w-72 grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 mr-8">
                <Link
                    href="/dashboard"
                    className="flex h-16 shrink-0 items-center"
                >
                    Logo
                </Link>

                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li role="list">
                            {/* <SidebarChatList sessionId={session.user.id} friends={friends} /> */}
                        </li>
                        <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">
                                Overview
                            </div>

                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                <li>
                                    <Link
                                        href="/dashboard"
                                        className="group-hover:border-indigo-600 group-hover:text-indigo-600 flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900 "
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/contact"
                                        className="flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900 "
                                    >
                                        Contacts
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/sms"
                                        className="flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900 "
                                    >
                                        SMS
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/templates"
                                        className="flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900 "
                                    >
                                        Templates
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="-mx-6 mt-auto flex items-center">
                            <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                                <div className="relative h-8 w-8 ">
                                    <Image
                                        fill
                                        referrerPolicy="no-referrer"
                                        className="rounded-full"
                                        src="https://imgs.search.brave.com/AsI6A-l4zfAgyTpKazw0KEe1yTEfs0I1USKOfWVg-Ew/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzE2MzMy/NS9zY3JlZW5zaG90/cy82Mzg1NTUwL3Rv/cF9waWN0dXJlXzF4/LnBuZz9yZXNpemU9/NDAweDA"
                                        alt="Your profile picture"
                                    />
                                </div>

                                <span className="sr-only">Your profile</span>

                                <div className="flex flex-col">
                                    <span arial-hidden="true">Gustavo</span>
                                    <span
                                        className="text-sx text-zinc-400 w-32 overflow-ellipsis truncate"
                                        arial-hidden="true"
                                    >
                                        iamnetwork23@gmail.com
                                    </span>
                                </div>
                            </div>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 hover:cursor-pointer mr-3"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                                />
                            </svg>
                        </li>
                    </ul>
                </nav>
            </div>

            <aside className="max-h-screen container py-16 md:py-12 w-full">
                {children}
            </aside>
        </div>
    );
};

export default Layout;
