import React, { useContext, useEffect, useReducer, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login';
import Synchronisation from './pages/synchronisation/Synchronisation';
import SignUp from './pages/sign_up/SignUp';
import { makeStyles } from '@mui/styles';
import { VendorContext } from './context/Vendor';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(135deg, rgb(255, 88, 88), rgb(240, 152, 25))",
    minHeight: '100vh',
  },
})

function App() {
  const classes = useStyles()
  const state = useContext(VendorContext)
  const [storeId, setStoreId] = useState<string>("");
  const value = { storeId, setStoreId };
  useEffect(() => {console.log("UPDATE" + state.storeId)}, [state.storeId])
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });
  const authLink = setContext((_, { headers }) => {
    console.log("APP: " + storeId)
    return {
      headers: {
        ...headers,
        authorization:`{"storeId":"` + storeId + `"}`
      }
    }
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  
  console.log(state)

  return (
    <VendorContext.Provider value={value}>
      <ApolloProvider client={client}>
        <div className={classes.root}>
          <Router>
            <Routes>
              <Route element={<Login />} path="/login"></Route>
              <Route element={<SignUp />} path="/sign-up"></Route>
              <Route element={<Synchronisation />} path="/synchronisation"></Route>
            </Routes>
          </Router>
        </div>
      </ApolloProvider>
    </VendorContext.Provider>
  );
}

export default App;
