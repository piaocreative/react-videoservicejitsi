import {takeEvery,fork,all,call,put} from 'redux-saga/effects';
import * as Api from '../../api/Apiservice';
import * as constant from '../constant';


export function* auth()
{
    yield takeEvery(constant.AUTH_USER,function*(payload){
        try
        {
            const response = yield call(Api.login,payload.user);
            if(response.data.success)
            {
                yield put({type:constant.AUTH_SUCCESS,userinfo:response.data.userinfo});
                window.localStorage.setItem('userinfo',JSON.stringify(response.data.userinfo));
                payload.success();
            }
            else
            {
                payload.error(response.data.message);
            }   
        }
        catch(error)
        {
            payload.error(error.message);
        }
    })
}

export function* register()
{
    yield takeEvery(constant.USER_REGISTER,function*(payload){
        try
        {
            let user = payload.user;
            const response = yield call(Api.register,user);

            if(response.data.success)
            {
                payload.success();
            }
            else
            {
                payload.error(response.data.message);
            }
        }
        catch(e)
        {
            payload.error(e.message);
        }
    })
}

export function* init_auth()
{
    let userinfo = window.localStorage.getItem('userinfo');
    if(userinfo)
    {
        userinfo = JSON.parse(userinfo);
        yield put({type:constant.AUTH_SUCCESS,userinfo:userinfo});
    }
}

export function* logout()
{
    yield takeEvery(constant.LOGOUT,function*(payload){
        window.localStorage.removeItem('userinfo');
        payload.next();
    })
}

export function* updateprofile()
{
    yield takeEvery(constant.UPDATE_PROFILE,function*(payload){
        let userinfo = payload.userinfo;
        const response = yield call(Api.updateprofile,userinfo);
        if(response.data.success)
        {
            let userinfo = response.data.userinfo;
            window.localStorage.setItem('userinfo',JSON.stringify(userinfo));
            yield put({type:constant.AUTH_SUCCESS,userinfo:userinfo});
            payload.next();
        }
        else
        {
            payload.error(response.data.message);
        }
    })
}

export default function* rootSaga()
{
    yield all(
        [
            fork(auth),
            fork(register),
            fork(init_auth),
            fork(logout),
            fork(updateprofile)
        ]
    )
}