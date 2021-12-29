import mock from "../mock";
import engineeringData from "./engineering_data";
import assetData from "./assets_data";
import assetDetailData from "./assets_detail_data";
import workplaceData from "./workplace_data";
import experienceData from "./experience_data";

mock.onGet("/power-consumtions").reply((request) => {
  return [200, engineeringData["power-consumtions"]];
});

mock.onGet("/powers").reply((request) => {
  return [200, engineeringData["powers"]];
});

mock.onGet("/air-quality").reply((request) => {
  return [200, engineeringData["air-quality"]];
});

mock.onGet("/critical-alarms").reply((request) => {
  return [200, engineeringData["critical-alarms"]];
});

mock.onGet("/commodity-transactions").reply((request) => {
  return [200, engineeringData["commodity-transactions"]];
});

mock.onGet("/assets-equipments").reply((request) => {
  return [200, assetData.assets_equipments];
});

mock.onGet("/work-order-schedules").reply((request) => {
  return [200, assetData.work_order_schedules];
});

mock.onGet("/tickets").reply((request) => {
  return [200, assetData.tickets];
});

mock.onGet("/preventive-maintenances").reply((request) => {
  return [200, assetData.preventive_maintenances];
});

mock.onGet("/external-visitors").reply((request) => {
  return [200, assetData.external_visitors];
});

mock.onGet("/visitors").reply((request) => {
  return [200, assetData.visitors];
});

mock.onGet("/inventory").reply((request) => {
  return [200, assetData.inventory];
});

mock.onGet("/building-compliances").reply((request) => {
  return [200, assetData.building_compliances];
});

mock.onGet("/assets-details").reply((request) => {
  return [200, assetDetailData.assets_details];
});

mock.onGet("/work-orders").reply((request) => {
  return [200, assetDetailData.work_orders];
});

mock.onGet("/tp-engineerings").reply((request) => {
  return [200, assetDetailData.TP_engineering_dashboard];
});

mock.onGet("/covid").reply((request) => {
  return [200, workplaceData.covid];
});

mock.onGet("/meeting-room-occupancies").reply((request) => {
  return [200, workplaceData.meeting_room_occupancy];
});

mock.onGet("/attendance-management").reply((request) => {
  return [200, workplaceData.attendance_management];
});

mock.onGet("/critical-alerts").reply((request) => {
  return [200, workplaceData.critical_alerts];
});

mock.onGet("/employees").reply((request) => {
  return [200, workplaceData.employees];
});

mock.onGet("/washroom-availability").reply((request) => {
  return [200, experienceData.washroom_availalbility];
});

mock.onGet("/smart-washroom").reply((request) => {
  return [200, experienceData.smart_washroom];
});

mock.onGet("/air-quality/conference-room").reply((request) => {
  return [200, experienceData.conference_room];
});

mock.onGet("/air-quality/meeting-room-1").reply((request) => {
  return [200, experienceData.meeting_room_1];
});

mock.onGet("/air-quality/meeting-room-2").reply((request) => {
  return [200, experienceData.meeting_room_2];
});

mock.onGet("/air-quality/meeting-room-3").reply((request) => {
  return [200, experienceData.meeting_room_3];
});

mock.onGet("/sites").reply((request) => {
  return [200, []];
});