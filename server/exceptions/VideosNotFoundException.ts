import HttpException from "./HttpException";

class VideosNotFoundException extends HttpException {
    constructor() {
        super(404, `No videos currently exist`);
    }
}

export default VideosNotFoundException;
