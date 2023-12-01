import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import AgendaDisplay from "./AgendaDisplay";
import "./App.css";

const ProjectDropdown = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [agendaDetails, setAgendaDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://100098.pythonanywhere.com/settinguserproject/",
        );
        const data = response.data;

        const companyId = "6385c0f18eca0fb652c94561";
        const companyProjects = data.filter(
          (project) => project.company_id === companyId,
        );

        if (companyProjects.length > 0) {
          const projectList = companyProjects[0].project_list || [];
          const formattedProjects = projectList.map((project) => ({
            value: project,
            label: project,
          }));
          setProjects(formattedProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (selectedOption) => {
    setSelectedProject(selectedOption.value);
    setLoading(true);
    axios
      .post(
        "https://100098.pythonanywhere.com/weekly_agenda/?type=grouplead_agenda_check&company_id=6385c0f18eca0fb652c94561&limit=10&offset=0",
        { project: selectedOption.value },
      )
      .then((response) => {
        const agendaDetails = response.data;
        setAgendaDetails(agendaDetails);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching agenda details:", error);
      });
  };

  return (
    <div className="App">
      <h1>Dowell Weekly Agenda Report</h1>
      <label htmlFor="projects">Select a project:</label>
      <Select
        id="projects"
        value={{ value: selectedProject, label: selectedProject }}
        onChange={handleProjectChange}
        options={projects}
        className="custom-select"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        agendaDetails && <AgendaDisplay agendaDetails={agendaDetails} />
      )}
    </div>
  );
};

export default ProjectDropdown;
