import { workflowConstants } from '../_constants/workflow.constants';
import { workflowService } from '../_services/workflow.service';
import { alertActions } from './';

export const workflowActions = {
    //getAll,
    create,
    update,
    //delete: _delete
};

// function getAll(parameters) {
//     return dispatch => {
//
//         organizationService.getAll(parameters)
//             .then(
//                 organizations => {dispatch(success(organizations))},
//                 error => dispatch(failure(error.toString()))
//             );
//     };
//
//     function request() {  return { type: organizationConstants.GETALL_REQUEST } }
//     function success(response) { return { type: organizationConstants.GETALL_SUCCESS, response } }
//     function failure(error) {  return { type: organizationConstants.GETALL_FAILURE, error } }
// }

function create(workflow) {debugger;

    return dispatch => {


        workflowService.create(workflow)
            .then(
                resp => {debugger;
                    dispatch(success(resp));
                    //dispatch(organizationActions.getAll());
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {debugger;
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    //function request(organization) { return { type: organizationConstants.CREATE_REQUEST, organization } }
    function success(newItem) { return { type: workflowConstants.CREATE_SUCCESS, newItem } }
    function failure(error) { return { type: workflowConstants.CREATE_FAILURE, error } }
}

function update(organization) {

    return dispatch => {
        workflowService.update(organization)
            .then(
                resp => {
                    dispatch(success(resp));
                    //dispatch(organizationActions.getAll());
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    //function request(organization) { return { type: organizationConstants.UPDATE_REQUEST, organization } }
    function success(updatedItem) { return { type: workflowConstants.UPDATE_SUCCESS, updatedItem } }
    function failure(error) { return { type: workflowConstants.UPDATE_FAILURE, error } }
}
//
// function _delete(id) {debugger;
//     return dispatch => {
//         //dispatch(request(id));
//         organizationService.delete(id)
//             .then(
//                 resp => dispatch(success(resp)),
//                 error => dispatch(failure(id, error.toString()))
//             );
//     };
//
//     function request(id) { return { type: organizationConstants.DELETE_REQUEST, id } }
//     function success(deletedItem) { return { type: organizationConstants.DELETE_SUCCESS, deletedItem } }
//     function failure(id, error) { return { type: organizationConstants.DELETE_FAILURE, id, error } }
// }
