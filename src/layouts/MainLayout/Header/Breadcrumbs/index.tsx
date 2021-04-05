import { Breadcrumb as AntBreadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';

import { selectCurrentBreadcrumbs } from 'src/app/config.slice';
import { useAppSelector } from 'src/hooks';

const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  const breadcrumbs = useAppSelector(selectCurrentBreadcrumbs(pathname));

  return (
    <AntBreadcrumb>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return isLast ? (
          <AntBreadcrumb.Item key={breadcrumb.path}>
            {breadcrumb.title}
          </AntBreadcrumb.Item>
        ) : (
          <AntBreadcrumb.Item key={breadcrumb.path}>
            <Link to={breadcrumb.path}>{breadcrumb.title}</Link>
          </AntBreadcrumb.Item>
        );
      })}
    </AntBreadcrumb>
  );
};

export default Breadcrumb;
