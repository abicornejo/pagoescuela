import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import './Documentation.scss';
import { workflowActions } from '../_actions/workflow.action';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import './Organization.scss';
import { Carousel } from 'primereact/carousel';
import { OrderList } from 'primereact/orderlist';
import { Toolbar } from 'primereact/toolbar';
import { Tooltip } from 'primereact/tooltip';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { FileUpload } from 'primereact/fileupload';
import { SelectButton } from 'primereact/selectbutton';
import { ToggleButton } from 'primereact/togglebutton';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
import { Fieldset } from 'primereact/fieldset';
import { systemConstants } from '../_constants/system.constants';
import { TabView, TabPanel } from 'primereact/tabview';
import { organizationActions, workflowTemplateActions } from '../_actions';

const emptyData = {
  id: null,
  json_id: null,
  name: '',
  tasks: [],
};

const emptyOptionProperty = {
  id: null,
  json_id: null,
  name: '',
  value: null,
};
function newTaskObject() {
  return {
    id: null,
    section_id: null,
    json_id: null,
    name: '',
    is_mandatory: null,
    currentTask: [{ task_id: '',is_mandatory:null, name: '', task_feedbacks: [] }],
    position: 0,
    task_properties: {
      task_name: '',
      is_mandatory: '',
      start_date: '',
      end_date: '',
      due_date: '',
    },
    task_feedbacks: [],
  };
}

function newFeedBackObject() {
  return {
    id: null,
    json_id: null,
    task_id: null,
    type: null,
    name: '',
    position: 0,
    properties: {
      label: '',
      placeholder: '',
      min_length: '',
      max_length: '',
      type_property: '',
      options: [],
      is_multiple: null,
      input: [],
      allow: [],
    },
    dependsOn: {
      feedBackId: null,
      value: '',
    },
  };
}

function WorkFlow(props) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [responsiveOptions, setResponsiveOptions] = useState([
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    },
  ]);
  const itemSelected = useSelector(
    (state) => state.workflowTemplate.itemSelected
  );

  const [sections, setSections] = useState([]);
  const [deleteSectionDialog, setDeleteSectionDialog] = useState(false);
  const [sectionDialog, setSectionDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [section, setSection] = useState(emptyData);
  const [task, setTask] = useState(newTaskObject());
  const [feedbackSelected, setFeedbackSelected] = useState(newFeedBackObject());
  const [optionPropertySelected, setOptionPropertySelected] = useState(
    emptyOptionProperty
  );
  const [deleteTaskDialog, setDeleteTaskDialog] = useState(false);
  const [deleteFeedBackDialog, setDeleteFeedBackDialog] = useState(false);
  const [expandedRows, setExpandedRows] = useState(null);
  const [dinamicFeedBack, setDinamicFeedBack] = useState([]);
  const [workflowName, setWorkflowName] = useState('');
  const [idWorkflow, setIdWorkflow] = useState('');
  const [taskDialog, setTaskDialog] = useState(false);
  const [modalFeedBack, setModalFeedBack] = useState(false);
  const [propertiesDialog, setPropertiesDialog] = useState(false);
  const [showOptionFeedBack, setShowOptionFeedBack] = useState(false);
  const [activeIndexFromPropTab, setActiveIndexFromPropTab] = useState(0);

  const [typeOptions, setTypeOptions] = useState(['text', 'number', 'email']);
  const [multipleOptions, setMultipleOptions] = useState([true, false]);
  const [fileTypes, setFileTypes] = useState([
    { name: 'Doc (.doc, .docx)', code: 'Doc (.doc, .docx)' },
    { name: 'Xls (.xls, .xlsx)', code: 'Xls (.xls, .xlsx)' },
    { name: 'Image (.png, .jpeg, .bmp)', code: 'Image (.png, .jpeg, .bmp)' },
    { name: 'Pdf', code: 'Pdf' },
    { name: 'Audio (.mp3, .wav)', code: 'Audio (.mp3, .wav)' },
    { name: 'Video (.mp4, .mov. .avi, .mpeg)', code: 'Video (.mp4, .mov. .avi, .mpeg)' },
  ]);
  let [toast, setToast] = useState(null);
  const [feedBackTypes, setFeedBackTypes] = useState([
    { label: 'Input', value: 1 },
    { label: 'TextArea', value: 2 },
    { label: 'Select', value: 3 },
    { label: 'Radio', value: 4 },
    { label: 'CheckBox', value: 5 },
    { label: 'InputFile', value: 6 },
  ]);
  const createdWorkFlow = useSelector((state) => state.worflows.newItem);
  const updateWorkFlow = useSelector((state) => state.worflows.updatedItem);

  useEffect(() => {
    if (!itemSelected) {
      dispatch(workflowTemplateActions.getById({ id }));
    } else {
      setSections(JSON.parse(itemSelected.template_jsonb));
      setWorkflowName(itemSelected.template_name);
      setIdWorkflow(itemSelected.id);
    }
  }, []);

  useEffect(() => {
    if(updateWorkFlow) {

      //setDataSelected(emptyData);
      toast.show({ severity: 'success', summary: 'Successful', detail: 'WorkFlow Updated', life: 3000 });
    }
  }, [updateWorkFlow]);


  useEffect(() => {
    if (createdWorkFlow) {
      setSections([]);
      setWorkflowName('');
      toast.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'WorkFlow Created',
        life: 3000,
      });
    }
  }, [createdWorkFlow]);

  const createId = () => {
    let id = '';
    let chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const onInputChange = (e, name, sectionP) => {
    const val = (e.target && e.target.value) || '';
    let data = { ...section };
    data[`${name}`] = val;
    setSection(data);
  };

  const onInputChangeFeedBack = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let feedBackT = { ...feedbackSelected };
    feedBackT.properties[`${name}`] = val;
    setFeedbackSelected(feedBackT);
  };

  const editInPlaceSection = (e, name, sectionP) => {
    const val = (e.target && e.target.value) || '';
    let sectionsT = [...sections];
    let sectionT = sections.find((val) => val.id === sectionP.id);
    sectionT[`${name}`] = val;

    const index = findIndexById(sectionP.id);
    sectionsT[index] = sectionT;
    setSections(sectionsT);
    setSection(sectionT);
  };

  const onInputChangeTask = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let data = { ...task };
    data[`${name}`] = val;
    data.currentTask[0][name] = val;
    setTask(data);
  };

  const onInputChangeProperty = (e, name) => {
    const valor = (e.target && e.target.value) || '';

    const taskT = { ...task };

    let sectionsT = [...sections];

    let feedBackT = {};

    taskT.currentTask[0].task_feedbacks = taskT.currentTask[0].task_feedbacks.map(
      (feed) => {
        if (feed.id === feedbackSelected.id) {
          let res = {};

          if (name === 'type') {
            res = { ...feed, [name]: valor };
            const tmpName = getInputNameByType(valor);
            res.name = `${res.position}-${tmpName}`;
            res.properties = {
              label: '',
              placeholder: '',
              min_length: '',
              max_length: '',
              type_property: '',
              options: [],
              is_multiple: null,
              input: [],
              allow: [],
            };
            res.dependsOn = {
              feedBackId: null,
              value: '',
            };
          } else if (name === 'value' || name === 'feedBackId') {
            res = { ...feed, dependsOn: { ...feed.dependsOn, [name]: valor } };
          } else {

            if(name === 'label'){
              feed.name =  getInputNameByType(feed.type) + ' - ' + valor;
            }
            res = {
              ...feed,
              properties: { ...feed.properties, [name]: valor },
            };
          }

          feedBackT = res;
          return res;
        }
        return feed;
      }
    );

    sectionsT.filter((element) => {
      element.tasks.map((t) => {
        if (t.id === taskT.id) {
          t = taskT;
          return false;
        }
      });
    });

    setFeedbackSelected(feedBackT);
    setTask(taskT);
    setSections(sectionsT);
  };

  const confirmDeleteSection = (sectionP) => {
    setSection(sectionP);
    setDeleteSectionDialog(true);
  };

  const confirmDeleteFeedBack = (feedBackParam) => {
    setFeedbackSelected(feedBackParam);
    setDeleteFeedBackDialog(true);
  };

  const deleteFeedBack = () => {
    let sectionsT = [...sections];

    sectionsT.filter((element) => {
      element.tasks.map((t) => {
        if (t.id === feedbackSelected.task_id) {
          t.currentTask[0].task_feedbacks = t.currentTask[0].task_feedbacks.filter(
            (el) => el.id !== feedbackSelected.id
          );
        }
      });
    });
    setSections(sectionsT);

    setDeleteFeedBackDialog(false);
    setFeedbackSelected(newFeedBackObject());
  };

  const confirmDeleteTask = (taskParam) => {
    let sectionsT = [...sections];

    sectionsT.filter((element) => {
      let find = element.tasks.find((t) => t.id === taskParam.task_id);
      if (find) {
        setTask(find);
        setSection(element);
        setDeleteTaskDialog(true);
        return false;
      }
    });

  };

  const deleteSection = () => {
    let sectionsT = sections.filter((val) => val.id !== section.id);
    setSections(sectionsT);
    setDeleteSectionDialog(false);
    setSection(emptyData);

    //this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  };

  const deleteTask = () => {
    let sectionsT = [...sections];
    let sectionT = { ...section };
    //let tasksT = sectionT.tasks;
    if (sectionT && sectionT.tasks && sectionT.tasks.length) {
      sectionT.tasks = sectionT.tasks.filter((item) => item.id !== task.id);
    }

    // sectionT.tasks = [...tasksT];

    const index = findIndexById(sectionT.id);
    sectionsT[index] = { ...sectionT };
    setSection(sectionT);
    setSections(sectionsT);
    setDeleteTaskDialog(false);
    setTask(newTaskObject());

    toast.show({ severity: 'success', summary: 'Successful', detail: 'Deleted successfully', life: 3000 });
  };

  const findIndexById = (id) => {
    let index = sections.findIndex((item) => item.id === id);
    return index;
  };

  const findTaskIndexById = (tasksList, id) => {
    let index = tasksList.findIndex((item) => item.id === id);
    return index;
  };

  const saveSection = () => {
    if (section.name.trim()) {
      let sectionsT = [...sections];
      let sectionT = { ...section };
      if (sectionT.id) {
        const index = findIndexById(sectionT.id);

        sectionsT[index] = sectionT;
        toast.show({ severity: 'success', summary: 'Successful', detail: 'Section Updated', life: 3000 });
      } else {
        sectionT.id = createId();
        sectionsT.push(sectionT);
        toast.show({ severity: 'success', summary: 'Successful', detail: 'Section Created', life: 3000 });
      }
      setSections(sectionsT);
      setSection(emptyData);
      setSectionDialog(false);
      setSubmitted(true);
    }
  };

  const saveTask = () => {
    if (task.name.trim()) {
      let sectionT = { ...section };
      let sectionsT = [...sections];

      let tasksT = [...sectionT.tasks]; //[...tasks];
      let taskT = { ...task };
      if (taskT.id) {
        const index = findTaskIndexById(tasksT, taskT.id);
        tasksT[index] = { ...taskT };
        toast.show({ severity: 'success', summary: 'Successful', detail: 'Task Updated', life: 3000 });
      } else {
        const idTemp = createId();
        taskT.id = idTemp;
        taskT.section_id = sectionT.id;
        task.position = tasksT.length + 1;
        taskT.currentTask[0].task_id = idTemp;
        tasksT.push(taskT);
        toast.show({ severity: 'success', summary: 'Successful', detail: 'Task Created', life: 3000 });
      }
      sectionT.tasks = [...tasksT];
      const index = findIndexById(sectionT.id);
      sectionsT[index] = { ...sectionT };
      setSection(sectionT);
      setSections(sectionsT);
      setTask(newTaskObject());
      setTaskDialog(false);
      setSubmitted(true);
    }
  };

  const saveProperties = () => {
    // if (task.name.trim()) {
    //     let sectionT = {...section};
    //     let sectionsT = [...sections];
    //
    //     let tasksT = [...sectionT.tasks]; //[...tasks];
    //     let taskT = {...task};
    //     if (taskT.id) {
    //         const index = findTaskIndexById(tasksT, taskT.id);
    //         tasksT[index] = {...taskT};
    //         //this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //     }
    //     else {
    //         taskT.id = createId();
    //         task.position = tasksT.length + 1;
    //         tasksT.push(taskT);
    //         // this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //     }
    //     sectionT.tasks = [...tasksT];
    //     const index = findIndexById(sectionT.id);
    //     sectionsT[index] = {...sectionT};
    //     setSection(sectionT);
    //     setSections(sectionsT);
    //     setTask(emptyTask);
    //     setTaskDialog(false);
    //     setSubmitted(true);
    // }
  };

  const openModalSection = () => {
    setSection(emptyData);
    setSubmitted(false);
    setSectionDialog(true);
  };

  const openModalTask = (sectionP) => {debugger;
    setSection(sectionP);
    setTask(newTaskObject());
    setSubmitted(false);
    setTaskDialog(true);
  };

  const openModalTaskWithId = (taskP) => {

    let sectionsT = [...sections];
    sectionsT.map((element) => {
      const found = element.tasks.find((t) => t.id === taskP.task_id);
      if (found) {
        setSection(element);
        setTask(found);
        setSubmitted(false);
        setTaskDialog(true);
      }
    });
  };

  const openModalOptionFeedBack = () => {
    //setSection(sectionP);
    let feedBackT = { ...feedbackSelected };
    feedBackT.properties.options = [
      ...feedBackT.properties.options,
      { id: createId(), name: 'clic to edit', value: 'clic to edit' },
    ];
    //setOptionPropertySelected(emptyOptionProperty);
    //setSubmitted(false);
    //setShowOptionFeedBack(true);
    setFeedbackSelected(feedBackT);
  };

  const openModalFeedBack = (taskT) => {
    setTask(taskT);
    setModalFeedBack(true);
  };

  const openModalProperties = (feedBackP) => {
    // setTask(taskT);
    //setFeedBack(feedBackP);
    let sectionsT = [...sections];
    let taskT = null;
    sectionsT.filter((element) => {
      const found = element.tasks.find((t) => t.id === feedBackP.task_id);
      if (found) {
        taskT = { ...found };
        return false;
      }
    });

    const TDinamic = [{ label: 'Nothing Selected', value: -1 }];
    taskT.currentTask[0].task_feedbacks.map((itm) => {
      TDinamic.push({
        label: itm.name + '-' + itm.properties.label,
        value: itm.id,
      });
    });
    setDinamicFeedBack(TDinamic);
    setTask(taskT);
    setFeedbackSelected(feedBackP);
    setPropertiesDialog(true);
  };

  const closeModalProperties = () => {
    // setTask(taskT);
    //setFeedBack(emptyFeedBack);
    setPropertiesDialog(false);
  };

  const onChangeOrderList = (event, sectionP) => {
    //event.originalEvent: Browser event
    // event.value: Reordered list
    let sectionsT = [...sections];
    const index = findIndexById(sectionP.id);
    sectionsT[index].tasks = event.value;
    setSections(sectionsT);
  };

  const onChangeFeedBackOrderList = (event, taskP) => {
    //event.originalEvent: Browser event
    // event.value: Reordered list
    event.value.map((item, index) => {
      const nameTmp = getInputNameByType(item.type);
      item.position = index + 1;
      item.name = `${index + 1}-${nameTmp}`;
    });
    let sectionsT = [...sections];
    sectionsT.filter((element) => {
      element.tasks.map((t) => {
        if (t.id === taskP.task_id) {
          t.currentTask[0].task_feedbacks = event.value;
        }
      });
    });
    setSections(sectionsT);
  };

  const sectionTemplate = (sectionP) => {
    return (
      <>
        <div className="section-item">
          <div className="section-item-content">
            <Toolbar
              left={leftTask(sectionP)}
              right={rightSectionDelete(sectionP)}
            />
            <div className="p-mb-3"></div>
            <div>
              <h4 className="p-mb-1">
                <Inplace closable>
                  <InplaceDisplay>
                    {sectionP.name || 'Click to Edit'}
                  </InplaceDisplay>
                  <InplaceContent>
                    <InputText
                      value={sectionP.name}
                      onChange={(e) => editInPlaceSection(e, 'name', sectionP)}
                      autoFocus
                    />
                  </InplaceContent>
                </Inplace>
              </h4>

              <div className="car-buttons p-mt-5">
                <div className="orderlist-demo">
                  <div className="card">
                    <OrderList
                      value={sectionP.tasks}
                      header="Tasks"
                      dragdrop
                      listStyle={{ height: '300px' }}
                      dataKey="id"
                      itemTemplate={taskTemplate}
                      onChange={(e) => onChangeOrderList(e, sectionP)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const onRowExpand = (event) => {
    //this.toast.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
  };

  const onRowCollapse = (event) => {
    //this.toast.show({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        {data.task_feedbacks.length ? (
          <OrderList
            value={data.task_feedbacks}
            header={'FeedBacks from ' + data.name}
            dragdrop
            listStyle={{ height: '400px' }}
            dataKey="id"
            itemTemplate={feedBackTemplate}
            onChange={(e) => onChangeFeedBackOrderList(e, data)}
          />
        ) : null}
      </div>
    );
  };

  const onEditorTaskValueChange = (productKey, props, value) => {debugger;
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    //updatedProducts.rowdata[props.field] = value;
    //this.setState({ [`${productKey}`]: updatedProducts });
debugger;
    let sectionsT = [...sections];
    sectionsT.filter((element) => {
      element.tasks.map((t) => {
        if (t.id === props.rowData.task_id) {
          //t.currentTask[0].name = value;
          debugger;
          t.currentTask= updatedProducts;
        }
      });
    });
    setSections(sectionsT);

  }

  const inputTextTaskEditor = (productKey, props, field) => {
    return <InputText type="text" value={props.rowData[field]} onChange={(e) => onEditorTaskValueChange(productKey, props, e.target.value)} />;
  }

  const nameTaskEditor = (productKey, props) => {
    return inputTextTaskEditor(productKey, props, 'name');
  }

  const taskTemplate = (item) => {
    return (
      <>
        <div className="task-item">
          <div className="card">
            {item.currentTask.length ? (
              <DataTable
                value={item.currentTask}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                onRowExpand={onRowExpand}
                onRowCollapse={onRowCollapse}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id">
                <Column expander style={{ width: '3em' }} />
                <Column field="name" header="Name" />
                <Column header="Options" body={optionsTaskTable} />
              </DataTable>
            ) : null}
          </div>
        </div>
      </>
    );
  };

  const feedBackTemplate = (item) => {
    return (
      <div className="feedback-template">
        <div className="feedback-item">
          {/*<i className="pi pi-bell" style={{ fontSize: '2em' }}></i>*/}
          {/*<span className="p-badge">2</span>*/}
          <div className="image-container">
            {/*<img src={`showcase/demo/images/product/${item.image}`} alt={item.name} />*/}
            <h5 className="p-mb-2">{item.name}</h5>
          </div>
          <div className="feedback-list-detail">
            {/*<h5 className="p-mb-2">{item.name}</h5>*/}
            {/*<i className="pi pi-tag task-category-icon"/>*/}
            {/*<span className="product-category">{item.name}</span>*/}
          </div>
          <div className="feedback-list-action">
            <div className="card">
              <Button
                icon="pi pi-times"
                className="p-button-danger"
                onClick={() => confirmDeleteFeedBack(item)}
              />
              <Button
                icon="pi pi-th-large"
                onClick={() => openModalProperties(item)}
                className="p-mr-2"
              />
              {/*<h6 className="p-mb-2">${item.name}</h6>*/}
              {/*<span className={`product-badge`}>{item.name}</span>*/}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const leftContents = (
    <>
      <span className="p-float-label">
        <InputText
          id="feedBackLabel"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
        />
        <label htmlFor="feedBackLabel">WorkFlow Name</label>
      </span>
      <Button
        onClick={() => openModalSection()}
        label="Section"
        icon="pi pi-plus"
        className="p-mr-2 p-button-success"
      />
    </>
  );

  const leftTask = (sectionP) => (
    <>
      <Button
        label="Task"
        icon="pi pi-plus"
        className="p-mr-2 p-button-success"
        onClick={() => openModalTask(sectionP)}
      />
    </>
  );

  const rightSectionDelete = (sectionP) => (
    <>
      <Button
        icon="pi pi-times"
        className="p-button-danger"
        onClick={() => confirmDeleteSection(sectionP)}
      />
    </>
  );

  const hideDeleteSectionDialog = () => {
    setDeleteSectionDialog(false);
  };

  const hideDeleteTaskDialog = () => {
    setDeleteTaskDialog(false);
  };

  const hideDeleteFeedBackDialog = () => {
    setDeleteFeedBackDialog(false);
  };

  const deleteSectionDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteSectionDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSection}
      />
    </>
  );

  const deleteTaskDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteTaskDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteTask}
      />
    </>
  );

  const deleteFeedBackDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteFeedBackDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteFeedBack}
      />
    </>
  );

  const getInputNameByType = (inputType) => {
    let inputName = '';
    switch (inputType) {
      case 1:
        inputName = 'Input';
        break;
      case 2:
        inputName = 'TextArea';
        break;
      case 3:
        inputName = 'Select';
        break;
      case 4:
        inputName = 'RadioButton';
        break;
      case 5:
        inputName = 'CheckBox';
        break;
      case 6:
        inputName = 'Input File';
        break;
    }
    return inputName;
  };

  const addFeedBack = (inputType, row) => {
    let sectionsT = [...sections];
    let taskT = null; //{...task};
    let feedBackT = newFeedBackObject();
    let sectionT = null; //{...section};
    sectionsT.map((element) => {
      const found = element.tasks.find((t) => t.id === row.task_id);
      if (found) {
        sectionT = { ...element };
        taskT = { ...found };
      }
    });
    const tmpName = getInputNameByType(inputType);
    const counter = taskT.currentTask[0].task_feedbacks.length + 1;
    feedBackT.id = createId();
    feedBackT.type = inputType;
    feedBackT.name = `${counter}-${tmpName}`;
    feedBackT.task_id = taskT.id;
    //feedBackT.properties.label=`${tmpName}${counter}`;
    feedBackT.position = counter;
    //taskT.task_feedbacks = [...taskT.task_feedbacks, feedBackT];
    taskT.currentTask[0].task_feedbacks = [
      ...taskT.currentTask[0].task_feedbacks,
      feedBackT,
    ];

    sectionT.tasks = sectionT.tasks.map((t) => (t.id === taskT.id ? taskT : t));
    const index = findIndexById(sectionT.id);
    sectionsT[index] = sectionT;
    setTask(taskT);
    setSections(sectionsT);
  };

  // const addFeedBack =(inputType, row)=>{
  //     debugger;
  //     let sectionsT = [...sections];
  //     let taskT = {...task};
  //     let feedBackT = {...emptyFeedBack};
  //     let sectionT = {...section};
  //     sectionsT.map(element => {
  //         let find = element.tasks.find(t => t.id === task.id);
  //         if(find){
  //             sectionT = {...element};
  //         }
  //     });
  //     feedBackT.id = createId();
  //     feedBackT.type = inputType;
  //     feedBackT.name= getInputNameByType(inputType);
  //     feedBackT.task_id = taskT.id;
  //     taskT.task_feedbacks = [...taskT.task_feedbacks, feedBackT];
  //
  //
  //     sectionT.tasks = sectionT.tasks.map(t => t.id === taskT.id ? taskT: t);
  //     const index = findIndexById(sectionT.id);
  //     sectionsT[index]= sectionT;
  //     setTask(taskT);
  //     setSections(sectionsT);
  //     setFeedbackSelected(emptyFeedBack);
  // }
  const removeOptionFromFeedBack = (item) => {
    let feedBackT = { ...feedbackSelected };

    feedBackT.properties.options = feedBackT.properties.options.filter(
      (op) => op.id !== item.id
    );

    setFeedbackSelected(feedBackT);
  };

  const onFeedBackDDChange = (e, rowData) => {
    addFeedBack(e.value, rowData);
  };
  const optionsTaskTable = (rowData) => {
    return (
      <>
        {/*<Dropdown className="p-mr-2" value={null} options={feedBackTypes} onChange={(e)=>onFeedBackDDChange(e,rowData)}  placeholder="Select a FeedBack" />*/}
        <Button
          label="Add FeedBack"
          icon="pi pi-check"
          className="p-button-text"
          onClick={() => addFeedBack(1, rowData)}
        />
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => openModalTaskWithId(rowData)} />

        <Button
          icon="pi pi-trash"
          className="p-button-warning"
          onClick={() => confirmDeleteTask(rowData)}
        />
      </>
    );
  };
  const optionsTable = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => removeOptionFromFeedBack(rowData)}
        />
      </>
    );
  };

  const hideDialogOptionFeedBack = () => {
    setSubmitted(false);
    setShowOptionFeedBack(false);
  };
  const dialogFooterOptionFeedBack = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialogOptionFeedBack}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => null}
      />
    </>
  );
  const onEditorValueChange = (productKey, props, value) => {
    let feedBackT = { ...feedbackSelected };
    //let updatedProducts = [...feedBack.properties.options];
    feedBackT.properties.options[props.rowIndex][props.field] = value;
    setFeedbackSelected(feedBackT);
    //this.setState({ [`${productKey}`]: updatedProducts });
  };
  const inputTextEditor = (productKey, props, field) => {
    return (
      <InputText
        type="text"
        value={props.rowData[field]}
        onChange={(e) => onEditorValueChange(productKey, props, e.target.value)}
      />
    );
  };
  const nameEditor = (productKey, props) => {
    return inputTextEditor(productKey, props, props.field);
  };
  const headerOptions = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Options</h5>
      <span className="p-input-icon-left">
        <Button
          icon="pi pi-plus"
          className="p-mr-2 p-button-success"
          onClick={() => openModalOptionFeedBack()}
        />
      </span>
    </div>
  );

  return (
    <div className="p-grid worflow_container">
      <div className="p-col-12">
        <div className="datatable-templating-demo">
          <h1>WorkFlow</h1>
          <Toast ref={(el) => (toast = el)} />
          <div className="carousel-demo">
            <div className="card">
              <Toolbar left={leftContents} />
              <Carousel
                value={sections}
                numVisible={3}
                numScroll={3}
                responsiveOptions={responsiveOptions}
                itemTemplate={sectionTemplate}
                header={<h5></h5>}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-col-12">
        <>
          <Button
            disabled={workflowName && sections.length ? false : true}
            label="Save WorkFlow"
            icon="pi pi-plus"
            className="p-button-success p-mr-2"
            onClick={() => idWorkflow ?
                dispatch(
                    workflowActions.update({
                      id: parseInt(idWorkflow),
                      template_name: workflowName,
                      template_jsonb: JSON.stringify(sections),
                      organization_id: 1,
                    })
                )
                :
              dispatch(
                workflowActions.create({
                  template_name: workflowName,
                  template_jsonb: JSON.stringify(sections),
                  organization_id: 1,
                })
              )
            }
          />

          <Button
            label="Cancel"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={() => null}
          />
        </>
      </div>

      <Sidebar
        style={{ width: '30em' }}
        className="ui-sidebar-md"
        visible={sectionDialog}
        position="right"
        baseZIndex={1000000}
        onHide={() => setSectionDialog(false)}
        icons={() => (
          <>
            <button className="p-sidebar-close p-link">
              <span className="p-sidebar-close-icon pi" />
            </button>
          </>
        )}>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <h3 style={{ fontWeight: 'normal' }}>ADD NEW SECTION</h3>
          </div>
          <div className="p-field p-col-12 p-md-12">
            <span className="p-float-label">
              <InputText
                id="sectionName"
                value={section.name}
                onChange={(e) => onInputChange(e, 'name')}
                required
                className={classNames({
                  'p-invalid': submitted && !section.name,
                })}
              />
              {submitted && !section.name && (
                <small className="p-invalid">Name is required.</small>
              )}
              <label htmlFor="sectionName">Name</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-md-6">
            <Button
              type="button"
              onClick={() => saveSection()}
              label="Save"
              className="p-button-success"
              style={{ marginRight: '.25em' }}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <Button
              type="button"
              onClick={() => setSectionDialog(false)}
              label="Cancel"
              className="p-button-secondary"
            />
          </div>
        </div>
      </Sidebar>

      <Sidebar
        style={{ width: '30em' }}
        className="ui-sidebar-md"
        position="right"
        visible={taskDialog}
        baseZIndex={1000000}
        onHide={() => setTaskDialog(false)}
        icons={() => (
          <>
            <button className="p-sidebar-close p-link">
              <span className="p-sidebar-close-icon pi " />
            </button>
          </>
        )}>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <h3 style={{ fontWeight: 'normal' }}>ADD NEW TASK</h3>
          </div>
          <div className="p-field p-col-12 p-md-12">
            <span className="p-float-label">
              <InputText
                id="taskName"
                value={task.name}
                onChange={(e) => onInputChangeTask(e, 'name')}
                required
                autoFocus
                className={classNames({ 'p-invalid': submitted && !task.name })}
              />
              {submitted && !task.name && (
                <small className="p-invalid">Name is required.</small>
              )}
              <label htmlFor="taskName">Name</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-md-12">
            <span>
              <label>Is Mandatory</label>
              <ToggleButton
                checked={task?.is_mandatory}
                onChange={(e) => onInputChangeTask(e, 'is_mandatory')}
                onIcon="pi pi-check"
                offIcon="pi pi-times"
              />
            </span>
          </div>
          <div className="p-field p-col-12 p-md-6">
            <Button
              type="button"
              onClick={() => saveTask()}
              label="Save"
              className="p-button-success"
              style={{ marginRight: '.25em' }}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <Button
              type="button"
              onClick={() => setTaskDialog(false)}
              label="Cancel"
              className="p-button-secondary"
            />
          </div>
        </div>
      </Sidebar>

      <Dialog
        visible={deleteSectionDialog}
        style={{ width: '450px' }}
        header="Confirm Delete Section?"
        modal
        footer={deleteSectionDialogFooter}
        onHide={hideDeleteSectionDialog}>
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: '2rem' }}
          />
          {section && (
            <span>
              Are you sure you want to delete <b>{section.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteTaskDialog}
        style={{ width: '450px' }}
        header="Confirm Delete Task?"
        modal
        footer={deleteTaskDialogFooter}
        onHide={hideDeleteTaskDialog}>
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: '2rem' }}
          />
          {section && (
            <span>
              Are you sure you want to delete <b>{task.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteFeedBackDialog}
        style={{ width: '450px' }}
        header="Confirm Delete Feedback?"
        modal
        footer={deleteFeedBackDialogFooter}
        onHide={hideDeleteFeedBackDialog}>
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: '2rem' }}
          />
          {section && (
            <span>
              Are you sure you want to delete <b>{feedbackSelected.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Sidebar
        style={{ width: '30em' }}
        className="ui-sidebar-md"
        visible={propertiesDialog}
        position="right"
        baseZIndex={1000000}
        onHide={() => setPropertiesDialog(false)}
        icons={() => (
          <>
            <button className="p-sidebar-close p-link">
              <span className="p-sidebar-close-icon pi" />
            </button>
          </>
        )}>
        <div className="p-fluid p-formgrid p-grid">
          <TabView
            activeIndex={activeIndexFromPropTab}
            onTabChange={(e) => setActiveIndexFromPropTab(e.index)}>
            <TabPanel header="Properties">
              <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-12">
                  <span className="p-float-label">
                    <Dropdown
                      id="feedBackTypeProperty"
                      optionValue="value"
                      value={feedbackSelected?.type}
                      options={feedBackTypes}
                      onChange={(e) => onInputChangeProperty(e, 'type')}
                    />
                    <label htmlFor="feedBackTypeProperty">FeedBack Type</label>
                  </span>
                </div>
                <div className="p-field p-col-12 p-md-12">
                  <span className="p-float-label">
                    <InputText
                      id="feedBackLabel"
                      value={feedbackSelected?.properties?.label}
                      onChange={(e) => onInputChangeProperty(e, 'label')}
                      required
                    />
                    <label htmlFor="feedBackLabel">Label</label>
                  </span>
                </div>
                {feedbackSelected.type === 1 || feedbackSelected.type === 2 ? (
                  <div className="p-field p-col-12 p-md-12">
                    <span className="p-float-label">
                      <InputText
                        id="feedBackMinLength"
                        value={feedbackSelected.properties.min_length}
                        onChange={(e) => onInputChangeProperty(e, 'min_length')}
                      />
                      <label htmlFor="feedBackMinLength">Min Length</label>
                    </span>
                  </div>
                ) : null}
                {feedbackSelected.type === 1 || feedbackSelected.type === 2 ? (
                  <div className="p-field p-col-12 p-md-12">
                    <span className="p-float-label">
                      <InputText
                        id="feedBackMaxLength"
                        value={feedbackSelected.properties.max_length}
                        onChange={(e) => onInputChangeProperty(e, 'max_length')}
                      />
                      <label htmlFor="feedBackMaxLength">Max Length</label>
                    </span>
                  </div>
                ) : null}

                <div className="p-field p-col-12 p-md-12">
                  <span className="p-float-label">
                    <InputText
                      id="feedBackPlaceholder"
                      value={feedbackSelected?.properties?.placeholder}
                      onChange={(e) => onInputChangeProperty(e, 'placeholder')}
                      required
                    />
                    <label htmlFor="feedBackPlaceholder">Placeholder</label>
                  </span>
                </div>
                {feedbackSelected.type === 1 ? (
                  <div className="p-field p-col-12 p-md-12">
                    <span>
                      <label>Type</label>
                      <SelectButton
                        value={feedbackSelected?.properties?.type_property}
                        options={typeOptions}
                        onChange={(e) =>
                          onInputChangeProperty(e, 'type_property')
                        }
                      />
                    </span>
                  </div>
                ) : null}
                {feedbackSelected.type === 3 || feedbackSelected.type === 6 ? (
                  <div className="p-field p-col-12 p-md-12">
                    <span>
                      <label>Is Multiple</label>
                      <ToggleButton
                        checked={feedbackSelected?.properties?.is_multiple}
                        onChange={(e) =>
                          onInputChangeProperty(e, 'is_multiple')
                        }
                        onIcon="pi pi-check"
                        offIcon="pi pi-times"
                      />
                    </span>
                  </div>
                ) : null}
                {feedbackSelected.type === 3 ||
                feedbackSelected.type === 4 ||
                feedbackSelected.type === 5 ? (
                  <div className="p-field p-col-12 p-md-12">
                    <DataTable
                      header={headerOptions}
                      editMode="cell"
                      id="tbOptionProperties"
                      value={feedbackSelected?.properties?.options}
                      className="editable-cells-table">
                      <Column
                        field="name"
                        header="Name"
                        editor={(props) => nameEditor('options', props)}
                      />
                      <Column
                        field="value"
                        header="Value"
                        editor={(props) => nameEditor('options', props)}
                      />
                      <Column header="Options" body={optionsTable} />
                    </DataTable>
                  </div>
                ) : null}
                {feedbackSelected.type === 6 ? (
                  <div className="p-field p-col-12 p-md-12">
                    <span>
                      <label>Allow</label>
                      <div className="card">
                        <MultiSelect
                          value={feedbackSelected?.properties?.allow}
                          options={fileTypes}
                          onChange={(e) => {
                            onInputChangeFeedBack(e, 'allow');
                          }}
                          optionLabel="name"
                          placeholder="Select a Type"
                        />
                      </div>
                    </span>
                  </div>
                ) : null}
              </div>
            </TabPanel>
            <TabPanel header="Depends On">
              <div className="p-fluid p-formgrid p-grid">
                {feedbackSelected.position > 0 ? (
                  <div className="p-field p-col-6 p-md-6">
                    <span className="p-float-label">
                      <Dropdown
                        id="feedBackTypeProperty"
                        optionValue="value"
                        value={feedbackSelected?.dependsOn?.feedBackId}
                        options={dinamicFeedBack.filter(
                          (itm) => itm.value !== feedbackSelected.id
                        )}
                        onChange={(e) => onInputChangeProperty(e, 'feedBackId')}
                      />
                      <label htmlFor="feedBackTypeProperty">Depends On</label>
                    </span>
                  </div>
                ) : null}
                {feedbackSelected.position > 0 ? (
                  <div className="p-field p-col-6 p-md-6">
                    <span className="p-float-label">
                      <InputText
                        id="feedBackValue"
                        value={feedbackSelected?.dependsOn?.value}
                        onChange={(e) => onInputChangeProperty(e, 'value')}
                      />
                      <label htmlFor="feedBackValue">Value</label>
                    </span>
                  </div>
                ) : null}
              </div>
            </TabPanel>
          </TabView>
        </div>
      </Sidebar>
    </div>
  );
}
export { WorkFlow };
