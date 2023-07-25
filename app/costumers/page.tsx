'use client';

import { Formik } from 'formik';
import { Cousine } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

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
    const [searchedCostumers, setSearchedCostumers] = useState<ICostumer[]>([])
    const [searchText, setSearchText] = useState<string | null>('')

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

    const handleSearch = (value: string) => {
        const regex = new RegExp(value, "i")
        const searchedCostumersResult = costumers.filter(
            (costumer) =>
                regex.test(costumer.name) ||
                regex.test(costumer.address) ||
                regex.test(costumer.state) ||
                regex.test(costumer.cpf) ||
                regex.test(costumer.email)
        );

        setSearchText(value)
        setSearchedCostumers(searchedCostumersResult)
    }

    return (
        <div className='p-4 w-full '>
            <h2 className='text-2xl font-semibold '>Costumers</h2>
            <div className='flex flex-col w-full mt-10 gap-2'>
                <div className='flex justify-between w-full items-center p-2 rounded-full border'>

                    <Formik
                        initialValues={{
                            search: "",
                        }}
                        onSubmit={(values, actions) => {
                            handleSearch(values.search)
                        }}
                    >
                        {props => (
                            <form
                                onSubmit={props.handleSubmit}
                                className='flex gap-2 items-center'
                            >
                                <input
                                    type="text"
                                    name="search"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.search}
                                    placeholder='Search for a costumer'
                                    className='w-96 text-md outline-none border border-zinc-400 py-2 px-3 rounded-full'
                                />
                                <button
                                    type="submit"
                                    disabled={props.values.search ? false : true}
                                    className='bg-blue-500 border border-blue-500 p-2 rounded-full text-white'>
                                    <AiOutlineSearch size={24} />
                                </button>
                            </form>
                        )}

                    </Formik>


                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-800">
                        <thead className="text-xs text-gray-700 uppercase bg-blue-200 ">
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
                                <th scope="col" className="px-6 py-3 rounded-tr-lg">
                                    Created at
                                </th>
                            </tr>
                        </thead>
                        {
                            costumers && (
                                searchText ? (
                                    searchedCostumers && (
                                        searchedCostumers.map(searchedCostumer => {
                                            return (
                                                <tbody>
                                                    <tr
                                                        key={searchedCostumer.cpf}
                                                        className="bg-white border-b dark:bg-zinc-100 border-zinc-400">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex flex-col">
                                                            <span>{searchedCostumer.name} {searchedCostumer.surname}</span>
                                                            <span className='text-xs text-gray-700'>{searchedCostumer.email}</span>
                                                        </th>
                                                        <td className="px-6 py-4">
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
                                                            {searchedCostumer.cpf}
                                                        </td>
                                                    </tr>
                                                </tbody>

                                            )
                                        })
                                    )
                                ) : (
                                    costumers.map(costumer => {
                                        return (
                                            <tbody>
                                                <tr
                                                    key={costumer.cpf}
                                                    className="bg-white border-b dark:bg-zinc-100 border-zinc-400">
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
                                                        {costumer.cpf}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })
                                )
                            )
                        }
                    </table>
                    <div className='border rounded-b-lg border-t-blue-200 w-full py-32 flex items-center justify-center'>
                        {!costumers.length && (
                            <h3>no costumers</h3>
                        )}
                        {
                            searchText && !searchedCostumers.length && (
                                <h3 className='text-xl font-semibold italic text-zinc-800'>No results found</h3>
                            )
                        }
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Costumers