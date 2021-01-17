import { allWorkflowTemplates, createWorkflowTemplate, updateWorkflowTemplate, workflowTemplate } from '../_graphql/workflowTemplate/workflowTemplate.Graphql';
import { authHeader } from '../_helpers';

import { client } from './../client/client';


export const workflowTemplateService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll(parameters) {
  return client
    .query({
      query: allWorkflowTemplates,      
    })
    .then(result => {      
      console.log(result);
      return (result && result.data && result.data.allWorkflowTemplates ? result.data.allWorkflowTemplates : [] );
    }).catch(error => {
      return [];
    })
}

function getById(params) {

  return client
      .query({
          query: workflowTemplate,
          variables: params
      })
      .then(result => {
          console.log(result.data.workflowTemplate.data);
          return (result && result.data && result.data.workflowTemplate && result.data.workflowTemplate.data ? result.data.workflowTemplate.data : [])
      });
}

function create(template) {  
  
      return client
          .mutate({
              mutation: createWorkflowTemplate,
              variables: template
          })
          .then(result => {

             return (result && result.data && result.data.createWorkflowTemplate ? result.data.createWorkflowTemplate : null)
          }).catch(error => {
              console.log(error);
          });;
}

function update(template) {    
  return client
      .mutate({
          mutation: updateWorkflowTemplate,
          variables: template
      })
      .then(result => {
          return (result && result.data && result.data.updateWorkflowTemplate ? result.data.updateWorkflowTemplate : null)
      });
}

function _delete(template) {
  console.log(template);
  return Promise.resolve({
    total: 2,
    status: '200',
    msg: 'Eliminado',
    template: {
      id: 1,
      workflow_name: 'template 1',
    },
  });
  // return client
  //     .mutate({
  //         mutation: DeleteCostumerMut,
  //         variables: customer
  //     })
  //     .then(result => {debugger;
  //         return (result && result.data && result.data.deleteCustomer ? result.data.deleteCustomer : null)
  //     });
}
