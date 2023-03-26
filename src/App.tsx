import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AddNew from './pages/AddNew/AddNew'
import Home from './pages/home/home'
import SignUp from './pages/signUp/signUp'
import Messenger from './pages/Messenger/Messenger'
import { ThemeProvider } from '@mui/material'
import { THEME, themeOptions } from './Themes/Themesoptions'
import SignIn from './pages/SignIn/SignIn'
import Layout from './components/Layout/Layout'
import { appMachine, MachineContext } from './machine'
import { useMachine } from '@xstate/react'
import Protected from './components/ProtectedRoute/ProtectedRoute'
import UnProtected from './components/UnProtectedRoute/UnProtectedRoute'
import Profile from './pages/Profile/Profile'
const client = new ApolloClient({
  uri: 'http://192.168.1.6:4000/',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('token') || ''
  }
})
function App() {
  const [currentMachine, sendToMachine] = useMachine(appMachine);

  return (
    <MachineContext.Provider value={[currentMachine, sendToMachine]}>
      <ApolloProvider client={client}  >
        <ThemeProvider theme={THEME}>
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

  )
}

export default App

