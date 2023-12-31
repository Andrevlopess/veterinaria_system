'use client';

import React, { useState } from 'react'
import { Formik } from 'formik'
import { Toaster, toast } from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { ICostumer, IError } from '@/types/Costumers';

type Props = {}


const NewCostumer = (props: Props) => {

    const [isError, setIsError] = useState<IError | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handlePostCostumer = async (values: ICostumer) => {
        setIsError(null)
        try {
            setIsLoading(true)
            const res = await fetch('http://localhost:3000/api/costumers', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(values)
            })

            const result = await res.json()

            if (!res.ok) {
                setIsError(result)
                return;
            }

            return toast.success("Costumer created successfully!")

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='p-4 w-full '>
            <Toaster />
            <div>
<h2 className='text-2xl font-semibold '>Add costumer</h2>
            <p className='text-lg text-zinc-700'>Create and save a new costumer for the veterinary.</p>
            <Formik
                initialValues={{
                    id:"",
                    name: "andre ",
                    surname: "v lopes",
                    phone: "(11) 95429-1628",
                    cpf: "00000000000",
                    email: "andre@teste.com",
                    address: "algum lugar",
                    state: "uk",
                    cep: 0,
                    createdAt: new Date(),
                }}
                onSubmit={(values, actions) => {
                    handlePostCostumer(values)
                }}>

                {props => (
                    <form
                        onSubmit={props.handleSubmit}
                        className='flex flex-col max-w-3xl mt-6'>
                        <h3 className='text-md font-bold uppercase text-zinc-800 translate-x-4 translate-y-3 bg-white w-fit px-2'>Contact</h3>
                        <div className='grid grid-cols-2 border border-zinc-400 rounded-lg px-2 py-4 gap-2 gap-y-4 focus-within:border-blue-500'>
                            <div className='flex flex-col gap-2 group'>
                                <label htmlFor="nameInput" className='group-hover:translate-x-2 transition'>
                                    Name
                                </label>
                                <input
                                    required
                                    name="name"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.name}
                                    type="text"
                                    id="nameInput"
                                    className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500'
                                />
                            </div>
                            <div className='flex flex-col gap-2 group'>
                                <label htmlFor="nameInput" className='group-hover:translate-x-2 transition'>
                                    Surname
                                </label>
                                <input
                                    required
                                    name="surname"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.surname}
                                    type="text"
                                    id="nameInput"
                                    className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500'
                                />
                            </div>
                            <div className='flex flex-col gap-2 group'>
                                <label htmlFor="phoneInput" className='group-hover:translate-x-2 transition'>
                                    Phone
                                </label>
                                <input
                                    required
                                    name="phone"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.phone}
                                    type="text"
                                    id="phoneInput"
                                    className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500'
                                />
                            </div>
                            <div className='flex flex-col gap-2 group'>
                                <label htmlFor="cpfInput" className='group-hover:translate-x-2 transition'>
                                    CPF
                                </label>
                                <input
                                    name="cpf"
                                    maxLength={11}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.cpf}
                                    type="text"
                                    data-error={isError?.target === "cpf"}
                                    id="cpfInput"
                                    className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500 data-[error=true]:border-red-500'
                                />
                                {isError && (
                                    isError.target === 'cpf' && (
                                        <span className='text-sm text-red-500 ml-2'>{isError.message}</span>
                                    )
                                )}
                            </div>
                            <div className='flex flex-col gap-2 col-span-2 group'>
                                <label htmlFor="emailInput" className='group-hover:translate-x-2 transition'>
                                    Email
                                </label>
                                <input
                                    required
                                    name="email"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.email}
                                    type="email"
                                    data-error={isError?.target === "email"}
                                    id="emailInput"
                                    className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500 data-[error=true]:border-red-500'
                                />
                                {isError && (
                                    isError.target === 'email' && (
                                        <span className='text-sm text-red-500 ml-2'>{isError.message}</span>
                                    )
                                )}
                            </div>
                        </div>

                        <h3 className='text-md font-bold uppercase text-zinc-800 translate-x-4 translate-y-3 bg-white w-fit px-2'>Adress</h3>
                        <div className='grid grid-cols-2 border border-zinc-400 rounded-lg px-2 py-4 gap-2 focus-within:border-blue-500'>
                            <div className='flex flex-col gap-2 col-span-2 group'>
                                <label htmlFor="AddressInput" className='group-hover:translate-x-2 transition'>
                                    Address
                                </label>
                                <input
                                    required
                                    name="address"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.address}
                                    type="text"
                                    id="AddressInput"
                                    className='outline-none p-2 border border-zinc-400 rounded-lg focus:border-blue-500'
                                />
                            </div>
                            <div className='flex flex-col gap-2 group'>
                                <label htmlFor="stateInput" className='group-hover:translate-x-2 transition'>
                                    State
                                </label>
                                <input
                                    required
                                    name="state"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.state}
                                    type="text"
                                    id="stateInput"
                                    className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500'
                                />
                            </div>
                            <div className='flex flex-col gap-2 group'>
                                <label htmlFor="cepInput" className='group-hover:translate-x-2 transition'>
                                    CEP
                                </label>
                                <input
                                    required
                                    name="cep"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.cep}
                                    type="number"
                                    id="cepInput"
                                    className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500'
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 rounded-xl text-white flex gap-4 font-bold items-center justify-center hover:bg-blue-600 transition">
                                {isLoading ? (
                                    <AiOutlineLoading3Quarters size={24} className="text-white animate-spin" />
                                ) : (
                                    "Create costumer"
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
            </div>
            
        </div >
    )
}

export default NewCostumer