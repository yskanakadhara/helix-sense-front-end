/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink, Col } from "reactstrap";
import { Tooltip } from "antd";
import { Menus } from "@app/util/appAccess";
import homeIconBlue from "@images/icons/homeBlue.svg";

const Sidenav = ({ solutions, roles }) => {
  const location = useLocation();

  return (
    <Nav vertical className="sidenav">
      {roles?.includes("admin") && (
        <NavItem>
          <NavLink tag={Link} className="text-white text-center" to="/config">
            <Tooltip title="Configurations" placement="right">
              <div
                className={
                  location.pathname === "/config" ? "highlight" : "rect"
                }
              >
                <i className="fa fa-cog" style={{ fontSize: 32 }} />
              </div>
            </Tooltip>
          </NavLink>
          <Col sm="11 pl-4">
            <hr className="white-border border-top-2px mt-1 mb-1" />
          </Col>
        </NavItem>
      )}
      <NavItem>
        <NavLink tag={Link} className="text-white text-center" to="/dashboards">
          <Tooltip title="Dashboards" placement="right">
            <div
              className={
                location.pathname === "/dashboards" ? "highlight" : "rect"
              }
            >
              <img src={homeIconBlue} width="30" height="30" />
            </div>
          </Tooltip>
        </NavLink>
        <Col sm="11 pl-4">
          <hr className="white-border border-top-2px mt-1 mb-1" />
        </Col>
      </NavItem>
      {solutions?.map((solution) => {
        const menu = Menus.find((item) => item.path === `/${solution}`);
        if (menu)
          return (
            <NavItem key={menu.name}>
              <NavLink
                tag={Link}
                className="text-white text-center"
                to={menu.path}
              >
                <Tooltip title={menu.title} placement="right">
                  <div
                    className={
                      location.pathname === menu.path ? "highlight" : "rect"
                    }
                  >
                    {menu.icon}
                  </div>
                </Tooltip>
              </NavLink>
              <Col sm="11 pl-4">
                <hr className="white-border border-top-2px mt-1 mb-1" />
              </Col>
            </NavItem>
          );
        return null;
      })}
    </Nav>
  );
};

export default Sidenav;
