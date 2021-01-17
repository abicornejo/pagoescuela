import { customerConstants } from '../_constants/customer.constants';
import { customerService } from '../_services/customer.service';
import { alertActions } from './';
import { history } from '../_helpers';

export const customerActions = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getById(data) {
    return dispatch => {
        //dispatch(request());

        customerService.getById(data)
            .then(
                customerFound => {dispatch(success(customerFound))},
                error => dispatch(failure(error.toString()))
            );
    };

    function success(customerFound) { return { type: customerConstants.GETBYID_SUCCESS, customerFound } }
    function failure(error) {  return { type: customerConstants.GETBYID_FAILURE, error } }
}

function getAll(parameters) {
    return dispatch => {
        //dispatch(request());

        customerService.getAll(parameters)
            .then(
                data => {dispatch(success(data))},
                error => dispatch(failure(error.toString()))
            );
    };

    function success(response) { return { type: customerConstants.GETALL_SUCCESS, response } }
    function failure(error) {  return { type: customerConstants.GETALL_FAILURE, error } }
}

function create(data) {

    return dispatch => {

        customerService.create(data)
            .then(
                result => {
                    dispatch(success(result));
                    //dispatch(organizationActions.getAll());
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function success(newItem) { return { type: customerConstants.CREATE_SUCCESS, newItem } }
    function failure(error) { return { type: customerConstants.CREATE_FAILURE, error } }
}

function update(data) {

    return dispatch => {
        customerService.update(data)
            .then(
                result => {
                    dispatch(success(result));
                    //dispatch(organizationActions.getAll());
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function success(updatedItem) { return { type: customerConstants.UPDATE_SUCCESS, updatedItem } }
    function failure(error) { return { type: customerConstants.UPDATE_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        //dispatch(request(id));
        customerService.delete(id)
            .then(
                result => dispatch(success(result)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function success(deletedItem) { return { type: customerConstants.DELETE_SUCCESS, deletedItem } }
    function failure(id, error) { return { type: customerConstants.DELETE_FAILURE, id, error } }
}
