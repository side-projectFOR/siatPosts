import React, { useState } from 'react';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Comment } from '../../types';
import CommentForm from './CommentForm ';

const CommentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;

const CommentContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const CommentAuthor = styled.div`
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CommentDate = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: normal;
`;

const CommentText = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0;
  white-space: pre-line;
  word-break: break-word;
`;

const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: #f0f0f0;
  }
`;

interface CommentItemProps {
  comment: Comment;
  isAuthor: boolean;
  onUpdate: (content: string) => void;
  onDelete: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  isAuthor,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleUpdate = (content: string) => {
    onUpdate(content);
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      onDelete();
    }
  };
  
  return (
    <CommentContainer>
      {isEditing ? (
        <CommentForm
          initialValue={comment.commentContent}
          onAddComment={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isEdit
        />
      ) : (
        <CommentContent>
          <CommentAuthor>
            {comment.commentAuthor}
            <CommentDate>
              {formatDistanceToNow(new Date(comment.regDate), {
                addSuffix: true,
                locale: ko,
              })}
            </CommentDate>
          </CommentAuthor>
          <CommentText>{comment.commentContent}</CommentText>
          {isAuthor && (
            <CommentActions>
              <ActionButton onClick={() => setIsEditing(true)}>수정</ActionButton>
              <ActionButton onClick={handleDelete}>삭제</ActionButton>
            </CommentActions>
          )}
        </CommentContent>
      )}
    </CommentContainer>
  );
};

export default CommentItem;
