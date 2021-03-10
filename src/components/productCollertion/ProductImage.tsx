import React from 'react';
import { Image, Typography } from 'antd';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//使用withRouter HOC 来包裹ProductImage 达成组件的高阶路由传递
interface PropType extends RouteComponentProps {
  id: string | number;
  size: 'large' | 'small';
  title: string;
  imageSrc: string;
  price: number | string;
}

const ProductImageComponent: React.FC<PropType> = ({ id, size, title, imageSrc, price, history, location, match }) => {
  const { t } = useTranslation();
  return (
    <Link to={`detail/${id}`}>
      {size === 'large' ? <Image src={imageSrc} height={285} width={490} /> : <Image src={imageSrc} height={120} width={240} />}
      <div>
        <Typography.Text type='secondary'>{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type='danger' strong>
          ¥ {price} {t('home_page.start_from')}
        </Typography.Text>
      </div>
    </Link>
  );
};

export const ProductImage = withRouter(ProductImageComponent);
