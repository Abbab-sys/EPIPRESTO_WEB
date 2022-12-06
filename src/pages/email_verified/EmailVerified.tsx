import {Grid, Link, Typography} from '@mui/material'
import {emailVerifiedStyles} from './EmailVerifiedStyles'
import green_check from '../../assets/green_check.png'
import {useTranslation} from 'react-i18next'
import {useNavigate, useParams} from 'react-router-dom'
import {useMutation} from "@apollo/client";
import {VERIFY_EMAIL} from "../../graphql/mutations";
import {useEffect, useState} from "react";
import {EMAIL_VERIFIED_LOGIN_KEY, EMAIL_VERIFIED_MESSAGE_KEY} from "../../translations/keys/EmailVerifiedKeys";

/*
 * Name: Email verified
 * Description: This file contains the page displayed after a user verifies his email
 * Author: Adam Naoui and Zouhair Derouich
 */

const EmailVerified = () => {
  const params = useParams()
  const [isTokenInactive, setTokenAsInactive] = useState(false)
  const handleVerifyToken = (verifyData: any) => {
    const tokenVerified = verifyData.verifyVendorAccount.code === 200
    setTokenAsInactive(!tokenVerified)
  }

  const [verifyEmail, {loading, error}] = useMutation(VERIFY_EMAIL, {onCompleted: handleVerifyToken});

  useEffect(() => {
    verifyEmail({variables: {token: params.token}})
  }, [])

  const classes = emailVerifiedStyles()
  const {t: translation} = useTranslation()
  const navigate = useNavigate()

  if (loading) return <p>Loading...</p>;
  if (error || isTokenInactive) return <p>Error :(</p>; //TODO Change isTokenInactive


  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container direction="column" xs={2} className={classes.form}>
        <img style={{margin: 10}} src={green_check} height={"200px"} width={"200px"} alt={"checkbox"}/>
        <Typography>
          {translation(EMAIL_VERIFIED_MESSAGE_KEY)}
        </Typography>
        <Link style={{margin: 10}} className={classes.link} onClick={() => navigate("/login")}>
          {translation(EMAIL_VERIFIED_LOGIN_KEY)}
        </Link>
      </Grid>
    </Grid>
  )
}

export default EmailVerified
