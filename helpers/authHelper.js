import bcrpt from 'bcrypt'

export const hashPassword=async(password)=>{
    try {
        const saltRound=10;
        const hashedPasswd=await bcrpt.hash(password,saltRound)
        return hashedPasswd;
        
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword=async(password,hashPassword)=>{
    return bcrpt.compare(password,hashPassword);
}