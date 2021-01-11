const mongoose = require('mongoose');
const { Schema } = mongoose;

const tranfersSchema = new Schema(
  {
    monto: { type: String, required: true },
    fecha: { type: Date, required: true },
    destino: { type: String, required: true },
    tipo: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { timestamps: true }
);

const model = mongoose.model('tranfers', tranfersSchema);

module.exports = model;
