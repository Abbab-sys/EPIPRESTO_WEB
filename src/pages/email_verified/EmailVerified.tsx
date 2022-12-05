import {Grid, Link, Typography} from '@mui/material'
import {emailVerifiedStyles} from './EmailVerifiedStyles'
import green_check from '../../assets/green_check.png'
import {useTranslation} from 'react-i18next'
import {useNavigate, useParams} from 'react-router-dom'
import {useMutation} from "@apollo/client";
import {VERIFY_EMAIL} from "../../graphql/mutations";
import {useEffect, useState} from "react";
import {EMAIL_VERIFIED_LOGIN_KEY, EMAIL_VERIFIED_MESSAGE_KEY} from "../../translations/keys/EmailVerifiedKeys";

const EmailVerified = () => {
  const params = useParams()
  const [isTokenInactive, setTokenAsInactive] = useState(false)

  const [verifyEmail, {data, loading, error}] = useMutation(VERIFY_EMAIL);

  useEffect(() => {
    console.log(params.token)
    verifyEmail({variables: {token: params.token}}).then(r => {
      console.log(r)
    })
  }, [params.token, verifyEmail])

  useEffect(() => {
    const tokenVerified = data?.verifyAccount.code === 200
    setTokenAsInactive(!tokenVerified)
  }, [data])

  const classes = emailVerifiedStyles()
  const {t: translation} = useTranslation()
  const navigate = useNavigate()

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (isTokenInactive) return <p>Token is inactive</p>;


  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container direction="column" xs={2} className={classes.form}>
        <img style={{margin: 10}} src={green_check} height={"200px"} width={"200px"} alt={"checkbox"}/>
        <Typography>
          {translation(EMAIL_VERIFIED_MESSAGE_KEY)}
        </Typography>
        {data?.verifyAccount.vendorAccount?<Link style={{margin: 10}} className={classes.link} onClick={() => navigate("/login")}>
          {translation(EMAIL_VERIFIED_LOGIN_KEY)}
        </Link>:null}
      </Grid>
    </Grid>
  )
}

export default EmailVerified
