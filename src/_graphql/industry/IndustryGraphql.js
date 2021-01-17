import gql from "graphql-tag";

export const CreateIndustryMut = gql`
    mutation response($industry_name: String!) {
        createIndustry(input :{
            industry_name :$industry_name
        }){
            status
            msg
            industry{
                id
                industry_name
            }
        }
    }
`;

export const UpdateIndustryMut = gql`
    mutation response($id: Int!, $industry_name: String!) {
        updateIndustry(id: $id, input :{
            industry_name :$industry_name
        }){
            status
            msg
            industry{
                id
                industry_name
            }
        }
    }
`;

export const DeleteIndustryMut = gql`
    mutation response($id: Int!) {
        deleteIndustry(id:$id){
            status
            msg
            industry{
                id
                industry_name
            }
        }
    }
`;

export const GetAllIndustries = gql`
    query industriesPaginate($skip: Int!, $take: Int!, $search: String){
        industries(skip: $skip, take: $take, search: $search) {
            total
            status
            msg
            industry {
                id
                industry_name
            }
        }
    }
`;

export const IndustriesPaginated = gql`
    query industriesPaginate($skip: Int, $take: Int, $search: String){
        industries(skip:$skip, take: $take, search: $search) {
            total,
            status,
            msg,
            industry	 {
                id
                industry_name
            }
        }
    }
`;




export default [
    IndustriesPaginated, GetAllIndustries, CreateIndustryMut, UpdateIndustryMut, DeleteIndustryMut
];
