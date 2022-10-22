import { Schema } from "mongoose";

export default interface IVideo {
    title: string;
    video_url: string;
    thumbnail_url: string;
    likes: number;
    user: Schema.Types.ObjectId;
}
