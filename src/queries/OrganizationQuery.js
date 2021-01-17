import gql from "graphql-tag";
export const organizationAll = gql`
    query{
        organizations {
            id
            organization_name
        }
    }
`;

export default [
    organizationAll
]
