import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  // breadcrumbs?: BreadcrumbsType[];
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};
