const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    description: { type: String, default: 'Tarjeta Virtual Prepago' },
    balance: { type: Number, default: 1000000 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    movements: { type: Array },
  },
  { timestamps: true }
);

const model = mongoose.model('product', productSchema);

module.exports = model;
