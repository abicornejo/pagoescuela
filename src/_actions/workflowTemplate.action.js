import { alertActions } from './';
import { workflowTemplateConstants } from '../_constants/workflowTemplate.constants';
import { workflowTemplateService } from '../_services/workflowTemplate.service';

export const workflowTemplateActions = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getById(data) {
  return (dispatch) => {
    if (data.template_jsonb) {
      dispatch(success(data));
    } else {
      console.log('data', data);
      workflowTemplateService.getById({ id: data.id }).then(
        (itemSelected) => {
          dispatch(success(itemSelected));
        },
        (error) => dispatch(failure(error.toString()))
      );
    }
  };

  function success(itemSelected) {
    return { type: workflowTemplateConstants.GETBYID_SUCCESS, itemSelected };
  }
  function failure(error) {
    return { type: workflowTemplateConstants.GETBYID_FAILURE, error };
  }
}

function getAll(parameters) {
  return (dispatch) => {
    //dispatch(request());

    workflowTemplateService.getAll(parameters).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function success(response) {
    return { type: workflowTemplateConstants.GETALL_SUCCESS, response };
  }
  function failure(error) {
    return { type: workflowTemplateConstants.GETALL_FAILURE, error };
  }
}

function create(data) {
  return (dispatch) => {
    workflowTemplateService.create(data).then(
      (result) => {
        dispatch(success(result));
        //dispatch(organizationActions.getAll());
        //dispatch(alertActions.success('Registration successful'));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function success(newItem) {
    return { type: workflowTemplateConstants.CREATE_SUCCESS, newItem };
  }
  function failure(error) {
    return { type: workflowTemplateConstants.CREATE_FAILURE, error };
  }
}

function update(data) {
  return (dispatch) => {
    workflowTemplateService.update(data).then(
      (result) => {
        dispatch(success(result));
        //dispatch(organizationActions.getAll());
        //dispatch(alertActions.success('Registration successful'));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function success(updatedItem) {
    return { type: workflowTemplateConstants.UPDATE_SUCCESS, updatedItem };
  }
  function failure(error) {
    return { type: workflowTemplateConstants.UPDATE_FAILURE, error };
  }
}

function _delete(id) {
  return (dispatch) => {
    //dispatch(request(id));
    workflowTemplateService.delete(id).then(
      (result) => dispatch(success(result)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function success(deletedItem) {
    return { type: workflowTemplateConstants.DELETE_SUCCESS, deletedItem };
  }
  function failure(id, error) {
    return { type: workflowTemplateConstants.DELETE_FAILURE, id, error };
  }
}
