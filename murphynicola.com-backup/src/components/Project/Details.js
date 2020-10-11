import React from 'react';

export default ({ data }) => {
    return (
        <div className="details">
            <p>Project: &nbsp; {data.project}</p>
            <p>Design: &nbsp; {data.design}</p>
            <p>Location: &nbsp; {data.location}</p>
            <p>Year: &nbsp; {data.year}</p>
        </div>
    );
};