import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteProject, updateProject } from '../../../store/actions/dataActions';
import Project from './Project';
import NewProject from './NewProject';

const Projects = ({ data, updateProject, deleteProject }) => {
    const [projectsData, setProjectsData] = useState([]);
    const [showNewProject, setShowNewProject] = useState(false);

    useEffect(() => {
        if (data) {
            setProjectsData([...data.data])
        };
    }, [data]);

    const handleSubmit = (item, index) => {
        updateProject(item, projectsData, index);
    };

    const handleDelete = (index) => {
        const newData = [...projectsData];
        const folder = projectsData[index].work.url;
        newData.splice(index, 1);
        deleteProject(newData, folder);
    };

    return data && projectsData
        ? (
            <div className="content projects">
                <h3>
                    Projects
                </h3>
                <button
                    className="uk-button uk-button-primary addProjectButton"
                    style={{ display: `${showNewProject ? 'none' : 'block'}` }}
                    onClick={() => setShowNewProject(true)}
                >
                    Add New Project
                </button>
                <ul data-uk-accordion>

                    {
                        projectsData.map((item, index) => {
                            return (
                                <li key={item.data.project + index}>
                                    <span className="uk-accordion-title">{item.data.project}</span>
                                    <div className="uk-accordion-content">
                                        <Project
                                            item={item}
                                            index={index}
                                            handleDelete={handleDelete}
                                            handleSubmit={handleSubmit}
                                        />
                                    </div>
                                </li>
                            );
                        })
                    }
                    <div className="fixed-project" style={{ display: `${showNewProject ? 'block' : 'none'}` }}>
                        <NewProject
                            index={projectsData.length}
                            handleDelete={handleDelete}
                            handleSubmit={handleSubmit}
                            setShowNewProject={setShowNewProject}
                        />
                    </div>
                </ul>
            </div>
        )
        : null;
};

export default connect(null, { updateProject, deleteProject })(Projects);