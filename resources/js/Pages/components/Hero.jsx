import { LuPlaneTakeoff } from "react-icons/lu";


export default function Hero() {
    return (
        <main className="flex w-screen justify-between p-6 px-20 mt-12">
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-5xl">MariWisata</h3>
                <p className="text-gray-500 w-96 text-justify">
                    Aplikasi ini dirancang untuk membantu pengguna menjelajahi destinasi wisata dengan mudah dan nyaman.
                    Fitur utama meliputi rekomendasi tempat wisata berdasarkan lokasi, ulasan pengunjung, panduan
                    perjalanan, serta informasi tiket dan akomodasi. Dengan antarmuka yang ramah pengguna, aplikasi ini
                    menjadi teman terbaik untuk merencanakan liburan, menemukan pengalaman baru, dan menciptakan
                    kenangan indah di berbagai destinasi wisata.
                </p>
            </div>
            <div className="flex items-center justify-center w-[23rem] h-[23rem] bg-primary mr-28 rounded-full">
                <LuPlaneTakeoff className="w-52 h-52 text-lightmode" />
            </div>
        </main>
    )
}
