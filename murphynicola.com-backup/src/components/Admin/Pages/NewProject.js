import React, { useState } from 'react';

export default ({ handleSubmit, index, setShowNewProject }) => {
    const [itemData, setItemData] = useState({
        images: [],
        data: { project: '', design: '', location: '', year: '', paragraph1: '', paragraph2: '' },
        work: { text: '', url: '', imageURL: '' }
    });

    const handleDelete = () => {
        setItemData({
            images: [],
            data: { project: '', design: '', location: '', year: '', paragraph1: '', paragraph2: '' },
            work: { text: '', url: '', imageURL: '' }
        });
        setShowNewProject(false);
    };

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

    return itemData
        ? (
            <div id="new-project">
                <label>NEW PROJECT</label>
                <div>
                    <p>Project Title:</p>
                    <input type="text" name="project" value={itemData.data.project} onChange={event => handleTextChange(event)} />
                    <p>Design:</p>
                    <input type="text" name="design" value={itemData.data.design} onChange={event => handleTextChange(event)} />
                    <p>Location</p>
                    <input type="text" name="location" value={itemData.data.location} onChange={event => handleTextChange(event)} />
                    <p>Year:</p>
                    <input type="text" name="year" value={itemData.data.year} onChange={event => handleTextChange(event)} />
                    <p>Paragraph 1:</p>
                    <textarea name="paragraph1" value={itemData.data.paragraph1}
                        onChange={event => handleTextChange(event)}
                    ></textarea>
                    <p>Paragraph 2:</p>
                    <textarea name="paragraph2" value={itemData.data.paragraph2}
                        onChange={event => handleTextChange(event)}
                    ></textarea>
                </div>
                <label>Images</label>
                <div>
                    <div className="images">
                        {
                            itemData.images.map((image, i) => {
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
                    className="uk-button uk-button-danger"
                    onClick={handleDelete}
                >Close New Project</button>
                <button
                    className="uk-button uk-button-primary"
                    onClick={() => handleSubmit(itemData, index)}
                    style={{ marginBottom: '30px' }}
                >Create New Project</button>
            </div>
        )
        : null;
};