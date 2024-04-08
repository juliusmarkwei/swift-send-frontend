"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import SwiftSendLogo from "@/public/SwiftSend with env.png";
import Logout from "@/app/components/Logout";

interface LayoutProps {
    children: ReactNode;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();

    useEffect(() => {
        const checkuserdata = Cookies.get("_se7_wer_") as string;
        if (!checkuserdata) getUserData();
    }, []);

    const handleLogout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        toast.success("Logout successful", { duration: 5000 });
        router.push("/login");
    };

    const pathName = usePathname();
    const _dashboard = /^\/dashboard$/.test(pathName);
    const _contact = pathName.includes("contact");
    const _sms = /^\/dashboard\/sms$/.test(pathName);
    const _sms_logs = pathName.includes("sms-logs");
    const _templates = pathName.includes("templates");

    const accessToken = Cookies.get("access_token");

    const getUserData = async () => {
        const response = await fetch(`${baseUrl}/auth/users/me/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
        });
        if (response.ok) {
            Cookies.set("_se7_wer_", "true");
            const data = await response.json();
            localStorage.setItem("ag63_#6y0", JSON.stringify(data.full_name));
            localStorage.setItem("bty3_35=", JSON.stringify(data.email));
        }
    };

    return (
        <div className="w-full flex h-screen">
            <div className="md:hidden">
                {/* <MobileChatLayout friends={friends} session={session} sidebarOptions={sidebarOptions} unseenRequestCount={unseenRequestCount} /> */}
            </div>
            <div className="hidden md:flex h-full w-full max-w-72 grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                <Link
                    href="/dashboard"
                    className="flex h-16 shrink-0 items-center justify-center w-full pt-8"
                >
                    <Image
                        src={SwiftSendLogo.src}
                        alt="logo"
                        width={250}
                        height={250}
                    />
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
                                <Link
                                    href="/dashboard"
                                    className={`${
                                        _dashboard
                                            ? "bg-orange-500 p-3 text-white"
                                            : ""
                                    }  flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/dashboard/contact"
                                    className={`${
                                        _contact
                                            ? "bg-orange-500 p-3 text-white"
                                            : ""
                                    } flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900`}
                                >
                                    Contacts
                                </Link>
                                <Link
                                    href="/dashboard/sms"
                                    className={`${
                                        _sms
                                            ? "bg-orange-500 p-3 text-white"
                                            : ""
                                    } flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900`}
                                >
                                    SMS
                                </Link>
                                <Link
                                    href="/dashboard/sms-logs"
                                    className={`${
                                        _sms_logs
                                            ? "bg-orange-500 p-3 text-white"
                                            : ""
                                    } flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900`}
                                >
                                    SMS Logs
                                </Link>
                                <Link
                                    href="/dashboard/templates"
                                    className={`${
                                        _templates
                                            ? "bg-orange-500 p-3 text-white"
                                            : ""
                                    } flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900`}
                                >
                                    Templates
                                </Link>
                            </ul>
                        </li>

                        <Logout handleLogout={handleLogout} />
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
