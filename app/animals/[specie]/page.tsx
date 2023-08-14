'use client'

import { IAnimal } from '@/types/Animals'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

type Props = {}

const AnimalSpecie = ({ params }: { params: { specie: string } }) => {


    const [animals, setAnimals] = useState<IAnimal[] | []>([])

    const handleFetchAnimals = async () => {
        try {
            const animals = await fetch(`http://localhost:3000/api/animals/species/${params.specie}`, {
                method: 'GET',
                headers: { 'content-type': 'application/json' }
            }).then(res => res.json());

            if (!animals) return alert('error aqui')

            setAnimals(animals.animals)

        } catch (error) {
            return alert(error)
        }
    }

    useEffect(() => {
        handleFetchAnimals();
    }, [])


    return (
        <div className='p-4 w-full'>
            <Toaster />
            <div>
                <h2 className='text-2xl font-semibold '>{`Animals - ${params.specie}`}</h2>
                <p className='text-lg text-zinc-700'>{`These are all ${params.specie} animals cadastrated`}</p>
                <div className='grid grid-cols-3 gap-4 mt-4'>
                    {animals && (
                        animals.map(animal => {
                            return (
                                <div className='p-4 rounded-md shadow-sm border hover:shadow-lg transition'>
                                    <div className='flex justify-between items-start'>
                                        <h2 className='text-lg font-medium w-1/2 break-words'>
                                            {animal.name}
                                        </h2>


                                        <h2 className='text-base text-white font-normal bg-blue-500 rounded-md px-2 py-1'>{animal.microchip}</h2>

                                    </div>
                                    <h4>Age: {animal.age}</h4>
                                    <h4>weight: {animal.weight}</h4>
                                    <h4>Gender: {animal.gender}</h4>

                                    {animal.vaccinated && (
                                        <h4 className='bg-gray-300 rounded-md px-2 py-1 mt-2 text-start'>Vaccinated</h4>
                                    )}
                                </div>
                            )
                        })
                    )
                    }
                </div>

            </div>

        </div>
    )
}

export default AnimalSpecie