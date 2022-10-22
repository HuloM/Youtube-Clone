import { Schema, model } from "mongoose";
import IVideo from "../../interfaces/video.interface";

const videoSchema = new Schema<IVideo>({
    title: { type: "string", required: true },
    video_url: { type: "string", required: true },
    thumbnail_url: { type: "string", required: true },
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    likes: { type: "Number" },
});

export default model("Videos", videoSchema);
