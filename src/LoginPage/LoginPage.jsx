import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions/user.actions';
import './loginstyle.css';
function LoginPage() {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;

    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e){
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            //Dispatch
            dispatch(userActions.login(username, password));
            //const [token, { loading }] = useMutation(LOGIN_MUTATION,{ variables: { username: username, password: password}})

        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            {/*<h2>Login</h2>*/}
            {/*<form name="form" onSubmit={handleSubmit}>*/}
                {/*<div className="form-group">*/}
                    {/*<label>Username</label>*/}
                    {/*/!*<input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />*!/*/}
                    {/*/!*{submitted && !username &&*!/*/}
                        {/*/!*<div className="invalid-feedback">Username is required</div>*!/*/}
                    {/*/!*}*!/*/}
                {/*</div>*/}
                {/*<div className="form-group">*/}
                    {/*<label>Password</label>*/}
                    {/*/!*<input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />*!/*/}
                    {/*/!*{submitted && !password &&*!/*/}
                        {/*/!*<div className="invalid-feedback">Password is required</div>*!/*/}
                    {/*/!*}*!/*/}
                {/*</div>*/}
                {/*<div className="form-group">*/}
                    {/*/!*<button className="btn btn-primary">*!/*/}
                        {/*/!*{loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}*!/*/}
                        {/*/!*Login*!/*/}
                    {/*/!*</button>*!/*/}
                    {/*/!*<Link to="/register" className="btn btn-link">Register</Link>*!/*/}
                {/*</div>*/}
            {/*</form>*/}

            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                {/*<input type="text" placeholder="Username"/>*/}
                                <input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                                {submitted && !username &&
                                <div className="invalid-feedback">Username is required</div>
                                }
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                {/*<input type="password" placeholder="Password"/>*/}
                                <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                                {submitted && !password &&
                                <div className="invalid-feedback">Password is required</div>
                                }
                            </div>
                            {/*<input type="submit" value="Login" className="btn solid"/>*/}
                            <button className="btn btn-primary">
                                {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Login
                            </button>

                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            {/*<button className="btn transparent" id="sign-up-btn">*/}
                                {/*Sign up*/}
                            {/*</button>*/}
                        </div>
                        <img src="/assets/log.svg" className="image" alt=""/>
                    </div>
                    {/*<div className="panel right-panel">*/}
                        {/*<div className="content">*/}
                            {/*<h3>One of us ?</h3>*/}
                            {/*<p>*/}
                                {/*Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum*/}
                                {/*laboriosam ad deleniti.*/}
                            {/*</p>*/}
                            {/*<button className="btn transparent" id="sign-in-btn">*/}
                                {/*Sign in*/}
                            {/*</button>*/}
                        {/*</div>*/}
                        {/*<img src="img/register.svg" className="image" alt=""/>*/}
                    {/*</div>*/}
                </div>
            </div>


        </div>
    );
}

export { LoginPage };
