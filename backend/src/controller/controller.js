import dotenv from "dotenv";
import { Schema } from "mongoose";
import Currency from "../models/model.js";
dotenv.config();

const apiKey = process.env.API_KEY;

export const ConvertedAmount = async (req, res) => {
  const { FromCurrency, ToCurrency, TransferAmount } = req.body;

  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${FromCurrency.toUpperCase()}`;

  if (!url) {
    return res.status(400).json({
      status: 400,
      message: "Invalid URL",
    });
  }

  const response = await fetch(url);
  const data = await response.json();
  const conversionRate = data.conversion_rates[ToCurrency.toUpperCase()];
  const amount = TransferAmount * conversionRate;
  const convertedAmount = amount.toFixed(2);

  const newCurrency = new Currency({
    FromCurrency,
    ToCurrency,
    TransferAmount,
    ConvertedAmount: convertedAmount,
  });

  await newCurrency.save();

  return res.status(200).json({
    status: 200,
    message: "Conversion successful",
    data: {
      FromCurrency,
      ToCurrency,
      TransferAmount,
      ConvertedAmount: convertedAmount,
    },
  });
};

export const healthCheck = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Server is running",
  });
};
