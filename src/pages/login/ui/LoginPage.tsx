import { Button } from "@/shared/ui/button";
import supabase from "@/shared/api/client";

async function handleLogin() {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.log("Something went wrong while logging in");
  }
  console.log("Login successfull", data);
}

const LoginPage = () => {
  return <Button onClick={handleLogin}>Login with GitHub</Button>;
};

export default LoginPage;
