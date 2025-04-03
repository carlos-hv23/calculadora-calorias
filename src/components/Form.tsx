import { useState} from 'react';
import type { Activity } from '../types/index';
import { categories} from "../data/categories"

export default function Form() {

    const [activity, setActivity ] = useState<Activity>({
        category: 0,
        name: '',
        calories: 0
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> ) => {
        const isNumber = ['calories', 'category'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumber ? +e.target.value : e.target.value
        })
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría</label>
                <select
                    className="border border-slate-300 rounded-lg p-2 w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    <option value="0">Seleccione una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}

                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input 
                    type="text"
                    id='name'
                    className="border border-slate-500 p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                    />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input 
                    id='calories'
                    type="number"
                    className="border border-slate-500 p-2 rounded-lg"
                    placeholder="Calorias. ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                    />
            </div>
            <input 
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
                value='Guardar Comida o Guardar Ejercicio' />
        </form>
    )
}
