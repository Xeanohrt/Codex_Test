import mongoose from 'mongoose';

const crossReferenceSchema = new mongoose.Schema(
  {
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    sourcePage: { type: Number, required: true },
    targetPage: { type: Number, required: true },
    note: { type: String, default: '' }
  },
  { _id: false }
);

const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    content: { type: String, default: '' },
    pdfFilename: { type: String, required: true },
    pdfOriginalName: { type: String, required: true },
    crossReferences: { type: [crossReferenceSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Chapter', chapterSchema);
