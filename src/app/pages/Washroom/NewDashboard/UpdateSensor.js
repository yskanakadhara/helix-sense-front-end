import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Divider, Spin, Button, message } from "antd";
import axios from "axios";
import useFetch from "@app/util/useFetch";
import { Form, Select, Input, InputNumber } from "formik-antd";
import { Formik } from "formik";
import isEmpty from "lodash/fp/isEmpty";
import washroomIcon from "@images/icons/washroom.svg";
import GatewayForm from "./UpdateGatewayForm";

const UpdateSensorPage = ({
  match: {
    params: { sensorId },
  },
}) => {
  const [infrastructures, setInfrastructures] = useState([]);
  const [selectedInfra, setSelectedInfra] = useState(null);
  const [isNewInfra, setIsNewInfra] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [isNewFloor, setIsNewFloor] = useState(false);
  const [currentSensor, setCurrentSensor] = useState({});

  const [selectedWashroom, setSelectedWashroom] = useState(null);
  const [isNewWashroom, setIsNewWashroom] = useState(false);
  const [initialGateway, setInitialGateway] = useState({});

  const { loading, fetchData: getInfrastructures } = useFetch({
    url: `${process.env.API_URL}/infrastructures`,
    method: "GET",
    onSuccess: (data) => setInfrastructures(data),
  });

  const { fetchData: getSensor } = useFetch((sensor_id) => ({
    url: `${process.env.API_URL}/sensors/${sensor_id}`,
    method: "GET",
    onSuccess: (data) => {
      setCurrentSensor(data);
      setIsNewInfra(false);
      setSelectedInfra(data.infrastructure);
      setIsNewFloor(false);
      setSelectedFloor(data.floor);
      setIsNewWashroom(false);
      setSelectedWashroom(data.washroom);
      setInitialGateway(data.gateway);
    },
  }));

  const { loading: updatingSensor, fetchData: updateSensor } = useFetch(
    (params) => ({
      url: `${process.env.API_URL}/sensors/${sensorId}`,
      method: "PUT",
      body: JSON.stringify(params),
      onSuccess: (data) => {
        // history.push("/washroom");
        message.success("Sensor successfully updated");
        setCurrentSensor(data);
        setIsNewInfra(false);
        setSelectedInfra(data.infrastructure);
        setIsNewFloor(false);
        setSelectedFloor(data.floor);
        setIsNewWashroom(false);
        setSelectedWashroom(data.washroom);
        setInitialGateway(data.gateway);
      },
      onError: (error) => {
        message.error(error);
      },
    })
  );

  const onSubmit = (values) => {
    updateSensor(values);
  };

  useEffect(() => {
    getSensor(sensorId);
    getInfrastructures();
  }, []);

  const handleSensorInfraChange = (value, setFieldValue) => {
    if (value === "ADDNEW") {
      setFieldValue("infrastructure", {
        _id: "ADDNEW",
      });
      setFieldValue("floor", null);
      setFieldValue("washroom", null);
      setSelectedInfra(null);
      setIsNewInfra(true);
      setSelectedFloor(null);
      setIsNewFloor(false);
      setSelectedWashroom(null);
      setIsNewWashroom(false);
    } else {
      const infra = infrastructures.find((it) => it._id === value);
      setSelectedInfra(infra);
      setFieldValue("infrastructure", infra);
      setIsNewInfra(false);
    }
  };

  const handleSensorFloorChange = (value, setFieldValue) => {
    if (value === "ADDNEW") {
      setFieldValue("floor", {
        _id: "ADDNEW",
      });
      setFieldValue("washroom", null);
      setSelectedFloor(null);
      setIsNewFloor(true);
      setSelectedWashroom(null);
      setIsNewWashroom(false);
    } else {
      const floor = selectedInfra.floors?.find((it) => it._id === value);
      setSelectedFloor(floor);
      setFieldValue("floor", floor);
      setIsNewFloor(false);
    }
  };

  const handleSensorWashroomChange = (value, setFieldValue) => {
    if (value === "ADDNEW") {
      setFieldValue("washroom", {
        _id: "ADDNEW",
      });
      setSelectedWashroom(null);
      setIsNewWashroom(true);
    } else {
      const washroom = selectedFloor?.washrooms.find((it) => it._id === value);
      setSelectedWashroom(washroom);
      setFieldValue("washroom", washroom);
      setIsNewWashroom(false);
    }
  };

  const handleDownloadCert = () => {
    const accessToken = localStorage.getItem("accessToken");
    fetch(`${process.env.API_URL}/sensors/${currentSensor._id}/certificates`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
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
  };

  return (
    <div className="p-4" style={{ marginBottom: 150 }}>
      <div className="row position-relative">
        <div className="col-md-6">
          <h2 className="text-mandy font-weight-bold">
            <img
              src={washroomIcon}
              width="50"
              height="50"
              className="mr-3"
              style={{ marginTop: -8 }}
            />
            Update Sensor
          </h2>
        </div>
      </div>
      <Divider style={{ border: "1px solid #d84e59", marginTop: 0 }} />
      <Formik
        initialValues={currentSensor}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ isValid, values, setFieldValue }) => (
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <div className="row">
              <div className="col-md-6">
                <h4 className="font-weight-bold">Sensor:</h4>
                <Form.Item
                  label="Sensor Device ID"
                  name="device_id"
                  hasFeedback
                >
                  <Input name="device_id" placeholder="Device ID" />
                </Form.Item>
                <Form.Item
                  label="Sensor Code/Type"
                  name="code"
                  validate={(value) => !value && "Please enter sensor code"}
                  hasFeedback
                >
                  <Input name="code" placeholder="Code" />
                </Form.Item>
                <Form.Item label="Description" name="description" hasFeedback>
                  <Input name="description" placeholder="Description" />
                </Form.Item>
                <h5 className="font-weight-bold">Sensor Infra:</h5>
                <h6 className="font-weight-bold ml-3">Infra:</h6>
                <Form.Item
                  label="Infrastructure"
                  name="infrastructure._id"
                  hasFeedback
                >
                  <Select
                    name="infrastructure._id"
                    placeholder="Infrastructure"
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleSensorInfraChange(value, setFieldValue)
                    }
                  >
                    <Select.Option value="ADDNEW">
                      <i className="fa fa-plus text-primary" /> Add New Infra
                    </Select.Option>
                    {infrastructures.map((infra) => (
                      <Select.Option key={infra._id} value={infra._id}>
                        {infra.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Name"
                  name="infrastructure.name"
                  validate={(value) => !value && "Please enter infra name"}
                  hasFeedback
                >
                  <Input name="infrastructure.name" placeholder="Name" />
                </Form.Item>
                <Form.Item
                  label="Type"
                  name="infrastructure.type"
                  validate={(value) => !value && "Please select infra type"}
                  hasFeedback
                >
                  <Select
                    name="infrastructure.type"
                    placeholder="Infra type"
                    style={{ width: "100%" }}
                    options={["Building", "Apartment", "Mall"].map((infra) => ({
                      label: infra,
                      value: infra.toLowerCase(),
                    }))}
                  />
                </Form.Item>
                {selectedInfra || isNewInfra ? (
                  <>
                    <Form.Item
                      label="Description"
                      name="infrastructure.description"
                      validate={(value) =>
                        !value && "Please enter infra description"
                      }
                      hasFeedback
                    >
                      <Input
                        name="infrastructure.description"
                        placeholder="Description"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Location"
                      name="infrastructure.location"
                      validate={(value) =>
                        !value && "Please enter infra location"
                      }
                      hasFeedback
                    >
                      <Input
                        name="infrastructure.location"
                        placeholder="Location"
                      />
                    </Form.Item>
                    <h6 className="font-weight-bold ml-3">Floor:</h6>
                    <Form.Item label="Floor" name="floor._id" hasFeedback>
                      <Select
                        name="floor._id"
                        placeholder="Floor"
                        style={{ width: "100%" }}
                        onChange={(value) =>
                          handleSensorFloorChange(value, setFieldValue)
                        }
                      >
                        <Select.Option value="ADDNEW">
                          <i className="fa fa-plus text-primary" /> Add New
                          Floor
                        </Select.Option>
                        {selectedInfra?.floors.map((floor) => (
                          <Select.Option key={floor._id} value={floor._id}>
                            {floor.sign}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </>
                ) : null}
                <Form.Item
                  label="Description"
                  name="floor.description"
                  validate={(value) =>
                    !value && "Please enter floor description"
                  }
                  hasFeedback
                >
                  <Input name="floor.description" placeholder="Description" />
                </Form.Item>
                <Form.Item
                  label="Sign"
                  name="floor.sign"
                  validate={(value) => {
                    if (!value) return "Please enter floor sign";
                    if (value !== "G" && !/^B?[0-9]+$/i.test(value))
                      return "Floor sign is not valid";
                    return undefined;
                  }}
                  hasFeedback
                >
                  <Input
                    name="floor.sign"
                    placeholder="Sign - such as G, B1, B2, 1, 2 ..."
                  />
                </Form.Item>
                {selectedFloor || isNewFloor ? (
                  <>
                    <h6 className="font-weight-bold ml-3">Washroom:</h6>
                    <Form.Item
                      label="Washroom"
                      name="washroom._id"
                      hasFeedback
                      validate={(value) => !value && "Please select washroom"}
                    >
                      <Select
                        name="washroom._id"
                        placeholder="Washroom"
                        style={{ width: "100%" }}
                        onChange={(value) =>
                          handleSensorWashroomChange(value, setFieldValue)
                        }
                      >
                        <Select.Option value="ADDNEW">
                          <i className="fa fa-plus text-primary" /> Add New
                          Washroom
                        </Select.Option>
                        {selectedFloor?.washrooms.map((wr) => (
                          <Select.Option key={wr._id} value={wr._id}>
                            {wr.type.toUpperCase()}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </>
                ) : null}
                {isNewWashroom ? (
                  <>
                    <Form.Item label="Type" name="washroom.type" hasFeedback>
                      <Select
                        name="washroom.type"
                        placeholder="Type"
                        style={{ width: "100%" }}
                        options={["Male", "Female", "Disabled"].map(
                          (label) => ({
                            label,
                            value: label.toLowerCase(),
                          })
                        )}
                      />
                    </Form.Item>
                  </>
                ) : null}
              </div>
              <div className="col-md-6">
                <GatewayForm
                  initialValues={initialGateway}
                  infrastructures={infrastructures}
                  setFieldValue={setFieldValue}
                  values={values}
                />
              </div>
              <div className="col-md-12 mt-3 d-flex justify-content-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!isValid || loading || updatingSensor}
                  loading={loading || updatingSensor}
                  className="mr-3"
                >
                  Submit
                </Button>
                {!isEmpty(currentSensor) && (
                  <Button className="bg-success" onClick={handleDownloadCert}>
                    Download certificates
                  </Button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateSensorPage;
