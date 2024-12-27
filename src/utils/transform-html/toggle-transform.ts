import { ChildNode, Element } from 'domhandler';
import { TransformOptionType } from './type';

export const toggleElementTransform = ({ node, children }: TransformOptionType) => {
  return new Element(
    'div',
    {
      class: 'relative pl-6 slate-toggle slate-selectable',
    },
    [
      new Element(
        'button',
        {
          class:
            'inline-flex gap-2 whitespace-nowrap text-sm font-medium ring-offset-background  hover:text-accent-foreground absolute -left-0.5 top-0 size-6 cursor-pointer select-none items-center justify-center rounded-md p-px text-muted-foreground transition-colors hover:bg-accent [&_svg]:size-4',
        },
        [
          new Element(
            'svg',
            {
              width: '24',
              height: '24',
              stroke: 'currentColor',
              'stroke-width': '2',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              viewBox: '0 0 24 24',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
              class:
                'lucide lucide-chevron-right transition-transform duration-75 rotate-90',
            },
            [
              new Element('path', {
                d: 'm9 18 6-6-6-6',
              }),
            ]
          ),
        ]
      ),
      new Element('span', {}, children),
    ]
  );
};
