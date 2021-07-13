import validator from "validator";

const signUp = async (user) => {
  const { password, firstName, lastName, email ,saveMe } = user;

  if (verifyPassword(password) === false) {
    return {
      message:
        "The password should contains at least one capital letter, one special sign and one number, the length of the password should be 8 symbols",
    };
  }

  if (validateName(firstName) === false) {
    return { message: "first name should contain at least 2 chars" };
  }
  if (validateName(lastName) === false) {
    return { message: "last name should contain at least 2 chars" };
  }

  if (emailValidation(email) === false) {
    return { message: "email is not valid" };
  }

  const {isEmailExist} = await checkEmailExist(email);
  if(isEmailExist){
    return { message: "email is already exist" };
  }

  const res = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return res.json();
};

const validateName = (name) => {
  return name !== undefined && name.trim().length > 2;
};

const verifyPassword = (password) => {
  let passwordre = new RegExp(
    "(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  return passwordre.test(password);
};

const emailValidation = (email) => {
  return validator.isEmail(email);
};

const  checkEmailExist= async (email)=>{
  const res = await fetch("http://localhost:8080/auth/isEmailExist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email:email}),
  });
  return res.json();
}

const signIn = async(user) =>{
  const {email,password,saveMe} = user;

  if (emailValidation(email) === false) {
    return { message: "email is not valid" };
  }

  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email:email,password:password}),
  });
  return res.json();
}

export const signInApi = signIn;
export const signUpApi = signUp


