import gql from 'graphql-tag';

export const allWorkflowTemplates = gql`
  query {
    allWorkflowTemplates {
      id
      template_name
      template_jsonb
    }
  }
`;

export const workflowTemplate = gql`
  query {
    workflowTemplate(id: 1) {
      data {
        id
        template_name
      }
      message
      success
      error
      total
    }
  }
`;

export const createWorkflowTemplate = gql`
  mutation {
    createWorkflowTemplate(
      input: {
        template_name: $template_name
        template_jsonb: $template_jsonb
        organization_id: $organization_id
      }
    ) {
      data {
        id
        template_name
        template_jsonb
        organization {
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

export const updateWorkflowTemplate = gql`
  mutation {
    updateWorkflowTemplate(
      id: 3
      input: {
        template_name: $template_name
        template_jsonb: $template_jsonb
        organization_id: $organization_id
      }
    ) {
      data {
        id
        template_name
        template_jsonb
        organization {
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
  allWorkflowTemplates,
  createWorkflowTemplate,
  updateWorkflowTemplate,
  workflowTemplate,
];
