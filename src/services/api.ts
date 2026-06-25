//cria uma instancia 
import axios from 'axios';

const apiSigfaz = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
});

export default apiSigfaz;