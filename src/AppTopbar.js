import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import PropTypes from 'prop-types';

export class AppTopbar extends Component {

    constructor(props) {
        super(props);
    }
    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="layout-topbar clearfix">
                {/*<button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>*/}
                    {/*<span className="pi pi-bars"/>*/}
                {/*</button>*/}
                <div className="layout-topbar-icons">
                    {/*<span className="layout-topbar-search">*/}
                        {/*<InputText type="text" placeholder="Search" />*/}
                        {/*<span className="layout-topbar-search-icon pi pi-search"/>*/}
                    {/*</span>*/}
                    {/*<button className="p-link">*/}
                        {/*<span className="layout-topbar-item-text">Events</span>*/}
                        {/*<span className="layout-topbar-icon pi pi-calendar"/>*/}
                        {/*<span className="layout-topbar-badge">5</span>*/}
                    {/*</button>*/}
                    {/*<button className="p-link">*/}
                        {/*<span className="layout-topbar-item-text">*/}
                            {/*SEttings*/}
                        {/*</span>*/}
                        {/*<span className="layout-topbar-icon pi pi-cog"/>*/}
                    {/*</button>*/}
                    {/*<button className="p-link">*/}
                        {/*<span className="layout-topbar-item-text">User</span>*/}
                        {/*<span className="layout-topbar-icon pi pi-user"/>*/}

                    {/*</button>*/}
                    <button className="p-link layout-profile-link">
                        <span className="username">{this.props.user?.name}</span>
                        {/*<i className="pi pi-fw pi-cog"/>*/}
                    </button>
                    <button className="p-link"><i className="pi pi-fw pi-power-off"/>
                        <span>
                            <span onClick={() => window.location = '/login'}>
Cerrar Sesion
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}
