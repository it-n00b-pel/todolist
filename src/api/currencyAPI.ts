import axios from 'axios';
import {Currency} from '../components/Currency/currencyReducer';

export const currencyAPI = {
    getCurrency() {
        return axios.get<Currency[]>('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
    }
};