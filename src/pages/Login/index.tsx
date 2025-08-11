import { Button } from "@/components/ui/button";
import supabase from "@/shared/utils/supabase";

async function handleLogin() {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.log("Something went wrong while logging in");
  }
  console.log("Login successfull", data);
}

const Login = () => {
  return <Button onClick={handleLogin}>Login with GitHub</Button>;
};

export default Login;
