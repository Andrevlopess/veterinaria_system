'use client';

import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { Toaster, toast } from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IError } from '@/types/Costumers';
import { SelectInput } from '@/components/SelectInput';
import { SwitchInput } from '@/components/SwitchInput';
import { getCurrentDate } from '@/utils/CurrentDate';
import { IBreeds, ISpecies } from '@/types/Animals';

type Props = {}


const NewAnimal = ({ params }: { params: { id: string } }) => {

  const [isError, setIsError] = useState<IError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [species, setSpecies] = useState<ISpecies[] | []>([])
  const [breeds, setBreeds] = useState<IBreeds[] | []>([])

  const handleFetchBreeds = async (specie: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/animals/species/${specie}/breeds`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
      })

      if (!res.ok) {
        return console.log(res);
      }

      const breeds = await res.json();

      setBreeds(breeds.breeds);

    } catch (error) {
      console.log(error);
    }
  }

  const fetchSpecies = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/animals/species', {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
      })

      if (!res.ok) {
        return console.log(res);
      }

      const species = await res.json();

      setSpecies(species.species)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSpecies();

  }, [])

  return (
    <div className='p-4 w-full '>
      <Toaster />
      <div>
        <h2 className='text-2xl font-semibold '>Add animal to {params.id}</h2>
        <p className='text-lg text-zinc-700'>Create and save a new animal for the veterinary.</p>
        <Formik
          initialValues={{
            id: "",
            name: "andre",
            age: 15,
            gender: "Male",
            weight: 5.23,
            birthdate: getCurrentDate(),
            neutered: true,
            vaccinated: true,
            specieId: " ",
            breedId: " ",
          }}
          onSubmit={(values, actions) => {
            console.log(values);
          }}>

          {props => (
            <form
              onSubmit={props.handleSubmit}
              className='flex flex-col max-w-3xl mt-6'>
              <h3 className='text-md font-bold uppercase text-zinc-800 translate-x-4 translate-y-3 bg-white w-fit px-2'>Animal</h3>
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
                    className='outline-none shadow-md p-2 border border-zinc-400 rounded-lg  focus:border-blue-500'
                  />
                </div>
                <div className='flex flex-col gap-2 group'>
                  <label htmlFor="ageInput" className='group-hover:translate-x-2 transition'>
                    Age
                  </label>
                  <input
                    required
                    name="age"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.age}
                    type="number"
                    id="ageInput"
                    className='outline-none shadow-md p-2 border border-zinc-400 rounded-lg  focus:border-blue-500'
                  />
                </div>
                <div className='flex flex-col gap-2 group'>
                  <label htmlFor="phoneInput" className='group-hover:translate-x-2 transition'>
                    Gender
                  </label>

                  <SelectInput name="gender" options={["Male", "Female"]} label='Select the gender' />

                </div>
                <div className='flex flex-col gap-2 group'>
                  <label htmlFor="weightInput" className='group-hover:translate-x-2 transition'>
                    Weight
                  </label>
                  <input
                    name="weight"
                    maxLength={11}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.weight}
                    type="text"
                    id="weightInput"
                    className='outline-none shadow-md p-2 border border-zinc-400 rounded-lg  focus:border-blue-500'
                  />
                </div>
                <div className='flex flex-col gap-2 col-span-2 group'>
                  <label htmlFor="birthdateInput" className='group-hover:translate-x-2 transition'>
                    Birthdate
                  </label>
                  <input
                    required
                    name="birthdate"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.birthdate}
                    type="date"
                    id="birthdateInput"
                    className='outline-none p-2 shadow-md border border-zinc-400 rounded-lg  focus:border-blue-500'
                  />
                  {isError && (
                    isError.target === 'email' && (
                      <span className='text-sm text-red-500 ml-2'>{isError.message}</span>
                    )
                  )}
                </div>
                <div className='flex gap-2 group'>
                  <label htmlFor="weightInput">
                    Neutered
                  </label>
                  <SwitchInput
                    name="neutered"
                    active={props.values.neutered}
                  />

                </div>

                <div className='flex gap-2 group'>
                  <label htmlFor="vaccinatedInput">
                    Vaccinated
                  </label>
                  <SwitchInput
                    name="vaccinated"
                    active={props.values.vaccinated}
                  />

                </div>
                <div className='flex flex-col gap-2 group'>
                  <label htmlFor="weightInput" className='group-hover:translate-x-2 transition'>
                    Weight
                  </label>
                  <input
                    name="weight"
                    maxLength={11}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.weight}
                    type="text"
                    id="weightInput"
                    className='outline-none shadow-md p-2 border border-zinc-400 rounded-lg  focus:border-blue-500'
                  />
                </div>

                <div className='flex flex-col gap-2 group'>
                  <label htmlFor="weightInput" className='group-hover:translate-x-2 transition'>
                    Specie
                  </label>

                  <SelectInput name="specie" options={species.map(specie => specie.specie)} label="Select the specie" onChange={(value) => handleFetchBreeds(value)} />

                </div>

                <div className='flex flex-col gap-2 group'>
                  <label htmlFor="weightInput" className='group-hover:translate-x-2 transition'>
                    Breed
                  </label>

                  <SelectInput
                    disabled={breeds.length ? false : true}
                    name="breed"
                    options={breeds.map(breed => breed.breed)}
                    label="Select the breed" />

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

export default NewAnimal