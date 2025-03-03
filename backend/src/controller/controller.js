import dotenv from "dotenv";
import { Schema } from "mongoose";
import Currency from "../models/model.js";
import { v4 as uuidv4 } from "uuid";
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

  const uuid = uuidv4();

  const newCurrency = new Currency({
    id: uuid,
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


export const deleteRecord = async (req, res) => {
  const { id } = req.params;

  const record = await Currency.findById(id);

  if
    (!record) {
    return res.status(404).json({
      status: 404,
      message: "Record not found",
    });
  }
  
  await Currency.findByIdAndDelete(id);
  return res.status(200).json({
    status: 200,
    message: "Record deleted successfully",
  });
}


export const getHistory = async(req, res) => {
  const history = await Currency.find();
  return res.status(200).json({
    status: 200,
    message: "History retrieved successfully",
    data: history,
  });
}

export const healthCheck = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Server is running",
  });
};
