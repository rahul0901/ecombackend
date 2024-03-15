import UserModals from "../Modals/User.Modals.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {

    try {

        const { userName, userEmail, userPassword, userNumber } = req.body.userData;

        if (!userName || !userEmail || !userPassword || !userNumber) {
            return res.status(404).json({ success: false, message: 'all fields required!' })
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const checkEmail = await UserModals.findOne({ email: userEmail });

        if (checkEmail) return res.status(404).json({ success: false, message: 'Email is already Registered!' })

        const checkNumber = await UserModals.findOne({ number: userNumber });

        if (checkNumber) return res.status(404).json({ success: false, message: 'Number is already used!' })

        const user = new UserModals({
            name: userName,
            email: userEmail,
            password: hashedPassword,
            number: userNumber
        })

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWTSecret);

        return res.status(200).json({ success: true, message: 'Registration Successfull!', user: {id: user._id, name: user.name}, token })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Registration Error!', error: error.message })
    }
}

export const Login = async (req, res) => {

    try {

        const { userEmail, userPassword } = req.body.loginData;

        // console.log(req.body, 'req')

        if (!userEmail || !userPassword) {
            return res.status(404).json({ success: false, message: 'All fields required' })
        }

        const user = await UserModals.findOne({ email: userEmail })

        // console.log(user, 'user')

        if (!user) return res.status(404).json({ success: false, message: 'email incorrect' })

        // console.log('emaill2')

        const isPassword = await bcrypt.compare(userPassword, user.password);

        // console.log('passssss')

        if (!isPassword) return res.status(404).json({ success: false, message: 'Password Incorrect' })

        const token = jwt.sign({ id: user._id }, process.env.JWTSecret);

        return res.status(200).json({ success: true, message: 'Login Successfull', user: { id: user._id, name: user.name }, token })


    } catch (error) {
        return res.status(500).json({ success: false, message: 'Login Error!', error: error.message})
    }

}


// sbse phele register hoyega username, email pass number ye saab milega
// login se email usermodal mtlb apna database mai check krenge ki ye email id present hai ya nai rahatoh login hojyega..
// aur login mai password apna bcrypt compare se hojyega 
// fr main concept hai apna token generate krne ka woh user ka jisne login kiya hai aur woh token woh user ka database ka joh id rahega uske base pe banayenge..

// fr ek api get current user bnayenge usme woh token ko frse verify krenge jab verfiry hoga toh wapis wahe id milega toh cross check hojayega token ki help se which is high security check..

// get current usr ka process hai..

export const getCurrentUser = async (req, res) => {
    try {

        const { token } = req.body;

        if (!token) return res.status(404).json({ success: false, message: 'token not found' })

        const { id } = await jwt.verify(token, process.env.JWTSecret)

        const user = await UserModals.findById(id);

        if (!user) return res.status(404).json({ success: false, message: 'user not found' })

        return res.status(200).json({ success: true, user: { name: user.name, id: user._id } })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error While get current user api call' })
    }
}
