import React from 'react';

export default ({ description }) => {
    return (
        <div className="description panel">
            <p>{description.paragraph1}</p>
            <p>
                <span className="spacer" />
                {description.paragraph2}
            </p>
        </div>
    );
};