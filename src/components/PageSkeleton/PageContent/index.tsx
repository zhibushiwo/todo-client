import React, { FC, PropsWithChildren } from 'react';

interface IPageContent extends PropsWithChildren {}

const PageContent: FC<IPageContent> = ({ children }) => {
  return <>{children} </>;
};

export default PageContent;
