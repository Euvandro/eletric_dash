import axios from "axios";

export default axios.create({
    baseURL: 'https://metlab.rexlab.ufsc.br/eletrica/',
  });