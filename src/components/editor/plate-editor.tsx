'use client';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate-common/react';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { slateToHtml, slateToHtmlConfig } from '@slate-serializers/html';
import {Element} from 'domhandler'
export function PlateEditor() {
  const editor = useCreateEditor();

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onChange={({ editor, value }) => {
          console.log(editor, value);
          const html = slateToHtml(value, {
            ...slateToHtmlConfig,
            elementTransforms: {
              ...slateToHtmlConfig.elementTransforms,
              img: ({ node }) => {
                console.log(node);
                const src = node.url;
                return new Element('img', {
                  src: src,
                }, []);
              },
            },
          });
          console.log(html);
        }}
      >
        <EditorContainer>
          <Editor variant="default" />
        </EditorContainer>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
