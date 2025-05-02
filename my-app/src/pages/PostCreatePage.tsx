import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreatePostMutation } from '../api/apiSlice';

const PostCreatePage: React.FC = () => {
    const { slug = 'free' } = useParams<{ slug?: string }>(); // URL에서 boardSlug 가져오기
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createPost, { isLoading, error }] = useCreatePostMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const authors = ['길동이', 'string', 'JD'];
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        
        try {
            // RTK Query mutation 호출
            const result = await createPost({
                slug,
                body: {
                    postTitle: title,
                    postContent: content,
                    postAuthor: randomAuthor,
                    isSecret: false,
                    postPassword: '1234'
                }
            }).unwrap();
            
            console.log('Post Created:', result);
            // 성공 시 게시글 목록 또는 상세 페이지로 이동
            navigate(`/${slug}/posts/${result.postIdx}`);
        } catch (err) {
            console.error('Failed to create post:', err);
            // 에러 처리 - 에러 메시지 표시 등
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Create a New Post</h1>
            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    게시글 생성 중 오류가 발생했습니다. 다시 시도해주세요.
                </div>
            )}
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
                <button 
                    type="submit" 
                    style={{ padding: '10px 20px', cursor: 'pointer' }}
                    disabled={isLoading}
                >
                    {isLoading ? '게시 중...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default PostCreatePage;
