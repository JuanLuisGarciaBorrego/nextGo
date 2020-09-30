import React, {useState, useEffect} from 'react';

export default function HomePage() {

    const [options, setOptions] = useState([]);

    const [variants, setVariants] = useState([]);

    const handleCartesian = (options) => {
        const cartesian = (a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
        const allItems = options.map(option => option.items);

        let output = cartesian(allItems);

        const myVariants = output.map((item) => {
            let name = item.join(' - ');
            let price = variants.find((e) => e.name === name)

            return {
                name: name,
                price: price ? price : '0.0',
                ref: ''
            }
        });
        setOptions(options);
        setVariants(myVariants)
    }

    const first = () => {
        let newOptions = [
            {
                name: 'Color',
                items: ['Rojo', 'Amarillo']
            },
            {
                name: 'Talla',
                items: ['s', 'm']
            },
            {
                name: 'Material',
                items: ['cuero', 'plastico']
            },
        ];

        setOptions(newOptions);
        handleCartesian(newOptions)
    }
    const add = () => {
        let newOptions = [
            {
                name: 'Color',
                items: ['Rojo', 'Amarillo', 'Azul']
            },
            {
                name: 'Talla',
                items: ['s', 'm']
            },
            {
                name: 'Material',
                items: ['cuero', 'plastico']
            },
        ];

        setOptions(newOptions);
        handleCartesian(newOptions)
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        const update = variants.map(variant => {
            if(variant.name === name) {
                return {
                    ...variant,
                    price: value
                }
            }else{
                return variant;
            }
        })

        setVariants(update);
    };

    console.log(variants)

    return (
        <div>
            <h1 onClick={first}>Init</h1>
            <h2 onClick={add}>Añadir variantes</h2>
            {variants?.map((item) => {
                return <div key={item.name}>
                    {item.name} - Precio: <input type="text" name={item.name} onChange={handleChange}
                                                className="border border-red-600"/>
                </div>
            })}

        </div>
    )
}
