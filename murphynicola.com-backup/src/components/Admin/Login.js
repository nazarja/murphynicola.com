import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import './Login.css';

export default ({ user }) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState({ message: '' });

    useEffect(() => { }, [user]);

    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };

    const handleSubmit = event => {
        event.preventDefault();
        const { email, password } = form;

        if (email && password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(err => {
                    setError({ ...error, message: err.message })
                });
        };
    };

    return !user
        ? (
            <div id="login">
                <div className="uk-position-center">
                    <h1>#Login</h1>
                    <form id="login-form" onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input
                            name="email"
                            type="text"
                            className="uk-input"
                            placeholder="Enter your email address"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            className="uk-input"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <input
                            type="submit"
                            value="Submit"
                            className="uk-button uk-button-secondary uk-width-1-1"
                        />
                        {
                            error.message
                                ? (
                                    <div className="uk-alert-danger" data-uk-alert>
                                        <p>{error.message}</p>
                                    </div>
                                )
                                : null
                        }
                    </form>
                </div>
            </div>
        )
        : <Redirect to="/admin" />
};