import { Listbox, Transition } from "@headlessui/react";
import { useField } from "formik";
import { FiChevronDown } from 'react-icons/fi';
import { BsCheckLg } from 'react-icons/bs'
import { Fragment } from "react";

interface SelectProps {
    name: string;
    label: string;
    options: string[];
}

export const SelectInput: React.FC<SelectProps> = ({
    name,
    label,
    options,
}) => {
    const [field] = useField({ name });

    return (
        <Listbox
            value={field.value}
            onChange={(value: string) => {
                field.onChange({ target: { value, name } });
            }}
        >
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 border border-zinc-400 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
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
        </Listbox>
    );
};