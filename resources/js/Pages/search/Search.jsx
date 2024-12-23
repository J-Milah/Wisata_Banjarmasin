import {useEffect, useMemo, useState} from "react";
import {FaRegTrashAlt} from "react-icons/fa";
import Footer from "@/Pages/components/Footer.jsx";
import Navbar from "@/Pages/components/Navbar.jsx";
import clsx from 'clsx'
import { FaChevronDown, FaCheck  } from "react-icons/fa";
import WisataCard from "@/Pages/components/WisataCard.jsx";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'


export default function Search({data, kategori}) {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(null)
    const [searchq, setSearchq] = useState("")
    console.log(data)

    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        async function fetchCategoryData() {
            if (selected) {
                try {
                    const res = await axios.get(`http://localhost:8000/kategori/${selected.nama}`);
                    setCategoryData(res.data);
                } catch (error) {
                    console.error("Error fetching category data:", error);
                }
            }
        }
        fetchCategoryData();
    }, [selected]);

    const searchingData = useMemo(() => {
        let filteredData = data;

        if (selected && categoryData.length > 0) {
            filteredData = categoryData;
        }

        if (searchq) {
            filteredData = filteredData.filter((item) =>
                searchq.toLowerCase()
                    .split(" ")
                    .every((keyword) => item.nama.toLowerCase().includes(keyword))
            );
        }

        return filteredData;
    }, [data, searchq, selected, categoryData]);


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
                            <div className="flex gap-5">
                                <input
                                    className="w-42 h-8 border-2 px-2"
                                    placeholder="Cari wisata"
                                    type="text" value={searchq} onChange={(e) => setSearchq(e.target.value)}/>

                                <Combobox
                                    value={selected}
                                    onChange={(value) => setSelected(value)} onClose={() => setQuery('')}>
                                    <div className="relative">
                                        <ComboboxInput
                                            className={clsx(
                                                'w-full rounded-lg border-none bg-primary py-1.5 pr-8 pl-3 text-sm/6 text-white',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                            )}
                                            displayValue={(kategori) => kategori?.nama ? kategori?.nama : "Kategori"}
                                            onChange={(event) => setQuery(event.target.value)}
                                        />
                                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                            <FaChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                                        </ComboboxButton>
                                    </div>

                                    <ComboboxOptions
                                        anchor="bottom"
                                        transition
                                        className={clsx(
                                            'w-[var(--input-width)] rounded-xl border border-white/5 bg-primary p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                                        )}
                                    >
                                        {kategori.map((kategori) => (
                                            <ComboboxOption
                                                key={kategori.id}
                                                value={kategori}
                                                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-primary"
                                            >
                                                <FaCheck className="invisible size-4 fill-white group-data-[selected]:visible" />
                                                <div className="text-sm/6 text-white">{kategori.nama}</div>
                                            </ComboboxOption>
                                        ))}
                                    </ComboboxOptions>
                                </Combobox>
                            </div>
                            <div className="flex gap-12 mt-12">
                                {searchingData.map((data, index) => (
                                    <WisataCard data={data} key={index}/>
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
