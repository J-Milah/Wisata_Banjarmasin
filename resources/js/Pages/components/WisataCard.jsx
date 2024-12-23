import {Link} from "@inertiajs/react";

export default function WisataCard({data}) {
    const url = "http://localhost:8000/storage/"

    return (
        <>
            <Link href={`wisata/${data.id}`} className="flex flex-col gap-4 w-52">
                <div className="w-52 h-52 bg-red-500 rounded-md">
                    <img src={url + data.foto} className="w-full h-full" alt=""/>
                </div>
                <div className="flex w-full justify-between">
                <h3 className="font-bold w-20 truncate">{data.nama}</h3>
                    <p className="text-green-600 font-bold">{new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "idr",
                    }).format(data.harga)}</p>
                </div>
            </Link>
        </>
    )
}
