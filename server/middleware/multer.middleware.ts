import { Request } from "express";
import multer, { Multer } from "multer";

const storage = multer.diskStorage({
    // setting file upload destination to public/images from project root dir
    destination: function (
        _req: Request,
        file: Express.Multer.File,
        cb: Function
    ) {
        let path: string = "";
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        )
            path = "public/thumbnails";
        else if (file.mimetype === "video/mp4") path = "public/videos";
        cb(null, path);
    },
    // setting up custom file names to not overwrite existing files with exact same names
    filename: function (
        _req: Request,
        file: Express.Multer.File,
        cb: Function
    ) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.originalname
            .replace("public", "")
            .replace(" ", "-");
        cb(null, uniqueSuffix + "-" + filename);
    },
});
// check if file is of type png, jpg, or jpeg
const fileFilter = (_req: Request, file: Express.Multer.File, cb: Function) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "video/mp4"
    )
        cb(null, true);
    else cb(null, false);
};

export default multer({ storage: storage, fileFilter: fileFilter }).fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
]);
