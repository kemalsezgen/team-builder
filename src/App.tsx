import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import Users from './pages/Users';
import Groups from './pages/Groups';
import Profile from './pages/Profile';

import { UserProvider, CurrentUserProvider, GroupProvider, PostProvider } from './contexts';

function App() {
  return (
    <UserProvider>
      <CurrentUserProvider>
        <GroupProvider>
          <PostProvider>
            <Router>
              <Routes>
                <Route path='/' element={<MainLayout />}>
                  <Route path='/' element={<Home />} />
                  <Route path='/users' element={<Users />} />
                  <Route path='/groups' element={<Groups />} />
                  <Route path='/:username' element={<Profile />} />
                </Route>
                <Route path='/' element={<AuthLayout />}>
                  <Route path='/sign-up' element={<SignUp />} />
                  <Route path='/sign-in' element={<SignIn />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />
                </Route>
              </Routes>
            </Router>
          </PostProvider>
        </GroupProvider>
      </CurrentUserProvider>
    </UserProvider>
  )
}

export default App
