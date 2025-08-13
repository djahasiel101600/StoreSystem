import supabase from "./client";

async function getUser(){
    const {data: {user}} = await supabase.auth.getUser()
    return user?.id
}

export default getUser;