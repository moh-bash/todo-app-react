import TodoContainer from './TodoContainer';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataContext } from './Data';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';
import SnackBar from "/src/components/SnackBar";
import { SnackbarContext } from './SnackbarContext';

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandira", "sans-serif"]
  },
});

let initialData = [
  {
    id: uuidv4(),
    title: "Task 1",
    description: "This is the first task",
    isCmpleted: false,
  },
  
];

function App() {
  const [Data, setData] = useState(initialData);
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
    <ThemeProvider theme={theme}>
      <SnackbarContext.Provider value={{ showSnackBar }}>
      <DataContext.Provider value={{Data, setData}}>
        <SnackBar open={open} message={message} />
        <Container maxWidth="sm" style={{ display: "flex", alignItems: "center" , minHeight: "100vh" }}>
          <TodoContainer />
        </Container>
      </DataContext.Provider>
      </SnackbarContext.Provider>
    </ThemeProvider>
  )
}

export default App
