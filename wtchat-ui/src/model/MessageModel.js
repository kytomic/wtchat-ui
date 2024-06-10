class MessageModel {
    constructor(body, senderId) {
        this.body = body;
        this.senderId = senderId;
        this.status = 1;
    }
}

export default MessageModel;