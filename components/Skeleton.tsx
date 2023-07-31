import clsx from 'clsx';
import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type Props = ComponentProps<'div'> & {
    height?: number;
    width?: number;
    rounded?: boolean;
    className?: string;
}

const Skeleton = ({ height, width, className, rounded, ...props }: Props) => {

    return (
        <div
            style={{
                width: width ? width : '100%',
                height: height ? height : '100%'
            }}
            className={twMerge(
                clsx(`bg-zinc-200 animate-pulse`, {
                    'rounded-full': rounded,
                    'rounded-lg': !rounded
                }), className)}
            {...props}
        >
        </div >
    )
}

export default Skeleton
