import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './app.css';

import { store } from './redux/store';
import { getUserData, logOutUser } from './redux/actions/userActions';
import { SET_AUTHENTICATED } from './redux/types';
import * as ROUTES from './constants/routes';

import Navigation from './components/ui/Navigation/Navigation';
import HomePage from './components/pages/Home/home.jsx';
import SignInForm from './components/pages/SignIn/signinform.jsx';
import SignUpPage from './components/pages/SignUp/signuppage.jsx';
import BrowseStocksPage from './components/pages/BrowseStocks/browsePage.jsx';
import Leaderboard from './components/pages/Leaderboard/leaderboard.jsx';
import Portfolio from './components/pages/User/portfolio.jsx';
import UserPage from './components/pages/User/userpage.jsx';
import StocksPage from './components/pages/Stock/stockModal.jsx';
import AuthRoute from './constants/AuthRoute';

axios.defaults.baseURL = 'https://us-central1-tm-market.cloudfunctions.net/api';

// Initialize auth state
const token = localStorage.getItem('FBIdToken');
if (token) {
    try {
        const decodedToken = jwtDecode<{ exp: number }>(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            store.dispatch(logOutUser());
        } else {
            store.dispatch({ type: SET_AUTHENTICATED });
            axios.defaults.headers.common['Authorization'] = token;
            store.dispatch(getUserData());
        }
    } catch (error) {
        console.error('Token decode error:', error);
        store.dispatch(logOutUser());
    }
}

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navigation />
                <div className="page">
                    <Routes>
                        <Route path={ROUTES.HOME} element={<HomePage />} />
                        <Route
                            path={ROUTES.SIGN_UP}
                            element={
                                <AuthRoute>
                                    <SignUpPage />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path={ROUTES.SIGN_IN}
                            element={
                                <AuthRoute>
                                    <SignInForm />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path={ROUTES.PORTFOLIO}
                            element={<Portfolio />}
                        />
                        <Route
                            path={ROUTES.BROWSE}
                            element={<BrowseStocksPage />}
                        />
                        <Route
                            path={ROUTES.LEADERBOARD}
                            element={<Leaderboard />}
                        />
                        <Route path="/users/:userId" element={<UserPage />} />
                        <Route
                            path="/stocks/:stockId"
                            element={<StocksPage />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
