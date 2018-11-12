class PostView {
    displayPost (post) {
        //Changes title on page tab
        document.title = post.title;
        
        //Inserts Header image
        const imageHTML = `<img class="w-100" src="${post.imageUrl}" alt="${post.title}"></img>`;
        document.querySelector(DOMstrings.post.headerImgContainer).insertAdjacentHTML('afterbegin', imageHTML);
        
        //Inserts Header date, title, author
        const dateString = post.dateOfPost.getDate() + ' ' + months[post.dateOfPost.getMonth()] + ' ' + post.dateOfPost.getFullYear();
        document.querySelector(DOMstrings.post.date).insertAdjacentHTML('afterbegin', dateString);
        document.querySelector(DOMstrings.post.title).insertAdjacentHTML('afterbegin', post.title);
        document.querySelector(DOMstrings.post.author).insertAdjacentHTML('afterbegin', 'BY ' + post.postingUser.name);
        
        //Inserts Content
        const contentContainer = document.querySelector(DOMstrings.post.contentContainer);

        const contentHTML = `
        <article class="py-5 px-md-5 mx-md-5" id="postContent">
            <p>${post.content}</p>
        </article>
        `;
        
        contentContainer.insertAdjacentHTML('beforeend', contentHTML);
    }
    
    displayComments (comments) {
        const commentContainer = document.querySelector(DOMstrings.post.commentContainer);
        
        if (comments.length !== 0) {
            Object.keys(comments).forEach(commentKey => {
                const comment = comments[commentKey];

                //Creates HTML
                const html = `
                <article class="d-flex mb-5" id="commentID-${comment.commentId}">
                <img src="${comment.commentingUser.profilPictureUrl}" alt="${comment.commentingUser.name}">
                
              
                    <div class="d-flex flex-column justify-content-between py-1 ml-4">
                        <p class="m-0 font-weight-bold" id="commentAuthor">${comment.commentingUser.name}</p>
                        <p class="m-0" id="commentContent">${comment.content}</p>
                        <a class="commentReply m-0 text-muted">Svar</a>
                    </div>
                </article>
                `;

                commentContainer.insertAdjacentHTML('beforeend', html);
            });
        }
    }
}