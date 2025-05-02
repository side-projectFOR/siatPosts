import React, { useState } from 'react';

const PostCreatePage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const authors = ['길동이', 'string', 'JD'];
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        const newPost = {
            postAuthor: randomAuthor,
            postTitle: title,
            postContent: content,
        };
        console.log('Post Created:', newPost);
        // Add logic to send `newPost` to the server or state management
        setTitle('');
        setContent('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Content:
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px', height: '150px' }}
                            required
                        />
                    </label>
                </div>
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default PostCreatePage;