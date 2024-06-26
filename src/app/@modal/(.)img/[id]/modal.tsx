"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }
  //i want to close the modal when clicked outside the children

  return (
    <dialog
      ref={dialogRef}
      className="absolute h-screen w-screen bg-black/40 "
      onClose={onDismiss}
      onClick={onDismiss}
    >
      {children}
     
    </dialog>
  );
}
