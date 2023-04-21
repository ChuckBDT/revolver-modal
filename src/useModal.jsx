import { useState, useEffect, useRef } from "react";

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
    if (open) {
      return (
        <div className='useModal-bg fixed top-0 z-10 h-screen w-screen bg-primary/25 overflow-hidden flex justify-center items-center'>
          <div
            ref={modalRef}
            className='useModal-frame relative bg-tertiary p-8 m-4 rounded-2xl shadow-lg'
          >
            <div
              className='absolute top-3 right-3 cursor-pointer bg-secondary hover:bg-primary/10 rounded-md p-1'
              onClick={() => triggerModal()}
            >
              <svg
                stroke='currentColor'
                className='fill-primary'
                strokeWidth='0'
                viewBox='0 0 1024 1024'
                height='1.1em'
                width='1.1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z'></path>
              </svg>
            </div>
            <div className='useModal-content py-6'>{content}</div>
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
