'use client'

import { GrFormClose } from 'react-icons/gr'
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Formik } from 'formik';

interface ICostumer {
  name: string,
  surname: string,
  phone: string,
  email: string,
  adress: string,
  state: string
}

export const CostumerDialog = () => {

  const handleSubmit = async (values: ICostumer) => {
    const res = await fetch('http://localhost:3000/api/costumer', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values),
    })
  }

  return (

    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-blue-500 rounded-xl text-white flex gap-4 font-bold items-center justify-center hover:bg-blue-600 transition shadow-lg">
          New costumer
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[#00000066] data-[state=open]:animate-overlayShow fixed inset-0 " />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            New costumer
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Create and save your new costumer
          </Dialog.Description>

          <Formik
            initialValues={{
              name: "",
              surname: "",
              phone: "",
              email: "",
              address: "",
              state: ""
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}>
              
            {props => (
              <form
                onSubmit={props.handleSubmit}
                className='flex flex-col'>
                <h3 className='text-md font-bold uppercase text-zinc-800 translate-x-4 translate-y-3 bg-white w-fit px-2'>Contact</h3>
                <div className='grid grid-cols-2 border border-zinc-400 rounded-lg px-2 py-4 gap-2 focus-within:border-blue-500'>
                  <div className='flex flex-col gap-2 group'>
                    <label htmlFor="nameInput" className='group-hover:translate-x-2 transition'>
                      Name
                    </label>
                    <input
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
                    <label htmlFor="emailInput" className='group-hover:translate-x-2 transition'>
                      Email
                    </label>
                    <input
                      name="email"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      type="email"
                      id="emailInput"
                      className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500'
                    />
                  </div>
                </div>

                <h3 className='text-md font-bold uppercase text-zinc-800 translate-x-4 translate-y-3 bg-white w-fit px-2'>Adress</h3>
                <div className='grid grid-cols-2 border border-zinc-400 rounded-lg px-2 py-4 gap-2 focus-within:border-blue-500'>
                  <div className='flex flex-col gap-2 group'>
                    <label htmlFor="nameInput" className='group-hover:translate-x-2 transition'>
                      Address
                    </label>
                    <input
                      name="address"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.address}
                      type="text"
                      id="nameInput"
                      className='outline-none p-2 border border-zinc-400 rounded-lg focus:border-blue-500'
                    />
                  </div>
                  <div className='flex flex-col gap-2 group'>
                    <label htmlFor="surnameInput" className='group-hover:translate-x-2 transition'>
                      State
                    </label>
                    <input
                      name="state"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.state}
                      type="text"
                      id="surnameInput"
                      className='outline-none p-2 border border-zinc-400 rounded-lg  focus:border-blue-500'
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 rounded-xl text-white flex gap-4 font-bold items-center justify-center hover:bg-blue-600 transition shadow-lg">
                    Add
                  </button>
                </div>
              </form>
            )}
          </Formik>





          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <GrFormClose className="text-zinc-600" size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
};