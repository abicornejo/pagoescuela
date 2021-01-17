export const systemConstants = {

    EmptyFeedBack: {
        id: null,
        json_id: null,
        task_id: null,
        type: null,
        name: '',
        position:0,
        properties:{
            label:'',
            placeholder:'',
            min_length:'',
            max_length:'',
            type:'',
            options:[],
            is_multiple:null,
            input:[],
            allow:[]
        }
    },
    EmptyTask : {
        id: null,
        section_id:null,
        json_id: null,
        name: '',
        currentTask:[{task_id: '', name:'', task_feedbacks:[]}],
        position:0,
        task_properties: {
            task_name:'',
            is_mandatory:'',
            start_date:'',
            end_date:'',
            due_date:''
        },
        task_feedbacks :[]
    }
};
