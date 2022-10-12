
import multer from "multer"

/* const MIME_TYPES = {
   "image/jpg": "jpg",
   "image/jpeg": "jpg",
   "image/png": "png",
}; */

const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, "../public/images");
   },
   filename: (req, file, callback) => {
      // const name = file.originalname.split(" ").join("_");
      // const extension = MIME_TYPES[file.mimetype];
      callback(null, req.body.name, /* name + Date.now() + "." + extension */);
   },
});

export const upload = multer({ storage }).single("file");




