import {Route} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import PasswordPage from './pages/PasswordPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import SearchForPage from './pages/SearchForPage';
function App() {
  return (
    <Layout>
      <useHistory>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/password'>
          <PasswordPage />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
        <Route path='/searchFor'>
          <SearchForPage />
        </Route>
      </useHistory>
    </Layout>
  );
}

export default App;
