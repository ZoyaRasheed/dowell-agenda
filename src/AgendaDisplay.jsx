import React, { useState, useEffect } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";

const AgendaDisplay = ({ agendaDetails }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedAgenda, setSelectedAgenda] = useState(null);

  const project = agendaDetails.data.project;
  const subprojectList = agendaDetails.data.subprojects_list;
  const subprojectWithoutAgenda =
    agendaDetails.data.subproject_without_agenda;

  const handleClick = (event, newValue) => {
    const clickedItem = subprojectList[newValue];
    setSelectedProject(clickedItem);
    setSelectedAgenda(agendaDetails.data.agenda.find((agenda) => agenda.subproject_name === clickedItem));
  };
  // useEffect(()=>{
  //   console.log(selectedProject)
  // },[selectedProject])

  const subProjectTabs = subprojectList.map((item, index) => {
    const matchedItem = item.split(" ").join("-");
    return (
      <Tab
        key={index}
        variant="outlined"
        color="neutral"
        disabled={subprojectWithoutAgenda.includes(matchedItem)}
      >
        {item}
      </Tab>
    );
  });

  const displayAgenda = () => {
    // return (
    //         <>
    //           <div>Lead Name:{selectedAgenda.agenda[0].lead_name}</div>
    //           <div>Agenda Title:{selectedAgenda.agenda[0].agenda_title}</div>
    //           <div>Agenda Description:{selectedAgenda.agenda[0].agenda_description}</div>
    //           <div>Week Start:{selectedAgenda.agenda[0].week_start}</div>
    //           <div>Week End:{selectedAgenda.agenda[0].week_end}</div>
    //         </>
    //       );

    return (
      <>
        {Object.entries(selectedAgenda.agenda[0]).map(([key, value]) => (
          <div key={key}>
          {key}:{Array.isArray(value)? displayTimeline(value): value}
          </div>
        ))}
      </>
    );
  };
  const displayTimeline = (timeline) => {
    return (
      <>
        {timeline.map((timelineItem, index) => (
          <div key={index}>
            {Object.entries(timelineItem).map(([key, value]) => (
              <div key={key}>
               {key}:{value}
              </div>
            ))}
          </div>
        ))}
      </>
    );
  };
  return (
    <div className="agenda-container">
      <h1>Agenda Details</h1>
      <p>Project: {project}</p>
      <Tabs aria-label="Disabled tabs" defaultValue={0} onChange={handleClick}>
        <TabList>{subProjectTabs}</TabList>
      </Tabs>

      {selectedAgenda && (
        <div>
          {displayAgenda()}
        </div>
      )}
    </div>
  );
};

export default AgendaDisplay;
