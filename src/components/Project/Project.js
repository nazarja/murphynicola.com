import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TimelineLite } from 'gsap/all';
import Loader from '../Other/Loader';
import Details from './Details';
import Images from './Images';
import Description from './Description';
import Navigation from './Navigation';
import { mount } from '../Other/utils/utils';
import './Project.css';


const Project = (props) => {
    const [project, setProject] = useState({});
    const [projects, setProjects] = useState([]);
    const sidebarRef = useRef(null);
    const contentRef = useRef(null);
    const imagesRef = useRef(null);

    useEffect(() => {
        if (props.data) {
            const { data } = props.data;
            const id = parseInt(props.match.params.id);
            const slug = props.match.params.slug;

            if (id > data.length - 1 || data[id].work.url !== slug) props.history.push('/404');

            const prev = id - 1 < 0 ? (data.length - 1) : id - 1;
            const next = id + 1 > (data.length - 1) ? 0 : id + 1;

            const prevProject = data[prev];
            const nextProject = data[next];
            prevProject.id = prev;
            nextProject.id = next;

            setProject(data[id]);
            setProjects([prevProject, nextProject])
            mount(null, `${data[id].data.project} - Nicola Murphy`);
        };
    }, [props, project]);

    useEffect(() => {
        if (props.data && project.data) {
            const tl = new TimelineLite();

            tl.fromTo(
                [sidebarRef.current, contentRef.current],
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: .75 }
            )
            tl.fromTo(imagesRef.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: .75, delay: .5 });
        }
    }, [project, props]);


    return props.data && project.data
        ? (
            <>
                <div id="project">
                    <div ref={sidebarRef} className="sidebar">
                        <Details data={project.data} />
                        <Navigation projects={projects} />
                    </div>
                    <div ref={contentRef} className="content">
                        <Description description={project.data} />
                        <Images images={project.images} imagesRef={imagesRef} />
                    </div>
                </div>
            </>
        )
        : <Loader />;
};

const mapStateToProps = state => {
    return {
        data: state.data.projects
    };
};

export default withRouter(connect(mapStateToProps, null)(Project));