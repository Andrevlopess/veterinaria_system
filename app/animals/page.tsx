'use client'

import { IAnimal, ISpecies } from '@/types/Animals'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Tab, Disclosure } from '@headlessui/react'
import AnimalCard from '@/components/AnimalCard'


const handleFetchAnimals = async () => {

  const response = await fetch('http://localhost:3000/api/animals', {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch animals');
  }

  const data = await response.json();
  return data.animals;
}

const handleFetchSpecies = async () => {
  const response = await fetch('http://localhost:3000/api/animals/species', {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch animals');
  }

  const data = await response.json();
  return data.species;
}

type Props = {}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Animals = (props: Props) => {

  const [animals, setAnimals] = useState<IAnimal[] | []>([])
  const [species, setSpecies] = useState<ISpecies[] | []>([])

  const handleSetAnimals = async () => { setAnimals(await handleFetchAnimals()) }
  const handleSetSpecies = async () => { setSpecies(await handleFetchSpecies()) }

  useEffect(() => {

    handleSetAnimals()
    handleSetSpecies()
  }, [])

  return (

    <div className='p-4 w-full '>
      <Toaster />
      <h2 className='text-2xl font-semibold'>Animals</h2>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mt-4">
          {species.map(specie => (
            <Tab
              key={specie.id}
              className={({ selected }) =>
                classNames(
                  'w-full capitalize rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {`${specie.specie}`}
              <span className='italic'>
                {` (${animals.filter(animal => animal.specie === specie.specie).length})`}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {species.map(specie => (
            <Tab.Panel
              key={specie.id}
              className={classNames(
                'rounded-xl bg-white p-3 grid grid-cols-3 gap-4 items-start transition-transform',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              {animals.filter(animal => animal.specie === specie.specie).length ? (
                animals.filter(animal => animal.specie === specie.specie).map(animal => {
                  return (
                    <AnimalCard animal={animal} />
                  )
                })
              ) : (
                <h2 className='text-lg font-semibold col-span-3 text-zinc-800 text-center'>No <span className="italic">{specie.specie}</span> animals found!</h2>
              )}



            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>


    </div>
  )
}

export default Animals