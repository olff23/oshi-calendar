import './oshi_calendar.css';
import { useEffect, useRef } from 'react';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  details: string;
};

export function OshiCalendarDialogEvent ({ isOpen, onClose, title, details }: Props) {
  const myRef = useRef<HTMLDialogElement | null>(null);
  useEffect(
    () => {
      isOpen
        ? myRef.current?.showModal()
        : myRef.current?.close();
    },
    [isOpen]
  );
  myRef.current?.addEventListener(
    'click',
    (event) => {
      if (event.target === myRef.current) {
        onClose();
      }
    }
  );

  return (
    <dialog ref={myRef} className="oshi-calendar__dialog">
      <div className="inner">
        <h2>{title}</h2>
        <p>{details}</p>
        <button onClick={onClose}>close</button>
      </div>
    </dialog>
  );
}
