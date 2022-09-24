import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login/Login';
import Synchronisation from './pages/synchronisation/Synchronisation';
import SignUp from './pages/sign_up/SignUp';
import { makeStyles } from '@mui/styles';
import { VendorContext } from './context/Vendor';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useTranslation } from 'react-i18next';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, FormControl, InputLabel, MenuItem } from '@mui/material';

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(135deg, rgb(255, 88, 88), rgb(240, 152, 25))",
    minHeight: '100vh',
  },
  languageChange: {
    position: "fixed",
    top: 10,
    right: 15
  },
  select: {
    '&.MuiNativeSelect-nativeInput':{
      borderBottom: '2px solid #ffa500 !important'
    }
  }
})

function App() {
  const { t, i18n } = useTranslation('translation')
  const classes = useStyles()
  const state = useContext(VendorContext)
  const [storeId, setStoreId] = useState<string>("");
  const [language, setLanguage] = useState(i18n.language);
  const value = { storeId, setStoreId };
  useEffect(() => {console.log("UPDATE" + state.storeId)}, [state.storeId])
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });
  const authLink = setContext((_, { headers }) => {
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

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
    i18n.changeLanguage(event.target.value)
  };
  
  console.log(state)

  return (
    <VendorContext.Provider value={value}>
      <ApolloProvider client={client}>
        <div className={classes.root}>
        <Box sx={{ minWidth: 120 }} className={classes.languageChange}>
          <FormControl fullWidth variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>{t('language.language')}</InputLabel>
            <Select
              value={language}
              onChange={handleChange}
              className={classes.select}
            >
              <MenuItem value={'en'}>{t('language.en')}</MenuItem>
              <MenuItem value={'fr'}>{t('language.fr')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
          <Router>
            <Routes>
              <Route path="*" element={<Navigate replace to="/login"/>}></Route>
              <Route element={<Login />} path="/login"></Route>
              <Route element={<SignUp />} path="/sign-up"></Route>
              <Route element={<Synchronisation />} path="/synchronization"></Route>
            </Routes>
          </Router>
        </div>
      </ApolloProvider>
    </VendorContext.Provider>
  );
}

export default App;
