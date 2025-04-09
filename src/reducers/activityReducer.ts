import { Activity } from "../types"

export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity : Activity} } |
    { type: 'set-activeId', payload: { id: Activity['id']} } |
    { type: 'delete-activity', payload: { id: Activity['id']} } |
    { type: 'restart-app'}

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}
const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    if (activities) {
        return JSON.parse(activities)
    } else {
        return []
    }
}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState, 
    action: ActivityActions
    ) => {

    if (action.type === 'save-activity') {
        let  updateACtivities : Activity[] = []
        if (state.activeId) {
            updateACtivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            updateACtivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updateACtivities,
            activeId: ''
        }
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === 'delete-activity') {
        const filterActivities = state.activities.filter(activity => activity.id !== action.payload.id)
        return {
            ...state,
            activities: filterActivities
        }
    }

    if (action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}
