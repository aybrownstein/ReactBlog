import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './Layout';
import  Home  from './Home';


import './custom.css'
import MostRecent from './MostRecent';
import NewPost from './NewPost';
import ViewBlog from './ViewBlog';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/mostrecent' component={MostRecent}/>
        <Route exact path='/newpost' component={NewPost}/>
        <Route exact path='/viewblog/:id' component={ViewBlog}/>
      </Layout>
    );
  }
}
