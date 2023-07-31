'use client';

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef, useEffect } from 'react'
import { BiTrashAlt } from 'react-icons/bi';
import { AiFillEdit, AiOutlineEdit, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { ICostumer, IError } from '@/types/Costumers';
import { Formik } from 'formik';

type Props = {
    costumer: ICostumer;
    onEdited: () => void;
}

export default function EditCostumerDialog({ costumer, onEdited }: Props) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<IError | null>(null)

    const cancelButtonRef = useRef(null)

    function closeModal() {
        setIsError(null)
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleEditCostumer = async (values: ICostumer) => {
        setIsError(null)
        try {
            setIsLoading(true)
            const res = await fetch(`http://localhost:3000/api/costumers/${costumer.id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(values)
            })

            const result = await res.json()
            
            if (!res.ok) {
                setIsError(result)
                return;
            }

            onEdited();
            closeModal();

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>

            <button
                type="button"
                onClick={openModal}
                className="rounded-full border border-blue-100 p-2 hover:bg-blue-700 group transition-colors hover:shadow focus:ring focus:ring-blue-300"
            >
                <AiFillEdit size={20} className="text-blue-600 group-hover:text-white" />

            </button>

            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/20 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">

                        <div className="flex min-h-full justify-center p-4 text-center ">

                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className='
                                 relative
                                 transform
                                 overflow-hidden
                                 bg-white 
                                 rounded-lg
                                 shadow
                                 transition-all
                                 p-6
                                 sm:min-w-[50vw]
                                 '>
                                    <div className='flex gap-4 items-start'>
                                        <span className='p-2 rounded-full bg-blue-200 '>
                                            <AiOutlineEdit size={24} className="text-blue-500" />
                                        </span>
                                        <div className='flex flex-col gap-2 items-start'>
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">Edit {costumer.name}</Dialog.Title>
                                            <Dialog.Description>
                                                Edit costumer {costumer.name + costumer.surname}
                                            </Dialog.Description>
                                        </div>
                                    </div>

                                    <Formik
                                        initialValues={{
                                            id: costumer.id,
                                            name: costumer.name,
                                            surname: costumer.surname,
                                            phone: costumer.phone,
                                            cpf: costumer.cpf,
                                            email: costumer.email,
                                            address: costumer.address,
                                            state: costumer.state,
                                            cep: costumer.cep,
                                            createdAt: costumer.createdAt
                                        }}
                                        onSubmit={(values, actions) => {
                                           handleEditCostumer(values)
                                        }}>

                                        {props => (
                                            <form
                                                onSubmit={props.handleSubmit}
                                                className='flex flex-col mt-6'>
                                                <h3 className='text-md font-bold uppercase text-zinc-800 translate-x-4 translate-y-3 bg-white w-fit px-2'>Contact</h3>

                                                <div className='grid grid-cols-2 border border-zinc-400 rounded-lg px-2 py-4 gap-2 gap-y-4 focus-within:border-blue-500'>
                                                    <div className='flex flex-col gap-2 group items-start'>
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
                                                            className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500 w-full'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col gap-2 group items-start'>
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
                                                            className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500 w-full'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col gap-2 group items-start'>
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
                                                            className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500 w-full'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col gap-2 group items-start'>
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
                                                            className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500 data-[error=true]:border-red-500 w-full'
                                                        />
                                                        {isError && (
                                                            isError.target === 'cpf' && (
                                                                <span className='text-sm text-red-500 ml-2'>{isError.message}</span>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className='flex flex-col gap-2 col-span-2 group items-start'>
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
                                                            className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500 data-[error=true]:border-red-500 w-full'
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
                                                    <div className='flex flex-col gap-2 col-span-2 group items-start'>
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
                                                            className='outline-none p-2 border border-zinc-400 rounded-lg focus:border-blue-500 w-full'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col gap-2 group items-start'>
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
                                                            className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500 w-full'
                                                        />
                                                    </div>
                                                    <div className='flex flex-col gap-2 group items-start'>
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
                                                            className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500 w-full'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 justify-end mt-4">
                                                    <button
                                                        type="button"
                                                        className="border border-zinc-400 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white hover:border-blue-500 font-semibold text-zinc-700 transition"
                                                        onClick={closeModal}
                                                    >
                                                        Cancel
                                                    </button>
                                                    
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-blue-500 rounded-lg text-white flex gap-4 font-bold items-center justify-center hover:bg-blue-600 transition">
                                                        {isLoading ? (
                                                            <AiOutlineLoading3Quarters size={24} className="text-white animate-spin" />
                                                        ) : (
                                                            "Edit costumer"
                                                        )}
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

