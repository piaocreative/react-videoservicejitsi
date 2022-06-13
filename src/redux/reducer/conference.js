import * as constant from '../constant';

const initialdata = [

]

export default function conference(state = initialdata,action)
{
    switch(action.type)
    {
        case constant.GET_CONF:
            return action.conference;
        default:
            return state;
    }
}