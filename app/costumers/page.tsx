'use client';

import ConfirmDialog from '@/components/ConfirmDialog';
import { Toaster, toast } from 'react-hot-toast'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineSearch, AiOutlineLoading3Quarters, AiOutlineEdit } from 'react-icons/ai'
import { BiTrashAlt } from 'react-icons/bi'
import { ICostumer } from '@/types/Costumers';
import EditDialog from '@/components/EditDialog';
import EditCostumerDialog from '@/components/EditDialog';


type Props = {}


const Costumers = (props: Props) => {

    const [costumers, setCostumers] = useState<ICostumer[]>([])
    const [searchedCostumers, setSearchedCostumers] = useState<ICostumer[]>([])
    const [searchText, setSearchText] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getCostumers = async () => {
        try {

            const data = await fetch('http://localhost:3000/api/costumers', {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
            })

            const res = await data.json();

            setCostumers(res.costumers)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getCostumers();

    }, [])

    const handleSearch = (value: string) => {
        const regex = new RegExp(value, "i")
        return costumers.filter(
            (costumer) =>
                regex.test(costumer.name + costumer.surname) ||
                regex.test(costumer.address) ||
                regex.test(costumer.state) ||
                regex.test(costumer.cpf) ||
                regex.test(costumer.email)
        );
    }

    const formatCreatedAt = (createdAt: Date) => {
        const data = new Date(createdAt);

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        // Retorna a data formatada no formato "dd/mm/yyyy"
        return `${dia}/${mes}/${ano}`;
    }

    const handleDeletedCostumer = () => {
        toast.success("Costumer deleted");
        getCostumers();
    }

    const handleEditedCostumer = () => {
        toast.success("Costumer edited");
        getCostumers();
    }

    useEffect(() => {

        setTimeout(() => {
            setSearchedCostumers(handleSearch(searchText))
        }, 500);

    }, [searchText, handleDeletedCostumer])

    return (
        <div className='p-4 w-full '>
            <Toaster />
            <h2 className='text-2xl font-semibold'>Costumers</h2>
            <div className='flex flex-col w-full mt-10 gap-2'>
                <div className='flex justify-between w-full items-center p-2 rounded-full border'>


                    <div
                        className='flex items-center relative'
                    >
                        <input
                            type="text"
                            name="search"
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                            placeholder='Search for a costumer'
                            className='w-96 text-md outline-none border border-zinc-400 py-2 px-3 rounded-full'
                        />
                        <button
                            className='bg-blue-500 border -translate-x-full border-blue-500 p-2 rounded-full text-white'>
                            <AiOutlineSearch size={24} />
                        </button>
                    </div>



                    <Link
                        className='p-2 rounded-full bg-blue-500 '
                        href="/costumers/newcostumer">
                        <AiOutlinePlus size={24} className="text-white" />
                    </Link>

                </div>
                <div className="relative overflow-x-auto h-[75vh] overflow-y-scroll">
                    <table className="w-full text-sm text-left text-gray-800">
                        <thead className="text-xs text-zinc-50 uppercase bg-blue-500 sticky top-0">
                            <tr className='rounded-lg'>
                                <th scope="col" className="px-6 py-3 rounded-tl-lg">
                                    Costumer
                                </th>
                                <th scope="col" className="px-6 py-3 ">
                                    Cpf
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3 ">
                                    Cep
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    State
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created at
                                </th>
                                <th scope="col" className="px-6 py-3 bg-blue-600 text-center rounded-tr-lg">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {
                            costumers.length ? (
                                searchText ? (
                                    searchedCostumers.length ? (
                                        <tbody className='overflow-y-scroll'>
                                            {
                                                searchedCostumers.map(searchedCostumer => {
                                                    return (
                                                        <tr
                                                            key={searchedCostumer.id}
                                                            className="bg-white border-b dark:bg-zinc-100 border-zinc-400 hover:bg-blue-100">

                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex flex-col">
                                                                <span>{searchedCostumer.name} {searchedCostumer.surname}</span>
                                                                <span className='text-xs text-gray-700'>{searchedCostumer.email}</span>
                                                            </th>
                                                            <td className="px-6 py-4" >
                                                                {searchedCostumer.cpf}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {searchedCostumer.phone}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {searchedCostumer.cep}
                                                            </td>
                                                            <td className="px-6 py-4 uppercase">
                                                                {searchedCostumer.state}
                                                            </td>
                                                            <td className="px-6 py-4">

                                                                {formatCreatedAt(searchedCostumer.createdAt)}
                                                            </td>
                                                            <td className="px-6 py-4 text-center space-x-2">
                                                                <EditCostumerDialog
                                                                    onEdited={handleEditedCostumer}
                                                                    costumer={searchedCostumer} />


                                                                <ConfirmDialog
                                                                    onDeleted={handleDeletedCostumer}
                                                                    costumerId={searchedCostumer.id}
                                                                    costumerName={searchedCostumer.name + searchedCostumer.surname} />
                                                            </td>
                                                        </tr>

                                                    )
                                                })}
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            <tr>
                                                <td colSpan={7} className='border text-center py-48'>
                                                    Sorry, no results found for your search.
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                ) : (
                                    <tbody>
                                        {costumers.map(costumer => {
                                            return (
                                                <tr
                                                    key={costumer.id}
                                                    className="bg-white border-b dark:bg-zinc-100 border-zinc-300 hover:bg-blue-100">

                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex flex-col">
                                                        <span>{costumer.name} {costumer.surname}</span>
                                                        <span className='text-xs text-gray-700'>{costumer.email}</span>
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {costumer.cpf}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {costumer.phone}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {costumer.cep}
                                                    </td>
                                                    <td className="px-6 py-4 uppercase">
                                                        {costumer.state}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {formatCreatedAt(costumer.createdAt)}
                                                    </td>
                                                    <td className="px-6 py-4 text-center space-x-2">

                                                        <EditCostumerDialog
                                                            onEdited={handleEditedCostumer}
                                                            costumer={costumer} />


                                                        <ConfirmDialog
                                                            onDeleted={handleDeletedCostumer}
                                                            costumerId={costumer.id}
                                                            costumerName={costumer.name + costumer.surname} />

                                                    </td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                )
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan={7} className='border bg-zinc-100 text-center py-48'>
                                            <AiOutlineLoading3Quarters className="animate-spin mx-auto text-blue-700" size={50} />
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Costumers