import {AppThunk} from '../../store/store';
import {currencyAPI} from '../../api/currencyAPI';
import {ACTION_TYPE} from '../../store/ENUM/ENUM';

export type ccy = 'USD' | 'UAH' | 'EUR' | 'RUR' | 'BTC'
type base_ccy = 'UAH' | 'USD'

export type Currency = {
    ccy: ccy,
    base_ccy: base_ccy,
    buy: string,
    sale: string,
}

export type ActionTypesForCurrency = ReturnType<typeof setCurrencyAC> | ReturnType<typeof ChangeActionAC>;

type initialStateForCurrencyType = {
    currency: Currency[],
    isBuying: boolean
}
const initialStateForCurrency: initialStateForCurrencyType = {
    currency: [],
    isBuying: true
};

export const currencyReducer = (state = initialStateForCurrency, action: ActionTypesForCurrency): initialStateForCurrencyType => {
    switch (action.type) {
        case ACTION_TYPE.SET_CURRENCY:
            return {...state, currency: action.currency.map(c => c), isBuying: true};
        case ACTION_TYPE.CHANGE_CHANGE_ACTION: {
            return {...state, isBuying: action.isBuying};
        }
        default:
            return state;
    }
};

export const ChangeActionAC = (isBuying: boolean) => {
    return {
        type: ACTION_TYPE.CHANGE_CHANGE_ACTION, isBuying
    } as const;
};

const setCurrencyAC = (currency: Currency[]) => {
    return {
        type: ACTION_TYPE.SET_CURRENCY,
        currency: currency
    } as const;
};

export const fetchCurrencyTC = (): AppThunk => (dispatch) => {
    currencyAPI.getCurrency().then(res => {
        dispatch(setCurrencyAC(res.data));
        // console.log(res.data);
    });
};