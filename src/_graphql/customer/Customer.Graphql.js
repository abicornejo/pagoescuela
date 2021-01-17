import gql from "graphql-tag";

export const CreateCostumerMut = gql`
    mutation createCustomer($first_name: String!, $last_name: String!, $phone :String!, $mobile_phone :String!, 
        $home_address :String!, $work_address :String!, $email :String! , $zip_code :String!, $industries : [String]) {
        createCustomer(input :{
            first_name :$first_name,
            last_name:$last_name,
            phone:$phone,
            mobile_phone:$mobile_phone,
            home_address:$home_address,
            work_address:$work_address,
            email:$email,
            zip_code:$zip_code,
            industries:$industries
        }){
            total,
            status,
            msg,
            customer{
                id
                first_name
                last_name
                phone
                mobile_phone
                home_address
                work_address
                email
                zip_code
                industries{
                    id
                    industry_name
                }
            }
        }
    }
`;

export const UpdateCostumerMut = gql`
    mutation response($id: Int!, $first_name: String!, $last_name: String!, $phone :String!, $mobile_phone :String!,
        $home_address :String!, $work_address :String!, $email :String! , $zip_code :String!, $industries :[String]) {
        updateCustomer(id: $id, input :{
            first_name :$first_name,
            last_name:$last_name,
            phone:$phone,
            mobile_phone:$mobile_phone,
            home_address:$home_address,
            work_address:$work_address,
            email:$email,
            zip_code:$zip_code,
            industries:$industries
        }){
            total,
            status,
            msg,
            customer{
                id
                first_name
                last_name
                phone
                mobile_phone
                home_address
                work_address
                email
                zip_code
                industries{
                    id
                    industry_name
                }
            }
        }
    }
`;

export const DeleteCostumerMut = gql`
    mutation response($id: Int!) {
        deleteCustomer(id:$id){
            total
            status
            msg
            customer {
                id
                first_name
                last_name
                phone
                mobile_phone
                home_address
                work_address
                email
                zip_code
                industries{
                    id
                    industry_name
                }
            }
        }
    }
`;

export const GetAllCostumers= gql`
    query customersPaginate($skip: Int!, $take: Int!, $search: String){
        customers(skip: $skip, take: $take, search: $search) {
            total
            status
            msg
            customer {
                id
                first_name
                last_name
                phone
                mobile_phone
                home_address
                work_address
                email
                zip_code
                industries{
                    id
                    industry_name
                }
            }
        }
    }
`;

export const GetCostumersById= gql`
    query response($id: Int!){
        customer(id:$id) {
            status,
            msg,
            customer {
                id
                first_name
                last_name
                phone
                mobile_phone
                home_address
                work_address
                email
                zip_code
                industries{
                    id
                    industry_name
                }
            }
        }
    }
`;

export default [
    GetAllCostumers, GetCostumersById, CreateCostumerMut, UpdateCostumerMut, DeleteCostumerMut
];
