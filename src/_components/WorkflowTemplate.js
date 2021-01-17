import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';

import './WorkflowTemplate.scss';
import { workflowTemplateActions } from '../_actions';
import { workflowTemplateConstants } from '../_constants/workflowTemplate.constants';

function WorkflowTemplate() {
  const history = useHistory();

  const listData = useSelector((state) => state.workflowTemplate.items);
  const totalRecords = useSelector((state) => state.customers.itemsTotal);

  // let listIndustries = useSelector(state => state.industries.items);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedTemplates, setSelectedTemplates] = useState(null);
  const dispatch = useDispatch();
  let [toast, setToast] = useState(null);
  let [gv, setGv] = useState(null);

  const [deleteDataDialog, setDeleteDataDialog] = useState(false);

  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);

  useEffect(() => {
    setLoading(true);
    // dispatch(industryActions.getAll({ skip: null, take: null, search: null }));
    dispatch(workflowTemplateActions.getAll({ skip: 0, take: 10, search: '' }));
  }, []);

  useEffect(() => {
    if (listData) {
      setLoading(false);
    }
  }, [listData]);

  const onPage = (event) => {
    setLoading(true);
    setTimeout(() => {
      const { first, rows } = event;
      const parameters = {
        skip: first,
        take: rows,
        search: '',
      };
      dispatch(workflowTemplateActions.getAll(parameters));
      setFirst(first);
    }, 500);
  };

  const deleted = useSelector((state) => state.workflowTemplate.deletedItem);

  useEffect(() => {
    if (deleted) {
      setDeleteDataDialog(false);
      toast.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'Template Deleted',
        life: 3000,
      });
    }
  }, [deleted]);

  const openNew = (e) => {
    e.preventDefault();
    dispatch({
      type: workflowTemplateConstants.GETBYID_SUCCESS,
      itemSelected: null,
    });
    return history.push('/workflow');
  };

  const hideDeleteDataDialog = () => {
    setDeleteDataDialog(false);
  };

  const editDataSelected = (data) => {
    dispatch(workflowTemplateActions.getById(data));
    return history.push('/workflow');
  };
  const confirmDeleteData = (data) => {
    setDeleteDataDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={(e) => openNew(e)}
        />
      </>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <>
        <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          label="Import"
          chooseLabel="Import"
          className="p-mr-2 p-d-inline-block"
        />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" />
      </>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Template</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editDataSelected(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteData(rowData)}
        />
      </>
    );
  };

  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div className="datatable-templating-demo">
          <h1>Template</h1>
          <Toast ref={(el) => (toast = el)} />
          <div className="card">
            <Toolbar
              className="p-mb-4"
              left={leftToolbarTemplate}
              right={rightToolbarTemplate}
            />

            <DataTable
              value={listData || []}
              ref={(el) => (gv = el)}
              paginator
              rows={10}
              totalRecords={totalRecords}
              lazy
              first={first}
              onPage={onPage}
              loading={loading}
              header={header}
              responsive
              className="p-datatable-templates"
              dataKey="id"
              rowHover
              globalFilter={globalFilter}
              selection={selectedTemplates}
              onSelectionChange={(e) => setSelectedTemplates(e.value)}
              emptyMessage="No templates found"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}>
              <Column field="template_name" header="Template Name" sortable />
              <Column header="Options" body={actionBodyTemplate} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
export { WorkflowTemplate };
