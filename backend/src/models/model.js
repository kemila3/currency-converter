import mongoose from "mongoose";

const Schema = new mongoose.Schema({
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
},
{
    timestamps: true
});

const Currency =  mongoose.model("Currency", Schema);
export default Currency;
