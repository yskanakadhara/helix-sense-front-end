import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import { Divider, Spin, message, Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import useFetch from "@app/util/useFetch";
import AnalyticIcon from "@images/icons/analytics.svg";
import { Form, Select, DatePicker } from "formik-antd";
import { Formik } from "formik";
import PeopleCountTrend from "./PeopleCountTrend";
import AirQualityTrend from "./AirQualityTrend";
import CumulativeReport from "./CumulativeReport";
import AirQualityChart from "./AirQualityChart";
import NumberOfDetections from "./NumberOfDetections";
import VocChannel from "./VocChannel";
import BorderLeftCard from "@app/core/components/BorderLeftCard";

const Analytics = ({ activeIndex, setActiveIndex }) => {
  const [totalDetections, setTotalDetections] = useState(0);
  const [formInitialValues, setFormInitialValues] = useState({});
  const { loading, data: washrooms, fetchData: getWashrooms } = useFetch({
    url: `${process.env.API_URL}/washrooms`, // http://xx.xx.xx.xx:8081/api/washrooms
    method: "GET",
    onSuccess: (data) => {
      const fromDate = moment().subtract(7, "days");
      const roomId = data.filter((wr) => wr.sensors.length > 0)[0]?._id;
      setFormInitialValues({
        washroom: roomId,
        fromDate,
        toDate: moment(),
      });
      if (roomId) {
        getPredictions({
          washroom: roomId,
          fromDate,
          toDate: moment(),
        });
      }
    },
  });

  const {
    loading: loadingData,
    data: predictionData,
    fetchData: getPredictions,
  } = useFetch((params) => ({
    url: `${process.env.API_URL}/washrooms/predict`,
    method: "POST",
    body: JSON.stringify(params),
    onSuccess: (data) => {
      const total_people_count = data.washroom.reduce(
        (a, b) => a + Number(b.occupancylasthour),
        0
      );
      setTotalDetections(total_people_count * 2);
    },
    onError: (error) => {
      message.error(error);
    },
  }));

  useEffect(() => {
    getWashrooms();
  }, []);

  const onSubmit = useCallback(
    (values) => {
      getPredictions(values);
    },
    [getPredictions]
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
            Analytics
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
      <Formik
        initialValues={formInitialValues}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ isValid, values }) => (
          <Form layout="vertical" className="mt-4">
            <div className="row">
              <div className="col col-md-2 col-lg-1 font-weight-bold text-left text-md-right">
                Search:
              </div>
              <div className="col col-md-3">
                <Form.Item
                  name="washroom"
                  validate={(value) => !value && "Please select washroom"}
                  hasFeedback
                >
                  <Select
                    name="washroom"
                    placeholder="Washroom"
                    style={{ width: "100%" }}
                    options={washrooms
                      ?.filter((w) => w.sensors?.length > 0)
                      .map((wr) => ({
                        label: `${wr.type.toUpperCase()}, ${wr.floor?.description}, ${wr.floor?.infrastructure?.name}`,
                        value: wr._id,
                      }))}
                  />
                </Form.Item>
              </div>
              <div className="col col-md-3">
                <Form.Item
                  name="fromDate"
                  validate={(value) => {
                    if (!value) return "Please select start date";
                    if (moment(value).isAfter(values.toDate, "day"))
                      return "Start date cannot greater than or equal end date";
                    return undefined;
                  }}
                  hasFeedback
                >
                  <DatePicker
                    name="fromDate"
                    placeholder="From Date"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
              <div className="col col-md-3">
                <Form.Item
                  name="toDate"
                  validate={(value) => {
                    if (!value) return "Please select end date";
                    if (moment(value).isBefore(values.fromDate))
                      return "End date cannot smaller than or equal start date";
                    return undefined;
                  }}
                  hasFeedback
                >
                  <DatePicker
                    name="toDate"
                    placeholder="To Date"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
              <div className="col col-md-2">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  disabled={!isValid || loading || loadingData}
                  loading={loading || loadingData}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {loadingData ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: 400 }}
        >
          <Spin />
          <h5>Fetching data from server ...</h5>
        </div>
      ) : (
        <>
          <div className="row mb-3">
            <div className="col col-sm-6 col-lg-3">
              <BorderLeftCard
                title="TOTAL NUMBER OF DETECTIONS"
                value={totalDetections}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-3">
              <CumulativeReport washroomData={predictionData?.washroom} />
            </div>
            <div className="col-lg-6 mb-3">
              <AirQualityChart washroomData={predictionData?.washroom} />
            </div>
            <div className="col-lg-6 mb-3">
              <NumberOfDetections washroomData={predictionData?.washroom} />
            </div>
            <div className="col-lg-6 mb-3">
              <VocChannel washroomData={predictionData?.washroom} />
            </div>
            <div className="col-lg-6 mb-3">
              <PeopleCountTrend
                washroomData={predictionData?.washroom}
                peopleCountTrendData={predictionData?.people_count}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <AirQualityTrend
                washroomData={predictionData?.washroom}
                trendData={predictionData?.iaq_forecast}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
