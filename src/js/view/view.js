class View {  
    getDOMstrings () {
        return DOMstrings;
    }
}

const DOMstrings = {
    home: {
        articleContainer: '#articleContainer',
        navLink: '.nav-link',
    },
    post: {
        navLink: '.nav-link',
        headerImgContainer: '#headerImgContainer',
        contentContainer: '#contentContainer',
        date: '#postDate',
        title: '#postTitle',
        author: '#postAuthor',
        commentContainer: '#commentContainer'
    },
    admin: {
        title: '#titleInput',
        author: '#authorSelect',
        defaultAuthor: '#default',
        content: '#contentInput',
        image: '#imageInput',
        imageBtn: '#imageInputBtn',
        publishBtn: '#publishBtn',
    }
};

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];