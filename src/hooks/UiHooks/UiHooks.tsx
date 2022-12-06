import {SnackbarKind} from "./UiHooksInterfaces";
import React, {useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import {useTranslation} from "react-i18next";
import {TranslationKey} from "../../interfaces/TranslationInterface";

/*
 * Name: Snackbar hook
 * Description: This file contains the snackbar's hook which wraps the snackbar logic and styles
 * Author: Adam Naoui
 */

export const useSnackbar = (init: SnackbarKind) => {
  const [isOpen, setIsOpen] = useState(false);
  const {t: translation} = useTranslation('translation')

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const [snackbarKind, setSnackbarKind] = useState<SnackbarKind>(init);

  function update(kind: SnackbarKind) {
    setSnackbarKind(kind);
  }

  const handleSnackbarClosing = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };
  if (!isOpen) {
    return [<></>,
      {
        open,
        close,
        update,
      }] as const
  }
  const snackbar = (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClosing}>
      <Alert onClose={handleSnackbarClosing} severity={snackbarKind.severity} sx={{width: '100%'}}>
        {translation(snackbarKind.messageTranslationKey)}
      </Alert>
    </Snackbar>)
  return [snackbar, {
    open,
    close,
    update,
  }] as const

}
export const useTextInput = (value: string, standBy: { onStandBy: () => void, args: {}, time: number }, errorsSet: Set<TranslationKey>, onChange: (event: any) => void) => {

}
