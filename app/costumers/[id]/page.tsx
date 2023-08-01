'use client';

import { AiOutlinePhone } from 'react-icons/ai'
import { ICostumer } from '@/types/Costumers'
import { MdOutlineMailOutline } from 'react-icons/md'
import { BiMapPin } from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const Costumer = ({ params }: { params: { id: string } }) => {

    const [costumer, setCostumer] = useState<ICostumer>()

    const getCostumerData = async (id: string) => {
        try {

            const data = await fetch(`http://localhost:3000/api/costumers/${id}`, {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
            })

            const res = await data.json();

            if (res.status === "Error") {
                alert(res.message)
                return;
            }

            setCostumer(res.costumer)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCostumerData(params.id)
    }, [])

    return (
        <div className='w-full p-6 flex flex-col'>
            {costumer && (
                <>
                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-semibold'>
                            {costumer.name + " " + costumer.surname}
                        </h1>
                        <h3 className='text-base'>
                            {costumer.email}
                        </h3>
                    </div>
                    <div className='grid grid-cols-3 gap-4 mt-4'>

                        <div className='border p-4 gap-4 rounded-lg shadow flex items-start hover:shadow-xl transition-shadow'>
                            <span className='p-2 rounded-full bg-zinc-200'>
                                <AiOutlinePhone size={24} /> </span>

                            <div className='flex gap-2 flex-col items-start'>
                                <h3 className='text-xl font-semibold'>Phone</h3>
                                <p className='text-base font-medium'>{costumer.phone}</p>
                            </div>

                        </div>

                        <div className='border p-4 gap-4 rounded-lg shadow flex items-start hover:shadow-xl transition-shadow'>
                            <span className='p-2 rounded-full bg-zinc-200'>
                                <MdOutlineMailOutline size={24} /></span>

                            <div className='flex gap-2 flex-col items-start'>
                                <h3 className='text-xl font-semibold'>Email</h3>
                                <p className='text-base font-medium'>{costumer.email}</p>
                            </div>

                        </div>

                        <div className='border p-4 gap-4 rounded-lg shadow flex items-start hover:shadow-xl transition-shadow'>
                            <span className='p-2 rounded-full bg-zinc-200'>
                                <BiMapPin size={24} /></span>

                            <div className='flex gap-2 flex-col items-start'>
                                <h3 className='text-xl font-semibold'>Address</h3>
                                <p className='text-base font-medium'>{costumer.address + " - " + costumer.state}</p>
                                <p className='text-base font-medium'>{costumer.cep}</p>
                            </div>

                        </div>
                    </div>

                    <h1 className='text-xl font-medium mt-6 mb-4'>
                        <span className='font-semibold'>{costumer.name}</span> animals
                    </h1>

                    <div className='grid grid-cols-4'>
                        <Link href={`/animals/newanimal/${costumer.id}`}>
                            <div className='border p-4 gap-4 rounded-lg shadow flex items-start hover:shadow-xl transition-shadow'>
                                New
                            </div>
                        </Link>

                    </div>
                </>

            )}
        </div>
    )
}

export default Costumer