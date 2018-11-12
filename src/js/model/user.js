class User {
    constructor (name, userName, profilPictureUrl, numberOfPosts, numberOfComments, registerDate) {
        this.name = name;
        this.userName = userName;
        this.profilPictureUrl = profilPictureUrl;
        this.numberOfPosts = numberOfPosts;
        this.numberOfComments = numberOfComments;
        this.registerDate = new Date(registerDate);
    }
}