import axios from 'axios';
import store from './store';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

api.interceptors.request.use(config => {
    const state = store.getState();
    
    if (state.session.isLogged) {
        config.headers["authorization"] = `Bearer ${state.session.user.user_token}`;
    }

    if (config.method === "POST" || config.method === "PUT")
        config.headers["Content-Type"] = 'application/json; charset=UTF-8';

    return config;
});

export default api;