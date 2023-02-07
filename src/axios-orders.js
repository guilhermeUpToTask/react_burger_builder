import axios from "axios"

const instance = axios.create({
    baseURL: 'https://react-burger-builder-v8-default-rtdb.firebaseio.com'
})


export default instance;