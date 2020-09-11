import React, {useState} from 'react'

export const useOpen = (initialStatusIsActive = false) => {
    const [isOpen, setIsOpen] = useState(initialStatusIsActive);
    const toggle = () => setIsOpen(!isOpen);

    return [isOpen, setIsOpen, toggle]
}
