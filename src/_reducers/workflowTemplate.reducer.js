import { workflowTemplateConstants } from '../_constants/workflowTemplate.constants';

export function workflowTemplate(state = {}, action) {
  switch (action.type) {
    case workflowTemplateConstants.CREATE_REQUEST:
      return { requesting: 'OK' };
    case workflowTemplateConstants.CREATE_SUCCESS:
      return {
        ...state,
        newItem: action.newItem.template,
        items: [...state.items, action.newItem.template],
      };
    // case workflowTemplateConstants.UPDATE_SUCCESS:
    //     return {...state, updatedItem:action.updatedItem.customer.id,
    //         items: state.items.map(org =>
    //             org.id === action.updatedItem.customer.id
    //                 ? action.updatedItem.customer
    //                 : org
    //         )

    //     };
    case workflowTemplateConstants.CREATE_FAILURE:
      return {};
    case workflowTemplateConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case workflowTemplateConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.response,
        itemsTotal: action.response.length,
      };
    case workflowTemplateConstants.GETBYID_SUCCESS:
      return {
        ...state,
        itemSelected: action.itemSelected,
      };
    case workflowTemplateConstants.GETBYID_FAILURE:
      return {
        error: action.error,
      };
    case workflowTemplateConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    // case workflowTemplateConstants.DELETE_REQUEST:
    //   // add 'deleting:true' property to user being deleted
    //   return {
    //     ...state,
    //     items: state.items.map((org) =>
    //       org.id === org.id ? { ...org, deleting: true } : org
    //     ),
    //   };
    case workflowTemplateConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        deletedItem: action.deletedItem,
        items: state.items.filter(
          (org) => org.id !== action.deletedItem.template.id
        ),
      };
    case workflowTemplateConstants.DELETE_FAILURE:
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
      return state;
  }
}
