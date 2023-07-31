'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiOutlineDashboard, AiFillDashboard, AiOutlineUser } from 'react-icons/ai'
import { HiOutlineUsers, HiUsers, HiOutlineCalendar } from 'react-icons/hi'
import { PiDog, PiDogFill } from 'react-icons/pi'
import { IoMdCalendar } from 'react-icons/io'
import { BsPersonPlus } from 'react-icons/bs'
import Logo from '../public/Logo.svg'
import clsx from 'clsx'
import LinkMenu from './LinkMenu'

type Props = {}

export interface ILinks {
    id: number;
    activeIcon: React.ReactNode;
    defaultIcon: React.ReactNode;
    pathname: string;
    displayName: string;
    sublinks?: ISublinks[]
}

interface ISublinks {
    id: number;
    activeIcon: React.ReactNode;
    defaultIcon: React.ReactNode;
    pathname: string;
    displayName: string;
}

const Sidebar = (props: Props) => {

    const links: ILinks[] = [{
        id: 1,
        activeIcon: <AiFillDashboard size={24} className="text-blue-600" />,
        defaultIcon: <AiOutlineDashboard size={24} className="text-zinc-600" />,
        displayName: 'Dashboard',
        pathname: '/dashboard',
        sublinks: [
            {
                id: 1,
                activeIcon: <AiFillDashboard size={24} className="text-blue-600" />,
                defaultIcon: <AiOutlineDashboard size={24} className="text-zinc-600" />,
                displayName: 'Dashboard',
                pathname: '/dashboard',
            },
            {
                id: 2,
                defaultIcon: <HiOutlineUsers size={24} className="text-zinc-600" />,
                activeIcon: <HiUsers size={24} className="text-blue-600" />,
                displayName: 'Costumers',
                pathname: '/dashboard/costumers',
            },
        ]
    },
    {
        id: 2,
        defaultIcon: <AiOutlineUser size={24} className="text-zinc-600" />,
        activeIcon: <AiOutlineUser size={24} className="text-blue-600" />,
        displayName: 'Costumers',
        pathname: '/costumers',
        sublinks: [
            {
                id: 1,
                defaultIcon: <HiOutlineUsers size={24} className="text-zinc-600" />,
                activeIcon: <HiUsers size={24} className="text-blue-600" />,
                displayName: 'All costumers',
                pathname: '/costumers',
            },
            {
                id: 2,
                defaultIcon: <BsPersonPlus size={24} className="text-zinc-600" />,
                activeIcon: <BsPersonPlus size={24} className="text-blue-600" />,
                displayName: 'Add costumer',
                pathname: '/costumers/newcostumer',
            },
        ]
    },
    {
        id: 3,
        defaultIcon: <PiDog size={24} className="text-zinc-600" />,
        activeIcon: <PiDogFill size={24} className="text-blue-600" />,
        displayName: 'Animals',
        pathname: '/animals'
    },
    {
        id: 4,
        defaultIcon: <HiOutlineCalendar size={24} className="text-zinc-600" />,
        activeIcon: <IoMdCalendar size={24} className="text-blue-600" />,
        displayName: 'Calendar',
        pathname: '/calendar'
    },]

    return (
        <aside className='min-h-screen fixed inset-y-0 left-0 min-w-[250px] flex border-r border-zinc-200 flex-col p-4 gap-6'>

            <Image
                src={Logo}
                alt="Logo image"
                height={30}
            />

            <ul className='flex flex-col gap-6'>
                <li>
                    <ul className='flex flex-col gap-2'>
                        <h5 className='uppercase font-bold text-xs text-zinc-600 ml-1'>Vet</h5>
                        {
                            links.map(link => {
                                return (
                                    <li key={link.id}>
                                        <LinkMenu link={link} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>
            </ul>

        </aside>
    )
}

export default Sidebar