import React, { useEffect, useRef, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions, userActions } from '../_actions';
import { PrivateRoute } from '../_private';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { Dashboard } from './../_components/Dashboard';

import { Documentation } from './../_components/Documentation';
import { Organization } from './../_components/Organization';
import { Industry } from './../_components/Industry';
import { Customer } from './../_components/Customer';
import { WorkFlow } from './../_components/WorkFlow';
import { WorkflowTemplate } from './../_components/WorkflowTemplate';
import classNames from 'classnames';
import { AppTopbar } from './../AppTopbar';
import { AppFooter } from './../AppFooter';
import { AppMenu } from './../AppMenu';
import { AppProfile } from './../AppProfile';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './../Layout/layout.scss';
import './../App.scss';

function App() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const [layoutMode, setLayoutMode] = useState('static');
  const [layoutColorMode, setLayoutColorMode] = useState('dark');
  const [staticMenuInactive, setStaticMenuInactive] = useState(true);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [menuClick, setMenuClick] = useState(false);
  const [menu, setMenu] = useState([]);
  const user = useSelector((state) => state.authentication.user);

  // useEffect(() => {
  //     //     history.listen((location, action) => {
  //     //         dispatch(alertActions.clear());
  //     //     });
  //     // }, [dispatch]);
  //     //
  //     // return (
  //     //     <div>
  //     //         <div>
  //     //             <div>
  //     //                 {alert.message &&
  //     //                     <div className={`alert ${alert.type}`}>{alert.message}</div>
  //     //                 }
  //     //                 <Router history={history}>
  //     //                     <Switch>
  //     //                         <PrivateRoute exact path="/" component={HomePage} />
  //     //                         <Route path="/login" component={LoginPage} />
  //     //                         <Route path="/register" component={RegisterPage} />
  //     //                         <Redirect from="*" to="/" />
  //     //                     </Switch>
  //     //                 </Router>
  //     //             </div>
  //     //         </div>
  //     //     </div>
  //     // );

  const didMountRef = useRef(false);
  useEffect(() => {
    //dispatch(userActions.getAll());
    createMenu();
  }, []);

  useEffect(() => {
    if (didMountRef.current) {
      if (mobileMenuActive) addClass(document.body, 'body-overflow-hidden');
      else removeClass(document.body, 'body-overflow-hidden');
    } else didMountRef.current = true;
  }, [mobileMenuActive]);

  function handleDeleteUser(id) {
    dispatch(userActions.delete(id));
  }

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
    setMenuClick(false);
  };

  const onToggleMenu = (event) => {
    debugger;
    //setMenuClick(true);

    if (isDesktop()) {
      if (layoutMode === 'overlay') {
        setOverlayMenuActive(!overlayMenuActive);
      } else if (layoutMode === 'static') {
        setStaticMenuInactive(!staticMenuInactive);
      }
    } else {
      //let mobileMenuActive = mobileMenuActive;
      setMobileMenuActive(!mobileMenuActive);
    }

    event.preventDefault();
  };

  const onSidebarClick = (event) => {
    setMenuClick(true);
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };

  const createMenu = () => {
    setMenu([
      // {label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => {window.location = '#/'}},
      // {
      //   label: 'Organization',
      //   icon: 'pi pi-fw pi-home',
      //   command: () => {
      //     window.location = '/organization';
      //   },
      // },
      // {
      //   label: 'Industry',
      //   icon: 'pi pi-fw pi-home',
      //   command: () => {
      //     window.location = '/industry';
      //   },
      // },
      // {
      //   label: 'Customer',
      //   icon: 'pi pi-fw pi-home',
      //   command: () => {
      //     window.location = '/customer';
      //   },
      // },
      // {
      //   label: 'WorkFlow',
      //   icon: 'pi pi-fw pi-home',
      //   command: () => {
      //     window.location = '/workflow';
      //   },
      // },
      // {
      //   label: 'Template',
      //   icon: 'pi pi-fw pi-home',
      //   command: () => {
      //     window.location = '/template';
      //   },
      // },
      // {
      //     label: 'Menu Modes', icon: 'pi pi-fw pi-cog',
      //     items: [
      //         {label: 'Static Menu', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutMode: 'static'}) },
      //         {label: 'Overlay Menu', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutMode: 'overlay'}) }
      //     ]
      // },
      // {
      //     label: 'Menu Colors', icon: 'pi pi-fw pi-align-left',
      //     items: [
      //         {label: 'Dark', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'dark'}) },
      //         {label: 'Light', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'light'}) }
      //     ]
      // },
      // {
      //     label: 'Components', icon: 'pi pi-fw pi-globe', badge: '9',
      //     items: [
      //         {label: 'Sample Page', icon: 'pi pi-fw pi-th-large', to: '/sample'},
      //         {label: 'Forms', icon: 'pi pi-fw pi-file', to: '/forms'},
      //         {label: 'Data', icon: 'pi pi-fw pi-table', to: '/data'},
      //         {label: 'Panels', icon: 'pi pi-fw pi-list', to: '/panels'},
      //         {label: 'Overlays', icon: 'pi pi-fw pi-clone', to: '/overlays'},
      //         {label: 'Menus', icon: 'pi pi-fw pi-plus', to: '/menus'},
      //         {label: 'Messages', icon: 'pi pi-fw pi-spinner',to: '/messages'},
      //         {label: 'Charts', icon: 'pi pi-fw pi-chart-bar', to: '/charts'},
      //         {label: 'Misc', icon: 'pi pi-fw pi-upload', to: '/misc'}
      //     ]
      // },
      // {
      //     label: 'Template Pages', icon: 'pi pi-fw pi-file',
      //     items: [
      //         {label: 'Empty Page', icon: 'pi pi-fw pi-circle-off', to: '/empty'}
      //     ]
      // },
      // {
      //     label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search',
      //     items: [
      //         {
      //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
      //             items: [
      //                 {
      //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
      //                         {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
      //                         {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
      //                     ]
      //                 },
      //                 {
      //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'},
      //                         {label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark'}
      //                     ]
      //                 },
      //             ]
      //         },
      //         {
      //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
      //             items: [
      //                 {
      //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
      //                         {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
      //                         {label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark'},
      //                     ]
      //                 },
      //                 {
      //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
      //                         {label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark'}
      //                     ]
      //                 }
      //             ]
      //         }
      //     ]
      // },
      // {
      //   label: 'Documentation',
      //   icon: 'pi pi-fw pi-question',
      //   command: () => {
      //     window.location = '/documentation';
      //   },
      // },
      // {label: 'View Source', icon: 'pi pi-fw pi-search', command: () => {window.location = "https://github.com/primefaces/sigma"}}
    ]);
  };

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += ' ' + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
  };

  const isDesktop = () => {
    return window.innerWidth > 1024;
  };

  const logo =
    layoutColorMode === 'dark'
      ? 'assets/layout/images/logo-white.svg'
      : 'assets/layout/images/logo.svg';

  const wrapperClass = classNames('layout-wrapper', {
    'layout-overlay': layoutMode === 'overlay',
    'layout-static': layoutMode === 'static',
    'layout-static-sidebar-inactive':
      staticMenuInactive && layoutMode === 'static',
    'layout-overlay-sidebar-active':
      overlayMenuActive && layoutMode === 'overlay',
    'layout-mobile-sidebar-active': mobileMenuActive,
  });

  const sidebarClassName = classNames('layout-sidebar', {
    'layout-sidebar-dark': layoutColorMode === 'dark',
    'layout-sidebar-light': layoutColorMode === 'light',
  });

  let sidebar = null;

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      {localStorage.getItem('user') && (
        <AppTopbar user={user} onToggleMenu={onToggleMenu} />
      )}

      {localStorage.getItem('user') && (
        <div
          ref={(el) => (sidebar = el)}
          className={sidebarClassName}
          onClick={onSidebarClick}>
          <div className="layout-logo">
            <img alt="Logo" src={logo} />
          </div>
          <AppProfile />
          <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
        </div>
      )}

      <div className="layout-main">
        {/*{alert.message &&*/}
        {/*<div className={`alert ${alert.type}`}>{alert.message}</div>*/}
        {/*}*/}
        <Router history={history}>
          <Switch>
            <PrivateRoute path="/" exact component={Dashboard} />
            {/*<Route path="/forms" component={FormsDemo} />*/}
            {/*<Route path="/sample" component={SampleDemo} />*/}
            {/*<Route path="/data" component={DataDemo} />*/}
            {/*<Route path="/panels" component={PanelsDemo} />*/}
            {/*<Route path="/overlays" component={OverlaysDemo} />*/}
            {/*<Route path="/menus" component={MenusDemo} />*/}
            {/*<Route path="/messages" component={MessagesDemo} />*/}
            {/*<Route path="/charts" component={ChartsDemo} />*/}
            {/*<Route path="/misc" component={MiscDemo} />*/}
            {/*<Route path="/empty" component={EmptyPage} />*/}
            <Route path="/login" component={LoginPage} />
            {/*<PrivateRoute exact path="/workflow" component={WorkFlow} />*/}
            {/*<PrivateRoute path="/workflow/:id" component={WorkFlow} />*/}
            {/*<PrivateRoute path="/organization" component={Organization} />*/}
            {/*<PrivateRoute path="/customer" component={Customer} />*/}
            {/*<PrivateRoute path="/industry" component={Industry} />*/}
            {/*<PrivateRoute path="/documentation" component={Documentation} />*/}
            {/*<PrivateRoute path="/template" component={WorkflowTemplate} />*/}
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>

      {/*{localStorage.getItem('user') && <AppFooter />}*/}

      <div className="layout-mask"></div>
    </div>
  );
}
export default App;
