import React, { Component } from 'react';
import firebase from '../../firebase/firebase';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { getAllData } from '../../store/actions/dataActions';
import { setUser, clearUser } from '../../store/actions/userActions';
import About from '../About/About';
import Admin from '../Admin/Admin';
import Contact from '../Contact/Contact';
import Cursor from '../Other/Cursor';
import Landing from '../Landing/Landing';
import Login from '../Admin/Login';
import Nav from '../Nav/Nav';
import Project from '../Project/Project';
import Work from '../Work/Work';
import _404 from '../Other/_404';
import './App.css';

class App extends Component {
    state = { user: null }

    componentDidMount = () => {
        this.props.getAllData();

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user);
                this.setState({ user });
            }
            else {
                this.props.clearUser();
                this.setState({ user: null });
            }
        });
    };

    render() {
        return (
            <>
                <Cursor location={this.props.location} />
                <Nav location={this.props.location} />
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/about" exact component={About} />
                    <Route path="/admin" exact component={() => <Admin user={this.state.user} />} />
                    <Route path="/contact" exact component={Contact} />
                    <Route path="/login" exact component={() => <Login user={this.state.user} />} />
                    <Route path="/project/:id/:slug" exact component={() => <Project {...this.props} />} />
                    <Route path="/work" exact component={Work} />
                    <Route path="/404" component={_404} />
                    <Route path="/*" component={_404} />
                </Switch>
            </>
        );
    };
};

export default withRouter(connect(null, { getAllData, setUser, clearUser })(App));
