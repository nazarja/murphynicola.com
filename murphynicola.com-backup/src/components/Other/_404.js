import React from 'react';
import { Link } from 'react-router-dom';
import './_404.css';

export default () => {
    return (
        <div id="_404" className="uk-position-center">
            <div className="_404-header">
                <span>#404</span>
            </div>
            <div>
                <h1>This Page Does Not Exist</h1>
                <p>But we can show you other parts of the site.</p>
                <Link to="/">
                    <button className="uk-button uk-button-secondary uk-width-1-1">
                        Go Back Home
                    </button>
                </Link>
            </div>
        </div>
    );
};