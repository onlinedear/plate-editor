'use client';
import { Toaster } from 'sonner';

import { PlateEditor } from '@/components/editor/plate-editor';
import { SettingsProvider } from '@/components/editor/settings';
import { Button } from '@/components/plate-ui/button';
import { useState } from 'react';
import { Expand, Shrink } from 'lucide-react';

export default function Page() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const AreaClass =
    'w-[800px] h-[800px] mt-[100px] mx-auto border-[#eee] border-solid border rounded-md transition-all duration-500 ease-in-out';
  return (
    <div
      className={isFullScreen ? 'h-screen m-auto w-full transition-all duration-500 ease-in-out' : AreaClass}
      data-registry="plate"
    >
      <SettingsProvider>
        <PlateEditor />
      </SettingsProvider>
      <Button
        variant="default"
        className="fixed bottom-[160px] right-4 h-[32px]"
        onClick={() => {
          setIsFullScreen(!isFullScreen);
        }}
      >
        <div className="flex items-center gap-2">
          {isFullScreen ? (
            <div className='flex items-center gap-2'>
              <Shrink /> 卡片模式
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Expand /> 全屏模式
            </div>
          )}
        </div>
      </Button>
      <Toaster position={'top-center'} />
    </div>
  );
}
