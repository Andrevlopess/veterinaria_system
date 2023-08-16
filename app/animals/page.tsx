'use client'

import { IAnimal, ISpecies } from '@/types/Animals'
import React, { useEffect, useMemo, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Tab } from '@headlessui/react'
import AnimalCard from '@/components/AnimalCard'
import { AiOutlineSearch } from 'react-icons/ai'


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
  const [searchText, setSearchText] = useState<string>('')

  const handleSetAnimals = async () => { setAnimals(await handleFetchAnimals()) }
  const handleSetSpecies = async () => { setSpecies(await handleFetchSpecies()) }

  useEffect(() => {

    handleSetAnimals()
    handleSetSpecies()
  }, [])

  const handleSearchAnimals = (value: string) => {
    const regex = new RegExp(value, "i");

    return animals.filter(animal => {
      const searchableFields = [
        animal.name,
        animal.specie,
        animal.breed,
        animal.age.toString(),
        animal.microchip.toString(),
        animal.gender,
        animal.owner,
        animal.weight.toString()
      ];

      return searchableFields.some(field => regex.test(field));

    })
  };


  const filteredAnimals = useMemo(() => {
    return handleSearchAnimals(searchText);
  }, [animals, searchText]);

  
  return (

    <div className='p-4 w-full '>
      <Toaster />
      <h2 className='text-2xl font-semibold'>Animals</h2>

      <div className='flex flex-col gap-2'>
        <div className='justify-end flex '>
          <div
            className='flex items-center relative'
          >
            <input
              type="text"
              name="search"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder='Search for an animal'
              className='w-96 text-md outline-none border border-r-none rounded-r-none py-2 px-3 rounded-lg'
            />
            <button
              className='bg-blue-500 border  border-blue-500 p-2 rounded-r-lg text-white'>
              <AiOutlineSearch size={24} />
            </button>
          </div>
        </div>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mt-4 overflow-auto">
            {species.map(specie => (
              <Tab
                key={specie.id}
                className={({ selected }) =>
                  classNames(
                    'w-full capitalize whitespace-nowrap rounded-lg px-2 py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {`${specie.specie}`}
                <span className='italic'>
                  {` (${filteredAnimals.filter(animal => animal.specie === specie.specie).length})`}</span>
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
                {filteredAnimals.filter(animal => animal.specie === specie.specie).length ? (
                  filteredAnimals.filter(animal => animal.specie === specie.specie).map(animal => {
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



    </div>
  )
}

export default Animals