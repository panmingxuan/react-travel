import styles from './SearchPage.module.css';
import React, { useEffect } from 'react';
import { Header, Footer, FilterArea, ProductList } from '../../components';
import { useParams, useLocation } from 'react-router-dom';
import { searchProduct } from '../../redux/productSearch/slice';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';

interface MathParams {
  keywords: string;
}

export const SearchPage: React.FC = () => {
  //获取url中的参数
  const { keywords } = useParams<MathParams>();

  const loading = useSelector((state) => state.productSearchSlice.loading);
  const error = useSelector((state) => state.productSearchSlice.error);
  const productList = useSelector((state) => state.productSearchSlice.data);
  const pagination = useSelector((state) => state.productSearchSlice.pagination);

  const dispatch = useDispatch();
  const location = useLocation();

  //监听url中的location变化，调用searchProduct渲染页面
  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
  }, [location]);

  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
  };

  if (loading) {
    return (
      <Spin
        size='large'
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: 'auto',
          marginRight: 'aunto',
          width: '100%',
        }}
      />
    );
  }

  if (error) {
    return <div>网站出错：{error}</div>;
  }

  return (
    <>
      <Header />
      <div className={styles['page-content']}>
        {/* 分类过滤器 */}
        <div className={styles['product-list-container']}>
          <FilterArea />
        </div>
        {/* 搜索结果 */}
        <div className={styles['product-list-container']}>
          <ProductList data={productList} paging={pagination} onPageChange={onPageChange} />
        </div>
      </div>
      <Footer />
    </>
  );
};
