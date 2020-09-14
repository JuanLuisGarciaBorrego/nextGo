import React, {useState, createContext, useContext, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

export const FlashMessagesContext = createContext({
    messages: [],
    addFlashMessage: () => {
    },
});

const FlashMessagesContextProvider = ({children}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        clear();
    }, [messages])

    async function addFlashMessage(title, description = null, autoClosed = true, timeClosed = 2000) {

        const flashMessage = {
            uuid: uuidv4(),
            title: title,
            description: description,
            autoClosed: autoClosed,
            timeClosed: timeClosed,
            status: true
        };

        setMessages([flashMessage, ...messages]);

        return flashMessage;
    }

    async function closedMessage(uuid) {
        const updateMessages = messages.map(msg => {
            if (msg.uuid === uuid) {
                console.log('Eliminado', uuid)
                return {
                    ...msg,
                    status: false
                }
            } else {
                return msg;
            }
        });

        setMessages(updateMessages);
    }

    return (
        <FlashMessagesContext.Provider value={{
            messages,
            addFlashMessage,
            closedMessage
        }}>
            {children}
        </FlashMessagesContext.Provider>
    )
};
export default FlashMessagesContextProvider;

export function useFlashMessages() {
    return useContext(FlashMessagesContext);
}


