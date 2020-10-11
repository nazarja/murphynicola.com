import React from 'react';
import firebase from '../../firebase/firebase';
import { Link } from 'react-router-dom';

export default ({ setAdminPage }) => {
    const handleSignOut = () =>  firebase.auth().signOut();

    return (
        <div className="admin-nav">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li onClick={() => setAdminPage('about')}>About</li>
                    <li onClick={() => setAdminPage('landing')}>Landing</li>
                    <li onClick={() => setAdminPage('project')}>Projects</li>
                    <li>
                        <button
                            onClick={handleSignOut}
                            className="uk-button uk-button-secondary"
                        >
                            Sign Out
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
