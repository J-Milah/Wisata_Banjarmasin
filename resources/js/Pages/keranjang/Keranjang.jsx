import {FaMinus, FaPlus} from "react-icons/fa6";
import {FaShoppingCart, FaRegTrashAlt} from "react-icons/fa";
import Navbar from "@/Pages/components/Navbar.jsx";
import Footer from "@/Pages/components/Footer.jsx";
import {router} from "@inertiajs/react";
import useSwal from "@/services/useSwal.js";

export default function Keranjang({tiket}) {
    const url = "http://localhost:8000/storage/"
    const {confirmed, accepted} = useSwal()

    console.log(tiket)

    const totalHargaSum = tiket.reduce((sum, item) => sum + item.total_harga, 0);

    console.log(totalHargaSum)

    const nomorWhatsApp = "6283140220118"

    function checkout(pesan) {
        const url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
        window.open(url, '_blank');
        router.visit("/keranjang")
    }

    async function destroy(id) {
       try {
           const res = await confirmed("Hapus pesanan?")
           if (res.isConfirmed) {
               const res =  await axios.delete(`http://localhost:8000/tiket/${id}`)
               accepted("Pesanan telah dihapus")
               router.visit("/keranjang")
               console.log(res.data)
           }
       } catch (e) {
           console.log(e)
       }
    }

    return (
        <>
            <head>
                <title>Keranjang</title>
            </head>
            <div className="bg-lightmode">
                <div className="flex justify-between flex-col min-h-screen">
                    <div className="mx-6">
                        <Navbar/>
                        <main className="mt-5 mx-6">
                            <h3 className="font-bold text-black text-xl">Keranjang</h3>
                            <p className="text-gray-500">List tiket</p>
                            <div className="flex justify-between">
                                <div className="p-6 bg-white rounded-md shadow-md mt-12 w-[725px]">
                                    <div className="flex flex-col gap-12">
                                        {tiket.map((data, index) => (
                                            <div className="flex justify-between" key={index}>
                                                <div className="flex gap-5">
                                                    <div className="w-[80px] h-[80px]">
                                                        <img src={url + data.wisata.foto} alt=""/>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h3 className="font-bold text-xl">{data.wisata.nama}</h3>
                                                        <p className="text-gray-500">{data.wisata.alamat}</p>
                                                        <p className="text-green-500">
                                                            {new Intl.NumberFormat("id-ID", {
                                                                style: "currency",
                                                                currency: "idr",
                                                            }).format(data.total_harga)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-5 items-center">
                                                    <div className="flex items-center gap-5">
                                                        <span>PCS:</span>
                                                        {data.total_tiket}
                                                    </div>
                                                    <button onClick={() => destroy(data.id)} className="w-12 h-12 bg-red-500 flex items-center justify-center rounded-md">
                                                        <FaRegTrashAlt className="w-5 h-5 text-white" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6 bg-white rounded-md shadow-md mt-12 w-[425px] h-[150px]">
                                    <div className="flex flex-col w-full h-full justify-between">
                                        <div className="flex justify-between">
                                            <h3 className="font-bold">Total Price</h3>
                                            <p className="text-green-500">
                                                {new Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "idr",
                                                }).format(totalHargaSum)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => checkout(`Mau membayar tiket dengan Total harga = ${totalHargaSum}`)}
                                            className="w-full bg-green-500 py-2 text-white">Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    )
}
