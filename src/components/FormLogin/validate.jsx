
export default function validate(input) {
const revEmail=/\S+@\S+\.\S+/
//n@n.n
const revPass=/(?=.*[0-9])/
//letras y numeros
let errors ={};

if (!revEmail.test(input.email)){errors.email = "Email is invalid"}

if(!revPass.test(input.password)){errors.password = "Password requires letters and numbers"}

return errors;

}
