import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAdminPage } from '../../store/actions/userActions';
import Navigation from './Navigation';
import About from './Pages/About';
import Landing from './Pages/Landing';
import Projects from './Pages/Projects';
import './Admin.css';

const Admin = ({ user, recent, data, setAdminPage }) => {
    const [page, setPage] = useState(recent.page || 'project');

    useEffect(() => {
        if (recent.page) setPage(recent.page.page);
    }, [user, data, recent]);

    return user && data
        ? (
            <div id="admin">
                <Navigation setAdminPage={setAdminPage} />
                {
                    page === 'about'
                        ? <About data={data.about} />
                        : page === 'landing'
                            ? <Landing data={data.landing} />
                            : page === 'project'
                                ? <Projects data={data.projects} />
                                : null
                }
            </div>
        )
        : <Redirect to="/login" />
};

const mapStateToProps = state => {
    return {
        data: state.data,
        recent: state.user
    }
}

export default connect(mapStateToProps, { setAdminPage })(Admin);