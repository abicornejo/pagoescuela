import React, { useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import classNames from 'classnames';

import './Documentation.scss';
import {customerActions} from "../_actions/customer.action";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Sidebar } from 'primereact/sidebar';
import { MultiSelect } from 'primereact/multiselect';
import { FileUpload } from 'primereact/fileupload';
import { Card } from 'primereact/card';

import './Organization.scss';
import {industryActions} from "../_actions";
// import {Dropdown} from "primereact/dropdown";

let emptyData = {
    id: null,
    organization_name: '',
    industries:[]
};
function Customer() {
    let listData = useSelector(state => state.customers.items);
    let totalRecords = useSelector(state => state.customers.itemsTotal);
    let listIndustries = useSelector(state => state.industries.items);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const dispatch = useDispatch();
    const [dialog, setDialog] = useState(false);
    let [toast, setToast] = useState(null);
    let [gv, setGv] = useState(null);
    const [deleteDataDialog, setDeleteDataDialog] = useState(false);
    const [dataSelected, setDataSelected] = useState(emptyData);
    const [sideBarVisible, setSideBarVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    //const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        setLoading(true);
        dispatch(industryActions.getAll({skip:null, take:null, search:null}));
        dispatch(customerActions.getAll({skip:0, take:10, search:''}));
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
            dispatch(customerActions.getAll(parameters));
            setFirst(first);
        }, 500);
    }

    const created = useSelector(state => state.customers.newItem);
    const customerFound = useSelector(state => state.customers.customerFound);
    const updated = useSelector(state => state.customers.updatedItem);
    const deleted = useSelector(state => state.customers.deletedItem);

    useEffect(() => {
        if(customerFound) {
            let temp = {...dataSelected};
            let ids= JSON.parse(customerFound.industry_ids);
            var ids_from_industry = [];
            if(ids){
                ids.filter(item => {
                    ids_from_industry.push(item.id.toString());
                });

                temp.industry_id = ids_from_industry;
            }
            setDataSelected(temp);
            setSideBarVisible(true);
        }

    }, [customerFound]);
    // useEffect(() => {
    //     if(listData) {
    //
    //     }
    //
    // }, [listData]);
    useEffect(() => {
        if(created) {
            setSideBarVisible(false);
            setDataSelected(emptyData);
            toast.show({severity: 'success', summary: 'Successful', detail: 'Customer Created', life: 3000});
        }

    }, [created]);

    useEffect(() => {
        if(updated) {
            setSideBarVisible(false);
            setDataSelected(emptyData);
            toast.show({ severity: 'success', summary: 'Successful', detail: 'Customer Updated', life: 3000 });
        }
    }, [updated]);

    useEffect(() => {
        if(deleted) {
            setDeleteDataDialog(false);
            setDataSelected(emptyData);
            toast.show({ severity: 'success', summary: 'Successful', detail: 'Customer Deleted', life: 3000 });
        }
    }, [deleted]);


    const openNew =(e)=> {
        e.preventDefault();
        setDataSelected(emptyData);
        setSubmitted(false);
        //setDialog(true);
        setSideBarVisible(true);
    }


    const hideDialog =()=> {
        setSubmitted(false);
       // setDialog(false);
        setSideBarVisible(false);
    }

    const  hideDeleteDataDialog =()=>{
        setDeleteDataDialog(false);
    }


    const  editDataSelected =(data)=> {
        let temp = {...data};
        temp.industries = temp.industries.map((item) => {return item.id});
        setDataSelected(temp);
        setSideBarVisible(true);
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
            <h5 className="p-m-0">Manage Customer</h5>
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
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={()=> dataSelected.id ? dispatch(customerActions.update(dataSelected)): dispatch(customerActions.create(dataSelected))}/>
            </>
        );

    const deleteDataDialogFooter =
        (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDataDialog}/>
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() =>{dispatch(customerActions.delete(dataSelected))}}/>
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
                    <h1>Customer</h1>
                    <Toast ref={(el) => toast = (el)} />
                    <div className="card">
                        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />

                        <DataTable value={listData || []} ref={(el) => gv = el} paginator rows={10} totalRecords={totalRecords}
                                   lazy first={first} onPage={onPage} loading={loading}
                                   header={header} responsive className="p-datatable-customers"
                                   dataKey="id" rowHover globalFilter={globalFilter}
                                   selection={selectedCustomers} onSelectionChange={e => setSelectedCustomers(e.value)}
                                   emptyMessage="No customers found"
                                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    rowsPerPageOptions={[10,25,50]}
                            >


                            <Column field="first_name" header="First Name" sortable />
                            <Column field="last_name" header="Last Name" sortable />
                            <Column field="phone" header="Phone" sortable />
                            <Column field="mobile_phone" header="Mobile Phone" sortable />
                            <Column field="home_address" header="Home Address" sortable />
                            <Column field="work_address" header="Work Address" sortable />
                            <Column field="email" header="Email" sortable />
                            <Column field="zip_code" header="Zip Code" sortable />
                            <Column header="Options" body={actionBodyTemplate} />
                        </DataTable>
                    </div>
                </div>
            </div>

            <Sidebar  style={{width:'30em'}}   className="ui-sidebar-md" visible={sideBarVisible} position="right" baseZIndex={1000000} onHide={() => setSideBarVisible(false)} icons={() => (
                <>
                    <button className="p-sidebar-close p-link">
                        <span className="p-sidebar-close-icon pi pi-arrow-right"/>
                    </button>
                </>
            )}>

                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-12">
                        <h3 style={{fontWeight:'normal'}}>ADD NEW CUSTOMER</h3>
                    </div>
                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                        <InputText id="first_name" value={dataSelected.first_name} onChange={(e) => onInputChange(e, 'first_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !dataSelected.first_name })} />
                        {submitted && !dataSelected.first_name && <small className="p-invalid">Name is required.</small>}
                        <label htmlFor="first_name">First Name</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                        <InputText id="last_name" value={dataSelected.last_name} onChange={(e) => onInputChange(e, 'last_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !dataSelected.last_name })} />
                        {submitted && !dataSelected.last_name && <small className="p-invalid">Name is required.</small>}
                        <label htmlFor="last_name">Last Name</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <span className="p-float-label">
                        <InputText id="home_address" value={dataSelected.home_address} onChange={(e) => onInputChange(e, 'home_address')} required autoFocus className={classNames({ 'p-invalid': submitted && !dataSelected.home_address })} />
                        {submitted && !dataSelected.home_address && <small className="p-invalid">Home address is required.</small>}
                        <label htmlFor="home_address">Home Address</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <span className="p-float-label">
                        <InputText id="work_address" value={dataSelected.work_address} onChange={(e) => onInputChange(e, 'work_address')} required autoFocus className={classNames({ 'p-invalid': submitted && !dataSelected.work_address })} />
                        {submitted && !dataSelected.work_address && <small className="p-invalid">Work address is required.</small>}
                        <label htmlFor="work_address">Work address</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <span className="">
                          <MultiSelect  optionLabel="industry_name" optionValue="id" value={dataSelected.industries} options={listIndustries}
                                    onChange={(e) => { onInputChange(e, 'industries') }} placeholder="Select an Industry"/>
                        {/*<label htmlFor="industry">Industry</label>*/}
                    </span>
                </div>

                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                        <InputText id="phone" value={dataSelected.phone} onChange={(e) => onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': submitted && !dataSelected.phone })} />
                        {submitted && !dataSelected.phone && <small className="p-invalid">Name is required.</small>}
                        <label htmlFor="phone">Phone</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                        <InputText id="mobile_phone" value={dataSelected.mobile_phone} onChange={(e) => onInputChange(e, 'mobile_phone')} required autoFocus className={classNames({ 'p-invalid': submitted && !dataSelected.mobile_phone })} />
                        {submitted && !dataSelected.mobile_phone && <small className="p-invalid">Mobile is required.</small>}
                        <label htmlFor="mobile_phone">Mobile Phone</label>
                    </span>

                </div>

                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                        <InputText id="email" value={dataSelected.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !dataSelected.email })} />
                        {submitted && !dataSelected.email && <small className="p-invalid">Work address is required.</small>}
                        <label htmlFor="email">Email</label>
                    </span>

                </div>
                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                        <InputText id="zip_code" value={dataSelected.zip_code}
                                   onChange={(e) => onInputChange(e, 'zip_code')} required autoFocus
                                   className={classNames({ 'p-invalid': submitted && !dataSelected.zip_code })} />
                        {submitted && !dataSelected.zip_code && <small className="p-invalid">Name is required.</small>}
                        <label htmlFor="zip_code">Zip Code</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <Button type="button" onClick={()=> dataSelected.id ? dispatch(customerActions.update(dataSelected)): dispatch(customerActions.create(dataSelected))} label="Save" className="p-button-success" style={{marginRight:'.25em'}} />
               </div>
                <div className="p-field p-col-12 p-md-6">
                    <Button type="button" onClick={hideDialog} label="Cancel" className="p-button-secondary"/>

                </div>
                </div>
            </Sidebar>
            <Dialog visible={deleteDataDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDataDialogFooter} onHide={hideDeleteDataDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {dataSelected && <span>Are you sure you want to delete <b>{dataSelected.first_name}</b>?</span>}
                </div>
            </Dialog>


        </div>
    )
}
export { Customer };
