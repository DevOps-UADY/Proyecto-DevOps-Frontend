"use client";
import {TextInput } from "flowbite-react";
import { ChangeEventHandler } from "react";

interface Props {
    onChangeS: ChangeEventHandler<HTMLInputElement>;
}

export const SearchForm = ({ onChangeS }: Props) => {
    return (
        <div className="w-full md:w-1/2">
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <TextInput id="search" type="text" placeholder="Buscar" onChange={onChangeS} />
                </div>
            </form>
        </div>
    );
}
