import {makeStyles} from "@mui/styles";

export const loginStyles = makeStyles({
    root: {
        background: "linear-gradient(135deg, rgb(255, 88, 88), rgb(240, 152, 25))",
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        minHeight: '100vh',
        padding: '10px'
    },
    form: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: '10px',
        boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        background: 'white',
    },
    innerForm: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
    },
    input: {
        margin: '15px !important',
        width: "100%"
    },
    link: {
        margin: '15px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    button: {
        boxShadow: "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)"
    }
})
