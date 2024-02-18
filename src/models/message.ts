import mongoose from "mongoose";


export interface Imessage extends mongoose.Document {
  name: string,
  email: string,
  subject: string,
  message: string,
}
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
  },
  message: {
    type: String,
    required: false
  }

},
  { timestamps: true }
);
export default mongoose.model<Imessage>('Message', messageSchema)