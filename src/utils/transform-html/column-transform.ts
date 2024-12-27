import { ChildNode, Element } from 'domhandler';
import { TransformOptionType } from './type';

export const columnGroupElementTransform = ({
  node,
  children,
}: TransformOptionType) => {
  return new Element(
    'div',
    {
      class: 'slate-column-group flex size-full gap-4 rounded my-2 ',
      style: 'min-height: 46px;height: max-content;',
    },
    children
  );
};

export const columnElementTransform = ({
  node,
  children,
}: TransformOptionType) => {
  return new Element(
    'div',
    {
      class:
        'slate-column relative rounded-lg border border-dashed p-1.5 flex items-center',
      style: `width: ${node.width};	word-break: break-all;`,
    },
    children
  );
};
