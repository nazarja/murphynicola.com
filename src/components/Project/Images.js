import React from 'react';
import { ImageGroup, Image } from 'react-fullscreen-image';

export default ({ images, imagesRef }) => {
    return (
        <div ref={imagesRef} className="images-container">
            {
                <ImageGroup>
                    <ul className="images panel">
                        {
                            images.map((image, index) => (
                                <li 
                                    key={`project-thumb-${index}`}
                                >   
                                    <Image
                                        src={image}
                                        alt={`project-thumb-${index}`}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </ImageGroup>
            }
        </div>
    );
}