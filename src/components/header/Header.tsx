import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.svg';
import styles from './Header.module.css';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from '../../redux/language/languageActions';
import { useTranslation } from 'react-i18next';
import jwt_decode, { JwtPayload as DefalutJwtPayload } from 'jwt-decode';
import { userSlice } from '../../redux/user/slice';

interface JwtPayload extends DefalutJwtPayload {
  username: string;
}

//使用hook，简化高阶组件模式，更便捷的路由跳转
export const Header: React.FC = () => {
  const history = useHistory();

  //获取store中的数据
  const language = useSelector((state) => state.language.language);

  const languageList = useSelector((state) => state.language.languageList);
  //获取dispatch
  const dispatch = useDispatch();
  //解构翻译文件
  const { t } = useTranslation();

  const jwt = useSelector((state) => state.user.token);

  const [username, setUsername] = useState('');

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUsername(token.username);
    }
  }, [jwt]);

  const menuClickHandler = (e) => {
    if (e.key === 'new') {
      //处理添加的新语言

      dispatch(addLanguageActionCreator('新语言', 'new_language'));
    } else {
      //处理改变语言类型
      dispatch(changeLanguageActionCreator(e.key));
    }
  };

  const onLogout = () => {
    dispatch(userSlice.actions.logOut());
    history.push('/');
  };

  return (
    <div className={styles['app-header']}>
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t('header.slogan')}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((l) => {
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                })}
                <Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
          {/* 根据登录状态展示不同的按钮 */}
          {jwt ? (
            <Button.Group className={styles['button-group']}>
              <span>
                {t('header.welcome')}
                <Typography.Text strong>{username} </Typography.Text>
              </span>
              <Button>{t('header.shoppingCart')}</Button>
              <Button onClick={() => onLogout()}>{t('header.signOut')}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('/register')}>{t('header.register')}</Button>
              <Button onClick={() => history.push('/signIn')}>{t('header.signin')}</Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <span onClick={() => history.push('/')}>
          <img className={styles['App-logo']} src={logo} alt='logo' />
          <Typography.Title className={styles.title} level={3}>
            {t('header.title')}
          </Typography.Title>
        </span>
        <Input.Search
          placeholder={'请输入旅游目的地、主题或关键字'}
          className={styles['search-input']}
          onSearch={(keywords) => history.push('/search/' + keywords)}
        />
      </Layout.Header>
      <Menu mode={'horizontal'} className={styles['main-menu']}>
        <Menu.Item key={1}>{t('header.home_page')}</Menu.Item>
        <Menu.Item key={2}>{t('header.weekend')}</Menu.Item>
        <Menu.Item key={3}>{t('header.group')}</Menu.Item>
        <Menu.Item key={4}>{t('header.backpack')}</Menu.Item>
        <Menu.Item key={5}>{t('header.private')}</Menu.Item>
        <Menu.Item key={6}>{t('header.cruise')}</Menu.Item>
        <Menu.Item key={7}>{t('header.hotel')}</Menu.Item>
        <Menu.Item key={8}>{t('header.local')}</Menu.Item>
        <Menu.Item key={9}>{t('header.theme')}</Menu.Item>
        <Menu.Item key={10}>{t('header.custom')}</Menu.Item>
        <Menu.Item key={11}>{t('header.study')}</Menu.Item>
        <Menu.Item key={12}>{t('header.visa')}</Menu.Item>
        <Menu.Item key={13}>{t('header.enterprise')}</Menu.Item>
        <Menu.Item key={14}>{t('header.high_end')}</Menu.Item>
        <Menu.Item key={15}>{t('header.outdoor')}</Menu.Item>
        <Menu.Item key={16}>{t('header.insurance')}</Menu.Item>
      </Menu>
    </div>
  );
};
