'use client';

import React from 'react';

import { useCommentAddButton } from '@udecode/plate-comments/react';
import { MessageSquarePlus } from 'lucide-react';

import { ToolbarButton } from './toolbar';

export function CommentToolbarButton() {
  const { hidden, props } = useCommentAddButton();

  if (hidden) return null;

  return (
    <ToolbarButton tooltip="评论 (⌘+⇧+M)" {...props}>
      <MessageSquarePlus />
    </ToolbarButton>
  );
}
