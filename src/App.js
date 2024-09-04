import SideMenu from "./components/sidemenu/SideMenu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
    </ThemeProvider>
  );
}

export default App;
