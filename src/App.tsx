import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import Login from './pages/login/Login';
import Synchronisation from './pages/synchronisation/Synchronisation';
import SignUp from './pages/sign_up/SignUp';
import {makeStyles} from '@mui/styles';
import {VendorContext} from './context/Vendor';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {useTranslation} from 'react-i18next';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Box, FormControl, InputLabel, MenuItem} from '@mui/material';
import Protected from './pages/Protected';
import EmailVerified from './pages/email_verified/EmailVerified';

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
    '&.MuiNativeSelect-nativeInput': {
      borderBottom: '2px solid #ffa500 !important'
    }
  }
})

/*
 * Name: App
 * Description: Starting point of the app
 * Author: Adam Naoui and Zouhair Derouich
 */

function App() {
  const {t, i18n} = useTranslation('translation')
  const classes = useStyles()
  const [storeId, setStoreId] = useState<string>("");
  const [language, setLanguage] = useState(i18n.language);
  const storeIdContext = {storeId, setStoreId};
  const httpLink = createHttpLink({
    uri: "http://52.90.77.253:4000/graphql",
  });
  const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        authorization: `{"storeId":"` + storeId + `"}`
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

  return (
    <VendorContext.Provider value={storeIdContext}>
      <ApolloProvider client={client}>
        <div className={classes.root}>
          <Box sx={{minWidth: 120}} className={classes.languageChange}>
            <FormControl fullWidth variant="filled" sx={{m: 1, minWidth: 120}}>
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
              <Route element={<Login/>} path="/login"></Route>
              <Route element={<SignUp/>} path="/sign-up"></Route>
              <Route element={
                <Protected>
                  <Synchronisation/>
                </Protected>
              } path="/synchronization"></Route>
              <Route element={<EmailVerified/>} path="/verify/:token"></Route>
            </Routes>
          </Router>
        </div>
      </ApolloProvider>
    </VendorContext.Provider>
  );
}

export default App;
