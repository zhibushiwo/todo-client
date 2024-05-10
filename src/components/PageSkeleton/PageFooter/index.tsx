import React, { FC, PropsWithChildren } from 'react';

interface IPageFooter extends PropsWithChildren {}

const PageFooter: FC<IPageFooter> = ({ children }) => {
  return <>{children} </>;
};

export default PageFooter;
