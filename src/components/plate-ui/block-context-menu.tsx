'use client';

import { useCallback, useState } from 'react';

import { AIChatPlugin } from '@udecode/plate-ai/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { unsetNodes } from '@udecode/plate-common';
import {
  ParagraphPlugin,
  focusEditor,
  useEditorPlugin,
} from '@udecode/plate-common/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import {
  BLOCK_CONTEXT_MENU_ID,
  BlockMenuPlugin,
  BlockSelectionPlugin,
} from '@udecode/plate-selection/react';

import { useIsTouchDevice } from '@/hooks/use-is-touch-device';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './context-menu';

type Value = 'askAI' | null;

export function BlockContextMenu({ children }: { children: React.ReactNode }) {
  const { api, editor } = useEditorPlugin(BlockMenuPlugin);
  const [value, setValue] = useState<Value>(null);
  const isTouch = useIsTouchDevice();

  const handleTurnInto = useCallback(
    (type: string) => {
      editor
        .getApi(BlockSelectionPlugin)
        .blockSelection.getNodes()
        .forEach(([node, path]) => {
          if (node[IndentListPlugin.key]) {
            unsetNodes(editor, [IndentListPlugin.key, 'indent'], { at: path });
          }

          editor.tf.toggle.block({ type }, { at: path });
        });
    },
    [editor]
  );

  const handleAlign = useCallback(
    (align: 'center' | 'left' | 'right') => {
      editor
        .getTransforms(BlockSelectionPlugin)
        .blockSelection.setNodes({ align });
    },
    [editor]
  );

  if (isTouch) {
    return children;
  }

  return (
    <ContextMenu
      onOpenChange={(open) => {
        if (!open) {
          // prevent unselect the block selection
          setTimeout(() => {
            api.blockMenu.hide();
          }, 0);
        }
      }}
      modal={false}
    >
      <ContextMenuTrigger
        asChild
        onContextMenu={(event) => {
          const dataset = (event.target as HTMLElement).dataset;

          const disabled = dataset?.slateEditor === 'true';

          if (disabled) return event.preventDefault();

          api.blockMenu.show(BLOCK_CONTEXT_MENU_ID, {
            x: event.clientX,
            y: event.clientY,
          });
        }}
      >
        <div className="w-full">{children}</div>
      </ContextMenuTrigger>
      <ContextMenuContent
        className="w-64"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          editor.getApi(BlockSelectionPlugin).blockSelection.focus();

          if (value === 'askAI') {
            editor.getApi(AIChatPlugin).aiChat.show();
          }

          setValue(null);
        }}
      >
        <ContextMenuGroup>
          {/* <ContextMenuItem
            onClick={() => {
              setValue('askAI');
            }}
          >
            询问AI
          </ContextMenuItem> */}
          <ContextMenuItem
            onClick={() => {
              editor
                .getTransforms(BlockSelectionPlugin)
                .blockSelection.removeNodes();
              focusEditor(editor);
            }}
          >
            删除
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor
                .getTransforms(BlockSelectionPlugin)
                .blockSelection.duplicate(
                  editor.getApi(BlockSelectionPlugin).blockSelection.getNodes()
                );
            }}
          >
            复制
            {/* <ContextMenuShortcut>⌘ + D</ContextMenuShortcut> */}
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>文本</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem
                onClick={() => handleTurnInto(ParagraphPlugin.key)}
              >
                正文
              </ContextMenuItem>

              <ContextMenuItem onClick={() => handleTurnInto(HEADING_KEYS.h1)}>
                标题 1
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleTurnInto(HEADING_KEYS.h2)}>
                标题 2
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleTurnInto(HEADING_KEYS.h3)}>
                标题 3
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => handleTurnInto(BlockquotePlugin.key)}
              >
                引用
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>

        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() =>
              editor
                .getTransforms(BlockSelectionPlugin)
                .blockSelection.setIndent(1)
            }
          >
            增加缩进
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() =>
              editor
                .getTransforms(BlockSelectionPlugin)
                .blockSelection.setIndent(-1)
            }
          >
            减少缩进
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>对齐方式</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem onClick={() => handleAlign('left')}>
                左对齐
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleAlign('center')}>
                居中对齐
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleAlign('right')}>
                右对齐
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
