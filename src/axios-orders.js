import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-my-burger-be310.firebaseio.com/'
});

export default instance;