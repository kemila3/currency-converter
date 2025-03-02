import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    currencyType:{
        type: String,
        required: true
    },
    FromCurrency:{
        type: String,
        required: true
    },
    ToCurrency:{
        type: String,
        required: true
    },
    TransferAmount:{
        type: String,
        required: true
    },
    ConvertedAmount:{
        type: String,
        required: true
    },
});

export default mongoose.model("Currency", Schema);
