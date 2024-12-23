import {FaPlaneDeparture} from "react-icons/fa";
import {FaShoppingCart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

import {Link, router} from "@inertiajs/react";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import useSwal from "@/services/useSwal.js";


export default function Navbar() {
    const [toggle, setToggle] = useState(false)
    const {confirmed, accepted} = useSwal()

    async function doLogout() {
        try {
            const res = await confirmed("Mau logout?")

            if (res.isConfirmed) {
            await axios.post("http://localhost:8000/logout")
                accepted("Logout berhasil")
            router.visit("/")
            }
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <nav className="bg-light px-6 pt-5 pb-1 px-20">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                <Link href={"/"} className="bg-primary h-12 w-12 rounded-md flex items-center justify-center">
                    <FaPlaneDeparture className="w-5 h-5 text-white"/>
                </Link>
                    <Link href={"/"} className="font-bold">MariWisata</Link>
                    <Link href={"/about"} className="font-bold">About</Link>
                </div>
                <div className="flex gap-12 items-center">
                    <Link href={"/keranjang"}>
                    <FaShoppingCart className="w-5 h-5"/>
                    </Link>
                    <Link href={"/search"}>
                    <FaMagnifyingGlass className="w-5 h-5"/>
                    </Link>
                    <div className="relative">
                    <img onClick={() => setToggle((toggle) => !toggle)} src="https://api.dicebear.com/9.x/notionists/svg?seed=Felix" alt=""
                         className="w-8 h-8 rounded-full"/>
                        {toggle ? <div className="absolute w-32 h-12 bg-white rounded-md right-1 top-12">
                            <button onClick={() => doLogout()} className="w-full h-full">Logout</button>
                        </div> : <></>}
                    </div>
                </div>
            </div>
        </nav>
    )
}
