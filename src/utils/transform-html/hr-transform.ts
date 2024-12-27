import { ChildNode, Element, Text } from 'domhandler';
import { TransformOptionType } from './type';

export const hrElementTransform = ({ node, children }: TransformOptionType) => {
  return new Element(
    'div',
    {
      class: 'py-6',
    },
    [
      new Element('hr', {
        class:
          ' slate-hr',
      }),
    ]
  );
};
