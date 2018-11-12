class Post {
    constructor (title, content, imageUrl, dateOfPost, postingUserID, postingUser) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.dateOfPost = new Date(dateOfPost);
        this.postingUserID = postingUserID;
        this.postingUser = postingUser;
    }
}