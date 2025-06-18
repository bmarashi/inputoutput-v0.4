document.addEventListener('DOMContentLoaded', async function() {
    // Get references to DOM elements
    const titleInput = document.getElementById('titleInput');
    const postInput = document.getElementById('postInput');
    const postButton = document.getElementById('postButton');
    const postsSection = document.getElementById('postsSection');

    // Load posts when page loads
    await loadPosts();

    // Handle post button click
    postButton.addEventListener('click', async function() {
        const title = titleInput.value.trim();
        const content = postInput.value.trim();

        if (title && content) {
            try {
                const response = await fetch('/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, content })
                });

                if (!response.ok) {
                    throw new Error('Failed to post: ' + response.statusText);
                }

                titleInput.value = '';
                postInput.value = '';
                await loadPosts();
            } catch (error) {
                console.error('Error posting:', error);
                alert('Failed to post. Please try again. Error: ' + error.message);
            }
        } else {
            alert('Please enter both title and content');
        }
    });
});

async function loadPosts() {
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error('Failed to load posts: ' + response.statusText);
        }
        const posts = await response.json();
        postsSection.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            
            // Create title element
            const titleElement = document.createElement('h2');
            titleElement.textContent = post.title;
            
            // Create date element
            const dateElement = document.createElement('p');
            dateElement.className = 'date';
            dateElement.textContent = new Date(post.date_posted).toLocaleDateString();
            
            // Create content element and process links
            const contentElement = document.createElement('div');
            contentElement.className = 'post-content';
            
            // Process content for links
            const contentParts = post.content.split(/(https?:\/\/[^\s]+)/g);
            contentParts.forEach(part => {
                if (part.startsWith('http')) {
                    const link = document.createElement('a');
                    link.href = part;
                    link.textContent = part;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.className = 'post-link';
                    contentElement.appendChild(link);
                } else {
                    const text = document.createTextNode(part);
                    contentElement.appendChild(text);
                }
            });
            
            // Append all elements to the post
            postElement.appendChild(titleElement);
            postElement.appendChild(dateElement);
            postElement.appendChild(contentElement);
            
            postsSection.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
        alert('Failed to load posts. Please try again. Error: ' + error.message);
    }
}
