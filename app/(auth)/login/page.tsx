"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const Login = () => {
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const route = useRouter();

    const handleonChange = (e: { target: { name: any; value: any } }) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const disableBtn = () => {
        return formData.username === "" || formData.password === "";
    };

    const handleLogin = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
        try {
            setLoading(true);
            const response = await fetch(`${baseURL}/auth/jwt/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                Cookies.set("access_token", data.access);
                Cookies.set("refresh_token", data.refresh);
                toast.success("Login successful", { duration: 5000 });
                route.push("/dashboard");
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
        <main className="login-container">
            <div className="loginBox">
                <h1 className="loginHeader">Sign in to SWIFT SEND</h1>
                <form className="loginForm">
                    <input
                        required
                        type="text"
                        name="username"
                        className="loginUsernameField"
                        placeholder="Username"
                        defaultValue={formData.username}
                        onChange={handleonChange}
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        className="loginPasswordField"
                        placeholder="Password"
                        defaultValue={formData.password}
                        onChange={handleonChange}
                    />

                    <h4 className="forgotPassword">
                        <Link href="/reset-password">
                            Forgot your password?
                        </Link>
                    </h4>

                    <button
                        disabled={disableBtn() || isLoading}
                        onClick={handleLogin}
                        type="submit"
                        className={`signInButton-Loginpage ${
                            isLoading
                                ? "hover:cursor-not-allowed bg-[#e2ae65]"
                                : ""
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        ) : (
                            "SIGN IN"
                        )}
                    </button>
                </form>
            </div>

            <div className="login-signUpBox">
                <main>
                    <h1 className="helloText">Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>

                    <button
                        onClick={() => route.push("/signup")}
                        disabled={isLoading}
                        className="signUpButton-Loginpage"
                    >
                        SIGN UP
                    </button>
                </main>
            </div>
        </main>
    );
};

export default Login;
