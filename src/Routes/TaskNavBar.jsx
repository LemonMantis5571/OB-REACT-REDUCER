import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import { loginContext, LOGOUT } from '../components/login/loginReducer';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/loginPage';
import RegisterPage from '../Pages/registerPage';
import { toast } from 'react-toastify';

const TaskNavBar = () => {
    const {loginState, loginDispatch} = useContext(loginContext);

    const logoutFunc = () => {
        loginDispatch({type: LOGOUT});
        localStorage.removeItem('token');
        notifySuccess('Logged out successfully');
    }


    const notifySuccess = (message) => {
        toast.success(message, {
        render: message,
        type: 'success',
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        isLoading: false
        });
    }

    return (
     <Router>            
        <nav className='navbar justify-content-center navbar-expand-md bg-dark' data-bs-theme="dark">
            <div className="container-fluid">
                <div className='logo d-flex'>
                    <Link className="navbar-brand" href='/'>Task-Manager</Link>
                    {loginState.loggedIn ? (<p className='m-auto' style={{color: 'white'}}>Welcome {loginState.user}</p>) : null}
                </div>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                    <ul className="navbar-nav gap-3">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                        </li>
                        {loginState.loggedIn ? (<li className="nav-item">
                            <Link className="nav-link" to='/task-form'>Task-Form</Link>
                        </li>): null}

                        {loginState.loggedIn ? (<li className="nav-item">
                            <Link className="nav-link" to='/task-list'>Task-List</Link>
                        </li>) : null}
                        <li className="nav-item">
                            <Link className="nav-link disabled">About</Link>
                        </li>
        
                    </ul>
               </div>
               <div className="navbar-brand nav-item dropdown ">
                    <i className="nav-link dropdown-toggle" role='button' data-bs-toggle="dropdown" aria-expanded="false">
                        <i className='bi bi-person-circle'></i>
                    </i>

                    <ul className="dropdown-menu dropdown-menu-end">

                        {loginState.loggedIn ? null : (<li><Link className="dropdown-item" to='/register'>Create Account</Link></li>)}

                        {loginState.loggedIn ? (<li><Link className="dropdown-item" to="/">Profile</Link></li>) 
                                             :(<li><Link className="dropdown-item" to="/login">Login</Link></li>)}

                        {loginState.loggedIn ? (<div><li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" onClick={() => logoutFunc()} to='/'>Logout</Link></li> </div>) : null}

                    </ul>
                </div>
            </div>
        </nav>
            <Routes>
                <Route exact path='/' element={<HomePage></HomePage>}></Route>
                <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
                <Route  path='/task-form' element={<TaskForm></TaskForm>}></Route>
                <Route  path='/task-list' element={<TaskList></TaskList>}></Route>
            </Routes>
        </Router>
    );
}

export default TaskNavBar;
