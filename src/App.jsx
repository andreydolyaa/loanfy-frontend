
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import HomePage from './pages/HomePage/HomePage';
import PersonlaArea from './pages/PeronalArea/PersonlaArea';
import PlanRegister from './pages/PlanRegister/PlanRegister';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Calculator from './components/Calculator/Calculator';
import MobileNav from './components/MobileNav/MobileNav';
import Scroll from './components/Scroll/Scroll';

function App() {
    const [isAdminPanel, setIsAdminPanel] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const user = useSelector(state => state.usersReducer.userData);


    useEffect(() => {
    }, [user]);


    const toggleAdminPanel = (data) => {
        if (data === false && isAdminPanel === false) return;
        else setIsAdminPanel(data);
    }

    const toggleMobile = () => {
        setMobileMenu(mobileMenu => !mobileMenu);
    }

    const closeMenu = () => {
        setMobileMenu(false);
    }

    const PrivateRoute = () => {
        if (user && user.isAdmin) {
            return <Route exact path="/admin-panel" render={props => <AdminPanel {...props} setAdminPanel={toggleAdminPanel} closeMenu={closeMenu} />}></Route>
        }
        else return <Redirect to="/" />
    }

    return (
        <div className="App">
            <Router>
                <Scroll />
                {isAdminPanel ? null : <Navbar toggleMobile={toggleMobile} />}
                {isAdminPanel || !mobileMenu ? null : <MobileNav closeMenu={closeMenu} />}
                <Switch>
                    <Route exact path="/personal-area" component={PersonlaArea}></Route>
                    <Route exact path="/plan-register" component={PlanRegister}></Route>
                    <Route exact path="/calculator" component={Calculator}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    {!user && <Route exact path="/signup" component={Signup}></Route>}
                    <Route exact path="/" component={HomePage}></Route>
                    <PrivateRoute />
                </Switch>
                {isAdminPanel ? null : <Footer />}
            </Router>
        </div>
    );
}

export default App;

// {user && user.isAdmin && <Route exact path="/admin-panel" render={props => <AdminPanel {...props} setAdminPanel={toggleAdminPanel} />}></Route>}