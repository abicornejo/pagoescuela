import gql from "graphql-tag";

export const loginUserMutation = gql`
            mutation Login($username: String!, $password: String!) {
                login(input :{
                    username :$username,
                    password :$password
                }){
                    access_token,
                    user{
                        id,
                        first_name,
                        last_name,
                        email
                    }
                }
            }
    `;

export default [loginUserMutation];
