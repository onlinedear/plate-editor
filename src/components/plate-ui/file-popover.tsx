'use client';

import React, { useEffect } from 'react';

import {
  type WithRequiredKey,
  isSelectionExpanded,
} from '@udecode/plate-common';
import {
  useEditorSelector,
  useElement,
  useRemoveNodeButton,
} from '@udecode/plate-common/react';
import {
  FloatingMedia as FloatingMediaPrimitive,
  floatingMediaActions,
  useFloatingMediaSelectors,
} from '@udecode/plate-media/react';
import { Link, Trash2Icon } from 'lucide-react';
import { useReadOnly, useSelected } from 'slate-react';

import { Button, buttonVariants } from './button';
import { CaptionButton } from './caption';
import { inputVariants } from './input';
import { Popover, PopoverAnchor, PopoverContent } from './popover';
import { Separator } from './separator';

export interface FilePopoverProps {
  children: React.ReactNode;
  onOpenClick?: () => void;
}

export function FilePopover({ children, onOpenClick }: FilePopoverProps) {
  const readOnly = useReadOnly();
  const selected = useSelected();

  const selectionCollapsed = useEditorSelector(
    (editor) => !isSelectionExpanded(editor),
    []
  );
  const isOpen = !readOnly && selected && selectionCollapsed;

  useEffect(() => {
    if (!isOpen) {
      floatingMediaActions.isEditing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const element = useElement();
  const { props: buttonProps } = useRemoveNodeButton({ element });

  if (readOnly) return <>{children}</>;

  return (
    <Popover open={isOpen} modal={false}>
      <PopoverAnchor>{children}</PopoverAnchor>

      <PopoverContent
        className="w-auto p-1"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="box-content flex items-center">
          <Button
            variant="ghost"
            onClick={() => {
              onOpenClick?.();
            }}
          >
            查看文件
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button size="icon" variant="ghost" {...buttonProps}>
            <Trash2Icon />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
