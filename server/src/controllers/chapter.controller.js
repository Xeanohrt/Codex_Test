import Chapter from '../models/chapter.model.js';

export const createChapter = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'PDF upload is required.' });
    }

    if (!req.body.title?.trim()) {
      return res.status(400).json({ message: 'Chapter title is required.' });
    }

    const chapter = await Chapter.create({
      title: req.body.title.trim(),
      summary: req.body.summary?.trim() || '',
      content: req.body.content?.trim() || '',
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
    const chapters = await Chapter.find()
      .sort({ createdAt: -1 })
      .populate('crossReferences.chapterId', 'title pdfOriginalName');
    return res.json(chapters);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch chapters.', error: error.message });
  }
};

export const updateChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content } = req.body;
    const updated = await Chapter.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(summary !== undefined ? { summary: summary.trim() } : {}),
        ...(content !== undefined ? { content: content.trim() } : {})
      },
      { new: true, runValidators: true }
    ).populate('crossReferences.chapterId', 'title pdfOriginalName');

    if (!updated) {
      return res.status(404).json({ message: 'Chapter not found.' });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update chapter.', error: error.message });
  }
};

export const addCrossReference = async (req, res) => {
  try {
    const { id } = req.params;
    const { chapterId, sourcePage, targetPage, note } = req.body;

    if (!chapterId || !Number.isInteger(sourcePage) || !Number.isInteger(targetPage)) {
      return res.status(400).json({ message: 'chapterId, sourcePage, and targetPage are required integers.' });
    }

    const chapter = await Chapter.findById(id);
    if (!chapter) {
      return res.status(404).json({ message: 'Source chapter not found.' });
    }

    const targetChapter = await Chapter.findById(chapterId);
    if (!targetChapter) {
      return res.status(404).json({ message: 'Target chapter not found.' });
    }

    chapter.crossReferences.push({ chapterId, sourcePage, targetPage, note: note?.trim() || '' });
    await chapter.save();

    const populated = await chapter.populate('crossReferences.chapterId', 'title pdfOriginalName');
    return res.json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add cross reference.', error: error.message });
  }
};
