import { workflowConstants } from '../_constants/workflow.constants';

export function worflows(state = {}, action) {
    switch (action.type) {

        case workflowConstants.CREATE_REQUEST:
            return { requesting: 'OK' };
        case workflowConstants.CREATE_SUCCESS:
            return {...state,newItem: action.newItem.data[0]};
        case workflowConstants.UPDATE_SUCCESS:
            return {...state,updatedItem:action.updatedItem.data[0]};
        case workflowConstants.CREATE_FAILURE:
            return {};
        case workflowConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case workflowConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.response.organization,
                itemsTotal:action.response.total
            };
        case workflowConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case workflowConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(org =>
                    org.id === org.id
                        ? { ...org, deleting: true }
                        : org
                )
            };
        case workflowConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                ...state,deletedItem: action.deletedItem,
                items: state.items.filter(org => org.id !== action.deletedItem.organization.id)
            };
        case workflowConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                // items: state.items.map(org => {
                //     if (org.id === org.id) {
                //         // make copy of user without 'deleting:true' property
                //         const { deleting, ...orgCopy } = org;
                //         // return copy of user with 'deleteError:[error]' property
                //         return { ...orgCopy, deleteError: action.error };
                //     }
                //
                //     return org;
                // })
            };
        default:
            return state
    }
}
