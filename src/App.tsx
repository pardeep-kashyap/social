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
    <MachineContext.Provider value={[currentMachine, sendToMachine]}>
      <ApolloProvider client={client}  >
        <ThemeProvider theme={THEME}>
          <BrowserRouter >
            <Routes>
              <Route path={"/"} element={<Layout>
                <Home />
              </Layout>} />
              <Route path={"/signIn"} element={<SignIn />} />
              <Route path={"/signUp"} element={<SignUp />} />
              <Route path={"/new"} element={<Layout>
                <AddNew />
              </Layout>} />
              <Route path={"/message"} element={<Layout>
                <Messenger />
              </Layout>} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </MachineContext.Provider>

  )
}

export default App

