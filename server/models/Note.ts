import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const NoteSchema = new Schema({
  title: { type: String, required: true },
});

const NoteModel = mongoose.model("Note", NoteSchema);

export default NoteModel;
