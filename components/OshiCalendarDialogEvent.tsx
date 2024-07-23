'use client';

import "./main.css"

type Props = {
  isOpen: boolean;
  title: string;
  details: string;
}

export function OshiCalendarDialogEvent({ isOpen, title, details }: Props) {
  return (
    <dialog open={isOpen} className="oshi-calendar__dialog">
      <h2>{title}</h2>
      <p>{details}</p>
    </dialog> 
  )
}