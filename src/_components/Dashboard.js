import React, { Component } from 'react';
import {CarService} from './../_services/CarService';
import {Panel} from 'primereact/panel';
import {Checkbox} from 'primereact/checkbox';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Chart} from 'primereact/chart';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {FullCalendar} from 'primereact/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import classNames from "classnames";
import {MultiSelect} from "primereact/multiselect";
import {organizationActions} from "../_actions";
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';

export class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            submitted: false,
            tasks: [],
            alumno:{
                Colegio:JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).number: '',
                NombreColegio:JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).name: '',
                IdExterno : "id" + new Date().getTime(),
                Periodo: '',
                Vigencia: '',
                Alumno: '',
                Matricula: '',
                TotalPagar: '',
                EsProgramado: false,
                CicloEscolar:'2020-2021',
                ProgramadoHora: new Date(),
                Contactos:[],
                Colegiatura:[]
                // Alumno: "lorenzo abraham cornejo ortiz",
                // CicloEscolar: "2020-2021",
                // Colegio: 25,
                // Contactos: [{Contacto: "rosy", Whatsapp: "5526938526", Email: "abicornejo@gmail.com"}],
                // Colegiatura: [{Concepto: "pago", Monto: "5000"}],
                // EsProgramado: false,
                // IdExterno: 'id'+new Date().getTime(),
                // Matricula: 555536,
                // NombreColegio: "Kids Center",
                // Periodo: "/Date(1610172000000)/",
                // ProgramadoHora: "/Date(1610689349837)/",
                // TotalPagar: 5000,
                // Vigencia: "/Date(1619845200000)/"
            },
            es : {
                firstDayOfWeek: 1,
                dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
                dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
                dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
                monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
                monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
                today: 'Hoy',
                clear: 'Limpiar',
                dateFormat: 'dd/mm/yy',
                weekHeader: 'Sm'
            },
            city: null,
            selectedCar: null,
            lineData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: '#007be5'
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        borderColor: '#20d077'
                    }
                ]
            },
            cities: [
                {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
                {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
                {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
                {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
                {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
            ],
            fullcalendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                defaultDate: '2017-02-01',
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: true
            },
            events: [
                {
                    "id": 1,
                    "title": "All Day Event",
                    "start": "2017-02-01"
                },
                {
                    "id": 2,
                    "title": "Long Event",
                    "start": "2017-02-07",
                    "end": "2017-02-10"
                },
                {
                    "id": 3,
                    "title": "Repeating Event",
                    "start": "2017-02-09T16:00:00"
                },
                {
                    "id": 4,
                    "title": "Repeating Event",
                    "start": "2017-02-16T16:00:00"
                },
                {
                    "id": 5,
                    "title": "Conference",
                    "start": "2017-02-11",
                    "end": "2017-02-13"
                },
                {
                    "id": 6,
                    "title": "Meeting",
                    "start": "2017-02-12T10:30:00",
                    "end": "2017-02-12T12:30:00"
                },
                {
                    "id": 7,
                    "title": "Lunch",
                    "start": "2017-02-12T12:00:00"
                },
                {
                    "id": 8,
                    "title": "Meeting",
                    "start": "2017-02-12T14:30:00"
                },
                {
                    "id": 9,
                    "title": "Happy Hour",
                    "start": "2017-02-12T17:30:00"
                },
                {
                    "id": 10,
                    "title": "Dinner",
                    "start": "2017-02-12T20:00:00"
                },
                {
                    "id": 11,
                    "title": "Birthday Party",
                    "start": "2017-02-13T07:00:00"
                },
                {
                    "id": 12,
                    "title": "Click for Google",
                    "url": "http://google.com/",
                    "start": "2017-02-28"
                }
            ]
        };

        this.onTaskChange = this.onTaskChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.carservice = new CarService();
    }

    createIdDynamic = () => {
        let id = '';
        let chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 15; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    onTaskChange(e) {
        let selectedTasks = [...this.state.tasks];
        if(e.checked)
            selectedTasks.push(e.value);
        else
            selectedTasks.splice(selectedTasks.indexOf(e.value), 1);

        this.setState({tasks: selectedTasks});
    }

    onCityChange(e) {
        this.setState({city: e.value});
    }

    componentDidMount() {
        this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
    }

    onInputChange=(e, name)=> {
        const val = (e.target && e.target.value) || '';
        let data = {...this.state.alumno};
        data[`${name}`] = val;

        this.setState({alumno:data});
    }
    onInputChangeMatricula=(e, name)=> {debugger;
        const val = (e.target && e.target.value) || '';
        let data = {...this.state.alumno};


        if (!isNaN(val)){
            data[`${name}`] = val;
        }else{
            data[`${name}`] = data[`${name}`];
        }

        this.setState({alumno:data});
    }
    addRowContactos = (e) => {
        e.preventDefault();
        debugger;
        let tmpAlumno = { ...this.state.alumno };
        //let tmpContactos = { ...this.state.alumno.Contactos };

        tmpAlumno.Contactos = [
            ...this.state.alumno.Contactos,
            { id: this.createIdDynamic, Contacto: 'Clic para editar', Whatsapp: 'Clic para editar', Email: 'Clic para editar' },
        ];
        //tmpAlumno.Contactos = tmpContactos;
        //
        this.setState({ alumno : tmpAlumno});
    };
    addRowDetalles = (e) => {
        e.preventDefault()

        let tmpAlumno = { ...this.state.alumno };
        //let tmpDetalle = { ...this.state.alumno.Colegiatura };

        tmpAlumno.Colegiatura = [
            ...this.state.alumno.Colegiatura,
            { id: this.createIdDynamic, Concepto: 'clic para editar', Monto: 'clic para editar' },
        ];
        //tmpAlumno.Colegiatura = tmpDetalle;
        //
        this.setState({ alumno : tmpAlumno});
    };


    headerOptionsContactos = (
        <div className="table-header">
            <h2 className="p-m-0">Contactos</h2>
            <span className="p-input-icon-left">
        <Button style={{float:'right'}}
            icon="pi pi-plus"
            className="p-mr-2 p-button-success"
            onClick={(e) => this.addRowContactos(e)}
        />
      </span>
        </div>
    );

    headerOptionsDetalles = (
        <div className="table-header">
            <h2 className="p-m-0">Detalles</h2>
            <span className="p-input-icon-left">
        <Button style={{float:'right'}}
            icon="pi pi-plus"
            className="p-mr-2 p-button-success"
            onClick={(e) => this.addRowDetalles(e)}
        />
      </span>
        </div>
    );

    render() {
        const self = this;
        const handleFocus = (event) => event.target.select();

        const onEditorValueChange = (productKey, props, value) => {
            let tempAlumno = { ...this.state.alumno };
            tempAlumno.Contactos[props.rowIndex][props.field] = value;
            this.setState({ alumno : tempAlumno});
        };
        const onEditorDetalleValueChange = (productKey, props, value) => {
            debugger;
            let tempAlumno = { ...this.state.alumno };
            tempAlumno.Colegiatura[props.rowIndex][props.field] = value;
            this.setState({ alumno : tempAlumno});
        };

        const inhabilitarEnter = (event) =>{
            if (event.keyCode === 13 || event.key === 'Enter') {
                event.preventDefault();
                return false;
            }
        }
        const inhabilitarEnterYCadenas = (event) =>{debugger;
            if (event.keyCode === 13 || event.key === 'Enter') {
                event.preventDefault();
                return false;
            }
            let regExpr = new RegExp("^\d*\.?\d*$");
            if (!regExpr.test(event.target.value)) {
                // Case of error
                let alumno = {...self.state.alumno};
                alumno.Matricula = alumno.Matricula;
                self.setState({alumno:alumno.Matricula});
                return false;
            }
            //return true;
        }


        const inputTextEditor = (productKey, props, field) => {
            return (
                <InputText
                    type="text"
                    value={props.rowData[field]}
                    onFocus={handleFocus}
                    onKeyPress={(e)=>inhabilitarEnter(e)}
                    onChange={(e) => onEditorValueChange(productKey, props, e.target.value)}
                />
            );
        };

        const inputTextDetalleEditor = (productKey, props, field) => {
            debugger;
            return (
                <InputText
                    type="text"
                    value={props.rowData[field]}
                    onFocus={handleFocus}
                    onKeyPress={(e)=>inhabilitarEnter(e)}
                    onChange={(e) => onEditorDetalleValueChange(productKey, props, e.target.value)}
                />
            );
        };
        const nameEditor = (productKey, props) => {
            return inputTextEditor(productKey, props, props.field);
        };
        const detalleEditor = (productKey, props) => {
            return inputTextDetalleEditor(productKey, props, props.field);
        };
        const removeContactoFromAlumno = (item) => {
            let alumno = { ...this.state.alumno };

            alumno.Contactos = alumno.Contactos.filter(
                (op) => op.id !== item.id
            );

            this.setState({ alumno : alumno});
        };
        const removeDetalleFromAlumno = (item) => {
             let alumno = { ...this.state.alumno };

            alumno.Colegiatura = alumno.Colegiatura.filter(
                (op) => op.id !== item.id
            );

            this.setState({ alumno : alumno});
        };
        const optionsTable = (rowData) => {
            return (
                <>
                    <Button
                        style={{float:'right'}}
                        icon="pi pi-trash"
                        className="p-button-rounded p-button-danger"
                        onClick={() => removeContactoFromAlumno(rowData)}
                    />
                </>
            );
        };
        const optionsTableDetalle = (rowData) => {
            return (
                <>
                    <Button
                        style={{float:'right'}}
                        icon="pi pi-trash"
                        className="p-button-rounded p-button-danger"
                        onClick={() => removeDetalleFromAlumno(rowData)}
                    />
                </>
            );
        };

        const validar =(e)=>{
            e.preventDefault();
            this.setState({ submitted: true})
debugger;

        }

        const handleSubmit=(e)=> {
            e.preventDefault();
            debugger;
            this.setState({ submitted: true});

            if(this.state.alumno.Alumno && this.state.alumno.Matricula && this.state.alumno.Vigencia &&
                this.state.alumno.Periodo && this.state.alumno.TotalPagar && this.state.alumno.Contactos
                && this.state.alumno.Colegiatura
            ){
                let tmpAlumno = { ...this.state.alumno };

               tmpAlumno.Periodo = "/Date(" + tmpAlumno.Periodo.getTime() + ")/";
               tmpAlumno.Vigencia = "/Date(" + tmpAlumno.Vigencia.getTime() + ")/";
               tmpAlumno.ProgramadoHora = "/Date(" + tmpAlumno.ProgramadoHora.getTime() + ")/";
                // const requestOptions = {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                //     body: JSON.stringify(tmpAlumno),
                //     //mode: 'no-cors'
                // };
                // debugger;
                // fetch('https://1konsilio.com:8093/Colegio/sColegiosEdoCuentaRest.svc/GenerarEdoCuenta',requestOptions)
                //     .then(response => {
                //         debugger;
                //         response.json();
                //     })
                //     .then(data => {
                //         debugger
                //     }).catch(error =>{
                //         debugger;
                // });

                const headers = {
                    // 'Content-Type': 'application/json',
                     //'Access-Control-Allow-Origin': 'http://localhost:3000/',
                    //'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    //'crossorigin':'true',
                    //"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                   // 'Content-Type': 'text/plain'
                }
                //axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

                axios.post('https://1konsilio.com:8093/Colegio/sColegiosEdoCuentaRest.svc/GenerarEdoCuenta', JSON.stringify(tmpAlumno), {

                    headers: headers
                })
                    .then((response) => {
                        debugger;
                        if(response && response.OxxoReferencia){
                            this.toast.show({severity: 'success', summary: 'Mensage', detail: 'Datos guardados correctamente'});
                            window.location.href=window.location.href;

                        }else{

                            this.toast.show({severity: 'error', summary: 'Mensage', detail: 'Algo salio mal'});

                        }
                    })
                    .catch((error, xhr, more) => {
                        debugger;
                        this.toast.show({severity: 'error', summary: 'Mensage', detail: 'Error Inesperado'});

                    })


            }
            /*if (username && password) {
                dispatch(userActions.login(username, password));
            }*/
        }

        return (
            <div className="p-grid p-fluid dashboard">
                <Toast ref={(el) => this.toast = el} />

                <div className="p-col-12 p-lg-12">
                    <form name="form">
                        <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-12">
                            <h3 style={{fontWeight:'normal'}}>Ingresa los datos correspondientes</h3>
                        </div>
                        <div className="p-field p-col-12 p-md-6" style={{marginTop:'10px'}}>
                            <span className="p-float-label">
                                 <InputText  onKeyPress={(e)=>inhabilitarEnter(e)} id="name_alumno" value={this.state.alumno.Alumno} onChange={(e) => this.onInputChange(e, 'Alumno')} className={classNames({ 'p-invalid': this.state.submitted && !this.state.alumno.Alumno })}/>
                                {this.state.submitted && !this.state.alumno.Alumno && <small className="p-invalid">Alumno es requerido.</small>}
                                <label htmlFor="name_alumno">Nombre del alumno</label>
                            </span>

                        </div>
                        <div className="p-field p-col-12 p-md-6" style={{marginTop:'10px'}}>
                            <span className="p-float-label">
                                <InputText  id="matricula_alumno" onKeyPress={(e)=>inhabilitarEnter(e)} value={this.state.alumno.Matricula} onChange={(e) => this.onInputChangeMatricula(e, 'Matricula')} className={classNames({ 'p-invalid': this.state.submitted && !this.state.alumno.Matricula })} />
                                {this.state.submitted && !this.state.alumno.Matricula && <small className="p-invalid">Matricula es requerida.</small>}
                                <label htmlFor="matricula_alumno">Matricula del alumno</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-4" style={{marginTop:'10px'}}>
                            <span className="p-float-label">
                                <Calendar  locale={this.state.es} dateFormat="dd/mm/yy" value={this.state.alumno.Vigencia} onChange={(e) => this.onInputChange(e, 'Vigencia')}  className={classNames({ 'p-invalid': this.state.submitted && !this.state.alumno.Vigencia })}/>

                                {this.state.submitted && !this.state.alumno.Vigencia && <small className="p-invalid">Vigencia es requerido.</small>}
                                <label htmlFor="">Vigencia</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-4" style={{marginTop:'10px'}}>
                            <span className="p-float-label">
                               <Calendar id="monthpicker" view="month" locale={this.state.es} dateFormat="mm" value={this.state.alumno.Periodo} onChange={(e) => this.onInputChange(e, 'Periodo')}  autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.alumno.Periodo })}/>
                                {this.state.submitted && !this.state.alumno.Periodo && <small className="p-invalid">Periodo es requerido.</small>}
                                <label htmlFor="">Periodo</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-4" style={{marginTop:'10px'}}>
                            <span className="p-float-label">
                                <InputText   onKeyPress={(e)=>inhabilitarEnter(e)} pattern="^-?[0-9]\d*\.?\d*$"  id="total_alumno" value={this.state.alumno.TotalPagar} onChange={(e) => this.onInputChangeMatricula(e, 'TotalPagar')} className={classNames({ 'p-invalid': this.state.submitted && !this.state.alumno.TotalPagar })} />
                                {this.state.submitted && !this.state.alumno.TotalPagar && <small className="p-invalid">Total es requerido.</small>}
                                <label htmlFor="total_alumno">Total a Pagar</label>
                            </span>
                        </div>

                        <div className="p-field p-col-12 p-md-6" style={{marginTop:'10px'}}>
                            {this.state.submitted && !this.state.alumno.Contactos && <small className="p-invalid">Al menos un contacto es requerido.</small>}

                            <DataTable
                                header={this.headerOptionsContactos}
                                editMode="cell"
                                id="tbOptionProperties"
                                value={this.state.alumno.Contactos}
                                className="editable-cells-table">
                                <Column
                                    field="Contacto"
                                    header="Nombre"
                                    editor={(props) => nameEditor('Contacto', props)}
                                />
                                <Column
                                    field="Whatsapp"
                                    header="WhatsApp"
                                    editor={(props) => nameEditor('Whatsapp', props)}
                                />
                                <Column
                                    field="Email"
                                    header="Email"
                                    editor={(props) => nameEditor('Email', props)}
                                />
                                <Column header="Options" body={optionsTable} />
                            </DataTable>
                        </div>

                        <div className="p-field p-col-12 p-md-6" style={{marginTop:'10px'}}>
                            {this.state.submitted && !this.state.alumno.Colegiatura && <small className="p-invalid">Al menos una colegiatura es requerido.</small>}

                            <DataTable
                                header={this.headerOptionsDetalles}
                                editMode="cell"
                                id="tDetalles"
                                value={this.state.alumno.Colegiatura}
                                className="editable-cells-table">
                                <Column
                                    field="Concepto"
                                    header="Concepto"
                                    editor={(props) => detalleEditor('Concepto', props)}
                                />
                                <Column
                                    field="Monto"
                                    header="Monto"
                                    editor={(props) => detalleEditor('Monto', props)}
                                />
                                <Column header="Options" body={optionsTableDetalle} />
                            </DataTable>
                        </div>


                        <div className="p-field p-col-12 p-md-12">
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                {this.state.submitted && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Enviar
                            </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}
