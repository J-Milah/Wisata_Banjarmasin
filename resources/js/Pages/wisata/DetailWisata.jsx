import Navbar from "@/Pages/components/Navbar.jsx";
import {useState} from "react";
import { FaPlus, FaMinus  } from "react-icons/fa6";
import {FaShoppingCart} from "react-icons/fa";
import {Inertia} from "@inertiajs/inertia";
import {router, usePage} from "@inertiajs/react";
import useSwal from "@/services/useSwal.js";

export default function Home({wisata}) {

    const parsePageId = (path) => path.substring(path.lastIndexOf('/') + 1)
    const [pcs, setPcs] = useState(1)
    const url = "http://localhost:8000/storage/"
    const {confirmed, accepted} = useSwal()


    async function storeTiket() {

        try {
            const res = await confirmed("Tambah tiket ke keranjang?")

            if (res.isConfirmed) {
                console.log(parsePageId(window.location.pathname))

                const payload = {
                    total_tiket: pcs,
                    total_harga: wisata.harga * pcs
                }

                console.log(payload)
                Inertia.post(`/tiket/${parsePageId(window.location.pathname)}`, payload)

                accepted("Tiket berhasil ditambahkan")
                router.visit("/keranjang")
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="bg-lightmode">
            <div className="flex justify-between flex-col min-h-screen">
                <div className="">
                    <Navbar />
                    <main className="mt-5 mx-6">
                        <div className="flex gap-12">
                            <div className="w-[39rem] h-[34rem] ">
                                <img src={url + wisata.foto}
                                     alt="" className="w-full h-full"/>
                            </div>
                            <div className="flex flex-col mt-4 gap-2">
                                <h3 className="font-bold text-3xl">{wisata.nama}</h3>
                                <p className="font-bold text-2xl text-green-600">{new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "idr",
                                }).format(wisata.harga * pcs)}</p>
                                <p className="w-[56rem] text-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur delectus deleniti dicta expedita facere laudantium magni odio possimus, quaerat qui quo recusandae rem rerum sed sit vel voluptas voluptate.
                                </p>
                                <div className="flex gap-12">
                                    <div className="flex items-center gap-5">
                                        <button onClick={() => setPcs((pcs) => pcs - 1)} className="">
                                        <FaMinus className="w-5 h-5" />
                                        </button>
                                        {pcs}
                                        <button onClick={() => setPcs((pcs) => pcs + 1)} className="">
                                        <FaPlus className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <button onClick={() => storeTiket(wisata.id)} className="px-12 py-2 bg-primary rounded-md text-white">
                                        <span className="flex items-center gap-5">
                                            <FaShoppingCart className="w-5 h-5" />
                                        Tambah Keranjang
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
