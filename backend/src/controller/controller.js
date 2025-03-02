import express from "express";
// import { url } from "../config/dbConfig";

export const ConvertedAmount = (req, res) => {
  const { FromCurrency, ToCurrency, TransferAmount } = req.body;

  const url = url.api;
};

export const healthCheck = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Server is running",
  });
};
