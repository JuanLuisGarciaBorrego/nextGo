import React, {useState, createContext, useContext, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

export const FlashMessagesContext = createContext({
    messages: [],
    addFlashMessage: () => {
    },
});

const FlashMessagesContextProvider = ({children}) => {
    const [messages, setMessages] = useState([]);

    async function addFlashMessage(type, title, description = null, autoClosed = true, timeClosed = 2000) {

        const flashMessage = {
            uuid: uuidv4(),
            type: type,
            title: title,
            description: description,
            autoClosed: autoClosed,
            timeClosed: timeClosed,
            status: true
        };

        setMessages([flashMessage, ...messages]);

        return flashMessage;
    }

    return (
        <FlashMessagesContext.Provider value={{
            messages,
            addFlashMessage
        }}>
            {children}
        </FlashMessagesContext.Provider>
    )
};
export default FlashMessagesContextProvider;

export function useFlashMessages() {
    return useContext(FlashMessagesContext);
}


