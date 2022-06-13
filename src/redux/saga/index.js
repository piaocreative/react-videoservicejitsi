import {all} from 'redux-saga/effects';
import user from './user';
import conference from './conference';

export default function* rootSaga()
{
    yield all([
        user(),
        conference()
    ])
}