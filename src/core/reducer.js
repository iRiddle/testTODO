const listReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload]
        case 'REMOVE':
            return state.filter((item, index) => index !== action.payload)
        case 'UPDATE':
            {
                let tempArray = state.slice()
                tempArray.splice(action.payload, 1, action.upd_value)
                return tempArray
            }

        default:
            return state
    }
}

export default listReducer