import React from 'react';
import type { ComponentType } from 'react';

const exclude = ['/login/', '/empty/'];
const modules = import.meta.glob<{ default: ComponentType }>('@/views/**.tsx');

const LazyView = (props: { router_link: string }) => {
  const { router_link } = props;
  let LazyCom = null;

  if (router_link && !exclude.includes(router_link)) {
    const URL = '/src/views/' + router_link + '/index.tsx';
    const standbyURL = '/src/views/' + router_link + '.tsx';
    if (modules[URL]) {
      LazyCom = React.lazy(modules[URL]);
    } else {
      LazyCom = React.lazy(modules[standbyURL]);
    }

    return <>{LazyCom ? <LazyCom /> : ''}</>;
  } else {
    return <></>;
  }
};
export default LazyView;
