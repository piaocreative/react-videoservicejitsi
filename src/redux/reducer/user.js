import * as constant from '../constant';

const initialstate = {
    userinfo:{},
    loggedin:false
}


export default function auth(state = initialstate,action)
{
    switch(action.type)
    {
        case constant.AUTH_SUCCESS:
            return {...state,userinfo:action.userinfo,loggedin:true};
        case constant.LOGOUT:
            return {userinfo:{},loggedin:false};
        default:
            return state;
    }
}