'use client';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate-common/react';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';

export function PlateEditor() {
  const editor = useCreateEditor();

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} onChange={(value) =>{
         console.log(value)
        const { editor } = value;
        // 获取纯文本
        // const text = editor.getText(editor);
       
      }}>
        <EditorContainer>
          <Editor variant='default'  />
        </EditorContainer>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
