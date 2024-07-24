import { useEffect, useRef } from "react";
import "./main.css"

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  details: string;
}

export function OshiCalendarDialogEvent({ isOpen, onClose, title, details }: Props) {
    const myRef = useRef<HTMLDialogElement|null>(null);
    useEffect(()=>{
        isOpen ? myRef.current?.showModal() : myRef.current?.close();
    },[isOpen]);
  return (
    <dialog ref={myRef} className="oshi-calendar__dialog">
      <h2>{title}</h2>
      <p>{details}</p>
      <button onClick={onClose}>close</button>
    </dialog> 
  )
}