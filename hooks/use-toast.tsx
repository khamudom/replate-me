"use client";

import * as React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type ToastProps = {
  message: string;
  severity?: AlertColor;
  duration?: number;
};

type ToastContextType = {
  showToast: (props: ToastProps) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState<AlertColor>("success");
  const [duration, setDuration] = React.useState(6000);

  const showToast = React.useCallback(
    ({ message, severity = "success", duration = 6000 }: ToastProps) => {
      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setOpen(true);
    },
    []
  );

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const value = React.useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
