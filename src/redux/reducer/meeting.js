import * as constant from '../constant';

const initialdata = [

]

export default function meeting(state = initialdata,action)
{
    switch(action.type)
    {
        case constant.GET_MEETING:
            console.log('meeting',action.meeting);
            return action.meeting;
        default:
            return state;
    }
}