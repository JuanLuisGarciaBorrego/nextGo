import React, {useState, useEffect} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

export default function DemoPage() {
    const [items, setItems] = useState([
        {
            uuid: "1",
            data: {
                title: 'Uno',
            }
        },
        {
            uuid: "2",
            data: {
                title: 'Dos',
            }
        },
        {
            uuid: "3",
            data: {
                title: 'Tres',
            }
        },
        {
            uuid: "4",
            data: {
                title: 'Cuatro',
            }
        }
    ]);

    useEffect(() => {
        const itemsWithCheckedProperty = items.map(e => {
            return {
                ...e,
                checked: false
            }
        });

        setItems(itemsWithCheckedProperty);
        setTotalChecked(0);
    }, [])

    const [totalChecked, setTotalChecked] = useState(0);

    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems(arrayMove(items, oldIndex, newIndex));
    };

    const handleChecked = (e, item) => {
        let totalItemsChecked = totalChecked;
        const update = items.map((el) => {
                if(el.uuid === item.uuid) {
                    if(e.target.checked){
                        totalItemsChecked ++;
                    }else{
                        totalItemsChecked --;
                    }
                    return {
                        ...item,
                        checked: e.target.checked
                    }
                }

                return el;
        });

        setItems(update);
        setTotalChecked(totalItemsChecked);
    };

    const handleRemove = () => {
        console.log('remove items checked');
    }

    const openFileModal = () => {
        console.log('jajaja');
    }

    const Item = SortableElement(({item }) => {
        return <div className="first:col-span-2 first:row-span-2 flex relative cursor-move focus-visible:underline group rounded-md z-10" >
            <div className="flex justify-center items-center w-full h-full z-0 rounded-md inset-0 group text-center" >
                <img className="rounded-md absolute z-0 group-hover:opacity-50" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" onClick={openFileModal}/>
                <svg className="relative z-10 h-6 w-6 text-gray-600 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"  onClick={openFileModal}/>
                </svg>
            </div>
            <div className={`z-20 self-start justify-self-auto absolute p-1 text-red ${!item.checked && 'opacity-0' } group-hover:opacity-100 transition duration-500 ease-in-out`}>
                <input className="leading-tight cursor-pointer absolute p-2" type="checkbox" defaultChecked={item.checked} onChange={(e) => handleChecked(e, item)} />
            </div>
        </div>}
    );

    const List = SortableContainer(({items}) => {

        return (
            <div className="relative bg-white overflow-hidden p-4">
                <div className="flex justify-between items-center pb-4">
                    {totalChecked === 0 ? <h3 className="text-lg leading-none font-medium text-gray-900">
                        Imágenes
                    </h3>: <p className="font-medium text-gray-700 cursor-pointer">{totalChecked} imágenes seleccionados</p>
                    }
                    <p className="mt-1 max-w-2xl text-xs leading-5 text-red-500 hover:text-red-700 flex items-center cursor-pointer" onClick={handleRemove}>
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar imágenes
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute w-full">
                        <div className="grid gap-2 sm:gap-4 grid-cols-4 sm:grid-cols-5 box-grid bg-white ">
                            {items.map((item, key) => <div key={key} className="bg-gray-200 first:col-span-2 first:row-span-2 flex rounded-md"> </div>)}
                        </div>
                    </div>

                    <div className="grid gap-2 sm:gap-4 grid-cols-4 sm:grid-cols-5 box-grid bg-white">
                        {items.map((item, key) => {
                            return <Item key={item.uuid} index={key} item={item}/>
                        })}
                        <div className="z-0 group text-center flex relative border-dashed border-2 rounded-md hover:border-gray-400 transition duration-150 ease-in-out ">
                            <span className="text-gray-500 group-hover:text-gray-600 mx-auto self-center font-medium leading-none p-2 text-sm text-center focus:outline-none focus:underline cursor-pointer">
                                 <svg className="mx-auto text-center h-12 w-12 text-gray-300 group-hover:text-gray-400 " stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="hidden sm:block font-normal block text-xs">Seleccione o  suelte las imágenes aquí </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="max-w-2xl bg-gray-200 p-4">
            <List items={items} onSortEnd={onSortEnd} axis="xy" lockAxis="xy" hideSortableGhost={true} helperClass="opacity-50" distance={1}/>
        </div>
    )
}
