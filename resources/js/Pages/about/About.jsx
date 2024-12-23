import {FaMinus, FaPlus} from "react-icons/fa6";
import Navbar from "@/Pages/components/Navbar.jsx";
import Footer from "@/Pages/components/Footer.jsx";
import {LuPlaneTakeoff} from "react-icons/lu";

export default function About({data}) {
    console.log(data)
    const url = "http://localhost:8000/storage/"

    return (
        <>
            <head>
                <title>Team</title>
            </head>
            <div className="bg-lightmode">
                <div className="flex justify-between flex-col min-h-screen">
                    <div className="mx-6">
                        <Navbar/>
                        <main className="flex flex-col justify-center items-center p-6 px-20 mt-12">
                            <h3 className="text-center font-bold text-2xl">Team</h3>
                            <div className="grid grid-cols-2 mt-12 gap-12">
                                {data.map((data, index) => (
                            <div key={index} className="p-6 bg-primary rounded-md shadow-md ">
                                <div className="flex flex-col gap-5 items-center justify-center">
                                        <img src={url + data.foto} alt="" className="w-20 h-20 rounded-full"/>
                                    <h3 className="font-bold text-white text-xl">{data.nama}</h3>
                                    <p className="text-gray-300">{data.deskripsi}</p>
                                </div>
                            </div>
                                ))}
                            </div>
                        </main>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    )
}
