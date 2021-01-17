import { industryConstants } from '../_constants/industry.constants';
import { industryService } from '../_services/industry.service';
import { alertActions } from './';
import { history } from '../_helpers';

export const industryActions = {
    getAll,
    create,
    update,
    delete: _delete
};

function getAll(params) {
    return dispatch => {
        //dispatch(request());
        industryService.getAll(params)
            .then(
                data => {dispatch(success(data))},
                error => {dispatch(failure(error.toString()))}
            );
    };

    function success(response) { return { type: industryConstants.GETALL_SUCCESS, response } }
    function failure(error) {  return { type: industryConstants.GETALL_FAILURE, error } }
}

function create(data) {

    return dispatch => {

        industryService.create(data)
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

    function success(newItem) { return { type: industryConstants.CREATE_SUCCESS, newItem } }
    function failure(error) { return { type: industryConstants.CREATE_FAILURE, error } }
}

function update(data) {

    return dispatch => {
        industryService.update(data)
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

    function success(updatedItem) { return { type: industryConstants.UPDATE_SUCCESS, updatedItem } }
    function failure(error) { return { type: industryConstants.UPDATE_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        //dispatch(request(id));
        industryService.delete(id)
            .then(
                result => dispatch(success(result)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function success(deletedItem) { return { type: industryConstants.DELETE_SUCCESS, deletedItem } }
    function failure(deletedItem, error) { return { type: industryConstants.DELETE_FAILURE, deletedItem, error } }
}
