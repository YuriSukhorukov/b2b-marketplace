import React from 'react';
import { Menu } from 'antd';
import { 
    HomeOutlined, 
    MailOutlined, 
    SettingOutlined,
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default class Navigation extends React.Component {
  handleClick = e => {
    console.log('click ', e);
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
        <div style={{ width: 256 }}>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                inlineCollapsed={this.state.collapsed}
            >
              <SubMenu key="sub1" icon={<HomeOutlined />} title="Предложения">
                <Menu.Item key="1">Собственные</Menu.Item>
                <Menu.Item key="2">Поиск</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<MenuFoldOutlined />} title="Отклики">
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
              </SubMenu>
            </Menu>
        </div>
    );
  }
}