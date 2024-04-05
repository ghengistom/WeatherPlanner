import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
// import '../client/node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <span className="text-muted">&copy;&nbsp;<Link to='/author'>Author</Link> 2023</span>
        </div>
      </footer>
    )
  }
}

export default Footer;