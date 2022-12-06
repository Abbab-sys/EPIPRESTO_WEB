/*
 * Name: Snackbar Kind
 * Description: This file contains an interface for the snackbars that contains a message to display and the severity
 * Author: Adam Naoui
 */

export interface SnackbarKind {
  messageTranslationKey: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}
