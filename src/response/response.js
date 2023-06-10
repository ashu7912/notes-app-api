
const successObject = {
    status: true,
    message: 'Success!'
}
const failedObject = {
    status: false,
    message: 'failed!'
}
// Responce Models----------------------------

const userCreatedMessage = 'User created Successfully!';
const userUpdatedMessage = 'User updated Successfully!';
const userDeletedMessage = 'User account deleted Successfully!';
const userLoggedInMessage = 'User logged in Successfully!';
const emailExistMessage = 'Email already exists!';
const noUsersFound = 'Invalid user!';
const badRequest = 'Bad Request!';
const unAuthorisedUser = 'Unauthorised User!';
const invalidCredentials = 'Invalid credentials!';
const pleaseAuthenticate = 'Please authenticate!';
const authHeaderMissing = 'Authorization header missing';
const tokenNotFound = 'Token not found in authorization header';
// User Messages----------------------------


const noteTitleRequired = 'Note title is required!';
const noteCreatedSuccess = 'Note created Successfully!';
const noteAssignedSuccess = 'Note assigned Successfully!';
const noteUpdatedSuccess = 'Note updated Successfully!';
const noteDeletedMessage = 'Note deleted Successfully!';
// Notes Messages----------------------------

 module.exports = {
    successObject,
    failedObject,

    userCreatedMessage,
    userUpdatedMessage,
    userDeletedMessage,
    emailExistMessage,
    invalidCredentials,
    userLoggedInMessage,
    unAuthorisedUser,
    noUsersFound,
    badRequest,
    pleaseAuthenticate,
    authHeaderMissing,
    tokenNotFound,

    noteTitleRequired,
    noteCreatedSuccess,
    noteAssignedSuccess,
    noteUpdatedSuccess,
    noteDeletedMessage
};