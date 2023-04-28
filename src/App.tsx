import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddNew from './pages/AddNew/AddNew';
import Home from './pages/home/home';
import SignUp from './pages/signUp/signUp';
import Messenger from './pages/Messenger/Messenger';
import { ThemeProvider } from '@mui/material';
import { THEME } from './Themes/Themesoptions';
import SignIn from './pages/SignIn/SignIn';
import Layout from './components/Layout/Layout';
import { appMachine, MachineContext } from './machine';
import { useMachine } from '@xstate/react';
import Protected from './components/ProtectedRoute/ProtectedRoute';
import UnProtected from './components/UnProtectedRoute/UnProtectedRoute';
import Profile from './pages/Profile/Profile';
import { QueryClient, QueryClientProvider } from 'react-query';
import PostDetail from './pages/PostDetail/PostDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()


const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('token') || ''
  }
})
function App() {
  const [currentMachine, sendToMachine] = useMachine(appMachine);

  return (
    <QueryClientProvider client={queryClient}>
      <MachineContext.Provider value={[currentMachine, sendToMachine]}>
        <ApolloProvider client={client}  >
          <ThemeProvider theme={THEME}>
            <ToastContainer />

            <BrowserRouter >
              <Routes>
                <Route path={"/signIn"} element={
                  <UnProtected>
                    <SignIn />
                  </UnProtected>
                } />
                <Route path="*" element={
                  <Protected>
                    <Layout>
                      <Profile />
                    </Layout>
                  </Protected>
                } />
                <Route path={"/signUp"} element={
                  <UnProtected>
                    <SignUp />
                  </UnProtected>
                } />
                <Route path={"/"} element={
                  <Protected>
                    <Layout>
                      <Home />
                    </Layout>
                  </Protected>
                } />
                <Route path={"/new"} element={
                  <Protected>
                    <Layout>
                      <AddNew />
                    </Layout>
                  </Protected>
                } />
                <Route path={"/post/:postId"} element={
                  <Protected>
                    <Layout>
                      <PostDetail />
                    </Layout>
                  </Protected>
                } />
                <Route path={"/message"} element={
                  <Protected>
                    <Layout>
                      <Messenger />
                    </Layout>
                  </Protected>
                } />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </ApolloProvider>
      </MachineContext.Provider>

    </QueryClientProvider>

  )
}

export default App

