import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useAutosave } from 'react-autosave';
import { Link } from 'react-router-dom';

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;

const CommentTextarea = styled.textarea<{ height?: string }>`
  width: 100%;
  min-height: ${props => props.height || '80px'};
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  resize: vertical;
  font-size: 1rem;
  font-family: inherit;
  
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SaveStatus = styled.span<{ active?: boolean }>`
  font-size: 0.85rem;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  align-self: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: 500;
  border: none;
  transition: ${({ theme }) => theme.transition};
`;

const SubmitButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textLight};
  
  &:hover {
    background-color: #f0f0f0;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textLight};
  }
  
  a {
    font-weight: 500;
  }
`;

interface CommentFormProps {
  postIdx?: number;
  slug?: string;
  initialValue?: string;
  onAddComment: (content: string) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

const LOCAL_STORAGE_KEY_PREFIX = 'comment_draft_';

const CommentForm: React.FC<CommentFormProps> = ({
  postIdx,
  slug,
  initialValue = '',
  onAddComment,
  onCancel,
  isEdit = false,
}) => {
  const storageKey = postIdx ? `${LOCAL_STORAGE_KEY_PREFIX}${slug}_${postIdx}` : '';
  const [comment, setComment] = useState<string>(initialValue || localStorage.getItem(storageKey) || '');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const user = useSelector((state: RootState) => state.auth.user);
  
  // 수정 모드일 때 textarea 자동 포커스
  useEffect(() => {
    if (isEdit && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEdit]);
  
  // 수정 모드가 아닐 때 댓글 임시저장 자동화
  useAutosave({
    data: comment,
    onSave: () => {
      if (!isEdit && storageKey && comment) {
        setIsSaving(true);
        localStorage.setItem(storageKey, comment);
        setTimeout(() => setIsSaving(false), 1000);
      }
    },
    interval: 2000,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment.trim());
      // 수정 모드가 아닐 때만 입력 필드와 localStorage 초기화
      if (!isEdit) {
        setComment('');
        if (storageKey) localStorage.removeItem(storageKey);
      }
    }
  };
  
  // if (!user) {
  //   return (
  //     <LoginPrompt>
  //       <p>댓글을 작성하려면 로그인이 필요합니다.</p>
  //       <Link to="/login">로그인하기</Link>
  //     </LoginPrompt>
  //   );
  // }
  
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <CommentTextarea
          ref={textareaRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          height={isEdit ? '100px' : undefined}
        />
        <FormActions>
          <SaveStatus active={isSaving}>
            {isSaving ? '저장 중...' : comment && !isEdit ? '자동 저장됨' : ''}
          </SaveStatus>
          <ActionButtons>
            {onCancel && (
              <CancelButton type="button" onClick={onCancel}>
                취소
              </CancelButton>
            )}
            <SubmitButton type="submit" disabled={!comment.trim()}>
              {isEdit ? '수정하기' : '댓글 작성'}
            </SubmitButton>
          </ActionButtons>
        </FormActions>
      </form>
    </FormContainer>
  );
};

export default CommentForm;
