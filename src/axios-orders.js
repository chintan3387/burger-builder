import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-cd.firebaseio.com/'
});

export default instance;