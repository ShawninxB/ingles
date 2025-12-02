// Sample initial posts data
let posts = [
    {
        id: 1,
        title: "Understanding Algorithmic Bias in Hiring Systems",
        content: "I've been researching how AI hiring tools can inadvertently discriminate against certain demographics. The case studies from major tech companies show that even well-intentioned algorithms can perpetuate existing biases if not properly audited.",
        author: "Sarah Chen",
        date: "2024-01-15",
        replies: []
    },
    {
        id: 2,
        title: "Racial Discrimination in Facial Recognition Technology",
        content: "Recent studies have shown significant accuracy disparities in facial recognition systems across different racial groups. This has serious implications for law enforcement and security applications. What are your thoughts on regulation and oversight?",
        author: "Marcus Johnson",
        date: "2024-01-14",
        replies: []
    },
    {
        id: 3,
        title: "Gender Bias in Language Models",
        content: "I've been analyzing how large language models often reinforce gender stereotypes. For example, when asked about professions, they frequently associate nursing with women and engineering with men. How can we train more balanced models?",
        author: "Dr. Emily Rodriguez",
        date: "2024-01-13",
        replies: []
    }
];

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const newPostBtn = document.getElementById('newPostBtn');
const postModal = document.getElementById('postModal');
const closeModal = document.querySelector('.close');
const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');

// Navigation functionality
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update active nav link
        navLinks.forEach(nl => nl.classList.remove('active'));
        link.classList.add('active');
        
        // Show target section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
        
        // Load posts if going to discussions
        if (targetId === 'discussions') {
            loadPosts();
        }
    });
});

// Modal functionality
newPostBtn.addEventListener('click', () => {
    postModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    postModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === postModal) {
        postModal.style.display = 'none';
    }
});

// Form submission
postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const author = document.getElementById('postAuthor').value;
    
    const newPost = {
        id: posts.length + 1,
        title: title,
        content: content,
        author: author,
        date: new Date().toISOString().split('T')[0],
        replies: []
    };
    
    posts.unshift(newPost); // Add to beginning of array
    loadPosts();
    
    // Reset form and close modal
    postForm.reset();
    postModal.style.display = 'none';
});

// Load and display posts
function loadPosts() {
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No discussions yet. Be the first to start a conversation!</p>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <h3 class="post-title">${post.title}</h3>
                <span class="post-author">By ${post.author} • ${post.date}</span>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
            </div>
            ${post.replies.length > 0 ? 
                `<div class="post-replies">
                    <small>${post.replies.length} ${post.replies.length === 1 ? 'reply' : 'replies'}</small>
                </div>` : 
                ''
            }
        `;
        
        postsContainer.appendChild(postElement);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load initial posts if on discussions page
    if (window.location.hash === '#discussions' || 
        !window.location.hash && document.querySelector('.nav-link.active').getAttribute('href') === '#discussions') {
        loadPosts();
    }
});

// Add some sample functionality for demonstration
console.log('AI Bias Forum loaded successfully!');
console.log('Key features:');
console.log('- Navigation between different sections');
console.log('- Dynamic post creation and display');
console.log('- Responsive design for mobile devices');
console.log('- Modal form for new posts');