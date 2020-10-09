import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default ({ projects }) => {
    return (
        <nav id="navigation">
            <div className="prev">
                <Link to={`/project/${projects[0].id}/${projects[0].work.url}`}>
                    <div className="arrow">
                        <svg width="18" height="18" viewBox="0 0 64 64">
                            <path id="arrow-left-1" d="M46.077 55.738c0.858 0.867 0.858 2.266 0 3.133s-2.243 0.867-3.101 0l-25.056-25.302c-0.858-0.867-0.858-2.269 0-3.133l25.056-25.306c0.858-0.867 2.243-0.867 3.101 0s0.858 2.266 0 3.133l-22.848 23.738 22.848 23.738z" />
                        </svg>
                    </div>
                    <div className="nav-content">
                        <p>{projects[0].work.text}</p>
                        <p>Previous</p>
                    </div>
                    <div className="image">
                        <img src={projects[0].work.imageURL} alt="Previous Project" />
                    </div>
                </Link>
            </div>
            <div className="next">
                <Link to={`/project/${projects[1].id}/${projects[1].work.url}`}>
                    <div className="arrow">
                        <svg width="18" height="18" viewBox="0 0 64 64">
                            <path id="arrow-right-1" d="M17.919 55.738c-0.858 0.867-0.858 2.266 0 3.133s2.243 0.867 3.101 0l25.056-25.302c0.858-0.867 0.858-2.269 0-3.133l-25.056-25.306c-0.858-0.867-2.243-0.867-3.101 0s-0.858 2.266 0 3.133l22.848 23.738-22.848 23.738z" />
                        </svg>
                    </div>
                    <div className="nav-content">
                        <p>{projects[1].work.text}</p>
                        <p>Next</p>
                    </div>
                    <div className="image">
                        <img src={projects[1].work.imageURL} alt="Previous Project" />
                    </div>
                </Link>
            </div>
        </nav>
    );
};