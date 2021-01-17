import React, { useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import classNames from 'classnames';

import './Documentation.scss';
import {organizationActions} from "../_actions/organization.action";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

import { FileUpload } from 'primereact/fileupload';


import './Organization.scss';
import {MultiSelect} from "primereact/multiselect";
import {customerActions, industryActions} from "../_actions";
import {Sidebar} from "primereact/sidebar";

const emptyData = {
    id: null,
    organization_name: '',
};
function Organization () {
    let listData = useSelector(state => state.organizations.items);
    let totalRecords = useSelector(state => state.organizations.itemsTotal);
    let listIndustries = useSelector(state => state.industries.items);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const dispatch = useDispatch();


    const [deleteData, setDeleteOrganization] = useState(false);
    const [dialog, setDialog] = useState(false);
    let [toast, setToast] = useState(null);
    let [gv, setGv] = useState(null);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [dataSelected, setDataSelected] = useState(emptyData);

    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);

    useEffect(() => {
        dispatch(industryActions.getAll({skip:null, take:null, search:null}));
        dispatch(organizationActions.getAll({skip:0, take:10, search:null}));
    }, []);

    useEffect(() => {

        if(listData){
            setLoading(false);
        }

    }, [listData]);

    const onPage =(event) => {
        setLoading(true);
        setTimeout(() => {
            const { first, rows } = event;
            const parameters = {
                skip: first,
                take: rows,
                search :''
            }
            dispatch(organizationActions.getAll(parameters));
            setFirst(first);
        }, 500);
    }

    const createdOrg = useSelector(state => state.organizations.newItem);
    const updatedOrg = useSelector(state => state.organizations.updatedItem);
    const deletedOrg = useSelector(state => state.organizations.deletedItem);
    useEffect(() => {
        if(createdOrg) {
            setDialog(false);
            setDataSelected(emptyData);
            toast.show({severity: 'success', summary: 'Successful', detail: 'Organization Created', life: 3000});
        }
    }, [createdOrg]);

    useEffect(() => {
        if(updatedOrg) {
            setDialog(false);
            setDataSelected(emptyData);
            toast.show({ severity: 'success', summary: 'Successful', detail: 'Organization Updated', life: 3000 });
        }
    }, [updatedOrg]);

    useEffect(() => {
        if(deletedOrg) {
            setDeleteDataDialog(false);
            setDataSelected(emptyData);
            toast.show({ severity: 'success', summary: 'Successful', detail: 'Organization Deleted', life: 3000 });
        }
    }, [deletedOrg]);

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

   const  editDataSelected =(data)=> {
       let temp = {...data};
       temp.industries = temp.industries.map((item) => {return item.id});
       setDataSelected(temp);
       setDialog(true);
    }
    const confirmDeleteData =(data)=> {
        setDataSelected(data);
        setDeleteDataDialog(true);
    }

    // const renderDateFilter=()=> {
    //     return (
    //         <Calendar value={this.state.dateFilter} onChange={this.onDateFilterChange} placeholder="Fecha de Nacimiento" dateFormat="yy-mm-dd" className="p-column-filter" />
    //     );
    // }
    // const renderHeader =()=> {
    //     return (
    //
    //         <div className="table-header">
    //         <InputText style={{float:'left'}} type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
    //         <Button style={{float:'right'}} icon="pi pi-refresh" />
    //         </div>
    //
    //     );
    // }
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


    //const header = renderHeader();
    //const dateFilter = renderDateFilter();


    const header = (
        <div className="table-header">
            <h5 className="p-m-0"></h5>
            <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
                </span>
        </div>
    );

    // const hideDeleteDataDialog=()=> {
    //     setDeleteDataDialog(false);
    // }

    const deleteDataSelected =()=> {
        listData = listData.filter(val => val.id !== dataSelected.id);
        setDeleteDataDialog(false);
        setDataSelected(emptyData);
        // this.setState({
        //     products,
        //     deleteProductDialog: false,
        //     product: this.emptyProduct
        // });
        toast.show({ severity: 'success', summary: 'Successful', detail: 'Organization Deleted', life: 3000 });
    }


    const findIndexById =(id)=> {
        let index = -1;
        for (let i = 0; i < listData.length; i++) {
            if (listData[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    const dialogFooter =
        (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={()=> dataSelected.id ? dispatch(organizationActions.update(dataSelected)): dispatch(organizationActions.create(dataSelected))}/>
            </>
        );

    const deleteDataDialogFooter =
        (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDataDialog}/>
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() =>{dispatch(organizationActions.delete(dataSelected))}}/>
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
                        <h1>Organization</h1>
                        <Toast ref={(el) => toast = (el)} />
                        <div className="card">
                            <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />

                            <DataTable value={listData || []} ref={(el) => gv = el} paginator rows={10} totalRecords={totalRecords}
                                       lazy first={first} onPage={onPage} loading={loading}
                                       header={header} responsive className="p-datatable-organization"
                                       dataKey="id" rowHover globalFilter={globalFilter}
                                       selection={selectedCustomers} onSelectionChange={e => setSelectedCustomers(e.value)}
                                       emptyMessage="Not organizations found"
                                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                       rowsPerPageOptions={[10,25,50]}
                            >
                                <Column field="organization_name" header="Organization Name" sortable filterPlaceholder="Search by name" />
                                <Column header="Options" body={actionBodyTemplate}></Column>

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
                            <h3 style={{fontWeight:'normal'}}>ADD NEW ORGANIZATION</h3>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                         <InputText id="organization_name" value={dataSelected.organization_name} onChange={(e) => onInputChange(e, 'organization_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !dataSelected.organization_name })} />
                        {submitted && !dataSelected.organization_name && <small className="p-invalid">Name is required.</small>}

                        <label htmlFor="organization_name">Organization Name</label>
                    </span>
                        </div>


                        <div className="p-field p-col-12 p-md-12">
                    <span className="">
                          <MultiSelect  optionLabel="industry_name" optionValue="id" value={dataSelected.industries} options={listIndustries}
                                        onChange={(e) => { onInputChange(e, 'industries') }} placeholder="Select an Industry"/>

                    </span>
                        </div>

                        <div className="p-field p-col-12 p-md-6">
                            <Button type="button" onClick={()=> dataSelected.id ? dispatch(organizationActions.update(dataSelected)): dispatch(organizationActions.create(dataSelected))} label="Save" className="p-button-success" style={{marginRight:'.25em'}} />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <Button type="button" onClick={hideDialog} label="Cancel" className="p-button-secondary"/>

                        </div>
                    </div>
                </Sidebar>

                {/*<Dialog visible={dialog} style={{ width: '450px' }} header="Data Details" modal className="p-fluid" footer={dialogFooter} onHide={hideDialog}>*/}
                    {/*<div className="p-field">*/}
                        {/*<label htmlFor="organization_name">Name</label>*/}
                        {/*<InputText id="organization_name" value={dataSelected.organization_name} onChange={(e) => onInputChange(e, 'organization_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !dataSelected.organization_name })} />*/}
                        {/*{submitted && !dataSelected.organization_name && <small className="p-invalid">Name is required.</small>}*/}
                    {/*</div>*/}
                {/*</Dialog>*/}

                <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteDataDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {dataSelected && <span>Are you sure you want to delete <b>{dataSelected.organization_name}</b>?</span>}
                    </div>
                </Dialog>


            </div>
        )
}
export { Organization };
