import { Dispatch, useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Activity } from '../types/index';
import { categories} from "../data/categories"
import { ActivityActions, ActivityState } from '../reducers/activityReducer';

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

export default function Form({dispatch, state}: FormProps) {

    const [activity, setActivity ] = useState<Activity>({
        id: uuidv4(),
        category: 0,
        name: '',
        calories: 0
    })

    useEffect(() => {
        if(state.activeId){
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
        }
        
    } , [state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> ) => {
        const isNumber = ['calories', 'category'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumber ? +e.target.value : e.target.value
        })
    }

    const handleTextSubmit = () => {
        const {category} = activity
        return category === 0 ? 'Elige una categoría' : category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'
    }

    const isValidActivity = () => {
        const { category,name, calories} = activity
        return name.trim() !== '' && calories > 0 && category !== 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: 'save-activity', payload: { newActivity: activity}})

        setActivity({
            id: uuidv4(),
            category: 0,
            name: '',
            calories: 0
        })
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
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
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-25"
                value={handleTextSubmit()} 
                disabled={!isValidActivity()}
                />
        </form>
    )
}
