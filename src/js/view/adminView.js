class AdminView {
    getInfo () {
        let info = {};

        //Validates info
        if (document.querySelector(DOMstrings.admin.title).value
        && document.querySelector(DOMstrings.admin.author).value !== 'Select post author'
        && document.querySelector(DOMstrings.admin.content).value
        && document.querySelector(DOMstrings.admin.image).textContent !== 'No image chosen'
        ) {
            info.title = document.querySelector(DOMstrings.admin.title).value;
            info.authorId = document.querySelector(DOMstrings.admin.author).options[document.querySelector(DOMstrings.admin.author).selectedIndex].id.split('userID-')[1];
            info.content = document.querySelector(DOMstrings.admin.content).value;
            info.imageUrl = document.querySelector(DOMstrings.admin.image).textContent;
        }
        
        //Returns the info object
        return info;
    }

    clearFields () {
        document.querySelector(DOMstrings.admin.title).value = '';
        document.querySelector(DOMstrings.admin.defaultAuthor).selected = true;
        document.querySelector(DOMstrings.admin.content).value = '';
        document.querySelector(DOMstrings.admin.image).textContent = 'No image chosen';
    }

    updateAuthors (authors) {
        const authorsElement = document.querySelector(DOMstrings.admin.author);

        //Creates an option element for each user/author
        Object.keys(authors).forEach(key => {
            let newOption = document.createElement('option');
            newOption.text = authors[key].name;
            newOption.id = 'userID-' + authors[key].userInfoID;
            authorsElement.add(newOption);
        });
    }

    resultNotification (result) {
        if (result === 'success') {
            alert('Post successfully published!')
        }
        else if (result === 'error') {
            alert('Error while publishing post!')
        }
    }
}