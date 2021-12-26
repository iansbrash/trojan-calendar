import { CognitoUserPool } from 'amazon-cognito-identity-js';

// Pool ID: us-east-1_0aKYv1hQE
    // Client ID: 88if0klb8rbst5u6mkqs6o88c

const poolData = {
    UserPoolId: 'us-east-1_0aKYv1hQE',
    ClientId: '59donu1jl479egbste87h1hb0p'
}

const UserPool = new CognitoUserPool(poolData);

export default UserPool;
