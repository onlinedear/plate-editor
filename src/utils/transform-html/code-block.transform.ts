import { ChildNode, Element, Text } from 'domhandler';
import { TransformOptionType } from './type';
import { cn } from '@udecode/cn';

export const codeBlockElementTransform = ({
  node,
  children,
}: TransformOptionType) => {
  console.log(node, 'code_block');
  return new Element(
    'div',
    {
      class: cn(
        'relative py-1 slate-code-block',
        node.lang && `language-${node.lang}`
      ),
    },
    [
      new Element(
        'pre',
        {
          class:
            'overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2] slate-pre',
        },
        [new Element('code', {}, children)]
      ),
    ]
  );
};

export const codeLineElementTransform = ({
  node,
  children,
}: TransformOptionType) => {
  return new Element(
    'div',
    {
      class: 'relative slate-code-line',
    },
    children
  );
};