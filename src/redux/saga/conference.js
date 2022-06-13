import {takeEvery,fork,all,call,put} from 'redux-saga/effects';
import  * as Api from '../../api/Apiservice';
import * as constant from '../constant';

export function* createconference()
{
    yield takeEvery(constant.CREATE_CONF,function*(payload){
        try
        {
            let response = yield call(Api.createconference,payload.conference);
            if(response.data.success)
            {
                payload.next();
            }
        }
        catch(e)
        {
        }
    })
}

export function* getconference()
{
    yield takeEvery(constant.AUTH_SUCCESS,function*(payload){
        try
        {
            let response = yield call(Api.getconference,payload.userinfo.id);
            if(response.data.success)
            {
                yield put({type:constant.GET_CONF,conference:response.data.data});
            }
        }
        catch(e)
        {

        }
    })
}

export function* getmeeting()
{
    yield takeEvery(constant.AUTH_SUCCESS,function*(payload){
        try
        {
            let response = yield call(Api.getmeeting,payload.userinfo.id);
            if(response.data.success)
            {
                console.log(response.data);
                yield put({type:constant.GET_MEETING,meeting:response.data.data});
            }
        }
        catch(e)
        {

        }
    })
}


export default function* rootSaga()
{
    yield all(
        [
            fork(createconference),
            fork(getconference),
            fork(getmeeting)
        ]
    )
}