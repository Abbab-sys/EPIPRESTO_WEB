import {makeStyles} from "@mui/styles";

/*
 * Name: Synchronization Page Styles
 * Description: This file contains the synchronization page's styles
 * Author: Adam Naoui and Zouhair Derouich
 */

export const synchronisationStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    minHeight: '100vh',
  },
  form: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: '10px',
    boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    background: 'white',
  },
  api: {
    '&.Mui-selected': {
      background: 'linear-gradient(135deg, rgb(255, 88, 88), rgb(240, 152, 25)) !important'
    }
  },
  input: {
    margin: '15px !important',
    width: "100%"
  },
  innerForm: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
})
