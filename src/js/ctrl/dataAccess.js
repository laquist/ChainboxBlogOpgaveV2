class DataAccess {
    //Load all users
    static loadAllUsers (callBackFunc) {
        const requestInfo = {
            user: true,
            userId: 0,
            post: false,
            postId: 0,
            comment: false,
            commentId: 0
        };

        DataAccess.loadData(requestInfo, callBackFunc);
    }

    //Load specific user
    static loadUser (userID, callBackFunc) {
        const requestInfo = {
            user: true,
            userId: parseInt(userID),
            post: false,
            postId: 0,
            comment: false,
            commentId: 0
        };

        DataAccess.loadData(requestInfo, callBackFunc);
    }

    //Load all posts
    static loadAllPosts (callBackFunc) {
        const requestInfo = {
            user: false,
            userId: 0,
            post: true,
            postId: 0,
            comment: false,
            commentId: 0
        };

        DataAccess.loadData(requestInfo, callBackFunc);
    }

    //Load specific post
    static loadPost (postID, callBackFunc) {
        const requestInfo = {
            user: false,
            userId: 0,
            post: true,
            postId: parseInt(postID),
            comment: false,
            commentId: 0
        };

        DataAccess.loadData(requestInfo, callBackFunc);
    }

    //Load all posts from specific user
    static loadUserPosts (userID, callBackFunc) {
        const requestInfo = {
            user: true,
            userId: parseInt(userID),
            post: true,
            postId: 0,
            comment: false,
            commentId: 0
        };

        DataAccess.loadData(requestInfo, callBackFunc);
    }

    //Load specific post from user
    static loadUserPost (userID, postID, callBackFunc) {
        const requestInfo = {
            user: false,
            userId: parseInt(userID),
            post: true,
            postId: parseInt(postID),
            comment: false,
            commentId: 0
        };

        DataAccess.loadData(requestInfo, callBackFunc);
    }

    //Load all comments (From all posts)
    static loadAllComments (callBackFunc) {
        const requestInfo = {
            user: false,
            userId: 0,
            post: false,
            postId: 0,
            comment: true,
            commentId: 0
        };

        DataAccess.loadData(requestInfo, callBackFunc);
    }
    
    //Load specific comment
    static loadComment (commentID, callBackFunc) {
        const requestInfo = {
            user: false,
            userId: 0,
            post: false,
            postId: 0,
            comment: true,
            commentId: parseInt(commentID)
        };

        DataAccess.loadData(requestInfo, callBackFunc);
    }
    
    //Load all comments from specific post
    static loadPostComments (postID, callBackFunc) {
        const requestInfo = {
            user: false,
            userId: 0,
            post: true,
            postId: parseInt(postID),
            comment: true,
            commentId: 0
        };

        DataAccess.loadData(requestInfo, callBackFunc);
    }

    //Load all comments from specific user
    static loadUserComments (userID, callBackFunc) {
        const requestInfo = {
            user: true,
            userId: parseInt(userID),
            post: false,
            postId: 0,
            comment: true,
            commentId: 0
        };

        DataAccess.loadData(requestInfo, callBackFunc);
    }

    static loadData (requestInfo, callBackFunc) {
        let url = 'https://localhost:44321/api/';

        //Validates requestInfo
        if (typeof(requestInfo.user) === 'boolean'
        && typeof(requestInfo.post) === 'boolean'
        && typeof(requestInfo.comment === 'boolean')
        && Number.isInteger(requestInfo.userId)
        && Number.isInteger(requestInfo.postId)
        && Number.isInteger(requestInfo.commentId)
        ){
            //All posts from specific user - Not available
            if (requestInfo.user && requestInfo.post && requestInfo.userId != 0) {
                url += 'userinfoes/' + requestInfo.userId + '/posts';
                                
                //Return object
                let userPosts = {};

                axios.get(url)
                .then(function (response) {
                    //Adds each post to data object
                    response.data.forEach(post => {
                        //Creates User object
                        // const postingUser = new User(post.postingUser.name, post.postingUser.username, post.postingUser.profilPictureUrl, post.postingUser.numberOfPosts, post.postingUser.numberOfComments, new Date(post.postingUser.registerDate));
                        //Er null i API svaret
                        const postingUser = null;

                        //Sets user ID
                        // postingUser.userInfoID = post.postingUser.userInfoID;

                        //Creates new Post object
                        let newPost = new Post(post.title, post.content, post.imageUrl, new Date(post.dateOfPost), post.postingUserID, postingUser);

                        //Sets post ID
                        newPost.postId = post.postId;
                        
                        //Adds user to data object
                        data.posts[newPost.postId] = newPost;

                        //Adds to the return object
                        userPosts[newPost.postId] = newPost;
                    });

                    //Runs the callBack function with the result
                    callBackFunc(userPosts);
                })
                .catch (function (error) {
                    console.log(error);
                });
            }
            //All comments from specific user
            else if (requestInfo.user && requestInfo.userId != 0 && requestInfo.comment) {
                url += 'userinfoes/' + requestInfo.userId + '/comments' ;

                //Return Object
                let userComments = {};

                axios.get(url)
                .then(function (response) {               
                    if (response.data.length !== 0) { 
                        if (response.data.length > 1) {
                            response.data.forEach(comment => {
                                //Creates postingUser object
                                // const postingUser = new User(comment.post.postingUser.name, comment.post.postingUser.username, comment.post.postingUser.profilPictureUrl, comment.post.postingUser.numberOfPosts, comment.post.postingUser.numberOfComments, new Date(comment.post.postingUser.registerDate));
                                //Er null i API svaret
                                const postingUser = null;

                                //Sets postingUser's userInfoID
                                // postingUser.userInfoID = comment.post.postingUser.userInfoID;
        
                                //Creates post object
                                const post = new Post(comment.post.title, comment.post.content, comment.post.imageUrl, new Date(comment.post.dateOfPost), comment.post.postingUserID, postingUser);
                                
                                //Sets post's postID
                                post.postId = comment.post.postId;
        
                                //Creates commentingUser object
                                const commentingUser = new User(comment.commentingUser.name, comment.commentingUser.username, comment.commentingUser.profilPictureUrl, comment.commentingUser.numberOfPosts, comment.commentingUser.numberOfComments, new Date(comment.commentingUser.registerDate));
        
                                //Sets commentingUser's userInfoId
                                commentingUser.userInfoID = comment.commentingUser.userInfoID;
                                
                                //Creates new comment object
                                const newComment = new Comment(commentingUser, post, comment.content, new Date(comment.dateOfComment));
        
                                //Sets new comment's commentId
                                newComment.commentId = comment.commentId;
        
                                //Adds comment to data object
                                data.comments[newComment.commentId] = newComment;
        
                                //Adds to the return object
                                userComments[newComment.commentId] = newComment;
                            });
                        }
                        else {
                            const comment = response.data;

                            //Creates postingUser object
                            // const postingUser = new User(comment.post.postingUser.name, comment.post.postingUser.username, comment.post.postingUser.profilPictureUrl, comment.post.postingUser.numberOfPosts, comment.post.postingUser.numberOfComments, new Date(comment.post.postingUser.registerDate));
                            //Er null i API svaret
                            const postingUser = null;

                            //Sets postingUser's userInfoID
                            // postingUser.userInfoID = comment.post.postingUser.userInfoID;

                            //Creates post object
                            const post = new Post(comment.post.title, comment.post.content, comment.post.imageUrl, new Date(comment.post.dateOfPost), comment.post.postingUserID, postingUser);
                            
                            //Sets post's postID
                            post.postId = comment.post.postId;

                            //Creates commentingUser object
                            const commentingUser = new User(comment.commentingUser.name, comment.commentingUser.username, comment.commentingUser.profilPictureUrl, comment.commentingUser.numberOfPosts, comment.commentingUser.numberOfComments, new Date(comment.commentingUser.registerDate));

                            //Sets commentingUser's userInfoId
                            commentingUser.userInfoID = comment.commentingUser.userInfoID;
                            
                            //Creates new comment object
                            const newComment = new Comment(commentingUser, post, comment.content, new Date(comment.dateOfComment));

                            //Sets new comment's commentId
                            newComment.commentId = comment.commentId;

                            //Adds comment to data object
                            data.comments[newComment.commentId] = newComment;

                            //Adds to the return object
                            userComments[newComment.commentId] = newComment;
                        }

                        //Runs the callBack function with the result
                        callBackFunc(userComments);
                    }
                })
                .catch (function (error) {
                    console.log(error);
                });
            }
            //Specific user
            else if (requestInfo.user && requestInfo.userId != 0) {
                url += 'userinfoes' + '/' + requestInfo.userId;

                axios.get(url)
                .then(function (response) {
                    //Creates new User object
                    let newUser = new User(response.data.name, response.data.username, response.data.profilPictureUrl, response.data.numberOfPosts, response.data.numberOfComments, response.data.registerDate);

                    //Sets user ID
                    newUser.userInfoID = response.data.userInfoID;
                    
                    //Adds user to data object
                    data.users[newUser.userId] = newUser;

                    //Runs the callBack function with the result
                    callBackFunc(data.users[newUser.userId]);
                })
                .catch (function (error) {
                    console.log(error);
                });
            }
            //All users
            else if (requestInfo.user) {
                url += 'userinfoes';

                axios.get(url)
                .then(function (response) {
                    //Adds each user to data object
                    response.data.forEach(user => {
                        //Creates new User object
                        let newUser = new User(user.name, user.username, user.profilPictureUrl, user.numberOfPosts, user.numberOfComments, user.registerDate);

                        //Sets user ID
                        newUser.userInfoID = user.userInfoID;
                        
                        //Adds user to data object
                        data.users[newUser.userInfoID] = newUser;
                    });

                    //Runs the callBack function with the result
                    callBackFunc(data.users);
                })
                .catch (function (error) {
                    console.log(error);
                });
            }
            //All comments from specific post
            else if (requestInfo.post && requestInfo.postId != 0 && requestInfo.comment) {
                url += 'posts/' + requestInfo.postId + '/comments' ;

                //Return Object
                let postComments = {};

                axios.get(url)
                .then(function (response) {
                    response.data.forEach(comment => {
                        //Creates postingUser object
                        const postingUser = new User(comment.post.postingUser.name, comment.post.postingUser.username, comment.post.postingUser.profilPictureUrl, comment.post.postingUser.numberOfPosts, comment.post.postingUser.numberOfComments, new Date(comment.post.postingUser.registerDate));

                        //Sets postingUser's userInfoID
                        postingUser.userInfoID = comment.post.postingUser.userInfoID;

                        //Creates post object
                        const post = new Post(comment.post.title, comment.post.content, comment.post.imageUrl, new Date(comment.post.dateOfPost), comment.post.postingUserID, postingUser);
                        
                        //Sets post's postID
                        post.postId = comment.post.postId;

                        //Creates commentingUser object
                        const commentingUser = new User(comment.commentingUser.name, comment.commentingUser.username, comment.commentingUser.profilPictureUrl, comment.commentingUser.numberOfPosts, comment.commentingUser.numberOfComments, new Date(comment.commentingUser.registerDate));

                        //Sets commentingUser's userInfoId
                        commentingUser.userInfoID = comment.commentingUser.userInfoID;
                        
                        //Creates new comment object
                        const newComment = new Comment(commentingUser, post, comment.content, new Date(comment.dateOfComment));

                        //Sets new comment's commentId
                        newComment.commentId = comment.commentId;

                        //Adds comment to data object
                        data.comments[newComment.commentId] = newComment;

                        //Adds to the return object
                        postComments[newComment.commentId] = newComment;
                    });

                    //Runs the callBack function with the result
                    callBackFunc(postComments);
                })
                .catch (function (error) {
                    console.log(error);
                });
            }
            //Specfic post
            else if (requestInfo.post && requestInfo.postId != 0) {
                url += 'posts/' + requestInfo.postId;
    
                axios.get(url)
                .then(function (response) {
                    //Creates User object
                    const postingUser = new User(response.data.postingUser.name, response.data.postingUser.username, response.data.postingUser.profilPictureUrl, response.data.postingUser.numberOfPosts, response.data.postingUser.numberOfComments, response.data.postingUser.registerDate);

                    //Sets user ID
                    postingUser.userInfoID = response.data.userInfoID;
                    
                    //Creates new Post object
                    let newPost = new Post(response.data.title, response.data.content, response.data.imageUrl, new Date(response.data.dateOfPost), response.data.postingUserID, postingUser);
                    
                    //Sets post ID
                    newPost.postId = response.data.postId;
                    
                    //Adds user to data object
                    data.posts[newPost.postId] = newPost;

                    //Runs the callBack function with the result
                    callBackFunc(data.posts[newPost.postId]);
                })

                .catch (function (error) {
                    console.log(error);
                });
            }
            //All posts
            else if (requestInfo.post) {
                url += 'posts';
    
                axios.get(url)
                .then(function (response) {
                    //Adds each post to data object
                    response.data.forEach(post => {
                        //Creates User object
                        const postingUser = new User(post.postingUser.name, post.postingUser.username, post.postingUser.profilPictureUrl, post.postingUser.numberOfPosts, post.postingUser.numberOfComments, new Date(post.postingUser.registerDate));
                        
                        //Sets user ID
                        postingUser.userInfoID = post.postingUser.userInfoID;

                        //Creates new Post object
                        let newPost = new Post(post.title, post.content, post.imageUrl, new Date(post.dateOfPost), post.postingUserID, postingUser);

                        //Sets post ID
                        newPost.postId = post.postId;
                        
                        //Adds user to data object
                        data.posts[newPost.postId] = newPost;
                    });

                    //Runs the callBack function with the result
                    callBackFunc(data.posts);
                })
                .catch (function (error) {
                    console.error(error);
                });
            }
            //Specific comment
            else if (requestInfo.comment && requestInfo.commentId != 0) {
                url += 'comments/' + requestInfo.commentId;

                axios.get(url)
                .then(function (response) {
                    //Creates postingUser object
                    const postingUser = new User(response.data.post.postingUser.name, response.data.post.postingUser.username, response.data.post.postingUser.profilPictureUrl, response.data.post.postingUser.numberOfPosts, response.data.post.postingUser.numberOfComments, new Date(response.data.post.postingUser.registerDate));

                    //Sets postingUser's userInfoID
                    postingUser.userInfoID = response.data.post.postingUser.userInfoID;

                    //Creates post object
                    const post = new Post(response.data.post.title, response.data.post.content, response.data.post.imageUrl, new Date(response.data.post.dateOfPost), response.data.post.postingUserID, postingUser);
                    
                    //Sets post's postID
                    post.postId = response.data.post.postId;

                    //Creates commentingUser object
                    const commentingUser = new User(response.data.commentingUser.name, response.data.commentingUser.username, response.data.commentingUser.profilPictureUrl, response.data.commentingUser.numberOfPosts, response.data.commentingUser.numberOfComments, new Date(response.data.commentingUser.registerDate));

                    //Sets commentingUser's userInfoId
                    commentingUser.userInfoID = response.data.commentingUser.userInfoID;
                    
                    //Creates new comment object
                    const newComment = new Comment(commentingUser, post, response.data.content, new Date(response.data.dateOfComment));

                    //Sets new comment's commentId
                    newComment.commentId = response.data.commentId;

                    //Adds comment to data object
                    data.comments[newComment.commentId] = newComment;

                    //Runs the callBack function with the result
                    callBackFunc(data.comments[newComment.commentId]);
                })
                .catch (function (error) {
                    console.log(error);
                });
            }
            //All comments
            else if (requestInfo.comment) {
                url += 'comments';

                axios.get(url)
                .then(function (response) {
                    response.data.forEach(comment => {
                        //Creates postingUser object
                        const postingUser = new User(comment.post.postingUser.name, comment.post.postingUser.username, comment.post.postingUser.profilPictureUrl, comment.post.postingUser.numberOfPosts, comment.post.postingUser.numberOfComments, new Date(comment.post.postingUser.registerDate));

                        //Sets postingUser's userInfoID
                        postingUser.userInfoID = comment.post.postingUser.userInfoID;

                        //Creates post object
                        const post = new Post(comment.post.title, comment.post.content, comment.post.imageUrl, new Date(comment.post.dateOfPost), comment.post.postingUserID, postingUser);
                        
                        //Sets post's postID
                        post.postId = comment.post.postId;

                        //Creates commentingUser object
                        const commentingUser = new User(comment.commentingUser.name, comment.commentingUser.username, comment.commentingUser.profilPictureUrl, comment.commentingUser.numberOfPosts, comment.commentingUser.numberOfComments, new Date(comment.commentingUser.registerDate));

                        //Sets commentingUser's userInfoId
                        commentingUser.userInfoID = comment.commentingUser.userInfoID;
                        
                        //Creates new comment object
                        const newComment = new Comment(commentingUser, post, comment.content, new Date(comment.dateOfComment));

                        //Sets new comment's commentId
                        newComment.commentId = comment.commentId;

                        //Adds comment to data object
                        data.comments[newComment.commentId] = newComment;
                    });

                    //Runs the callBack function with the result
                    callBackFunc(data.comments);
                })
                .catch (function (error) {
                    console.log(error);
                });
            }
        }
        else {
            console.log('Error in (requestInfo) types');
        }
    }

    //Save post
    static savePost (post, callBackFunc) {
        const url = 'https://localhost:44321/api/posts/';

        DataAccess.saveData(url, post, callBackFunc);
    }

    //Save user
    static saveUser (user) {
        const url = 'https://localhost:44321/api/userinfoes/';

        DataAccess.saveData(url, user);
    }

    static saveData (url, data, callBackFunc) {
        axios.post(url, data)
        .then(function (response) {
            console.log('Successfully saved')
            callBackFunc('success'); //evt callBackFunc('success', response)
        })
        .catch(function (error) {
            console.error('Error while saving');
            callBackFunc('error'); //evt callBackFunc('error', error)
            // return error;
        });
    }
}

let data = {
    users: {},
    posts: {},
    comments: {}
};