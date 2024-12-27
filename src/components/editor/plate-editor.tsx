'use client';

import React, { useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate-common/react';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { slateToHtml, slateToHtmlConfig } from '@slate-serializers/html';
import { Element, Text } from 'domhandler';
import { toggleElementTransform } from '@/utils/transform-html/toggle-transform';
import { pElementTransform } from '@/utils/transform-html/p-transform';
import { videoElementTramsform } from '@/utils/transform-html/video-transform';
import { imageElementTramsform } from '@/utils/transform-html/image-transform';
import { audioElementTramsform } from '@/utils/transform-html/audio-transform';
import { fileElementTramsform } from '@/utils/transform-html/file-transform';
import {
  columnElementTransform,
  columnGroupElementTransform,
} from '@/utils/transform-html/column-transform';
import { dateElementTransform } from '@/utils/transform-html/date-transform';
import {
  tableCellElementTransform,
  tableElementTransform,
  tableHeaderCellElementTransform,
  tableRowElementTransform,
} from '@/utils/transform-html/table-transform';
import { hrElementTransform } from '@/utils/transform-html/hr-transform';
import {
  codeBlockElementTransform,
  codeLineElementTransform,
} from '@/utils/transform-html/code-block.transform';
export function PlateEditor() {
  const editor = useCreateEditor();
  // const getHtml = () => {
  //   console.log(editor.children[0].children);
  //   const nodes = editor.children;
  //   const html = editor.api.htmlReact.serialize({
  //     nodes: nodes,
  //     plateProps: { readOnly: true },
  //     // if you use @udecode/plate-dnd
  //     dndWrapper: (props) => <DndProvider backend={HTML5Backend} {...props} />,
  //   });
  //   console.log(html);
  // };

  const htmlRef = useRef<any>();

  const getHtml = () => {
    const nodes = editor.children;
    const html = slateToHtml(nodes, {
      ...slateToHtmlConfig,
      markTransforms: {
        ...slateToHtmlConfig.markTransforms,
        code: () => {
          return new Element('code', {
            class:
              'whitespace-pre-wrap rounded-md bg-muted px-[0.3em] py-[0.2em] font-mono text-sm m-0.5 slate-code',
          });
        },
        kbd: () => {
          return new Element('kbd', {
            class:
              'rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-sm slate-kbd',
          });
        },
        superscript: () => {
          return new Element('sup', {
            class: 'slate-sup',
          });
        },
        subscript: () => {
          return new Element('sub', {
            class: 'slate-sub',
          });
        },
        color: ({ node }) => {
          return new Element('span', {
            style: `color: ${node.color}`,
          });
        },
        backgroundColor: ({ node }) => {
          return new Element('span', {
            style: `background-color: ${node.backgroundColor}`,
          });
        },
        highlight: () => {
          return new Element('mark', {
            class: 'bg-highlight/30 text-inherit slate-highlight',
          });
        },
        text: ({ node, attribs }) => {
          return new Element(
            'span',
            {
              class: 'slate-text',
            },
            [new Text(node.text)]
          );
        },
      },
      elementTransforms: {
        ...slateToHtmlConfig.elementTransforms,
        a: ({ node, children }) => {
          return new Element(
            'a',
            {
              class: 'slate-a underline cursor-pointer',
              src: node.url,
            },
            children
          );
        },
        h1: ({ children }) => {
          return new Element(
            'h1',
            {
              class:
                'relative mb-1 mt-[1.6em] pb-1 font-heading text-4xl font-bold slate-h1 slate-h1',
            },
            children
          );
        },
        h2: ({ children }) => {
          return new Element(
            'h2',
            {
              class:
                'relative mb-1 mt-[1.4em] pb-1 font-heading text-3xl font-bold slate-h2',
            },
            children
          );
        },
        h3: ({ children }) => {
          return new Element(
            'h3',
            {
              class:
                'relative mb-1 mt-[1.2em] pb-1 font-heading text-2xl font-bold slate-h3',
            },
            children
          );
        },
        code_block: codeBlockElementTransform,
        code_line: codeLineElementTransform,
        hr: hrElementTransform,
        img: imageElementTramsform,
        video: videoElementTramsform,
        audio: audioElementTramsform,
        file: fileElementTramsform,
        column_group: columnGroupElementTransform,
        column: columnElementTransform,
        date: dateElementTransform,
        p: pElementTransform,
        toggle: toggleElementTransform,
        table: tableElementTransform,
        tr: tableRowElementTransform,
        td: tableCellElementTransform,
        th: tableHeaderCellElementTransform,
      },
    });
    console.log(html);
    htmlRef.current!.innerHTML = html;
  };
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Plate
          editor={editor}
          onChange={({ editor, value }) => {
            console.log(value);
            getHtml();
          }}
        >
          <EditorContainer>
            <Editor variant="default" />
          </EditorContainer>

          <SettingsDialog />
        </Plate>
      </DndProvider>
      {/* <button
        className="fixed right-40 top-40 p-4 rounded-full border"
        onClick={getHtml}
      >
        Get HTML
      </button> */}
      <div
        ref={htmlRef}
        className="border rounded fixed right-0 max-w-[700px] h-[800px] overflow-auto top-[100px] p-4 bg-white"
      ></div>
    </>
  );
}
