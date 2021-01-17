import { authHeader } from '../_helpers';
import { GetCostumersById, GetAllCostumers , CreateCostumerMut, UpdateCostumerMut, DeleteCostumerMut  } from './../_graphql/customer/Customer.Graphql'

import {client} from './../client/client';

export const customerService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll(parameters) {

    return client
    .query({
        query: GetAllCostumers,
        variables: parameters
    })
    .then(result => {
        return (result && result.data && result.data.customers ? result.data.customers : [])
    }).catch(error => {
        debugger;
    });
}

function getById(params) {

    return client
        .query({
            query: GetCostumersById,
            variables: params
        })
        .then(result => {
            return (result && result.data && result.data.customer && result.data.customer.customer ? result.data.customer.customer : [])
        });
}

function create(customer) {debugger;
    // if(customer.industries){
    //     customer.industries = customer.industries.join(",");
    // }

    return client
        .mutate({
            mutation: CreateCostumerMut,
            variables: customer
        })
        .then(result => {
debugger;
           return (result && result.data && result.data.createCustomer ? result.data.createCustomer : null)
        }).catch(error => {debugger;
            console.log(error);
        });;
}

function update(customer) {
    return client
        .mutate({
            mutation: UpdateCostumerMut,
            variables: customer
        })
        .then(result => {
            return (result && result.data && result.data.updateCustomer ? result.data.updateCustomer : null)
        });
}

function _delete(customer) {debugger;
    return client
        .mutate({
            mutation: DeleteCostumerMut,
            variables: customer
        })
        .then(result => {debugger;
            return (result && result.data && result.data.deleteCustomer ? result.data.deleteCustomer : null)
        });
}
