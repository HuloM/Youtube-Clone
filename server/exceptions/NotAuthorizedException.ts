import HttpException from "./HttpException";

class NotAuthorizedException extends HttpException {
    constructor() {
        super(401, `You are not authorized to do this action`);
    }
}

export default NotAuthorizedException;
