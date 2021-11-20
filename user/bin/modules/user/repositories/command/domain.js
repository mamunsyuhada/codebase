const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

const User = require('../../../../models/users');
const { publish } = require('../../../../helpers/rabbitmq');
const { saltRounds } = require('../../../../helpers/infra');
const { ok, err, ErrorResponsesCode, OkResponsesCode } = require('../../../../utils/response');
const { encode } = require('../../../../middlewares/jwt');
const { customerRoles, userType, adminRoles } = require('../../../../helpers/common');
const infra = require('../../../../helpers/infra');

const pub = async(message, topic='sejutacita.user') => publish(message, topic);

const registerUser = async(payload, user_type=userType.customer) => {
    try {
        let { email, password, full_name='' } = payload;

        const scanUser = await User.find({ email, is_deleted: false });
        if(scanUser.length){
            return err({ message: 'your email was registered', code: ErrorResponsesCode.BadRequest });
        }
        password = await bcrypt.hash(password, saltRounds);

        const user_id = uuid();
        const roles = user_type===userType.admin ? Object.values(allRoles):Object.values(customerRoles);

        let newUser = await new User({
            user_id,
            user_type,
            roles,
            email,
            password,
            full_name,
            created_by: user_id,
            modified_by: user_id,
            created_at: new Date(),
            modified_at: new Date()
        }).save();
        newUser = JSON.parse(JSON.stringify(newUser));
        pub(newUser);

        delete newUser.password;

        return ok({ data: newUser, message: 'success to register', code: OkResponsesCode.Created });
    } catch (error) {
        return err({ message: error.message, code: ErrorResponsesCode.Conflict });
    }
};

const loginUser = async(payload) => {
    const { email, password } = payload;
    const user = await User.findOne({ email, is_deleted: false });
    if(user===null){
        return err({ message: 'Unknown email', code: ErrorResponsesCode.Unauthorized });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword){
        return err({ message: 'Wrong email or passoword', code: ErrorResponsesCode.Unauthorized });
    }

    let { login_count, user_type } = user;
    login_count += 1;

    const roles = user_type===userType.admin ? Object.values(adminRoles):Object.values(customerRoles);
    const updatedUser = await User.findOneAndUpdate(
        { email },
        { login_count, roles, modified_at: new Date() },
        { new: true, upsert: true }
    );

    pub(updatedUser);
    const data = encode(user.user_id);
    return ok({ data, message: 'success to login', code: OkResponsesCode.Ok });
};

const updateUser = async(payload) => {
    const { user: { user_id } } = payload;
    delete payload.user;
    if(payload.password){
        payload.password = await bcrypt.hash(payload.password, saltRounds);
    }
    payload.modified_at = new Date();
    const updatedUser = await User.findOneAndUpdate({ user_id }, payload, { new: true });

    pub(updatedUser);
    const { email, full_name } = updatedUser;
    return ok({ data: { user_id, email, full_name }, message: 'success to update profil', code: OkResponsesCode.Ok });
};

const initAdmin = () => {
    const { emailAdmin: email, passwordAdmin: password } = infra;
    registerUser({ email, password }, userType.admin);
};

const deactivateAccount = async(payload) => {
    const { user: { user_id } } = payload;
    const updatedUser = await User.findOneAndUpdate(
        { user_id },
        { is_deleted: true , modified_at : new Date() },
        { new: true }
    );
    pub(updatedUser);
    const { email, full_name } = updatedUser;
    return ok({ data: { user_id, email, full_name }, message: 'success to deactivate account', code: OkResponsesCode.Ok });
};

module.exports = {
    registerUser,
    loginUser,
    initAdmin,
    updateUser,
    deactivateAccount,
};