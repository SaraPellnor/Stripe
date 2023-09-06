import Main from "./Components/Confirmation/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import "./App.css"
import LogIn from "./Components/LogIn/LogIn";
const isLoggedIn = true


function App() {
  return (
    <>
    {!isLoggedIn ? (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    ) : (
      <LogIn />
    )}
  </>
    
  );
}

export default App;
