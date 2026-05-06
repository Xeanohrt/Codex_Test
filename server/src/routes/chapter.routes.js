import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { createChapter, getChapters, addCrossReference } from '../controllers/chapter.controller.js';

const router = Router();
const uploadsDir = 'uploads';

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are supported.'));
    }
    return cb(null, true);
  }
});

router.get('/', getChapters);
router.post('/', upload.single('pdf'), createChapter);
router.patch('/:id/references', addCrossReference);

export default router;
