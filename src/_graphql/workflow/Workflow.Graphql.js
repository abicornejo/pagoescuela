import gql from "graphql-tag";

export const CreateWorkFlowTemplateMut = gql`
    mutation createWorkflowTemplate($template_name: String!, $template_jsonb : String!, $organization_id: Int!) {
        createWorkflowTemplate(input :{
            template_name :$template_name,
            template_jsonb:$template_jsonb,
            organization_id:$organization_id
        }){
            data {
                id
                template_name
                template_jsonb
                organization{
                    id
                    organization_name
                }
            }
            total
            message
            error
            success
        }
    }
`;

export const UpdateWorkFlowTemplateMut = gql`
    mutation response($id: Int!, $template_name: String!, $template_jsonb : String!, $organization_id: Int!) {
        updateWorkflowTemplate(id: $id, input :{
            template_name :$template_name,
            template_jsonb:$template_jsonb,
            organization_id:$organization_id
        }){
            data {
                id
                template_name
                template_jsonb
                organization{
                    id
                    organization_name
                }
            }
            total
            message
            error
            success
        }
    }
`;


export default [
    CreateWorkFlowTemplateMut, UpdateWorkFlowTemplateMut
];
