import React, {useState} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const Item = SortableElement(({item}) => {
    return <div className="first:col-span-2 first:row-span-2 flex relative cursor-move focus-visible:underline group">
        <div className="absolute w-full h-full z-0 rounded-md inset-0">
            <img className="inline-block rounded-md"
                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 alt=""/>
        </div>
        <div className="z-10 self-start justify-self-auto absolute p-1 text-red opacity-0 group-hover:opacity-100">
            <input className="leading-tight cursor-pointer absolute p-2" type="checkbox" />
        </div>
        <div className="z-10 flex self-center mx-auto">
            sdf
        </div>
    </div>}
);

const List = SortableContainer(({items}) => {

    return (
        <div className="bg-blue-700 relative">
            <div className="absolute w-full">
                <div className="grid gap-4 grid-cols-4 sm:grid-cols-5 box-grid p-4 bg-white ">
                    {items.map((item, key) => <div key={key} className="bg-gray-200 first:col-span-2 first:row-span-2 flex rounded-md"> </div>)}
                </div>
            </div>

            <div className="grid gap-4 grid-cols-4 sm:grid-cols-5 box-grid p-4 bg-white">
                {items.map((item, key) => {
                    return <Item key={`item-${key}`} index={key} item={item}/>
                })}
                <div className="group text-center flex relative border-dashed border-2 rounded-md hover:border-gray-400 transition duration-150 ease-in-out ">
                    <span className="text-gray-500 group-hover:text-gray-600 mx-auto font-medium leading-none p-2 text-sm text-center focus:outline-none focus:underline cursor-pointer">
                         <svg className="mx-auto text-center h-12 w-12 text-gray-300 group-hover:text-gray-400 " stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="font-normal block text-xs">Seleccione o  suelte las imágenes aquí </span>
                    </span>
                </div>
            </div>
        </div>
    );
});

export default function DemoPage() {
    const [items, setItems] = useState([1,2,3,4,5]);

    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems(arrayMove(items, oldIndex, newIndex));
    };

    return (
        <div className="max-w-2xl bg-blue-200 p-4">
            <List items={items} onSortEnd={onSortEnd} axis="xy" lockAxis="xy" hideSortableGhost={true} helperClass="opacity-50"/>
        </div>
    )
}
