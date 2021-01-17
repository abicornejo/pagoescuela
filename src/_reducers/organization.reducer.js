import { organizationConstants } from '../_constants/organization.constants';

export function organizations(state = {}, action) {
    switch (action.type) {

        case organizationConstants.CREATE_REQUEST:
            return { requesting: 'OK' };
        case organizationConstants.CREATE_SUCCESS:
            return {...state,newItem: action.newItem.organization,
                items:[...state.items, action.newItem.organization]
            };
        case organizationConstants.UPDATE_SUCCESS:
            return {...state,updatedItem:action.updatedItem.organization.id,
                items: state.items.map(org =>
                    org.id === action.updatedItem.organization.id
                        ? action.updatedItem.organization
                        : org
                )

            };
        case organizationConstants.CREATE_FAILURE:
            return {};
        case organizationConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case organizationConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.response.organization,
                itemsTotal:action.response.total
            };
        case organizationConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case organizationConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(org =>
                    org.id === org.id
                        ? { ...org, deleting: true }
                        : org
                )
            };
        case organizationConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                ...state,deletedItem: action.deletedItem,
                items: state.items.filter(org => org.id !== action.deletedItem.organization.id)
            };
        case organizationConstants.DELETE_FAILURE:
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
