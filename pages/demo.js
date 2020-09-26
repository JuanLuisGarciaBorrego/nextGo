import React, {useState} from 'react';
import FileComponent from "../src/components/Files/FileComponent";
import arrayMove from "array-move";


export default function DemoPage() {

    const listItems = [{
            uuid: "1",
            title: 'Titulo bla bla',
            description: 'jasjdfalsdfalsfasdf',
            path: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=760&h=650&q=80'
        },
        {
            uuid: "2",
            title: null,
            description: null,
            path: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=800&h=800&q=80'
        },
        {
            uuid: "3",
            title: null,
            description: null,
            path: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=780&h=725&q=80'
        },
        {
            uuid: "4",
            title: null,
            description: null,
            path: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=450&h=450&q=80'
        }
    ];

    const [items, setItems] = useState(listItems);

    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems(arrayMove(items, oldIndex, newIndex));
    };


    return (
        <div>
            <FileComponent
                elements={items}
                title="Imágenes"
                titleSelected="imágenes seleccionados"
                removeTitle="Eliminar imágenes"
                uploadTitle="Selecciona o suelta las imágenes aquí"
                uploadOnDrogTitle="Suelta las imágenes aquí"
                handleOnSortEnd={(elements) => setItems(elements)}
                fetchRemove={() => {}}
                seo={true}
            />
        </div>
    )
}
