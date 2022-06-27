import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {ccy, ChangeActionAC, fetchCurrencyTC} from './currencyReducer';
import CurrencyResult from './CurrencyResult';

const CurrencyExchangeContainer = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCurrencyTC());
    }, [dispatch]);
    const currencyFromReducer = useAppSelector(state => state.currency.currency);
    const isBuying = useAppSelector(state => state.currency.isBuying);
    const [currencyForResult, setCurrencyForResult] = useState(currencyFromReducer);
    const options: ccy[] = useAppSelector(state => state.currency.currency.map(c => c.ccy));
    useEffect(() => {
        setCurrencyForResult(currencyFromReducer);
    }, [currencyFromReducer]);
    const changeAction = (isBuying: boolean) => {
        dispatch(ChangeActionAC(isBuying));
    };

    // const total = ;
    const currentCurrency = (currency: ccy) => {
        switch (currency) {
            case currency: {
                const firstCurrency = currencyFromReducer.find(c => c.ccy === currency);
                if (firstCurrency) {
                    return setCurrencyForResult([firstCurrency, ...currencyFromReducer.filter(c => c.ccy !== currency)]);
                    // return  forresult = currencyFromReducer.map(c=>  ({ccy: c.ccy, result: +c.buy*+value, currency: c.buy }))
                } else return currencyFromReducer;
            }
            default: {
                return setCurrencyForResult(currencyFromReducer.filter(c => c.ccy !== 'USD'));
            }
        }
    };


    return (
        <div className="currencyInput">
            <CurrencyResult
                options={options}
                currentCurrency={currentCurrency}
                changeAction={changeAction}
                currencyForResult={currencyForResult}
                isBuying={isBuying}

            />
        </div>
    );
};

export default CurrencyExchangeContainer;