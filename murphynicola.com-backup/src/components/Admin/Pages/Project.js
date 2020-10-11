import React, { useState } from 'react';

export default ({ item, index, handleSubmit, handleDelete }) => {
    const [itemData, setItemData] = useState(item);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleImageAdd = ({ target }) => {
        const file = target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                const newData = { ...itemData };
                newData.images.push(reader.result);
                setItemData({ ...newData })
            });
        };
    };

    const handleImageDelete = (i) => {
        const newData = { ...itemData };
        newData.images.splice(i, 1);
        setItemData({ ...newData })
    };

    const handleImageChange = ({ target }, i) => {
        const file = target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                const newData = { ...itemData };
                newData.images[i] = reader.result;
                setItemData({ ...newData })
            });
        };
    };

    const handleTextChange = ({ target }) => {
        const newData = { ...itemData };
        newData.data[target.name] = target.value;
        setItemData({ ...newData })
    };

    return (
        <>
            <label>Details</label>
            <div>
                <p>Design:</p>
                <input type="text" name="design" value={item.data.design} onChange={event => handleTextChange(event)} />
                <p>Location</p>
                <input type="text" name="location" value={item.data.location} onChange={event => handleTextChange(event)} />
                <p>Year:</p>
                <input type="text" name="year" value={item.data.year} onChange={event => handleTextChange(event)} />
                <p>Paragraph 1:</p>
                <textarea name="paragraph1" value={item.data.paragraph1}
                    onChange={event => handleTextChange(event)}
                ></textarea>
                <p>Paragraph 2:</p>
                <textarea name="paragraph2" value={item.data.paragraph2}
                    onChange={event => handleTextChange(event)}
                ></textarea>
            </div>
            <label>Images</label>
            <div>
                <div className="images">
                    {
                        item.images.map((image, i) => {
                            return (
                                <div key={`image-${i}`} >
                                    <span
                                        onClick={() => handleImageDelete(i)}
                                        className="uk-label uk-label-danger remove-image"
                                    >Delete</span>
                                    <img src={image} alt={`thumb-${i}`} />
                                    <input type="file" onChange={event => handleImageChange(event, i)} />
                                </div>
                            );
                        })
                    }
                </div>
                <label>Add New Image</label>
                <input type="file" onChange={handleImageAdd} />
            </div>
            <label>Submit Changes</label>
            <button
                style={{ display: `${showConfirm ? 'none' : 'block'}` }}
                className="uk-button uk-button-danger"
                onClick={() => setShowConfirm(true)}
            >Delete</button>
            <div style={{ display: `${showConfirm ? 'block' : 'none'}` }}>
                <button
                    onClick={() => setShowConfirm(false)}
                    className="uk-button"
                    style={{backgroundColor: 'darkseagreen', color: 'white'}}
                >No, Cancel</button>
                <button
                    onClick={() => handleDelete(index)}
                    className="uk-button uk-button-danger"
                >Yes, Delete</button>
            </div>
            <button
                className="uk-button uk-button-primary submit-project-button"
                onClick={() => handleSubmit(itemData, index)}
                style={{ marginBottom: '30px' }}
            >Submit Project Changes</button>
        </>
    );
};