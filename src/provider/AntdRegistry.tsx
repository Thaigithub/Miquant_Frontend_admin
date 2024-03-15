'use client';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';

const cache = createCache();
const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  useServerInsertedHTML(() => (
    <style id='antd' dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ));
  return (
    <StyleProvider cache={cache} hashPriority='high'>
      {children}
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
