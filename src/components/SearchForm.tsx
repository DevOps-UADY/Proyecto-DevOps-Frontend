"use client";
import {TextInput } from "flowbite-react";

export function SearchForm() {
    return (
        <div className="w-full md:w-1/2">
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                    </div>
                    <TextInput id="email1" type="text" placeholder="Buscar" required />
                </div>
            </form>
        </div>
    );
}
