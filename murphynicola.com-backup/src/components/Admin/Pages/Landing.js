import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateLanding } from '../../../store/actions/dataActions';

const Landing = ({ data, updateLanding }) => {
    const [landingData, setLandingData] = useState([]);

    useEffect(() => {
        if (data) setLandingData([...data.data]);
    }, [data])

    const handleSubmit = event => {
        event.preventDefault();
        updateLanding(landingData);
    };

    const handleTextChange = (event, index) => {
        const text = event.target.value;
        const newData = landingData;
        newData[index].text = text;
        setLandingData([...landingData]);
    };

    const handleAltChange = (event, index) => {
        const text = event.target.value;
        const newData = landingData;
        newData[index].imageALT = text;
        setLandingData([...landingData]);
    };

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                const newData = landingData;
                newData[index].imageURL = reader.result;
                setLandingData([...landingData]);
            });
        };
    };

    return data && landingData
        ? (
            <div className="content landing">
                <h3>Landing</h3>
                <form onSubmit={event => handleSubmit(event)}>
                    {
                        landingData.map((item, index) => {
                            return (
                                <div className="landing-item" key={'landing' + index}>
                                    <label>Image {index}</label>
                                    <div className="images">
                                        <img src={landingData[index].imageURL} alt="Current Thumb" />
                                    </div>
                                    <input
                                        name="imageURL" type="file" accept="image/png, image/jpeg"
                                        onChange={event => handleImageChange(event, index)}
                                    />
                                    
                                    <p>Text | Max Text Characters: 18</p>
                                    <input
                                        name="text" type="text" value={landingData[index].text}
                                        maxLength="18" onChange={event => handleTextChange(event, index)}
                                    />
                                    <p>Image Alt (short description) | Max Text Characters: 100</p>
                                    <input
                                        name="imageALT" type="text" value={landingData[index].imageALT}
                                        maxLength="100" onChange={event => handleAltChange(event, index)}
                                    />
                                </div>
                            );
                        })
                    }
                    <label>Submit Changes</label>
                    <button className="submit-button uk-button uk-button-primary">Submit</button>
                </form>
            </div>
        )
        : null;
};

export default connect(null, { updateLanding })(Landing);