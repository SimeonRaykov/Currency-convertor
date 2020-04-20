import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }
  else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrencyOption = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrencyOption);
        setExchangeRate(data.rates[0]);
      });
  }, [])

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <Fragment>
      <Card className="mt-3">
        <Card.Body>
          <Card.Header className="text-center"><h2>Convert</h2></Card.Header>
          <CurrencyRow selectedCurrency={fromCurrency} onChangeAmount={handleFromAmountChange} amount={fromAmount} currencyOptions={currencyOptions} onChangeCurrency={e => setFromCurrency(e.target.value)} />
          <div className="equals text-center">=</div>
          <CurrencyRow selectedCurrency={toCurrency} onChangeAmount={handleToAmountChange} amount={toAmount} onChange currencyOptions={currencyOptions} onChangeCurrency={e => setToCurrency(e.target.value)} />
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default App;
