import React, { ComponentType } from 'react';

const exclude = ['/login/', '/empty/'];
const modules = import.meta.glob<{ default: ComponentType }>('@/views/**');

const LazyView = (props: { router_link: string }) => {
  const { router_link } = props;
  let LazyCom = null;
  if (router_link && !exclude.includes(router_link)) {
    const URL = '/src/views/' + router_link + '/index.tsx';

    LazyCom = React.lazy(modules[URL]);
    return <>{LazyCom ? <LazyCom /> : ''}</>;
  } else {
    return <></>;
  }
};
export default LazyView;
