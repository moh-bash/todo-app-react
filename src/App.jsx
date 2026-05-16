import TodoContainer from './TodoContainer';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataContext } from './Data';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';
import { SnackbarProvider } from './SnackbarContext';

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
    isCompleted: false,
  },
  
];

function App() {
  const [Data, setData] = useState(initialData);
 

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <DataContext.Provider value={{Data, setData}}>
          <Container maxWidth="sm" style={{ display: "flex", alignItems: "center" , minHeight: "100vh" }}>
            <TodoContainer />
          </Container>
        </DataContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
