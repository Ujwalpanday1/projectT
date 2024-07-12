
const generataVerificationCode=()=>{
    const verificationCode=Math.floor((Math.random()*899999+100000))
    return verificationCode;
}
export default generataVerificationCode