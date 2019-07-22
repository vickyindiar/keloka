
export const getErrorAuth = (user, db) =>{
    const checkemail = () =>{
        let result = false;
        db.map( function(e){
             if(e.email === user.email){ result = true } 
        });
        return result;
    }

    if(checkemail()){
        return "Email Already Taken !"
    }
    if(user.password.length < 5){
        return "Password Length To Sort !";
    }
    else{
        return "";
    }
}
