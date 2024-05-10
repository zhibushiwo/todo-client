import React, { FC, PropsWithChildren, ReactElement } from 'react';
import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import styles from './style.module.less';
interface IPageSkeleton {}

type TPageSkeletonElement = {
  PageHeader: typeof PageHeader;
  PageContent: typeof PageContent;
  PageFooter: typeof PageFooter;
};

export enum Page_Element_Enum {
  PAGE_HEADER = 'PAGEHEADER',
  PAGE_CONTENT = 'PAGECONTENT',
  PAGE_FOOTER = 'PAGEFOOTER',
}

function findTarget(children: JSX.Element[], childEnum: Page_Element_Enum) {
  return children
    .filter(x => !!x)
    .find(item => {
      return (
        item.type.name.toLocaleLowerCase() === childEnum.toLocaleLowerCase() ||
        item.props.componentType?.toLocaleLowerCase() ===
          childEnum.toLocaleLowerCase()
      );
    });
}

const PageSkeleton: FC<PropsWithChildren<IPageSkeleton>> &
  TPageSkeletonElement = ({ children = [] }) => {
  const pageHeader = findTarget(
    children as JSX.Element[],
    Page_Element_Enum.PAGE_HEADER
  );

  const pageContent = findTarget(
    children as ReactElement[],
    Page_Element_Enum.PAGE_CONTENT
  );

  const pageFooter = findTarget(
    children as ReactElement[],
    Page_Element_Enum.PAGE_FOOTER
  );

  return (
    <div className={styles['page-wrap']}>
      <div className={styles['page-header']}>{pageHeader}</div>
      <div className={styles['page-content']}>{pageContent}</div>
      <div className={styles['page-footer']}>{pageFooter}</div>
    </div>
  );
};

PageSkeleton.PageHeader = PageHeader;
PageSkeleton.PageContent = PageContent;
PageSkeleton.PageFooter = PageFooter;

export default PageSkeleton;
