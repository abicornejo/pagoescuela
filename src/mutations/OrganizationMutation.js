import gql from "graphql-tag";

export const CreateOrganizationMut = gql`
    mutation CreateOrganization($organization_name: String!) {
        createOrganization(input :{
            organization_name :$organization_name
        }){
            id
            organization_name
        }
    }
`;

export const UpdateOrganizationMut = gql`
    mutation UpdateOrganization($id: Int!, $organization_name: String!) {
        updateOrganization(id: $id, input :{
            organization_name :$organization_name
        }){
            id
            organization_name
        }
    }
`;

export const DeleteOrganizationMut = gql`
    mutation DeleteOrganization($id: Int!) {
        deleteOrganization(id:$id){
            id
            organization_name
        }
    }
`;



export default [
    CreateOrganizationMut, UpdateOrganizationMut, DeleteOrganizationMut
];
