import gql from "graphql-tag";

export const CreateOrganizationMut = gql`
    mutation createOrganization($organization_name: String!, $industries : [String]) {
        createOrganization(input :{
            organization_name :$organization_name,
            industries:$industries
        }){
            status,
            msg,
            organization{
                id
                organization_name
                industries{
                    id
                    industry_name
                }
            }
        }
    }
`;

export const UpdateOrganizationMut = gql`
    mutation response($id: Int!, $organization_name: String!, $industries : [String]) {
        updateOrganization(id: $id, input :{
            organization_name :$organization_name,
            industries:$industries
        }){
            status,
            msg,
            organization{
                id
                organization_name
                industries{
                    id
                    industry_name
                }
            }
        }
    }
`;

export const DeleteOrganizationMut = gql`
    mutation response($id: Int!) {
        deleteOrganization(id:$id){
            status,
            msg,
            organization{
                id
                organization_name
                industries{
                    id
                    industry_name
                }
            }
        }
    }
`;

export const GetAllOrganizations= gql`
    query organizations($skip: Int!, $take: Int!, $search: String){
        organizations(skip: $skip, take: $take, search: $search) {
            total
            status
            msg
            organization{
                id
                organization_name
                industries{
                    id
                    industry_name
                }
            }
        }
    }
`;

export const GetOrganizationById= gql`
    query response($id: Int!){
        organization(id:$id) {
            status,
            msg,
            organization{
                id
                organization_name
                industries{
                    id
                    industry_name
                }
            }
        }
    }
`;

export default [
    CreateOrganizationMut, UpdateOrganizationMut, DeleteOrganizationMut, GetAllOrganizations, GetOrganizationById
];
