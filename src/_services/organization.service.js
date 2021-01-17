import { authHeader } from '../_helpers';

import { GetOrganizationById, GetAllOrganizations , CreateOrganizationMut, UpdateOrganizationMut, DeleteOrganizationMut  } from './../_graphql/organization/Organization.Graphql'

import {client} from './../client/client';

export const organizationService = {
    getAll,
    //getById,
    create,
    update,
    delete: _delete
};

function getAll(params) {

    return client
    .query({
        query:GetAllOrganizations,
        variables: params
    })
    .then(result => {debugger;
        return (result && result.data && result.data.organizations ? result.data.organizations : [])
    }).catch(error => {debugger;
            console.log(error);
        });
}
function create(organization) {
    return client
        .mutate({
            mutation: CreateOrganizationMut,
            variables: organization
        })
        .then(result => {debugger;
            return (result && result.data && result.data.createOrganization ? result.data.createOrganization : null)
        }).catch(error => {
            console.log(error);
        });
}

function update(organization) {
    return client
        .mutate({
            mutation: UpdateOrganizationMut,
            variables: organization
        })
        .then(result => {
            return (result && result.data && result.data.updateOrganization ? result.data.updateOrganization : null)
        }).catch(error => {
            console.log(error);
        });
}

function _delete(organization) {debugger;
    return client
        .mutate({
            mutation: DeleteOrganizationMut,
            variables: organization
        })
        .then(result => {debugger;
            return (result && result.data && result.data.deleteOrganization ? result.data.deleteOrganization : null)
        }).catch(error => {debugger;
            console.log(error);
        });
}

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
