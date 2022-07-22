import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";

function App() {
  return (
    <Box className="container">
      <Header />

      <Box px={10} className="content">
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
