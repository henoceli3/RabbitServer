import multer, { diskStorage } from "multer";
import { extname } from "path";

const storage = diskStorage({
  destination: function (req, file, cb) {
    // Configure le répertoire de destination en fonction du type de fichier
    if (req.body.fileType === "1") {
      cb(null, "./posts/images/");
    } else if (req.body.fileType === "2") {
      cb(null, "./posts/audios/");
    } else if (req.body.fileType === "3") {
      cb(null, "./posts/videos/");
    }
  },
  filename: function (req, file, cb) {
    const ext = extname(file.originalname);
    const fileName = `${req.body.idmembre}_${Date.now()}_${
      file.fieldname
    }${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
