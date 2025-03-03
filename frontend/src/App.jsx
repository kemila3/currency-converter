import React from "react";
import {
  AppBar,
  Card,
  FormControl,
  InputLabel,
  Toolbar,
  Typography,
  CardContent,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { CssBaseline } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import axios from "axios";
import { useState } from "react";


const countries = [
  { label: "USD", value: "USA" },
  { label: "LKR", value: "Sri Lanka" },
  { label: "AUD", value: "Australia" },
  { label: "INR", value: "India" },
];

const App = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("LKR");
  const [amount, setAmount] = useState(1);
  const [ConvertedAmount, setConvertedAmount] = useState(null);
  const [history, setHistory] = useState([]);

  const convertCurrency = async () => {
    const response = await axios.post("http://localhost:3000/convert", {
      fromCurrency,
      toCurrency,
      amount,
    });

    setConvertedAmount(response.data.data.ConvertedAmount);
  }

  const getHistory = async () => {
    const response = await axios.get("http://localhost:3000/history");

    setHistory(response.data.data);
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar align="center">
          <CurrencyExchangeIcon style={{ marginRight: 10 }} />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Currency Converter
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: 50, maxWidth: 500, margin: "auto" }}>
        <Card>
          <CardContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>From Currency</InputLabel>
              <Select
                value={fromCurrency}
                onChange={(e) => {
                  setFromCurrency(e.target.value);
                }}
              >
                {countries.map((country) => {
                  return (
                    <MenuItem key={country.label} value={country.label}>
                      {country.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>To Currency</InputLabel>
              <Select
                value={toCurrency}
                onChange={(e) => {
                  setToCurrency(e.target.value);
                }}
              >
                {countries.map((country) => {
                  return (
                    <MenuItem key={country.label} value={country.label}>
                      {country.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />

            <Button variant="contained" fullWidth color="primary">Transter Amount</Button>

              {ConvertedAmount && <Typography variant="h6">Converted Amount: {ConvertedAmount}</Typography>}


              
          </CardContent>
        </Card>

        <Typography variant="h6">History</Typography>
      </div>
    </>
  );
};

export default App;
