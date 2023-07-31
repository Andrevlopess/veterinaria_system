'use client';

import { ICostumer } from '@/types/Costumers'
import React, { useEffect, useState } from 'react'

type Props = {}

const CostumersDash = (props: Props) => {

    const [costumers, setCostumers] = useState<ICostumer[]>()

    const getCostumers = async () => {

        try {

            const data = await fetch('http://localhost:3000/api/costumers', {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
            })

            const res = await data.json();

            setCostumers(res.costumers)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getCostumers();

    }, [])


    return (
        <div className='w-full p-4'>
            <h2 className='text-2xl font-semibold '>Costumers dashboard</h2>
        </div>
    )
}

export default CostumersDash