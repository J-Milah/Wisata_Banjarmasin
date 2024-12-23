import {Link, router } from "@inertiajs/react";
import {useState} from "react";
import useSwal from "@/services/useSwal.js";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const {confirmed, accepted} = useSwal()
    async function doRegister(e) {
        e.preventDefault()

        const payload = {
            email: email,
            password: password,
            name: name
        }

        console.log(payload)
        try {
            const res = await axios.post("http://localhost:8000/register", payload)
            console.log(res.data)
            router.post("/register", payload)
            accepted("Register berhasil")
            router.visit("/login")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <head>
                <title>Register</title>
            </head>
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white p-6 rounded-md shadow-md">
                    <form onSubmit={doRegister} className="flex flex-col gap-2">
                        <h3 className="text-center text-2xl font-bold">Register</h3>
                        <label htmlFor="email" className="flex flex-col gap-2">
                            <span className="">Email</span>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" className="w-full px-2 h-9 border-2 rounded-md" id="email" name="email"/>
                        </label>
                        <label htmlFor="nama" className="flex flex-col gap-2">
                            <span className="">Nama</span>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text" className="w-full px-2 h-9 border-2 rounded-md" id="nama" name="nama"/>
                        </label>
                        <label htmlFor="password" className="flex flex-col gap-2">
                            <span className="">Password</span>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" className="w-full px-2 h-9 border-2 rounded-md" id="password"
                                   name="password"/>
                        </label>
                        <div className="flex w-full justify-between items-center gap-5 mt-2">
                            <button className="bg-primary text-white px-6 py-1 rounded-md" type="submit">Register
                            </button>
                            <span className="">
                                Sudah punya akun?
                            <Link href={"/login"}> <span className="text-primary"> Login </span></Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
