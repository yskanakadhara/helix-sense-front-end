import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { message, Modal, Button, Select } from "antd";
import useFetch from "@app/util/useFetch";
import LocationCard from "./LocationCard";
import DataPeriodCard from "./DataPeriodCard";
import AlarmTable from "./AlarmTable";
import AlarmCard from "./AlarmCard";
import AlarmRecordTable from "./AlarmRecordTable";

const DashboardPage = ({ setUserData }) => {
  const history = useHistory();
  const [selectedSolution, setSelectedSolution] = useState(null);

  const { fetchData: addSolution } = useFetch((params) => ({
    url: `${process.env.API_URL}/user/solutions`,
    body: JSON.stringify(params),
    method: "POST",
    onSuccess: (data) => {
      setUserData(data);
      history.push(`/${params.solution}`);
    },
    onError: (error) => {
      message.error(error);
    },
  }));

  const { fetchData: removeSolution } = useFetch((params) => ({
    url: `${process.env.API_URL}/user/solutions`,
    body: JSON.stringify(params),
    method: "DELETE",
    onSuccess: (data) => {
      setUserData(data);
    },
    onError: (error) => {
      message.error(error);
    },
  }));

  const handleAddSolution = () => {
    if (selectedSolution) {
      addSolution({ solution: selectedSolution });
    } else {
      message.error("Please select solution first");
    }
  };

  const handleDeleteSolution = () => {
    if (selectedSolution) {
      Modal.confirm({
        title: "Are you sure you want to remove this solution?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: () => removeSolution({ solution: selectedSolution }),
      });
    } else {
      message.error("Please select solution first");
    }
  };

  return (
    <>
      <div className="row px-3 mb-3">
        <div className="col-md-4 mb-3">
          <div className="mb-2" style={{ fontWeight: 600 }}>
            Solutions:
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Select solution"
            value={selectedSolution}
            onSelect={(value) => setSelectedSolution(value)}
            options={[
              "Washroom",
              "Transformers",
              "HVAC",
              "Compressor",
              "Predictive Maintenance",
              "Energy",
            ].map((solution) => ({
              value: solution.toLowerCase().replaceAll(" ", "-"),
              label: solution,
            }))}
          />
          <div className="mt-2">
            <Button
              type="primary"
              icon={<i className="fa fa-plus mr-3" />}
              onClick={handleAddSolution}
            >
              ADD
            </Button>
            <Button
            
              className="ml-3 bg-danger text-white"
              icon={<i className="fa fa-trash mr-3" />}
              onClick={handleDeleteSolution}
            >
              DELETE
            </Button>
          </div>
        </div>
      </div>
      <div className="row px-3">
        <div className="col-md-4">
          <LocationCard />
          <DataPeriodCard />
          <AlarmTable />
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-3">
              <AlarmCard title="CRITICAL" count={30} color="red" />
            </div>
            <div className="col-md-3">
              <AlarmCard title="MAJOR" count={35} color="orange" />
            </div>
            <div className="col-md-3">
              <AlarmCard title="MINOR" count={36} color="blueviolet" />
            </div>
            <div className="col-md-3">
              <AlarmCard title="EVENT" count={41} color="deepskyblue" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <AlarmRecordTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
