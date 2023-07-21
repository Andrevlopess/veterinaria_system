'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiOutlineDashboard, AiFillDashboard } from 'react-icons/ai'
import { HiOutlineUsers, HiUsers, HiOutlineCalendar } from 'react-icons/hi'
import { PiDog, PiDogFill } from 'react-icons/pi'
import {IoMdCalendar} from 'react-icons/io'
import Logo from '../public/Logo.svg'
import clsx from 'clsx'

type Props = {}

interface ILinks {
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
        pathname: '/dashboard'
    },
    {
        id: 2,
        defaultIcon: <HiOutlineUsers size={24} className="text-zinc-600" />,
        activeIcon: <HiUsers size={24} className="text-blue-600" />,
        displayName: 'Costumers',
        pathname: '/costumers'
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

    const pathname = usePathname();

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
                                        <Link
                                            href={link.pathname}
                                            className={clsx('flex items-center rounded-r-lg p-2 gap-4 hover:border-blue-500 transition bg-zinc-100 border-2', {
                                                'border-l-blue-500 border-2': pathname === link.pathname,
                                                'bg-zinc-100': pathname !== link.pathname,
                                            })}>
                                            {pathname === link.pathname ?
                                                link.activeIcon
                                                :
                                                link.defaultIcon
                                            }
                                            {link.displayName}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>

                <li>
                    <ul className='flex flex-col gap-2'>
                        <h5 className='uppercase font-bold text-xs text-zinc-600 ml-1'>Our team</h5>
                        <li>
                            <Link href="/dashboard" className='flex items-center border rounded-md p-2 gap-4'>
                                <AiOutlineDashboard size={25} className="text-zinc-700" />
                                {pathname}
                            </Link>
                        </li>

                        <li>
                            <Link href="/dashboard" className='flex items-center border rounded-md p-2 gap-4'>
                                <AiOutlineDashboard size={25} className="text-zinc-700" />
                                Dashboard
                            </Link>
                        </li>

                       
                    </ul>
                </li>
            </ul>

        </aside>
    )
}

export default Sidebar