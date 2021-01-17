import { combineReducers } from 'redux';
import { organizations } from './organization.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { industries } from './industry.reducer';
import { customers } from './customer.reducer';
import { workflowTemplate } from './workflowTemplate.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { worflows } from './workflow.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  organizations,
  industries,
  customers,
  workflowTemplate,
  worflows,
});

export default rootReducer;
