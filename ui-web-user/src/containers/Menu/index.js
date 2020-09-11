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
        <SubMenu key="sub2" title="Мои предложения">
          <Menu.Item key="/offers/created">Опубликованные<Link to="/offers/created" /></Menu.Item>
          <Menu.Item key="/offers/new">Добавить<Link to="/offers/new" /></Menu.Item>
        </SubMenu>
        



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