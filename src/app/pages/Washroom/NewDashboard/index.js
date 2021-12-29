import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  Divider,
  Spin,
  Button,
  Select,
  Radio,
  Rate,
  Tooltip,
  message,
  Modal,
} from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import useFetch from "@app/util/useFetch";
import AnalyticIcon from "@images/icons/analytics.svg";
import LocationIcon from "@images/icons/location.svg";
import CalendarIcon from "@images/icons/calendar.svg";
import ComponentGridLayout from "./ComponentGridLayout";

const Dashboard = ({ activeIndex, setActiveIndex }) => {
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);

  const history = useHistory();

  const { loading, fetchData: getSensors } = useFetch({
    url: `${process.env.API_URL}/sensors`,
    method: "GET",
    onSuccess: (data) => {
      setSensors(data);
      if (data.length < 1) {
        history.push("/washroom/sensor");
      } else {
        setSelectedSensor(data[0]);
      }
    },
  });

  const {
    loading: loadingSensorData,
    data: sensorData,
    fetchData: getSensorData,
  } = useFetch((sensorId) => ({
    url: `${process.env.API_URL}/sensors/${sensorId}`,
    method: "GET",
  }));

  const { fetchData: deleteSensor } = useFetch((sensorId) => ({
    url: `${process.env.API_URL}/sensors/${sensorId}`,
    method: "DELETE",
    onSuccess: () => {
      const ss = sensors.filter((sensor) => sensor._id !== sensorId);
      setSensors([...ss]);
      if (ss.length < 1) {
        history.push("/washroom/sensor");
      } else {
        setSelectedSensor(ss[0]);
      }
    },
  }));

  useEffect(() => {
    getSensors();
  }, []);

  useEffect(() => {
    if (selectedSensor) {
      getSensorData(selectedSensor._id);
    }
  }, [selectedSensor]);

  const onSelectSensor = (value) => {
    const sensor = sensors.find((it) => it._id === value);
    setSelectedSensor(sensor);
  };

  const handleEditSensor = () => {
    if (selectedSensor) {
      history.push(`/washroom/sensor/${selectedSensor._id}`);
    } else {
      message.error("No sensor selected!");
    }
  };

  const handleDeleteSensor = () => {
    if (selectedSensor) {
      Modal.confirm({
        title: "Are you sure you want to delete this sensor?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: () => deleteSensor(selectedSensor._id),
      });
    } else {
      message.error("No sensor selected!");
    }
  };

  const handleDownloadCert = () => {
    if (selectedSensor) {
      const accessToken = localStorage.getItem("accessToken");
      fetch(
        `${process.env.API_URL}/sensors/${selectedSensor._id}/certificates`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "certificates.zip");

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
        });
    } else {
      message.error("No sensor selected!");
    }
  };

  if (loading || loadingSensorData)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-75">
        <Spin />
        <h5>Fetching data from server ...</h5>
      </div>
    );

  return (
    <div className="p-4" style={{ marginBottom: 150 }}>
      <div className="row position-relative">
        <div className="col-md-6">
          <h2 className="text-mandy font-weight-bold">
            <img
              src={AnalyticIcon}
              width="50"
              height="50"
              className="mr-3"
              style={{ marginTop: -8 }}
            />
            New Dashboard
          </h2>
        </div>
        <div
          className="d-flex justify-content-end"
          style={{ position: "absolute", top: 0, right: 16 }}
        >
          <Button
            className="border-0"
            size="large"
            ghost
            icon={<ArrowLeftOutlined style={{ color: "#4e5664" }} />}
            disabled={activeIndex < 1}
            onClick={() => setActiveIndex(activeIndex - 1)}
          />
          <Button
            className="border-0"
            size="large"
            ghost
            icon={<ArrowRightOutlined style={{ color: "#4e5664" }} />}
            disabled={activeIndex > 2}
            onClick={() => setActiveIndex(activeIndex + 1)}
          />
        </div>
      </div>
      <Divider style={{ border: "1px solid #d84e59", marginTop: 0 }} />
      <div className="row">
        <div className="col-md-12 mb-3">
          <div className="mb-2" style={{ fontWeight: 600 }}>
            Sensor
            <Tooltip title="Add more sensor">
              <Button
                size="small"
                shape="circle"
                className="ml-3"
                icon={<i className="fa fa-plus text-primary" />}
                onClick={() => {
                  history.push("/washroom/sensor");
                }}
              />
            </Tooltip>
            <Tooltip title="Edit Sensor">
              <Button
                size="small"
                shape="circle"
                className="ml-3"
                icon={<i className="fa fa-pencil text-primary" />}
                onClick={handleEditSensor}
              />
            </Tooltip>
            <Tooltip title="Download certificates">
              <Button
                size="small"
                shape="circle"
                className="ml-3"
                icon={<i className="fa fa-download text-primary" />}
                onClick={handleDownloadCert}
              />
            </Tooltip>
            <Tooltip title="Delete Sensor">
              <Button
                size="small"
                shape="circle"
                className="ml-3"
                icon={<i className="fa fa-trash text-primary" />}
                onClick={handleDeleteSensor}
              />
            </Tooltip>
          </div>
          <Select
            style={{ width: 360 }}
            placeholder="Select sensor"
            value={selectedSensor?._id}
            onSelect={onSelectSensor}
            options={sensors.map((sensor) => ({
              value: sensor._id,
              label: sensor.device_id,
            }))}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 p-2">
          <div className="mb-2" style={{ fontWeight: 600 }}>
            Washroom
          </div>
          <div className="pl-4">{sensorData?.washroom.type.toUpperCase()}</div>
        </div>
        <div className="col-md-4 p-2">
          <div className="mb-2" style={{ fontWeight: 600 }}>
            Level
          </div>
          <Radio.Group
            buttonStyle="solid"
            value={sensorData?.floor._id}
            // disabled
          >
            {sensorData?.infrastructure.floors
              .sort((a, b) => a.index - b.index)
              ?.map((floor) => (
                <Radio.Button
                  key={floor._id}
                  value={floor._id}
                  className="mr-3 border rounded-circle"
                  style={{
                    height: 40,
                    fontSize: 16,
                    lineHeight: "40px",
                  }}
                >
                  {floor.sign}
                </Radio.Button>
              ))}
          </Radio.Group>
        </div>
        <div className="col-md-4 p-2">
          <Radio.Group
            buttonStyle="solid"
            className="d-flex flex-row justify-content-center"
            value={sensorData?.washroom.type}
          >
            {["Male", "Female", "Disabled"].map((wr_type) => (
              <Radio.Button
                key={wr_type}
                value={wr_type.toLowerCase()}
                className="mr-2 border"
                style={{
                  height: 40,
                  fontSize: 16,
                  lineHeight: "40px",
                  borderRadius: 20,
                  fontWeight: "normal",
                }}
              >
                {wr_type}
              </Radio.Button>
            ))}
          </Radio.Group>
          <div className="d-flex justify-content-center align-items-center mt-3">
            Rating: <Rate allowHalf value={4.0} className="ml-2" />{" "}
            <span
              className="ml-2 py-1 px-2 text-primary"
              style={{
                backgroundColor: "rgb(234, 106, 71, 0.1)",
                fontWeight: "bolder",
              }}
            >
              4.0
            </span>
          </div>
        </div>
        <div className="col-md-4 p-2">
          <div className="rounded p-3 bg-gray">
            <div className="text-primary font-weight-semibold">Infra</div>
            <Divider style={{ marginTop: 12 }} />
            <div style={{ lineHeight: "40px" }}>
              {sensorData?.infrastructure.name}
            </div>
          </div>
        </div>
        <div className="col-md-4 p-2">
          <div className="rounded p-3 bg-gray">
            <div className="text-primary font-weight-semibold">Location</div>
            <Divider style={{ marginTop: 12 }} />
            <div className="media">
              <img
                className="mr-3"
                src={LocationIcon}
                height={40}
                alt="location icon"
              />
              <div className="media-body">
                {sensorData?.infrastructure.location}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 p-2">
          <div className="rounded p-3 bg-gray">
            <div className="text-primary font-weight-semibold">Date & Time</div>
            <Divider style={{ marginTop: 12 }} />
            <div className="media">
              <img
                className="mr-3"
                src={CalendarIcon}
                height={40}
                alt="location icon"
              />
              <div className="media-body">
                {sensorData?.data.timez
                  ? moment(sensorData.data.timez).format("DD/MM/YYYY HH:mm:ss")
                  : "--/--/---- --:--:--"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-3 mt-4">
        <div className="col border rounded p-3 h-100 bg-gray">
          <ComponentGridLayout
            components={sensorData?.components}
            data={sensorData?.data}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
