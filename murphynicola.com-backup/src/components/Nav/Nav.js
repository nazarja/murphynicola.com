import React, { useState, useEffect } from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';
import './Nav.css';

export default ({ location }) => {
    const [color, setColor] = useState('light');
    const [show, setShow] = useState(true);
    const path = location.pathname;

    useEffect(() => {
        ['/', '/work'].includes(path)
            ? setColor('dark')
            : setColor('light');

        ['/login', '/admin', '/404'].includes(path)
            ? setShow(false)
            : setShow(true);
    }, [path]);

    return show
        ? (
            <div id="nav">
                <Desktop color={color} path={path} />
                <Mobile color={color} />
            </div>
        )
        : null
};