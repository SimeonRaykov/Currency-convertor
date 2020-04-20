import React, { Fragment } from 'react'
import { Form } from 'react-bootstrap';

export default function CurrencyRow(props) {
    const { currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount } = props;
    return (
        <Fragment>
            <div className="row form-inline justify-content-around">
                <Form.Label></Form.Label>
                <Form.Control type="number" value={amount} onChange={onChangeAmount} placeholder="Enter number" />
                <Form.Control as="select" value={selectedCurrency} onChange={onChangeCurrency}>
                    {currencyOptions.map(currencyOption => (
                        <option key={currencyOption} value={currencyOption}>{currencyOption}</option>
                    ))}
                </Form.Control>
            </div>
        </Fragment>
    )
}
