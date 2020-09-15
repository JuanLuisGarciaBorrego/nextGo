import React, {useState, createContext, useContext, useEffect, useRef} from 'react';
import {v4 as uuidv4} from 'uuid';

export const FlashMessagesContext = createContext({
    messages: [],
    addFlashMessage: () => {
    },
});

const FlashMessagesContextProvider = ({children}) => {
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //
    //
    //     removeIfAutoClose();
    // }, [messages]);

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

        await setMessages([flashMessage, ...messages]);
    }

    async function removeMessage(msg) {
        const update = await messages.filter(item => item !== msg)
        // const index = messages.findIndex(item => item.uuid === msg.uuid);
        // const msgs = [...messages];
        // msgs[]

        console.log('update ', update.length)
        await setMessages(update);
    }

    console.log(messages);
    return (
        <FlashMessagesContext.Provider value={{
            messages,
            addFlashMessage,
            removeMessage
        }}>
            {children}
        </FlashMessagesContext.Provider>
    )
};
export default FlashMessagesContextProvider;

export function useFlashMessages() {
    return useContext(FlashMessagesContext);
}


