import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Nav";


export interface UserData {
    email: string,
    password: string,
    passwordConfirm?: "",
}

export interface ResponseData {
    succes: boolean,
    message: string,
    payload: string,
}

export default function Register() {
    const navigation = useNavigate();
    const [userInfo, setUserInfo] = useState<UserData>({
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [error, setError] = useState<string>("");
    function handleChange(e: any) {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e: any) {
        //preventing default aciton of form
        e.preventDefault();
        if (userInfo.email && userInfo.password && userInfo.passwordConfirm) {
            if (userInfo.password === userInfo.passwordConfirm) {
                try {
                    setError("");
                    const response = await fetch("http://localhost:10000/api/v1/auth/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: userInfo.email, password: userInfo.password }),
                    });
                    const data: ResponseData = await response.json();
                    if (data.succes) {
                        navigation('/login')
                    }
                    else {
                        setError(data.message);
                    }
                } catch (error) {
                    console.log('error');
                }
            }
            else {
                setError("Password does not match")
            }

        }
        else {
            setError("All Fields Required");
        }

    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <h1 className="text-center my-2 text-2xl font-bold">Register</h1>
                <Nav/>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={userInfo.email}
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    value={userInfo.password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password Confirm
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="password"
                                    value={userInfo.passwordConfirm}
                                    name="passwordConfirm"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <p className="text-red-500">{error.length > 0 && error}</p>

                        <div>
                            <button

                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                            <p className="flex justify-between p-3">Already Have A account <Link className="underline" to={'/login'}>login</Link></p>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}
