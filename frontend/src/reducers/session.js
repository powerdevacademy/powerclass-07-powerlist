const initialState = {
    isLogged: false,
    user: {}
};

const session = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isLogged: true,
                user: action.payload
            };  
        case 'LOGOUT':
            return {
                ...initialState
            };
        case 'UPDATE-USER':
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

export default session;