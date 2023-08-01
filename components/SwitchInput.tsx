import React, { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { useField } from 'formik';

interface SwitchProps {
    name: string;
    active: boolean;
}

export const SwitchInput: React.FC<SwitchProps> = ({
    name,
    active,
}) => {
    const [field] = useField({ name })

    return (
        <Switch
            checked={field.value}
            as="button"
            onChange={(value: boolean) => {
                field.onChange({ target: { value, name } });
            }}
            className={`${active ? 'bg-blue-600' : 'bg-zinc-400'}
          relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${active ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5  transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>

    )
}
