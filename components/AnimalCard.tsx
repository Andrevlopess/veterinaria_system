import { IAnimal } from '@/types/Animals'
import { Disclosure } from '@headlessui/react'
import { FiChevronDown } from 'react-icons/fi'
import { BsCheckLg } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'

import React from 'react'
import Link from 'next/link'

type Props = {
    animal: IAnimal
}

const AnimalCard = ({ animal }: Props) => {
    return (
        <div className='p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group border grid grid-cols-2 bg-zinc-50'>
            <h2 className='font-semibold text-lg capitalize'>{animal.name}</h2>

            <div className='px-2 py-1 rounded-lg justify-self-end border relative flex flex-col items-center group-hover:border-blue-300 transition-colors'>
                <span className='bg-zinc-50 -mt-3 px-2 text-xs'>microchip</span>
                {animal.microchip}
            </div>

            <h3 className='text-base font-medium capitalize col-span-2'>
                Breed:
                <span className='text-sm '> {animal.breed}</span>
            </h3>

            <div className="flex flex-col col-span-2 mt-4">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                <span>More informations</span>
                                <FiChevronDown
                                    className={`${open ? 'rotate-180 transform ' : 'rotate-0 transform'
                                        } h-5 w-5 text-blue-500 transition`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-2 pt-4 pb-2 text-sm text-gray-500">
                                <ul>
                                    <li className='flex border-b rounded-lg justify-between hover:bg-blue-100 transition py-1 px-2 items-center hover:text-blue-900'>
                                        <h4 className='text-sm font-semibold'>Gender: </h4>
                                        <span className='capitalize'>{animal.gender}</span>
                                    </li>
                                    <li className='flex border-b rounded-lg justify-between hover:bg-blue-100 transition py-1 px-2 items-center hover:text-blue-900'>
                                        <h4 className='text-sm font-semibold'>Age: </h4>
                                        <span >{animal.age} y</span>
                                    </li>
                                    <li className='flex border-b rounded-lg justify-between hover:bg-blue-100 transition py-1 px-2 items-center hover:text-blue-900'>
                                        <h4 className='text-sm font-semibold'>Weight: </h4>
                                        <span >{animal.weight.toFixed(2)} kg</span>
                                    </li>
                                    <li className='flex border-b rounded-lg justify-between hover:bg-blue-100 transition py-1 px-2 items-center hover:text-blue-900'>
                                        <h4 className='text-sm font-semibold'>Vaccinated: </h4>
                                        <span>{animal.vaccinated ? (
                                            <BsCheckLg />
                                        ) : (
                                            <MdClose />
                                        )}</span>
                                    </li>
                                    <li className='flex border-b rounded-lg justify-between hover:bg-blue-100 transition py-1 px-2 items-center hover:text-blue-900'>
                                        <h4 className='text-sm font-semibold'>Neutered: </h4>
                                        <span>{animal.neutered ? (
                                            <BsCheckLg />
                                        ) : (
                                            <MdClose />
                                        )}</span>
                                    </li>

                                    <li className='flex border-b rounded-lg justify-between hover:bg-blue-100 transition py-1 px-2 items-center hover:text-blue-900'>
                                        <h4 className='text-sm font-semibold'>Owner: </h4>
                                        <Link
                                            className='text-blue-500 font-semibold italic capitalize'
                                            href={`/costumers/${animal.ownerId}`}>
                                            {animal.owner}
                                        </Link>
                                    </li>


                                </ul>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>


        </div>
    )
}

export default AnimalCard