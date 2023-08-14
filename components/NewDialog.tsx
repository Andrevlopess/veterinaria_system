'use client';

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef } from 'react'
import { BiTrashAlt } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsPlusLg } from 'react-icons/bs'
import PlusDogPawOutline from '@/public/icons/PlusDogPawOutline';
import DogPawFilled from '@/public/icons/DogPawFilled';
import { Formik } from 'formik';
import { toast } from 'react-hot-toast';


type Props = {
    name: string
}

export default function NewSpecieDialog({ name }: Props) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<string>('')
    const [specieName, setSpecieName] = useState<string>('')

    const cancelButtonRef = useRef(null)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleNewSpecie = async () => {

        if (!specieName) return;

        try {
            const res = await fetch('http://localhost:3000/api/animals/species', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ specie: specieName })
            })

            const data = await res.json()

            if (data.status === "error") {
                setIsError(data.message)
                return;
            }

            toast.success("Specie created successfully!")
            closeModal();

        } catch (error) {

        }
    }

    return (
        <>

            <button
                type="button"
                onClick={openModal}
                className="rounded-lg p-2 border border-zinc-400 shadow-xl hover:bg-zinc-200"
            >

                <BsPlusLg size={20} className="text-gray-900" />


            </button>

            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setIsOpen}>
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
                        <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <DogPawFilled size={24} />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    New Specie
                                                </Dialog.Title>

                                                <p className="text-sm text-gray-500">
                                                    Create a new specie for the veterinary animals
                                                </p>



                                                <div

                                                    className='w-full mt-4'>
                                                    <div className='flex flex-col gap-2 group'>
                                                        <label htmlFor="nameInput" className='group-hover:translate-x-2 transition'>
                                                            Specie name
                                                        </label>
                                                        <input
                                                            onChange={(e) => setSpecieName(e.target.value)}
                                                            name="specie"
                                                            type="text"
                                                            id="specieInput"
                                                            className={`outline-none shadow-md p-2 border border-zinc-400 rounded-lg  focus:border-blue-500
                                                             ${isError ? 'border-red-500' : ""}`}
                                                        />
                                                        {isError && (
                                                            <span className='text-red-500 text-sm'>
                                                                {isError}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="bg-gray-50 sm:flex sm:flex-row-reverse py-4">
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                                            onClick={handleNewSpecie}
                                                        >
                                                            {isLoading ? (
                                                                <AiOutlineLoading3Quarters className="animate-spin mx-auto text-white" size={22} />
                                                            ) : (
                                                                "Create"
                                                            )}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={() => setIsOpen(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root >
        </>
    )
}

