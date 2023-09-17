import multer from 'multer';
import path from 'path';

const FILE_SIZE_LIMIT = 30 * 1024 * 1024;

export const file = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/img/');
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const fileName = path.basename(file.originalname, ext) + Date.now() + ext;
            cb(null, fileName);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(new Error('jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.'));
        }
    },
    limits: { fileSize: FILE_SIZE_LIMIT },
});
