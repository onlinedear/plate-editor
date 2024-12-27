import { Element, Text } from 'domhandler';
import { TransformOptionType } from './type';

export const fileElementTramsform = ({
  node,
  children,
}: TransformOptionType) => {
  const align = node.align || 'center';
  return new Element(
    'div',
    {
      class: `slate-file group w-full relative m-0 flex cursor-pointer items-center rounded px-0.5 py-[3px] hover:bg-muted`,
    },
    [
      new Element(
        'div',
        {
          width: '100%',
          controls: 'true',
          class: 'slate-file-name-wrapper flex items-center gap-1 p-1 flex-1',
        },
        [
          new Element(
            'svg',
            {
              width: '24',
              height: '24',
              class: 'lucide lucide-check size-4',
              stroke: 'currentColor',
              'stroke-width': '2',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              viewBox: '0 0 24 24',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            [
              new Element('path', {
                d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z',
              }),
              new Element('path', {
                d: 'M14 2v4a2 2 0 0 0 2 2h4',
              }),
              new Element('path', {
                d: 'M12 12v6',
              }),
              new Element('path', {
                d: 'm15 15-3-3-3 3',
              }),
            ]
          ),
          new Element(
            'div',
            {
              class: `slate-file-name flex-1`,
            },
            [new Text(node.name || 'file')]
          ),
        ]
      ),
      new Element(
        'a',
        {
          href: node.url,
          target: '_blank',
          class:
            'slate-file-download-btn text-sm px-2 py-1 hover:underline rounded-sm',
        },
        [new Text('下载')]
      ),
    ]
  );
};
