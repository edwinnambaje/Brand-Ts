import mongoose from "mongoose";
export interface Ipost extends mongoose.Document {
  title: string,
  desc: string,
  image: string
}


const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
  },
  image: {
    type: String,
    required: false
  },

},
  { timestamps: true }
);
export default mongoose.model<Ipost>('Post', PostSchema)
