import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import styles from './Header.module.css';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { withTranslation, WithTranslation } from 'react-i18next';
import { addLanguageActionCreator, changeLanguageActionCreator } from '../../redux/language/languageActions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

//需要在组件的props上增加mapStateToProps的类型，使用反向注入
//为了美观提取出类型别名
type PropsType = RouteComponentProps & //react-router的props类型
  WithTranslation & //i18next 的props类型
  ReturnType<typeof mapStateToProps> & // redux store 映射类型
  ReturnType<typeof mapDispatchToProps>; //redux dispatch 映射类型

//从store中传递过来的数据state
const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList,
  };
};

//action的dispatch方法
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: 'zh' | 'en') => {
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code);
      dispatch(action);
    },
  };
};

//类组件的redux

class HeaderComponent extends Component<PropsType> {
  // 使用connect 连接组件后不需要再在构造函数中初始化数据,
  // 数据使用props注入，connect 实际上是个高阶函数
  // constructor(props) {
  //   super(props);
  //   const storeState = store.getState();
  //   this.state = {
  //     language: storeState.language,
  //     languageList: storeState.languageList,
  //   };

  //   store.subscribe(this.handleStoreChange);
  // }

  // 使用connect以后不再需要订阅store
  // handleStoreChange = () => {
  //   const storeState = store.getState();
  //   this.setState({
  //     language: storeState.language,
  //     languageList: storeState.languageList,
  //   });
  // };
  // 解耦工厂函数和dispatch this.props.addLanguage('新语言', 'new_language');
  // menuClickHandler = (e) => {
  //   if (e.key === 'new') {
  //     //处理添加的新语言
  //     const action = addLanguageActionCreator('新语言', 'new_language');
  //     //调用dispatch
  //     store.dispatch(action);
  //   } else {
  //     const action = changeLanguageActionCreator(e.key);
  //     //调用dispatch
  //     store.dispatch(action);
  //   }
  // };
  menuClickHandler = (e) => {
    if (e.key === 'new') {
      //处理添加的新语言
      this.props.addLanguage('新语言', 'new_language');
    } else {
      //处理改变语言类型
      this.props.changeLanguage(e.key);
    }
  };

  render() {
    const { history, t } = this.props;
    return (
      <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={this.menuClickHandler}>
                  {this.props.languageList.map((l) => {
                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                  })}
                  <Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.props.language === 'zh' ? '中文' : 'English'}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('register')}>{t('header.register')}</Button>
              <Button onClick={() => history.push('signIn')}>{t('header.signin')}</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={() => history.push('/')}>
            <img className={styles['App-logo']} src={logo} alt='logo' />
            <Typography.Title className={styles.title} level={3}>
              {t('header.title')}
            </Typography.Title>
          </span>
          <Input.Search placeholder={'请输入旅游目的地、主题或关键字'} className={styles['search-input']} />
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
  }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)));
