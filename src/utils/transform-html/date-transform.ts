import { ChildNode, Element, Text } from 'domhandler';
import { TransformOptionType } from './type';
import dayjs from 'dayjs';

export const dateElementTransform = ({
  node,
  children,
}: TransformOptionType) => {
  return new Element(
    'div',
    {
      class: 'relative inline-block slate-date',
    },
    [
      new Element(
        'span',
        {
          class:
            'w-fit cursor-pointer rounded-sm bg-muted px-1 text-muted-foreground py-1 slate-date-text',
        },
        [new Text(dayjs(node.date).format('YYYY年MM月DD日'))]
      ),
    ]
  );
};
