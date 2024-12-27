import { ChildNode, Element, Text } from 'domhandler';
import { TransformOptionType } from './type';
import { cn } from '@udecode/cn';

export const tableRowElementTransform = ({
  node,
  children,
}: TransformOptionType) => {
  return new Element(
    'tr',
    {
      class: 'slate-table-row',
      style: `${node.size ? `height: ${node.size}px` : ''}`,
    },
    children
  );
};

export const tableCellElementTransform = ({
  node,
  children,
}: TransformOptionType) => {
  const borders = node.borders || {
    bottom: { size: 1 },
    right: { size: 1 },
    left: { size: 1 },
    top: { size: 1 },
  };

  const isBorderChange = borders
    ? Object.values(borders).some((border: any) => {
        return border?.size === 0;
      })
    : false;

  return new Element(
    'td',
    {
      class: cn(
        `relative h-full overflow-visible p-0 bg-background border slate-td`,
        isBorderChange && `border-none`,
        isBorderChange &&
          cn(
            borders.bottom?.size && `before:border-b before:border-b-border`,
            borders.right?.size && `before:border-r before:border-r-border`,
            borders.left?.size && `before:border-l before:border-l-border`,
            borders.top?.size && `before:border-t before:border-t-border`
          )
      ),
      colspan: node.colSpan?.toString() || '1',
      rowspan: node.rowSpan?.toString() || '1',
    },
    [
      new Element(
        'div',
        {
          class: 'relative z-20 box-border h-full px-3 py-2',
        },
        children
      ),
    ]
  );
};

export const tableHeaderCellElementTransform = ({
  node,
  children,
}: TransformOptionType) => {
  const borders = node.borders || {
    bottom: { size: 1 },
    right: { size: 1 },
    left: { size: 1 },
    top: { size: 1 },
  };
  const isBorderChange = borders
    ? Object.values(borders).some((border: any) => border?.size === 0)
    : false;

  return new Element(
    'th',
    {
      class: cn(
        `relative h-full overflow-visible p-0 text-left [&_>_*]:m-0 bg-slate-100 border slate-th`,
        isBorderChange && `border-none`,
        isBorderChange &&
          cn(
            borders.bottom?.size && `before:border-b before:border-b-border`,
            borders.right?.size && `before:border-r before:border-r-border`,
            borders.left?.size && `before:border-l before:border-l-border`,
            borders.top?.size && `before:border-t before:border-t-border`
          )
      ),
      colspan: node.colSpan?.toString() || '1',
      rowspan: node.rowSpan?.toString() || '1',
    },
    [
      new Element(
        'div',
        {
          class: 'relative z-20 box-border h-full px-3 py-2',
        },
        children
      ),
    ]
  );
};

export const tableElementTransform = ({
  node,
  children,
}: TransformOptionType) => {
  console.log('table', node);
  const colSizes = node?.colSizes || node.children[0]?.children || [];
  return new Element(
    'div',
    {
      class: 'relative overflow-x-auto slate-table',
    },
    [
      new Element(
        'table',
        {
          class:
            'my-4 ml-px mr-0 table h-px w-[calc(100%-6px)] table-fixed border-collapse',
        },
        [
          new Element(
            'colgroup',
            {
              class: 'w-full',
            },
            [
              ...(colSizes?.map(
                (item, index) =>
                  new Element('col', {
                    class: 'min-w-[48px]',
                    style: `${node.colSizes ? ` ${node.colSizes[index] && `width: ${node.colSizes[index]}px`}` : ''}`,
                  })
              ) || []),
            ]
          ),
          ...children,
        ]
      ),
    ]
  );
};
