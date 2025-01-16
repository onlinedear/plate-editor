import { FC, useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/tab';
import { formatHtml } from '@/utils';
import { Prism } from '../plate-ui/code-block-combobox';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

type HtmlCodePreviewProps = {
  code: string;
};

const HtmlCodePreview: FC<HtmlCodePreviewProps> = ({ code }) => {

  const [tabKey, setTabKey] = useState('html');

  const codeRef = useRef(null);

  // 格式化 HTML
  const formattedHtml = formatHtml(code);

  // 使用 useEffect 调用 Prism.js 进行语法高亮
  useEffect(() => {
    setTimeout(() => {
      if (codeRef.current) {
        console.log('codeRef.current', codeRef.current);
        Prism.highlightElement(codeRef.current);
      }
    }, 300);
  }, [formattedHtml, tabKey, codeRef.current]);

  return (
    <div>
      <Tabs
        defaultValue="html"
        className="w-[600px]"
        value={tabKey}
        onValueChange={setTabKey}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="html">html预览</TabsTrigger>
          <TabsTrigger value="code">代码预览</TabsTrigger>
        </TabsList>
        <TabsContent value="html">
          <div
            className="rounded h-[600px] overflow-auto p-4 bg-white border-[#eee] border-solid border !mt-4"
            dangerouslySetInnerHTML={{ __html: code }}
          ></div>
        </TabsContent>
        <TabsContent value="code">
          <div className="w-full flex justify-end items-center  h-[32px]  bg-slate-100 px-2 py-1 rounded-t-sm">
            <div
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(formattedHtml);
                toast.success('复制成功');
              }}
            >
              <Copy className="size-[16px]" />
            </div>
          </div>
          <pre className="rounded h-[600px] overflow-auto p-4 pt-[36px] bg-white border-[#eee] border-solid border border-t-0 relative">
            <code ref={codeRef} className="language-html">
              {formattedHtml}
            </code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HtmlCodePreview;
