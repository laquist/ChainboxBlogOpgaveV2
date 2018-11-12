let view, homeView, postView, adminView;

class Controller {
    static newPost () {
        //Gets info from view
        const info = adminView.getInfo();

        //Creates new Post
        // const newPost = new Post(info.title, info.content, info.imageUrl, new Date(), info.authorId, data.users[info.authorId]); 
        
        //Saves (via the API)
        // DataAccess.savePost(newPost);
        // DataAccess.savePost(newPost, adminView.resultNotification);

        const failPost = new Post();
        DataAccess.savePost(failPost, adminView.resultNotification);
    
        //FEJL - Giver error selvom den var success
        // if (DataAccess.savePost(newPost)) {
        //     adminView.resultNotification('success');
        // }
        // else {
        //     adminView.resultNotification('error');
        // }

        //Clears fields
        adminView.clearFields();
    }

    static displayPosts () {
        //Loads posts from API and calls the callback function, to insert posts on the page
        DataAccess.loadAllPosts(homeView.displayPosts);
    }

    static displayPost (postID) {
        //Loads post from API and calls the callback function, to insert post on the page
        DataAccess.loadPost(postID, postView.displayPost);
    }

    static displayComments(postID) {
        //Loads comments from specfic post from API and calls the callback function, to insert comments on page
        DataAccess.loadPostComments(postID, postView.displayComments);
    }

    static updateAuthorForm () {
        //Loads users/authors from API and calls adminView.updateAuthors() (as callback function)
        DataAccess.loadAllUsers(adminView.updateAuthors);
    }

    static addEventListenerToPost (postID) {
        //Make blog posts clickable
        const postLinks = document.querySelectorAll('#postID-' + postID + ' .postLink');
        
        postLinks.forEach(postLink => {
            postLink.addEventListener('click', function () {
                //Saves the clicked post's ID to sessionStorage, to use it when post.html loads
                sessionStorage.setItem('postID', postID);
    
                //Changes page to post.html
                document.location = '/post.html';
            });
        });
    }

    static setupEventListeners () {
        const DOMstrings = view.getDOMstrings();

        if (document.URL.includes('index.html')) {
            //Page load
            window.addEventListener('load', function () {
                //Loads post previews to index.html
                Controller.displayPosts();

                //Sets chosen post/clicked post to 0 (none)
                sessionStorage.setItem('postID', 0);
            });
        }
        else if (document.URL.includes('post.html')) {
            window.addEventListener('load', function () {
                //Gets the postID from sessionStorage
                const postID = sessionStorage.getItem('postID');

                if (postID !== 0) {
                    Controller.displayPost(postID);
                    Controller.displayComments(postID);
                }
                else {
                    console.log('ERROR with loading postID from SessionStorage');
                }
            });
        }
        else if (document.URL.includes('admin.html')) {
            //'Publish' button
            document.querySelector(DOMstrings.admin.publishBtn).addEventListener('click', function () {
                Controller.newPost();
            });

            //'Chose Image' button
            document.querySelector(DOMstrings.admin.imageBtn).addEventListener('click', function () {
                let imgURL;

                //Checks if URL input has a value, so you can edit the value
                if (document.querySelector(DOMstrings.admin.image).textContent !== 'No image chosen') {
                    imgURL = prompt("Please enter the image URL", document.querySelector(DOMstrings.admin.image).textContent)
                }
                else {
                    imgURL = prompt("Please enter the image URL");
                }
                
                //Sets the chosen image if value is valid
                if (imgURL) {
                    document.querySelector(DOMstrings.admin.image).textContent = imgURL;
                }
            });

            //Page load
            window.addEventListener('load', function () {
                Controller.updateAuthorForm();
            });
        }
    }
    
    static initialize () {
        //Creates View instances
        view = new View();
        homeView = new HomeView();
        postView = new PostView();
        adminView = new AdminView();

        //Adds EventListeners
        Controller.setupEventListeners();
    }

    // static test () {
    //     DataAccess.loadUserPosts(1, Controller.print)
    // }

    // static print (data) {
    //     console.log(data);
    // }
}

// Starter
Controller.initialize();