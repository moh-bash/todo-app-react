import { createContext, useContext, useState } from "react";
import SnackBar from "./components/SnackBar";

const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showSnackBar(message) {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  return (
    <SnackbarContext.Provider value={{ showSnackBar }}>
      <SnackBar open={open} message={message} />
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  return context;
};
