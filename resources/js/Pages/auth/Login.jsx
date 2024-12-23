import {Link, router} from "@inertiajs/react";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia"
import axios from "axios";
import useSwal from "@/services/useSwal.js";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {confirmed, accepted} = useSwal()
    async function doLogin(e) {
        e.preventDefault()

        const payload = {
            email: email,
            password: password
        }

        console.log(payload)

        try {
            const res = await axios.post("http://localhost:8000/login", payload)
            console.log(res.data)
            accepted("Selamat datang kembali")
            router.visit("/")
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    }

    return (
        <>
            <head>
                <title>Login</title>
            </head>
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white p-6 rounded-md shadow-md">
                    <form onSubmit={doLogin} className="flex flex-col gap-2">
                        <h3 className="text-center text-2xl font-bold">Login</h3>
                        <label htmlFor="email" className="flex flex-col gap-2">
                            <span className="">Email</span>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" className="w-full px-2 h-9 border-2 rounded-md" id="email" name="email"/>
                        </label>
                        <label htmlFor="password" className="flex flex-col gap-2">
                            <span className="">Password</span>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" className="w-full px-2 h-9 border-2 rounded-md" id="password"
                                   name="password"/>
                        </label>
                        <div className="flex w-full justify-between items-center gap-5 mt-2">
                            <button className="bg-primary text-white px-6 py-1 rounded-md" type="submit">Login</button>
                            <span className="">
                                Belum punya akun?
                            <Link href={"/register"} > <span className="text-primary"> Register </span></Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
