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

export default class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }
  handleClick = e => {
    // console.log('click ', e);
  };
  state = {
    collapsed: false,
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Menu {...this.props}
          defaultSelectedKeys={[window.location.pathname]}
          defaultOpenKeys={[window.location.pathname]}
          mode="inline"
          inlineCollapsed={this.state.collapsed}
          onClick={this.handleClick}
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
          <Menu.Item key="/company">Страница компании<Link to="/company" /></Menu.Item>
          <Menu.Item key="/company/work-history">История работы<Link to="/company/work-history" /></Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" title="Настройки">
          <Menu.Item key="/settings/contact-info">Контактная информация<Link to="/settings/contact-info" /></Menu.Item>
          <Menu.Item key="/settings/tax-info">Налоговая информация<Link to="/settings/tax-info" /></Menu.Item>
          <Menu.Item key="/settings/password-and-security">Пароль и безопасность<Link to="/settings/password-and-security" /></Menu.Item>
        </SubMenu>
      
        {/* tetra.ltd/company/idnr/445233024
        tetra.ltd/company/445233024
        tetra.ltd/445233024 */}

        {/* <SubMenu key="sub1" icon={<HomeOutlined />} title="Предложения">
          <Menu.Item key="1">Поиск</Menu.Item>
          <Menu.Item key="2">Мои Предложения</Menu.Item>
          <Menu.Item key="3">Добавить Предложение</Menu.Item>
        </SubMenu> */}
        {/* <SubMenu key="sub2" icon={<MenuFoldOutlined />} title="Отклики">
          <Menu.Item key="3">Собственные</Menu.Item>
          <Menu.Item key="4">Активность</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Контракты">
          <Menu.Item key="5">Открытые</Menu.Item>
          <Menu.Item key="6">Закрытые</Menu.Item>
          <Menu.Item key="7">Спорные</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<MailOutlined />} title="Личные сообщения">
          <Menu.Item key="3">Входящие</Menu.Item>
          <Menu.Item key="4">Отправленные</Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" icon={<SettingOutlined />} title="Настройки аккаунта">
            <Menu.Item key="5">Основное</Menu.Item>
            <Menu.Item key="6">Данные компании</Menu.Item>
        </SubMenu> */}
      </Menu>
    );
  }
}