/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { Avatar, Space, Dropdown, Typography, Menu } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { useLocation, useHistory } from "react-router-dom";
import homelogo from "../../images/helixSenseLogo.svg";
import LogoModal from "./LogoModal";

import "./header.scss";
const Header = ({ keycloak, userData, getUserData }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = useCallback(() => {
    keycloak
      ?.logout()
      .then(() => history.push("/", { from: location.pathname }));
  }, [history, location, keycloak]);

  useEffect(() => {
    keycloak?.loadUserInfo().then((userInfo) => setUserInfo(userInfo));
  }, [keycloak]);

  const handleActionClick = useCallback(
    (e) => {
      switch (e.key) {
        case "details":
          history.push("/user");
          break;
        case "change_logo":
          setShowModal(true);
          break;
        case "logout":
          handleLogout();
          break;
        default:
      }
    },
    [handleLogout, history]
  );

  const menu = (
    <Menu onClick={handleActionClick}>
      {/* <Menu.Item key="details">
        <UserOutlined /> Details
      </Menu.Item> */}
      <Menu.Item key="change_logo" icon={<PictureOutlined />}>
        Change logo
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <LogoModal
        visible={showModal}
        onCloseModal={() => {
          setShowModal(false);
          getUserData();
        }}
      />
      <div className="header">
        <Navbar color="light" expand="md">
          <NavbarBrand className="p-0 mr-auto" href="/">
            <img
              src={
                userData && userData.logo
                  ? `${process.env.SERVER_URL}${userData.logo}`
                  : homelogo
              }
              // width="100"
              height="40"
              className="d-inline-block align-top"
              alt="Logo image"
            />
          </NavbarBrand>
          <div>
            <Dropdown overlay={menu}>
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} src={userInfo?.avatar?.url} />
                <Typography.Text>{userInfo?.name}</Typography.Text>
              </Space>
            </Dropdown>
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
