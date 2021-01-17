import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {useSelector} from "react-redux";

//const user = useSelector(state => state.authentication.user);
function AppProfile() {
    const user = useSelector(state => state.authentication.user);
    const [expanded, setExpanded] = useState(false);

    const onClick = (event) => {
        setExpanded(!expanded);
        event.preventDefault();
    }

    return  (
        <div className="layout-profile">
            <div>
                <img src="assets/layout/images/profile.png" alt="" />
            </div>
            <button className="p-link layout-profile-link" onClick={onClick}>
                <span className="username">{user?.name}</span>
                <i className="pi pi-fw pi-cog"/>
            </button>
            <ul className={classNames({'layout-profile-expanded': expanded})}>
                {/*<li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>*/}
                {/*<li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span><span className="menuitem-badge">2</span></button></li>*/}
                <li>
                    <button className="p-link"><i className="pi pi-fw pi-power-off"/>
                        <span>
                            <span onClick={() => window.location = '/login'}>
Logout here
                            {/*<Link  to="/login"></Link>*/}
                            </span>
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    );

}

export { AppProfile };
