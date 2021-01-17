import { industryConstants } from '../_constants/industry.constants';

export function industries(state = {}, action) {
    switch (action.type) {

        case industryConstants.CREATE_REQUEST:
            return { requesting: 'OK' };
        case industryConstants.CREATE_SUCCESS:
            return {...state, newItem:action.newItem.industry,
                items:[...state.items,action.newItem.industry]
            };
        case industryConstants.UPDATE_SUCCESS:
            return {...state,updatedItem:action.updatedItem.industry.id,
                items: state.items.map(org =>
                    org.id === action.updatedItem.industry.id
                        ? action.updatedItem.industry
                        : org
                )

            };
        case industryConstants.CREATE_FAILURE:
            return {};
        case industryConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case industryConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.response && action.response.industries && action.response.industries.industry ? action.response.industries.industry : action.response,
                totalIndustries : action.response.industries && action.response.industries ? action.response.industries.total : 0
            };
        case industryConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case industryConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(org =>
                    org.id === org.id
                        ? { ...org, deleting: true }
                        : org
                )
            };
        case industryConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                ...state,deletedItem: action.deletedItem,
                items: state.items.filter(org => org.id !== action.deletedItem.industry.id)
            };
        case industryConstants.DELETE_FAILURE:
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
