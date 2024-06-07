import { useState } from "react";
import { UserData, ResponseData } from "./register";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "../Nav";

interface ApiResponse extends ResponseData {
    token?: string,
}

export default function Login() {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<UserData>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>('');
    function handleChange(e: any) {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };
    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            setError('');
            const response = await fetch('http://localhost:10000/api/v1/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });
            const data: ApiResponse = await response.json();
            if (data.succes) {
                //saving json webtoken
                localStorage.setItem("token",data.token || "");
                navigate("/");
            }
            else {
                setError(data.message);
            }


        } catch (error: any) {
            console.log(error);
            setError('invalid error');
        }
    }
    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <Nav />
                <h1 className="text-center my-2 text-2xl font-bold">Login</h1>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    value={userInfo.email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>

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
                           <p className="text-red-500">{error.length>0 && error} </p> 
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                            <p className="flex justify-between p-2">Don't Have A Account <Link className="underline" to={'/register '}>Register</Link></p>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}
