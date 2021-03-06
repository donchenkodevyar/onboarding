import React, { useState, useContext } from 'react';
import LoginForm from './components/login-form/LoginForm';
import ChangePasswordForm from './components/change-password-form/ChangePasswordForm';
import ResetPasswordForm from './components/reset-password-form/ChangePasswordForm';
import { UserContext } from 'components/providers/UserProvider';
import '../styles.scss';

const LoginPage = () => {
    const { user } = useContext(UserContext);

    //we need 2 different flows for changing a password and resetting a password as changing requires a session object
    const [changePassword, setChangePassword] = useState(null); //changePassword will contain the session user returned from cognito where setChangePassword is called. Currently needed for it to work
    const [resetPassword, setResetPassword] = useState(null);

    return (
        <div className="auth-container">
            <div className="logo"></div>
            <div className="auth-form">
                <h2> {changePassword ? 'Change Password' : 'Sign In'} </h2>
                {!changePassword && !resetPassword && (
                    <LoginForm
                        user={user}
                        changePassword={changePassword}
                        setChangePassword={setChangePassword}
                        setResetPassword={setResetPassword}
                    />
                )}
                {changePassword && (
                    <ChangePasswordForm
                        user={user}
                        changePassword={changePassword}
                        setChangePassword={setChangePassword}
                    />
                )}

                {resetPassword && <ResetPasswordForm user={resetPassword} />}
            </div>
        </div>
    );

    // return (
    //     <Fade in={true} timeout={750}>
    //         <Box display="flex" flexDirection="column" alignItems="center">
    //             <Box marginTop={5}></Box>
    //             <Box marginTop={8}>
    //                 {!changePassword && (
    //                     <Typography variant="h2" align="center">
    //                         Sign in
    //                     </Typography>
    //                 )}

    //                 {changePassword && (
    //                     <Typography variant="h2" align="center">
    //                         Change Password
    //                     </Typography>
    //                 )}
    //             </Box>
    //             <Box marginTop={5} width="100%">
    //                 {signUp && (
    //                     <SignupForm
    //                         user={user}
    //                         changePassword={changePassword}
    //                         setChangePassword={setChangePassword}
    //                         setResetPassword={setResetPassword}
    //                     />
    //                 )}

    //                 {!changePassword && !resetPassword && !signUp && (
    //                     <LoginForm
    //                         user={user}
    //                         changePassword={changePassword}
    //                         setChangePassword={setChangePassword}
    //                         setResetPassword={setResetPassword}
    //                     />
    //                 )}
    //                 {true && changePassword && (
    //                     <ChangePasswordForm
    //                         user={user}
    //                         changePassword={changePassword}
    //                         setChangePassword={setChangePassword}
    //                     />
    //                 )}
    //                 {true && resetPassword && <ResetPasswordForm user={resetPassword} />}
    //             </Box>
    //         </Box>
    //     </Fade>
    // );
};

export default LoginPage;
