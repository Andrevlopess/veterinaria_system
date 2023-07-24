'use client';

// import {CostumerDialog} from '@/components/CostumerDialog'
import React, { useEffect, useState } from 'react'

type Props = {}

interface ICostumer {
    name: string,
    surname: string,
    phone: string,
    email: string,
    cpf: string,
    address: string,
    state: string,
    cep: number;
}

const Costumers = (props: Props) => {

    const [costumers, setCostumers] = useState<ICostumer[]>([])

    useEffect(() => {
        const getCostumers = async () => {
            const data = await fetch('http://localhost:3000/api/costumers', {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
            })

            const costumers = await data.json();
            
            setCostumers(costumers.costumers)
        }

        getCostumers();

    }, [])
    
    return (
        <div className='p-4 w-full '>
            <h2 className='text-2xl font-semibold '>Costumers</h2>
            <div className='flex flex-col w-full mt-10 gap-2'>
                <div className='flex justify-between w-full items-center p-2 rounded-lg border'>
                    <button className='bg-blue-500 px-4 py-2 rounded-md text-white'>
                        search
                    </button>
                </div>
                <div className=''>

                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Costumer
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Cpf
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        State
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created at
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {costumers ? (
                                    costumers.map(costumer => {
                                        return(
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {costumer.name} {costumer.surname}
                                            </th>
                                            <td className="px-6 py-4">
                                                {costumer.cpf}
                                            </td>
                                            <td className="px-6 py-4">
                                                {costumer.state}
                                            </td>
                                            <td className="px-6 py-4">
                                                {costumer.state}
                                            </td>
                                        </tr>
                                        )
                                    })
                                ) : (
                                    <h2>there are no costumers</h2>
                                )
                                    
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            {/* <DialogDemo /> */}
        </div>
    )
}

export default Costumers