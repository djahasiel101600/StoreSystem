import { Button } from "@/shared/ui/button";
import supabase from "@/shared/api/client";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [isLoggedIn, setIsLogedIn] = useState(false);

  async function handleLogin() {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error && !data) {
      alert("Something went wrong while logging in");
      setIsLogedIn(false);
    }
    alert("Login successfull");
    setIsLogedIn(true);
  }
  return (
    <div className="flex flex-col w-fit p-2">
      <Button onClick={handleLogin}>Login with GitHub</Button>
      {isLoggedIn ? (
        <Link to={"/"} className="underline">
          Go to home page
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginPage;
