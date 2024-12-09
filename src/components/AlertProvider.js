import React, { createContext, useState, useContext, useCallback } from 'react';
import { Alert, Snackbar } from '@mui/material';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info', // info, success, warning, error
  });

  const showAlert = useCallback((message, severity = 'info') => {
    setAlert({ open: true, message, severity });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <Snackbar
        open={alert.open}
        // autoHideDuration={4000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={hideAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
