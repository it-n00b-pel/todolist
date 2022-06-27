import React from 'react';
import {ccy} from './currencyReducer';
type CurrencyParametersContainerPropsType = {
    currentCurrency: (currency: ccy) => void
}

const CurrencyParametersContainer = (props: CurrencyParametersContainerPropsType) => {
    // const options: ccy[] = useAppSelector(state => state.currency.currency.map(c => c.ccy));
    // const dispatch= useAppDispatch()
    // const changeAction = (isBuying: boolean) => {
    //   dispatch(ChangeActionAC(isBuying))
    // }
    return (
        <div>
            {/*<CurrencyParameters options={options} currentCurrency={props.currentCurrency} changeAction = {changeAction}/>*/}
        </div>
    );
};

export default CurrencyParametersContainer;