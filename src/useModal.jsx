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
  const contentRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.keyCode === 27) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.getElementById("root").setAttribute("aria-hidden", "true");
      contentRef.current.focus();
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.getElementById("root").setAttribute("aria-hidden", "false");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function setContent(content) {
    document.body.style.overflow = "";
    if (open) {
      document.body.style.overflow = "hidden";
      return (
        <div className='useModal'>
          <div
            ref={modalRef}
            aria-modal={true}
            role='dialog'
            className='useModal-frame'
          >
            <div ref={contentRef} className='useModal-content' tabIndex={0}>
              {content}
            </div>
            <div
              className='useModal-closeBtn'
              tabIndex={0}
              onClick={() => triggerModal()}
              onKeyDown={(e) => {
                if (e.keyCode === 13) triggerModal();
              }}
            >
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
