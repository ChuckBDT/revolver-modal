import { useState, useEffect, useRef } from "react";
import closeIcon from "./assets/closeIcon";

function useModal(props) {
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
        <div className='useModal-bg fixed top-0 z-10 h-screen w-screen bg-primary/50 overflow-hidden flex justify-center items-center'>
          <div
            ref={modalRef}
            className='useModal-frame relative bg-tertiary p-8 m-4 rounded-2xl shadow-lg'
          >
            <div
              className='absolute top-3 right-3 cursor-pointer'
              onClick={() => triggerModal()}
            >
              <closeIcon fill={props.closeFill} />
            </div>
            <div className='useModal-content py-2'>{content}</div>
          </div>
        </div>
      );
    }
  }

  function triggerModal() {
    setOpen(true);
  }

  return [setContent, triggerModal];
}

export default useModal;
