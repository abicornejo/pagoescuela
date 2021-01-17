import { customerConstants } from '../_constants/customer.constants';

export function customers(state = {}, action) {
    switch (action.type) {

        case customerConstants.CREATE_REQUEST:
            return { requesting: 'OK' };
        case customerConstants.CREATE_SUCCESS:debugger;
            return {...state, newItem: action.newItem.customer,
                items:[...state.items, action.newItem.customer]
            };
        case customerConstants.UPDATE_SUCCESS:debugger;
            return {...state, updatedItem:action.updatedItem.customer.id,
                items: state.items.map(org =>
                    org.id === action.updatedItem.customer.id
                        ? action.updatedItem.customer
                        : org
                )

            };
        case customerConstants.CREATE_FAILURE:
            return {};
        case customerConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case customerConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.response.customer,
                itemsTotal:action.response.total
            };
        case customerConstants.GETBYID_SUCCESS:
            return {
                ...state,
                customerFound: action.customerFound
            };
        case customerConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };
        case customerConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case customerConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(org =>
                    org.id === org.id
                        ? { ...org, deleting: true }
                        : org
                )
            };
        case customerConstants.DELETE_SUCCESS:debugger;
            // remove deleted user from state
            return {
                ...state,deletedItem: action.deletedItem,
                items: state.items.filter(org => org.id !== action.deletedItem.customer.id)
            };
        case customerConstants.DELETE_FAILURE:
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
