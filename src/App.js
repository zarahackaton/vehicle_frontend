import React from 'react';
import {Route, HashRouter} from 'react-router-dom';
import SideMenu from './components/SideMenu';
import Home from './components/Home';
import Inventory from './components/Inventory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'rodal/lib/rodal.css';
// import logo from './logo.svg';
import './App.css';
import logo from './img/logo3.png';

function App() {
    return (
        <HashRouter>
            <div className="App" id="outer-container">
                <ToastContainer newestOnTop={true}
                                hideProgressBar={true}
                                pauseOnHover={false}
                                autoClose={2000}
                                position="bottom-right"
                />
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <SideMenu/>
                <main id="page-wrap">
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/inventory" component={Inventory}/>
                    </div>
                </main>
            </div>
        </HashRouter>
    );
}

export default App;
