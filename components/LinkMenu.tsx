'use client'

import React, { useState } from 'react'
import { ILinks } from './Sidebar'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'


type Props = {
    link: ILinks
}

const LinkMenu = ({ link }: Props) => {

    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(pathname.includes(link.pathname))

    return (
        <div
            className={clsx('flex cursor-pointer flex-col justify-center rounded-lg p-2 gap-4 hover:border-blue-500 transition bg-zinc-100 border-2', {
                'border-l-blue-500 border-2': pathname === link.pathname,
                'bg-zinc-100': pathname !== link.pathname,
            })}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className='flex justify-between items-center'>
                <div className='flex gap-2 font-semibold text-zinc-700'>

                    {pathname.includes(link.pathname) ?
                        link.activeIcon
                        :
                        link.defaultIcon
                    }
                    {link.displayName}
                </div>


                {isOpen && link.sublinks ? (
                    <BiChevronUp size={24} />
                ) : (
                    <BiChevronDown size={24} />
                )}
            </div>



            {isOpen && link.sublinks && (
                <div className='flex flex-col gap-2'>
                    {
                        link.sublinks.map(sublink => {
                            return (
                                <Link
                                key={sublink.id}
                                    className={clsx('flex gap-2 rounded-lg p-2 ml-4 border hover:border-blue-200', {
                                        'bg-blue-200': pathname === sublink.pathname,
                                        'bg-zinc-100': pathname !== sublink.pathname,
                                    })}
                                    href={sublink.pathname}>

                                    {pathname === sublink.pathname ?
                                        sublink.activeIcon
                                        :
                                        sublink.defaultIcon
                                    }
                                    {sublink.displayName}
                                </Link>
                            )
                        })
                    }
                </div>
            )}


        </div>
    )
}

export default LinkMenu