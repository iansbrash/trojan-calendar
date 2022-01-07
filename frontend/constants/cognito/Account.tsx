import React, {
    createContext, FC, ReactNode
} from 'react';
import {
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js'
import UserPool from '../../constants/cognito/UserPool';

const AccountContext = createContext<any>(null);



const Account : FC = (props) => {

    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();

            if (user) {
                user.getSession((err : Error, session : null) => {
                    if (err) {
                        reject();
                    }
                    else {
                        resolve(session);
                    }
                })
            }
            else {
                reject();
            }
        })
    }

    const register = async (username : string, password : string) => {
        return await new Promise((resolve, reject) => {
            UserPool.signUp(username, password, [], [], (err, data) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log(data)
                resolve(data)
            });
        })
    }

    const verify = async (username : string, code : string) => {
        return await new Promise((resolve, reject) => {
            var userData = {
                Username: username,
                Pool: UserPool,
            };

            var cognitoUser = new CognitoUser(userData);

            console.log(`Verifiying ${username} with code ${code}`)
            cognitoUser.confirmRegistration(code, true, function(err, result) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log(result)
                resolve(result)
            })
        })
    }

    const authenticate = async (username : string, password : string) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: username,
                Pool: UserPool
            });
    
            const authDetails = new AuthenticationDetails({
                Username: username,
                Password: password
            })
    
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess: ", data)
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error("onFailure: ", err)
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data)
                    resolve(data)
                }
            })
        })
    }

    const logout = () => {
        const user = UserPool.getCurrentUser();
        
        if (user) {
           user.signOut(); 
           return true;
        }
        return false;
    }

    return (
        <AccountContext.Provider value={{ authenticate, getSession, register, logout, verify }}>
            {props.children}
        </AccountContext.Provider>
    )
};

export {Account, AccountContext};