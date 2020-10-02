import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { 
    HomeOutlined, 
    MailOutlined, 
    SettingOutlined,
    AppstoreOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const TAX_NUMBER = 443531283;

export default class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }
  handleClick = e => {
    this.setState({
      key: e.key
  });
  };
  state = {
    collapsed: false,
    key: null
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  componentWillMount() {
    this.setState(state => {
        return {key: window.location.pathname}
    })
  }
  render() {
    this.props.history.listen((location, action) => {
      console.log(location.pathname);
      this.setState({
          key: location.pathname
      });
    })
    return (
      <Menu {...this.props}
          defaultSelectedKeys={[window.location.pathname]}
          defaultOpenKeys={[window.location.pathname]}
          mode="inline"
          inlineCollapsed={this.state.collapsed}
          onClick={this.handleClick}
          selectedKeys={[this.state.key]}
      >
      
        <SubMenu key="sub1" title="Найти предложения">
          <Menu.Item key="/offers/search">Поиск<Link to="/offers/search" /></Menu.Item>
          <Menu.Item key="/offers/saved">Сохраненные<Link to="/offers/saved" /></Menu.Item>
          <Menu.Item key="/offers/proposals">Отклики<Link to="/offers/proposals" /></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Найти компании">
          <Menu.Item key="/company/search">Поиск<Link to="/company/search" /></Menu.Item>
          <Menu.Item key="/company/saved">Сохраненные<Link to="/company/saved" /></Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title="Мои предложения">
          <Menu.Item key="/offers/published">Опубликованные<Link to="/offers/published" /></Menu.Item>
          <Menu.Item key="/offers/new">Добавить<Link to="/offers/new" /></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title="Моя компания">
          <Menu.Item key={`/company/${TAX_NUMBER}`}>Страница компании<Link to={`/company/${TAX_NUMBER}`} /></Menu.Item>
          <Menu.Item key={`/company/${TAX_NUMBER}/edit`}>Редактировать<Link to={`/company/${TAX_NUMBER}/edit`} /></Menu.Item>
          {/* <Menu.Item key="/company/work-history">История работы<Link to="/company/work-history" /></Menu.Item> */}
        </SubMenu>
        <SubMenu key="sub5" title="Настройки">
          <Menu.Item key="/settings/contact-info">Контактная информация<Link to="/settings/contact-info" /></Menu.Item>
          <Menu.Item key="/settings/tax-info">Налоговая информация<Link to="/settings/tax-info" /></Menu.Item>
          <Menu.Item key="/settings/password-and-security">Пароль и безопасность<Link to="/settings/password-and-security" /></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}