import api from '../services/api';

export const addTodo = (item, cb) => {
    if (!cb) cb = () => {};
    return (dispatch) => {
        api.post('/todos', {
            item
        }).then(({data}) => {
            dispatch({
                type: 'ADD-TODO',
                payload: {
                    id: data.id,
                    item,
                    complete: 0
                }
            });
            cb();
        }).catch(err => cb(null, err?.response?.data?.error || err));;
    }
}

export const getTodos = (cb) => {
    if (!cb) cb = () => {};
    return (dispatch) => {
        api.get('/todos')
            .then(({data}) => {
                dispatch({
                    type: 'GET-TODOS',
                    payload: data
                })
                cb(data);
            })
            .catch(err => cb(null, err?.response?.data?.error || err));
    }
}

export const removeTodo = (id, cb) => {
    if (!cb) cb = () => {};
    return (dispatch) => {
        api.delete('/todos/'+id).then(() => {
            dispatch({
                type: "REMOVE-TODO",
                payload: id
            })
            cb();
        })
        .catch(err => cb(null, err?.response?.data?.error || err));
    }
}

export const toggleTodo = (id, cb) => {
    if (!cb) cb = () => {};

    return (dispatch) => {
        api.put('/todos/'+id+'/toggle').then(() => {
            dispatch({
                type: 'TOGGLE-TODO',
        payload: id
            })
            cb();
        })
        .catch(err => cb(null, err?.response?.data?.error || err));
    }
}

export const clearTodos = () => {
    return {
        type: "CLEAR-TODOS"
    }
}