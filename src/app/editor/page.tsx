import { Toaster } from 'sonner';

import { PlateEditor } from '@/components/editor/plate-editor';
import { SettingsProvider } from '@/components/editor/settings';

export default function Page() {
  const isFullScreen = true;
  const AreaClass =
    'w-[800px] h-[800px] mt-[100px] m-auto border-[#eee] border-solid border  rounded-md';
  return (
    <div
      className={
        isFullScreen
          ? 'h-screen m-auto w-full'
          : AreaClass
      }
      data-registry="plate"
    >
      <SettingsProvider>
        <PlateEditor />
      </SettingsProvider>

      <Toaster />
    </div>
  );
}
