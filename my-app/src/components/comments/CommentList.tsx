import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm ';
import { Comment } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const CommentListContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const CommentHeader = styled.h3`
  font-size: 1.3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  
  span {
    margin-left: ${({ theme }) => theme.spacing.xs};
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NoCommentsMessage = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-style: italic;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  text-align: center;
`;

interface CommentListProps {
  comments: Comment[];
  postIdx: number;
  slug: string;
  onAddComment: (content: string) => void;
  onUpdateComment: (commentIdx: number, content: string) => void;
  onDeleteComment: (commentIdx: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  postIdx,
  slug,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <CommentListContainer>
      <CommentHeader>
        댓글 <span>{comments.length}</span>
      </CommentHeader>
      
      <CommentForm postIdx={postIdx} slug={slug} onAddComment={onAddComment} />
      
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.commentIdx}
            comment={comment}
            isAuthor={user?.id === comment.userIdx}
            onUpdate={(content) => onUpdateComment(comment.commentIdx, content)}
            onDelete={() => onDeleteComment(comment.commentIdx)}
          />
        ))
      ) : (
        <NoCommentsMessage>
          첫 번째 댓글을 작성해 보세요!
        </NoCommentsMessage>
      )}
    </CommentListContainer>
  );
};

export default CommentList;
