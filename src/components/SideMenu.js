import React, {Component} from "react";
import { scaleRotate as Menu } from "react-burger-menu";
import { Link }from "react-router-dom";

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
    }

    handleStateChange = (state) => {
        this.setState({menuOpen: state.isOpen})
    };

    closeMenu = () => {
        this.setState({menuOpen: false})
    };

    render() {
        return (
            <Menu isOpen={this.state.menuOpen}
                  onStateChange={(state) => this.handleStateChange(state)}
                  pageWrapId="page-wrap"
                  outerContainerId="outer-container">
                <Link className="menu-item" to="/" onClick={this.closeMenu}>Home</Link>
                <Link className="menu-item" to="/inventory" onClick={this.closeMenu}>Inventory</Link>
            </Menu>
        );
    }
}

export default SideMenu;