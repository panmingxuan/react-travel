import React from 'react';
import styles from './ShoppingCart.module.css';
import { MainLayout } from '../../layouts/mainLayout';
import { Row, Col, Affix } from 'antd';
import { ProductList, PaymentCard } from '../../components';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { clearShoppingCartItem, checkout } from '../../redux/shoppingCart/slice';
import { useHistory } from 'react-router-dom';

export const ShoppingCartPage: React.FC = (props) => {
  const loading = useSelector((state) => state.shoppingCart.loading);
  const shoppingCartItem = useSelector((state) => state.shoppingCart.items);
  const jwt = useSelector((state) => state.user.token) as string;
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles['product-list-container']}>
            <ProductList data={shoppingCartItem.map((item) => item.touristRoute)} />
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles['payment-card-container']}>
              <PaymentCard
                loading={loading}
                //累加方法
                originalPrice={shoppingCartItem
                  .map((item) => item.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartItem
                  .map(
                    (item) => item.originalPrice * (item.discountPresent ? item.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => {
                  if (shoppingCartItem.length <= 0) {
                    return;
                  }
                  dispatch(checkout(jwt));
                  history.push('/placeOrder');
                }}
                onShoppingCartClear={() => {
                  dispatch(
                    clearShoppingCartItem({ jwt, itemIds: shoppingCartItem.map((item) => item.id) })
                  );
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
