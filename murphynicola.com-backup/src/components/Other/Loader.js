import React, { useState, useEffect } from 'react';
import './Loader.css';

export default () => {
    const [letter, setLetter] = useState('LOADING');

    useEffect(() => {
        const letters = 'LOADING'.split('');
        letters.unshift('LOADING')
        let position = 0;

        const interval = setInterval(() => {
            setLetter(letters[position]);
            position === letters.length - 1
                ? position = 0
                : position++
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="loader">
            <div className="animation">
                <div className="letter">
                    <span>{letter}</span>
                </div>
            </div>
        </div>
    );
};