import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LogInPage from "./Components/LogInPage/LogInPage";
import { useECommerceContext } from "./Context/Context";


function App() {

  const {isLoggedIn} = useECommerceContext()
console.log(isLoggedIn, "i app");


  return (
    <>
    {isLoggedIn ? (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    ) : (
      <>
      <div className="overlay">
      <Header />
      <Main />
      <Footer />
      </div>
      <LogInPage />
      </>
    )}
  </>
    
  );
}

export default App;
