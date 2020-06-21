import api from '../services/api';

export const login = ({username, password}, cb) => {
    return (dispatch) => {
        api.post('/login', {
            username,
            password
        }).then(({data}) => {
            dispatch({
                type: 'LOGIN',
                payload: data
            });
            cb(data);
        }).catch(err => {
            cb(null, err?.response?.data?.error || err);
        });
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}

export const update = (data) => {
    return {
        type: 'UPDATE-USER',
        payload: data
    }
}
