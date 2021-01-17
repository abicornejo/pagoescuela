import { authHeader } from '../_helpers';

import { CreateWorkFlowTemplateMut,UpdateWorkFlowTemplateMut } from './../_graphql/workflow/Workflow.Graphql'

import {client} from './../client/client';

export const workflowService = {
    //getAll,
    //getById,
    create,
    update,
    //delete: _delete
};

// function getAll(params) {
//
//     return client
//     .query({
//         query:GetAllOrganizations,
//         variables: params
//     })
//     .then(result => {debugger;
//         return (result && result.data && result.data.organizations ? result.data.organizations : [])
//     }).catch(error => {debugger;
//             console.log(error);
//         });
// }
function create(organization) {
    return client
        .mutate({
            mutation: CreateWorkFlowTemplateMut,
            variables: organization
        })
        .then(result => {
            return (result && result.data && result.data.createWorkflowTemplate ? result.data.createWorkflowTemplate : null)
        }).catch(error => {
            console.log(error);
        });
}

function update(organization) {
    return client
        .mutate({
            mutation: UpdateWorkFlowTemplateMut,
            variables: organization
        })
        .then(result => {
            return (result && result.data && result.data.updateWorkflowTemplate ? result.data.updateWorkflowTemplate : null)
        }).catch(error => {
            console.log(error);
        });
}
//
// function _delete(organization) {debugger;
//     return client
//         .mutate({
//             mutation: DeleteOrganizationMut,
//             variables: organization
//         })
//         .then(result => {debugger;
//             return (result && result.data && result.data.deleteOrganization ? result.data.deleteOrganization : null)
//         }).catch(error => {debugger;
//             console.log(error);
//         });
// }

function handleResponse(result) {

    // if(result && result.data){
    //
    //     let userDetails = {
    //         id: result.data.login.user.id,
    //         firstName: result.data.login.user.first_name,
    //         lastName: result.data.login.user.last_name,
    //         username: result.data.login.user.email,
    //         token: result.data.login.access_token
    //
    //     }
    //
    //     return userDetails;
    // }
    // return Promise.reject('Error to connect');

}
