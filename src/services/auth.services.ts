import { Auth } from '../interfaces/auth.interface';
import {User} from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import {encrypt, verified} from '../utils/bcrypt.handle';
import {generateToken} from '../utils/jwt.handle';


const registerNewUser = async ({email, password, name}:User) => {
    const checkIs = await UserModel.findOne({email})
    if(checkIs) return "Already exists"
    const passHash = await encrypt(password);
    const newUser = await UserModel.create({email, password:passHash, name});
    return newUser; 
}

const loginUser = async ({email, password}:Auth) => {   
    const checkIs = await UserModel.findOne({email});
    if(!checkIs) return "User not found";    
    const passwordHash = checkIs.password;
    const isCorrect = await verified(password, passwordHash);
    if(!isCorrect)return "Invalid password";        
    
    const token = await generateToken(checkIs.email);

    const data = {
        token:token,
        user:checkIs,
    }

    return data;    
}

export {registerNewUser, loginUser};