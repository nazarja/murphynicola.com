import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateAbout } from '../../../store/actions/dataActions';

const About = ({ data, updateAbout }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (data) {
            setText(data.text);
            setImage(data.imageURL);
        };
    }, [data])

    const handleSubmit = event => {
        event.preventDefault();
        updateAbout({ text, imageURL: image });
    };

    const handleImage = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                setImage(reader.result)
            });
        };
    }

    return data
        ? (
            <div className="content">
                <h3>About</h3>
                <form onSubmit={handleSubmit}>

                    <label>Text (Limit 350 Characters)</label>
                    <textarea
                        maxLength="350" name="text" value={text}
                        onChange={event => setText(event.target.value)}
                    >{text}</textarea>

                    <label>Profile Image | Allowed: (PNG, JPEG)</label>
                    <div className="images">
                        <img src={image} alt="profile thumb" />
                    </div>
                    <input
                        name="images" type="file" accept="image/png, image/jpeg"
                        onChange={event => handleImage(event)}
                    />
                    <label>Submit Changes</label>
                    <button className="uk-button uk-button-primary">Submit</button>
                </form>
            </div>
        )
        : null;
};

export default connect(null, { updateAbout })(About);