import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTrail, animated } from 'react-spring';
import Item from './WorkItem';
import Loader from '../Other/Loader';
import { mount } from '../Other/utils/utils';
import './Work.css';

const Work = (props) => {
    const [items, setItems] = useState([]);
    const trail = useTrail(items.length, {
        config: { mass: 5, tension: 2500, friction: 125 },
        from: { opacity: 0, x: 150, height: 0 },
        to: { opacity: 1, x: 0, height: 0 },
    });

    useEffect(() => {
        mount('mount', 'Work - Nicola Murphy');
        return () => mount('unmount', null);
    });

    useEffect(() => {
        if (!props.data) return;
        
        const { data } = props.data;
        const nav = document.querySelector('.menu');
        const images = data.map(({ work }) => work.imageURL);
        
        setItems(data.map(({ work }) => work.text))

        const animatableProperties = {
            tx: { previous: 0, current: 0, amt: 0.08 },
            ty: { previous: 0, current: 0, amt: 0.08 },
            rotation: { previous: 0, current: 0, amt: 0.08 },
            brightness: { previous: 1, current: 1, amt: 0.08 }
        };

        [...nav.querySelectorAll('.menu-item')].forEach((item, pos) => new Item(item, pos, animatableProperties, images[pos], images));
    }, [props.data])


    if (!props.data || !items) return <Loader />;
    return (
        <div id="work">
            <nav className="menu uk-position-center">
                {
                    props.data.data.map(({ work }, index) => {
                        return (
                            <a
                                className="menu-item"
                                href={`/project/${index}/${work.url}`}
                                key={work.text + index}
                                data-img={work.imageURL}
                                data-nohover={true}
                            >
                                <span className="menu-item-text">
                                    <span className="menu-item-textinner">
                                        {
                                            trail.map(({ x, height, ...rest }, index2) => {
                                                if (index === index2) {
                                                    return (
                                                        <animated.div
                                                            key={items[index] + 'spring'}
                                                            style={{ transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}
                                                        >
                                                            <animated.div className="trails-text" style={{ height }}>
                                                                {items[index]}
                                                            </animated.div>
                                                        </animated.div>
                                                    )
                                                }
                                                else return null;
                                            })
                                        }
                                    </span>
                                </span>
                            </a>
                        );
                    })
                }
            </nav>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        data: state.data.projects
    };
};

export default connect(mapStateToProps, null)(Work)