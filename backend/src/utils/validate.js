import validator from "validator"
const validate = (data)=>{
    const mandatoryFields = ["userName","emailId","password"]

    const isAllowed = mandatoryFields.every((k)=>Object.keys(data).includes(k))

    if(!isAllowed){
        throw new Error("Some fields Missing")
    }

    if(!validator.isEmail(data.emailId)){
        throw new Error("Invalid Email")
    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error("Weak Password")
    }
}

export default validate