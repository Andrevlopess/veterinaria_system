import { Listbox, Transition } from "@headlessui/react";
import { useField } from "formik";
import { FiChevronDown } from 'react-icons/fi';
import { BsCheckLg, BsPlusLg } from 'react-icons/bs'
import { Fragment } from "react";
import NewSpecieDialog from "./NewDialog";

interface SelectProps {
    name: string;
    label: string;
    options: string[];
    disabled?: boolean;
    onChange?: (value: string) => void;
}

export const SelectInput: React.FC<SelectProps> = ({
    name,
    label,
    options,
    disabled,
    onChange,
}) => {
    const [field] = useField({ name });

    const handleChange = (value: string) => {
        if (onChange) {
            onChange(value)
        }

        field.onChange({ target: { value, name } });

    }

    return (
        <Listbox
            value={field.value}
            onChange={(value: string) => {
                handleChange(value)
            }}
        >
            <div className="relative w-full">
                <Listbox.Button
                    className={`relative capitalize w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 border border-zinc-400 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 transition focus-visible:ring-offset-orange-300 sm:text-sm ${disabled ? "opacity-50 cursor-not-allowed" : ''}
                    `}>
                    <span className="block truncate">{field.value ? field.value : label}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <FiChevronDown
                            className=" text-gray-400"
                            size={24}
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-50  mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((option, optionIdx) => (
                            <Listbox.Option
                                key={optionIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100' : 'text-gray-900'
                                    }`
                                }
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate capitalize ${selected ? 'font-medium' : 'font-normal '
                                                }`}
                                        >
                                            {option}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                <BsCheckLg size={24} />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}

                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox >
    );
};