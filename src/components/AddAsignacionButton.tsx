"use client";
import { Button } from "flowbite-react";

interface Props {
    onCrearClick: () => void;
  }

export const AddAsignacionButton = ({ onCrearClick }: Props) => {
    return (
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <Button gradientDuoTone="pinkToOrange" onClick={() => onCrearClick()}>Agregar asignacion</Button>
        </div>
    );
}