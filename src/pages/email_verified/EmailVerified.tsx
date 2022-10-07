import { Grid, Link, Typography } from '@mui/material'
import { emailVerifiedStyles } from './EmailVerifiedStyles'
import green_check from '../../assets/green_check.png'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const EmailVerified = () => {

  const classes = emailVerifiedStyles()
  const {t} = useTranslation()
  const navigate = useNavigate()

  return(
    <Grid container direction="column" className={classes.root}>
      <Grid container direction="column" xs={2} className={classes.form}>
        <img style={{margin: 10}} src={green_check} height={"200px"} width={"200px"}/>
        <Typography>
          {t('email_verified.message')}
        </Typography>
        <Link style={{margin: 10}} className={classes.link} onClick={() => navigate("/login")}>
          {t('email_verified.login')}
        </Link>
      </Grid>
    </Grid>
  )
}

export default EmailVerified