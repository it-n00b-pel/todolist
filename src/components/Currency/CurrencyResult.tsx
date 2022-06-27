import React, {ChangeEvent, useState} from 'react';
import {ccy, Currency} from './currencyReducer';
import TextField from '@mui/material/TextField';
import {NativeSelect} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import privat24 from '../../util/cdnlogo.com_privat-bank.svg';

type CurrencyResultPropsType = {
    currencyForResult: Currency[],
    options: ccy[],
    currentCurrency: (currency: ccy) => void,
    changeAction: (isBuying: boolean) => void,
    isBuying: boolean
}

const CurrencyResult = (props: CurrencyResultPropsType) => {
    const [value, setValue] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState<ccy>('USD');
    const mappedOptions: JSX.Element[] = props.options.map((o) => ( // map options with key
        <option onClick={() => (props.currentCurrency(o))} key={o} value={o} label={o}>
            {o}
        </option>
        // <div>
        //     <MenuItem onClick={() => (props.currentCurrency(o))} value={o} >{o}</MenuItem>
        // </div>
    ));

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        props.currentCurrency(e.currentTarget.value as ccy);
        setSelectedCurrency(e.currentTarget.value as ccy);
    };
    const onclickHandler = (isBuying: boolean) => {
        props.changeAction(isBuying);
    };

    let currency = props.currencyForResult.find(c => c.ccy === selectedCurrency);
    let total = 1;
    if (currency) {
        if (props.isBuying) {
            total = +(+currency.sale * +value).toFixed(2);
        } else total = +(+currency.buy * +value).toFixed(2);
    }

    return (
        <div>
            <div>
                <div className="currencyParameters">
                    <TextField value={value} id="standard-basic" label="Currency" variant="standard" onChange={(event) => (setValue(event.currentTarget.value))} size="small"/>
                    <FormControl>
                        <NativeSelect
                            defaultValue={'USD'}
                            onChange={onChangeCallback}
                        >
                            {mappedOptions}
                        </NativeSelect>
                    </FormControl>
                    <img className="privat24logo" src={privat24} alt="privat24 logo"/>
                </div>
                <div className="actionCurrency">
                    <span>I WANT</span>
                    <ButtonGroup variant="contained" aria-label="small button group">
                        <Button className={props.isBuying?"actionActive":""} color="success" onClick={() => onclickHandler(true)}>BUY</Button>
                        <Button className={!props.isBuying?"actionActive":""} color="warning" onClick={() => onclickHandler(false)}>SALE</Button>

                    </ButtonGroup>
                </div>
            </div>
            {props.currencyForResult.map((c, index) => (c.ccy !== 'BTC' ?
                <div key={c.ccy + c.sale}>
                    {props.isBuying ?
                        <div className="resultCurrency">
                            {selectedCurrency === c.ccy ?
                                <div className="resultCurrencyLeft">
                                        <span>{total}   </span>
                                    <span>{c.base_ccy}    </span>
                                </div>
                                :
                                <div className="resultCurrencyLeft">
                                    <span>{(total / +c.sale).toFixed(2)}     </span>
                                   <span>{index === 0 ? c.base_ccy : c.ccy}   </span>
                              </div>}
                            <span>{props.isBuying ? Number(c.sale).toFixed(2) : Number(c.sale).toFixed(2)}</span>
                        </div>
                        :
                        <div className="resultCurrency">
                            {selectedCurrency === c.ccy ?
                                // <span>{total}   </span>
                                <div className="resultCurrencyLeft">
                                        <span>{total}   </span>
                                    <span>{c.base_ccy}    </span>
                                </div>
                                :
                                // <span>{(total / +c.buy).toFixed(2)}     </span>}
                                <div    className="resultCurrencyLeft">
                                    <span>{(total / +c.buy).toFixed(2)}     </span>
                                   <span>{index === 0 ? c.base_ccy : c.ccy}   </span>
                              </div>}
                            <span>{props.isBuying ? Number(c.buy).toFixed(2) : Number(c.buy).toFixed(2)}</span>
                        </div>
                    }
                </div>
                :
                <div className="resultCurrency" >
                    {/*{c.buy} {c.ccy} {c.sale}*/}
                    <span>{c.buy}</span>
                    <span>{c.ccy}</span>
                    <span>{c.sale}</span>
                </div>))}

        </div>
    );
};

export default CurrencyResult;