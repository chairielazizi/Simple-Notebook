import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const BookSchema = new Schema({
  title: { type: String, required: true },
});

const BookModel = mongoose.model("Book", BookSchema);

export default BookModel;
