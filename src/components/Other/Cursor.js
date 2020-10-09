import React, { Component } from 'react';
import { TweenLite } from 'gsap/all';
import classNames from 'classnames';
import './Cursor.css';

export default class Cursor extends Component {
    state = {
        className: 'cursor',
        hide: false,
        hover: false,
        click: false,
        path: ['/login', '/admin'].includes(this.props.location.pathname)
    };

    componentDidMount = () => {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseenter', () => this.setState({ hide: false }));
        document.addEventListener('mouseleave', () => this.setState({ hide: true }));
        document.addEventListener('mousedown', () => this.setState({ click: true }));
        document.addEventListener('mouseup', () => this.setState({ click: false }));
        document.addEventListener('mouseover', event => {
            if ('data-hover' in event.target.attributes) {
                this.setState({ hover: true })
            };
            
            if (event.target && event.target.hasAttribute('href')) {
                if ('data-nohover' in event.target.attributes) return;
                this.setState({ hover: true })
            };
            
        });
        document.addEventListener('mouseout', () => this.setState({ hover: false }));
    };

    componentWillUnmount = () => {
        ['mousemove', 'mouseenter', 'mouseleave', 'mouseup', 'mousedown', 'mouseover', 'mouseout']
            .forEach(event => document.removeEventListener(event));
    };

    onMouseMove = ({ clientX, clientY }) => {
        const cursor = document.querySelector('.cursor');
        TweenLite.to(cursor, 0.45, {
            css: {
                left: clientX,
                top: clientY
            }
        });
    };

    cursorClasses = () => classNames('cursor',
        {
            'cursor-hide': this.state.hide,
            'cursor-hover': this.state.hover,
            'cursor-click': this.state.click,
        }
    );

    render() {
        return <div className={this.cursorClasses()} />;
    };
};

