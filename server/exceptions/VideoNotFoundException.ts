import HttpException from "./HttpException";

class VideoNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Video with id ${id} not found`);
    }
}

export default VideoNotFoundException;
