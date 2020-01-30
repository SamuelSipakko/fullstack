
const reducer = (state, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.filter
        default:
            return ''
    }
}

export const setFilter = (text) => ({
    type: 'FILTER',
    filter: text
})

export default reducer