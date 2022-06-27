
import bcrypt from 'bcryptjs'                               //modulo para encriptar passwords


// Metodo para Cifar las contraseñas
export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);                  // aplica un algoritmo q suma caracteres para proteger la contraseña
    return await bcrypt.hash(password, salt);
};


// Reviso que la contraseña sea la misma
export const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}
