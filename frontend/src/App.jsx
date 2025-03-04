import React, { useEffect, useState } from "react";
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
  CssBaseline,
  Grid,
  Paper,
  Stack,
  Grid2,
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import HistoryIcon from "@mui/icons-material/History";
import axios from "axios";

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
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [history, setHistory] = useState([]);

  const convertCurrency = async () => {
    const response = await axios.post("http://localhost:3000/convert", {
      FromCurrency: fromCurrency,
      ToCurrency: toCurrency,
      TransferAmount: amount,
    });
    setConvertedAmount(response.data.data.ConvertedAmount);
    getHistory(); // Fetch history after conversion
  };

  const getHistory = async () => {
    const response = await axios.get("http://localhost:3000/history");
    setHistory(response.data.data.reverse());
  };

  useEffect(() => {
    getHistory();
    const interval = setInterval(getHistory, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CurrencyExchangeIcon sx={{ marginRight: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Currency Converter
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid2 container spacing={4} justifyContent="center" sx={{ mt: 5 }}>
        {/* Currency Converter Section */}
        <Grid2 item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>
              Convert Currency
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>From Currency</InputLabel>
              <Select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.label} value={country.label}>
                    {country.value} ({country.label})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>To Currency</InputLabel>
              <Select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.label} value={country.label}>
                    {country.value} ({country.label})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              color="primary"
              sx={{ mt: 2 }}
              onClick={convertCurrency}
            >
              Convert
            </Button>

            {convertedAmount && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                Converted Amount: {convertedAmount}
              </Typography>
            )}
          </Paper>
        </Grid2>

        {/* Transaction History Section */}
        <Grid2 item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3, maxHeight: 400, overflowY: 'auto' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <HistoryIcon color="primary" />
              <Typography variant="h5">Transaction History</Typography>
            </Stack>

            {history.length === 0 ? (
              <Typography sx={{ mt: 2 }}>No transactions found.</Typography>
            ) : (
              history.map((record, index) => (
                <Card key={index} sx={{ mt: 2, p: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>
                        <strong>{record.FromCurrency}</strong> →
                        <strong> {record.ToCurrency}</strong>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {new Date(record.createdAt).toLocaleString()}
                      </Typography>
                    </Stack>
                    <Typography>Amount: {record.TransferAmount}</Typography>
                    <Typography>
                      Converted: <strong>{record.ConvertedAmount}</strong>
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default App;
