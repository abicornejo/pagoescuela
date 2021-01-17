import { authHeader } from '../_helpers';
import {IndustriesPaginated, GetAllIndustries ,  CreateIndustryMut, UpdateIndustryMut, DeleteIndustryMut} from './../_graphql/industry/IndustryGraphql'

import {client} from './../client/client';

export const industryService = {
    getAll,
    //getById,
    create,
    update,
    delete: _delete
};

function getAll(params) {
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()

    return client
    .query({
        query: IndustriesPaginated,
        variables: params
    })
    .then(result => {
        return (result && result.data ? result.data : [])
    }).catch(error => {
        console.log(error);
        });
}
function create(industry) {
    return client
        .mutate({
            mutation: CreateIndustryMut,
            variables: industry
        })
        .then(result => {
            return (result && result.data && result.data.createIndustry ? result.data.createIndustry : null)
        }).catch(error => {
            console.log(error);
        });
}

function update(industry) {
    return client
        .mutate({
            mutation: UpdateIndustryMut,
            variables: industry
        })
        .then(result => {
            return (result && result.data && result.data.updateIndustry ? result.data.updateIndustry : null)
        }).catch(error => {

            console.log(error);
        });
}

function _delete(industry) {
    return client
        .mutate({
            mutation: DeleteIndustryMut,
            variables: industry
        })
        .then(result => {
            return (result && result.data && result.data.deleteIndustry ? result.data.deleteIndustry : null)
        }).catch(error => {
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
