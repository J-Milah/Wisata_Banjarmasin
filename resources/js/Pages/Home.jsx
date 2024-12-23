import Navbar from "@/Pages/components/Navbar.jsx";
import WisataCard from "@/Pages/components/WisataCard.jsx";
import Hero from "@/Pages/components/Hero.jsx";
import Footer from "@/Pages/components/Footer.jsx";

export default function Home({data}) {
    return (
        <>
            <head>
                <title>Beranda</title>
            </head>
            <div className="flex justify-between flex-col min-h-screen">
                <div className="flex flex-col">
                    <Navbar/>
                    <Hero />
                    <div className="flex flex-col gap-5 mt-5">
                        <h3 className="font-bold text-center text-3xl">Wisata Terbaru</h3>
                        <p className="text-gray-500 text-center">Wisata yang baru saja ditambahkan</p>
                        <div className="p-6  grid grid-cols-3 items-center justify-center justify-items-center gap-12">
                            {data.map((data, index) => (
                                <WisataCard data={data} key={index}/>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
