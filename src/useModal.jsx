import React, { useState, useEffect, useRef } from "react";
import "./assets/useModal.css";

/**
 * Custom React hook for creating a modal
 *
 * @returns {[Function, Function]} Returns an array containing two functions:
 *    1. setContent - A function that takes in the modal content as a parameter and returns the modal component
 *    2. triggerModal - A function that toggles the modal's open state
 */
function useModal() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function setContent(content) {
    document.body.style.overflow = "";
    if (open) {
      document.body.style.overflow = "hidden";
      return (
        <div className='useModal'>
          <div ref={modalRef} className='useModal-frame'>
            <div className='useModal-closeBtn' onClick={() => triggerModal()}>
              <svg
                strokeWidth='0'
                viewBox='0 0 512 512'
                height='1.5em'
                width='1.5em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='32'
                  d='M368 368L144 144m224 0L144 368'
                ></path>
              </svg>
            </div>
            <div className='useModal-content'>{content}</div>
          </div>
        </div>
      );
    }
  }

  function triggerModal() {
    setOpen(!open);
  }

  return [setContent, triggerModal];
}

export default useModal;
