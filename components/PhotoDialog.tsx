"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export default function PhotoDialog({ open, onClose, children, label, onPrevious, onNext }: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog ref={dialog} className="photo-dialog" aria-label={label}
      onCancel={onClose}
      onClose={() => { if (!dialog.current?.open) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") onPrevious?.();
        if (event.key === "ArrowRight") onNext?.();
      }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      {open && <div className="photo-dialog-content">
        <div className="photo-dialog-toolbar"><span>{label}</span><button type="button" onClick={onClose} aria-label="Close photo" autoFocus><X size={24} aria-hidden="true" /></button></div>
        {children}
      </div>}
    </dialog>
  );
}
