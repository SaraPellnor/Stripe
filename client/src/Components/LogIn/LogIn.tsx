

const LogIn = () => {

const handleLogIn = async () => {
  const response = await fetch(
    "http://localhost:3000/"
   
  );

 

  const data = await response.json();
 console.log(data);
 
}

 

  return (
    <button onClick={handleLogIn}>LogIn</button>
  )
}

export default LogIn