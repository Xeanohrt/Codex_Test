import Chapter from '../models/chapter.model.js';

export const createChapter = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'PDF upload is required.' });
    }

    const chapter = await Chapter.create({
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      pdfFilename: req.file.filename,
      pdfOriginalName: req.file.originalname
    });

    return res.status(201).json(chapter);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create chapter.', error: error.message });
  }
};

export const getChapters = async (_req, res) => {
  try {
    const chapters = await Chapter.find().sort({ createdAt: -1 });
    return res.json(chapters);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch chapters.', error: error.message });
  }
};

export const addCrossReference = async (req, res) => {
  try {
    const { id } = req.params;
    const { chapterId, sourcePage, targetPage, note } = req.body;

    const chapter = await Chapter.findByIdAndUpdate(
      id,
      {
        $push: {
          crossReferences: { chapterId, sourcePage, targetPage, note }
        }
      },
      { new: true }
    );

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found.' });
    }

    return res.json(chapter);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add cross reference.', error: error.message });
  }
};
