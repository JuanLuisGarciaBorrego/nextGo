import React, {useState, createContext, useContext} from 'react';
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

            setMessages([flashMessage].concat(messages));

            await setTimeout(() => {
                const msgs = messages;
                setMessages(msgs => msgs.filter(msg => msg !== flashMessage));
            }, timeClosed);
        }

        async function removeMessage(msg) {
            const update = await messages.filter(item => item !== msg)
            await setMessages(update);
        }

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


