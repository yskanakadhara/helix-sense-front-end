import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./app/core/header/header";
import Sidenav from "./app/core/sidenav/sidenav";
import NotFoundPage from "./app/pages/NotFoundPage";
import DashboardPage from "./app/pages/DashboardPage";
import AdminDashboardPage from "./app/pages/AdminDashboardPage";
import ComponentsPage from "./app/pages/AdminDashboardPage/ComponentsPage";
import SensorsPage from "./app/pages/AdminDashboardPage/SensorTypePage";
import EnergyManagement from "./app/pages/EnergyManagement";
import Washroom from "./app/pages/Washroom";
import AddSensorPage from "./app/pages/Washroom/NewDashboard/AddSensor";
import UpdateSensorPage from "./app/pages/Washroom/NewDashboard/UpdateSensor";
import PreventiveMaintainance from "./app/predictiveMaintenance/predictiveMaintenance";
import useFetch from "@app/util/useFetch";
import { Spin } from "antd";
import Keycloak from "keycloak-js";
import "./app.scss";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);
  const [userData, setUserData] = useState(null);

  const { loading, fetchData: getUserData } = useFetch({
    url: `${process.env.API_URL}/user/info`,
    method: "GET",
    onSuccess: (data) => {
      setUserData(data);
      // if (data.roles.includes("admin")) history.push("/config");
    },
  });

  useEffect(() => {
    const kc = Keycloak("/public/keycloak.json");
    kc.init({ onLoad: "login-required" }).then((authenticated) => {
      setAuthenticated(authenticated);
      setKeycloak(kc);
      if (authenticated) localStorage.setItem("accessToken", kc.token);
      getUserData();
    });
  }, []);

  return !authenticated || loading ? (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Spin />
      <h3>Logging you in ...</h3>
    </div>
  ) : (
    <div>
      <Header
        keycloak={keycloak}
        userData={userData}
        getUserData={getUserData}
      />
      <div className="m-0 page-actions-header">
        <div className="side-nav-bar p-0">
          <Sidenav
            solutions={userData?.solutions || []}
            roles={userData?.roles}
          />
        </div>
        <div className="main-content">
          <Switch>
            {userData?.roles.includes("admin") && (
              <>
                <Route
                  exact
                  path="/config"
                  render={(routeProps) => (
                    <AdminDashboardPage {...routeProps} />
                  )}
                />
                <Route
                  exact
                  path="/components"
                  render={(routeProps) => <ComponentsPage {...routeProps} />}
                />
                <Route
                  exact
                  path="/sensors"
                  render={(routeProps) => <SensorsPage {...routeProps} />}
                />
              </>
            )}
            <Route
              exact
              path="/dashboards"
              render={(routeProps) => (
                <DashboardPage setUserData={setUserData} {...routeProps} />
              )}
            />
            {userData?.solutions.map((solution) => {
              switch (solution) {
                case "washroom":
                  return (
                    <>
                      <Route exact path="/washroom" component={Washroom} />
                      <Route
                        exact
                        path="/washroom/sensor"
                        component={AddSensorPage}
                      />
                      <Route
                        exact
                        path="/washroom/sensor/:sensorId"
                        component={UpdateSensorPage}
                      />
                    </>
                  );
                case "predictive-maintenance":
                  return (
                    <Route
                      exact
                      path="/predictive-maintenance"
                      component={PreventiveMaintainance}
                    />
                  );
                case "energy":
                  return (
                    <Route exact path="/energy" component={EnergyManagement} />
                  );
                default:
                  return (
                    <Route
                      exact
                      path={`/${solution}`}
                      component={NotFoundPage}
                    />
                  );
              }
            })}
            <Redirect from="/" to="/dashboards" exact />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
