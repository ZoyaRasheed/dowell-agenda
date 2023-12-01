import React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";

const AgendaDisplay = ({ agendaDetails }) => {
  const project = agendaDetails.data.project;
  const subproject_list = agendaDetails.data.subprojects_list;
  const subproject_without_agenda =
    agendaDetails.data.subproject_without_agenda;
  

  const subProjectTabs = subproject_list.map((item, index) => {
    const matchedItem = item.split(" ").join("-")
    return (
    <Tab
      key={index}
      variant="outlined"
      color="neutral"
      disabled={subproject_without_agenda.includes(matchedItem)}
    >
      {item}
    </Tab>
  )});

  return (
    <div className="agenda-container">
      <h1>Agenda Details</h1>
      <p>Project: {project}</p>
      <Tabs aria-label="Disabled tabs" defaultValue={0}>
        <TabList>{subProjectTabs}</TabList>
      </Tabs>
    </div>
  );
};

export default AgendaDisplay;
