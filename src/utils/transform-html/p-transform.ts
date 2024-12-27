import { Element } from 'domhandler';
import { TransformOptionType } from './type';

export const pElementTransform = ({ node, children }: TransformOptionType) => {
  const lineHeight = node.lineHeight || '';
  const indent = node.indent || '';
  const align = node.align || '';

  if (node.listStyleType) {
    if (node.listStyleType === 'decimal') {
      return new Element(
        'ol',
        {
          style: `${node.listStyleType ? `list-style-type: ${node.listStyleType}` : ''};margin-left: 24px;`,
          start: `${node.listStart || 1}`,
          class: 'slate-list-decimal',
        },
        [new Element('li', {}, [...children, new Element('br', {}, [])])]
      );
    } else if (node.listStyleType === 'disc') {
      return new Element(
        'ul',
        {
          style: `${node.listStyleType ? `list-style-type: ${node.listStyleType}` : ''};margin-left: 24px;`,
          class: 'slate-list-disc',
        },
        [new Element('li', {}, [...children, new Element('br', {}, [])])]
      );
    } else if (node.listStyleType === 'todo') {
      const checked = node.checked || false;
      return new Element(
        'ul',
        {
          style: `${node.listStyleType ? `list-style-type: ${node.listStyleType}` : ''};margin-left: 24px;position: relative;`,
          class: 'slate-list-todo',
        },
        [
          new Element(
            'button',
            {
              type: 'button',
              'data-state': `${checked ? 'checked' : 'unchecked'}`,
              checked: `${checked}`,
              style: 'left: -24px; position: absolute; top: 4px;',
              class:
                'peer size-4 shrink-0 rounded-sm border border-primary bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
            },
            checked
              ? [
                  new Element(
                    'span',
                    {
                      'data-state': `${checked ? 'checked' : 'unchecked'}`,
                      class: `flex items-center justify-center text-primary-foreground`,
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
                            d: 'M20 6 9 17l-5-5',
                          }),
                        ]
                      ),
                    ]
                  ),
                ]
              : []
          ),
          new Element(
            'span',
            {
              class: `${checked ? 'line-through text-muted-foreground' : ''}`,
            },
            [...children, new Element('br', {}, [])]
          ),
        ]
      );
    } else {
      return new Element('div', {}, children);
    }
  } else {
    return new Element(
      'div',
      {
        class:
          'slate-p py-1 ',
        style: `${lineHeight ? `line-height: ${lineHeight};` : ''} ${indent ? `padding-left: ${indent * 24}px;` : ''}  ${align ? `text-align: ${align};` : ''}`,
      },
      [...children, new Element('br', {}, [])]
    );
  }
};
