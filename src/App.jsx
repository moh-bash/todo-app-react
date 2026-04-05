import TodoContainer from './TodoContainer';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: ["Alexandira", "sans-serif"]
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ display: "flex", alignItems: "center" , height: "100vh" }}>
        <TodoContainer />
      </Container>
    </ThemeProvider>
  )
}

export default App
