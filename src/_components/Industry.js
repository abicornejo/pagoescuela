import React, { useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import classNames from 'classnames';

import './Documentation.scss';
import {industryActions} from "../_actions/industry.action";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';


import './Organization.scss';
import {customerActions, organizationActions} from "../_actions";
import {MultiSelect} from "primereact/multiselect";
import {Sidebar} from "primereact/sidebar";

const emptyData = {
    id: null,
    industry_name: '',
    organization_id:''
};
function Industry() {
    let listData = useSelector(state => state.industries.items);
    let listOrganization = useSelector(state => state.organizations.items);

    const [globalFilter, setGlobalFilter] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const dispatch = useDispatch();
    const [dialog, setDialog] = useState(false);
    let [toast, setToast] = useState(null);
    let [gv, setGv] = useState(null);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [dataSelected, setDataSelected] = useState(emptyData);

    useEffect(() => {
        dispatch(industryActions.getAll({skip:null, take:null, search:null}));
        dispatch(organizationActions.getAll({skip:0, take:10, search:null}));
    }, []);

    useEffect(() => {debugger;
        //dispatch(organizationActions.getAll());
    }, [listOrganization]);

    const created = useSelector(state => state.industries.newItem);
    const updated = useSelector(state => state.industries.updatedItem);
    const deleted = useSelector(state => state.industries.deletedItem);
    useEffect(() => {
        if(created) {
            setDialog(false);
            setDataSelected(emptyData);
            toast.show({severity: 'success', summary: 'Successful', detail: 'Industry Created', life: 3000});
        }
    }, [created]);

    useEffect(() => {
        if(updated) {
            setDialog(false);
            setDataSelected(emptyData);
            toast.show({ severity: 'success', summary: 'Successful', detail: 'Industry Updated', life: 3000 });
        }
    }, [updated]);

    useEffect(() => {
        if(deleted) {
            setDeleteDataDialog(false);
            setDataSelected(emptyData);
            toast.show({ severity: 'success', summary: 'Successful', detail: 'Industry Deleted', life: 3000 });
        }
    }, [deleted]);


    const openNew =(e)=> {
        e.preventDefault();
        setDataSelected(emptyData);
        setSubmitted(false);
        setDialog(true);
    }


    const hideDialog =()=> {
        setSubmitted(false);
        setDialog(false);
    }

    const  hideDeleteDataDialog =()=>{
        setDeleteDataDialog(false);
    }

    function saveData (e) {debugger;

        // e.preventDefault();
        // dispatch(organizationActions.create(dataSelected))
        // setSubmitted(true);

        //
        // if (dataSelected) {
        //     //let products = [...listData];
        //     let product = {...dataSelected};
        //     if (dataSelected.id) {
        //         const index = findIndexById(dataSelected.id);
        //
        //         listData.data[index] = product;
        //         toast.show({ severity: 'success', summary: 'Successful', detail: 'Organization Updated', life: 3000 });
        //     }
        //     else {
        //
        //          // dispatch(organizationActions.create(dataSelected));
        //
        //         //
        //         // const response = useCallback(
        //         //     () => dispatch(organizationActions.getAll()),
        //         //     [dispatch]
        //         // )
        //         // let response = useSelector(state => state.organizations.creating);
        //         // debugger;
        //         // //product.id = createId();
        //         // //product.image = 'product-placeholder.svg';
        //         // //listData.data.push(product);
        //         // toast.show({ severity: 'success', summary: 'Successful', detail: 'Organization Created', life: 3000 });
        //     }
        //
        //     setDialog(false);
        //     setDataSelected(emptyData);
        //     // state = {
        //     //     ...state,
        //     //    // products,
        //     //     productDialog: false,
        //     //     product: emptyData
        //     // };
        // }

        // this.setState(state);
    }

    const  editDataSelected =(data)=> {
        setDataSelected(data);
        setDialog(true);
    }
    const confirmDeleteData =(data)=> {
        setDataSelected(data);
        setDeleteDataDialog(true);
    }

    const renderHeader =(globalFilterKey)=> {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter({ [`${globalFilterKey}`]: e.target.value })} placeholder="Global Search" />
            </span>
        );
    }
    const header1 = renderHeader('globalFilter1');

    // const renderHeader = () => {
    //     return (
    //         <div className="table-header">
    //             List of Customers
    //             <span className="p-input-icon-left">
    //                 <i className="pi pi-search"/>
    //                 {/*<InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" />*/}
    //                 <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)}
    //                            placeholder="Global Search"/>
    //          </span>
    //         </div>
    //     );
    // }

    const leftToolbarTemplate =()=> {
        return (
            <>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={(e)=>openNew(e)} />
                {/*<Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedProducts || !this.state.selectedProducts.length} />*/}
            </>
        )
    }

    const rightToolbarTemplate =()=> {
        return (
            <>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help"  />
            </>
        )
    }


    const header = (
        <div className="table-header">
            <h5 className="p-m-0"></h5>
            <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
                </span>
        </div>
    );

    const dialogFooter =
        (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={()=> dataSelected.id ? dispatch(industryActions.update(dataSelected)): dispatch(industryActions.create(dataSelected))}/>
            </>
        );

    const deleteDataDialogFooter =
        (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDataDialog}/>
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() =>{dispatch(industryActions.delete(dataSelected))}}/>
            </>
        );



    const actionBodyTemplate =(rowData)=> {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editDataSelected(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteData(rowData)} />
            </>
        );
    }

    const onInputChange=(e, name)=> {
        const val = (e.target && e.target.value) || '';
        let data = {...dataSelected};
        data[`${name}`] = val;

        setDataSelected(data);
    }

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="datatable-templating-demo">
                    <h1>Industry</h1>
                    <Toast ref={(el) => toast = (el)} />
                    <div className="card">
                        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />

                        <DataTable ref={(el) => gv = el} value={listData || []}
                                   header={header} responsive className="p-datatable-customers" dataKey="id" rowHover globalFilter={globalFilter}
                                   selection={selectedCustomers} onSelectionChange={e => setSelectedCustomers(e.value)}
                                   paginator rows={10} emptyMessage="No organizations found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>

                            <Column field="id" header="Id" sortable />
                            <Column field="industry_name" header="Industry Name" sortable filterPlaceholder="Search by name" />


                            <Column header="Options" body={actionBodyTemplate}></Column>
                            {/*<Column field="fechaNacimiento" header="Fecha Nacimiento" sortable filterMatchMode="custom"  />*/}
                            {/*<Column sortField="telefono" field="telefono" header="Telefono" sortable filterMatchMode="contains" filterPlaceholder="Buscar por telefono"/>*/}
                            {/*<Column sortField="correo" field="correo" header="Correo" sortable  filterMatchMode="contains" filterPlaceholder="Buscar por correo"/>*/}
                            {/*<Column field="status" header="Estatus" body={this.statusBodyTemplate} sortable />*/}
                            {/*<Column field="activity" header="Activity" body={this.activityBodyTemplate} sortable filter filterMatchMode="gte" filterPlaceholder="Minimum" />*/}
                            {/*<Column body={this.actionTemplate} headerStyle={{width: '8em', textAlign: 'center'}} bodyStyle={{textAlign: 'center', overflow: 'visible'}} />*/}

                        </DataTable>
                    </div>
                </div>
            </div>

            <Sidebar  style={{width:'30em'}}   className="ui-sidebar-md" visible={dialog} position="right" baseZIndex={1000000} onHide={() => setDialog(false)} icons={() => (
                <>
                    <button className="p-sidebar-close p-link">
                        <span className="p-sidebar-close-icon pi pi-arrow-right"/>
                    </button>
                </>
            )}>

                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-12">
                        <h3 style={{fontWeight:'normal'}}>ADD NEW INDUSTRY</h3>
                    </div>
                    <div className="p-field p-col-12 p-md-12">
                        <span className="p-float-label">
                            <InputText id="industry_name" value={dataSelected.industry_name} onChange={(e) => onInputChange(e, 'industry_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !dataSelected.industry_name })} />
                            {submitted && !dataSelected.industry_name && <small className="p-invalid">Name is required.</small>}
                            <label htmlFor="industry_name">Name</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <Button type="button" onClick={()=> dataSelected.id ? dispatch(industryActions.update(dataSelected)): dispatch(industryActions.create(dataSelected))} label="Save" className="p-button-success" style={{marginRight:'.25em'}} />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <Button type="button" onClick={hideDialog} label="Cancel" className="p-button-secondary"/>

                    </div>
                </div>
            </Sidebar>

            {/*<Dialog visible={dialog} style={{ width: '450px' }} header="Data Details" modal className="p-fluid" footer={dialogFooter} onHide={hideDialog}>*/}
                {/*<div className="p-field">*/}
                     {/*</div>*/}
            {/*</Dialog>*/}

            <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteDataDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {dataSelected && <span>Are you sure you want to delete <b>{dataSelected.industry_name}</b>?</span>}
                </div>
            </Dialog>

        </div>
    )
}
export { Industry };
