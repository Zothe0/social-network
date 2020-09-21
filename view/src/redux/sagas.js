import { call, put, takeEvery } from 'redux-saga/effects'
import * as types from './authenticationLogic/authTypes'
import {request} from './Api'
import { clearInputs, setMessage, setOnWarning } from './authenticationLogic/authActionCreators'


export default function* Saga() {
  yield takeEvery(types.SEND_FORM, fetchForm)
  yield takeEvery(types.LOGIN, login)
}

// worker Saga: будет запускаться на экшены типа `USER_FETCH_REQUESTED`
function* fetchForm(action) {
    try {
        // call первым аргументом принимает функцию, а остальные будут складываться в парамтры вызываемой функции по соответсвию
       const response = yield call(request, '/api/auth/registration', 'POST', action.body)

       if(response.ok){
            yield put(clearInputs())
            yield put(setMessage(response.message))
        }else{
            if(response.fault){
                for(let i = 0; i < response.fault.length; i++){
                    yield put(setOnWarning(response.fault[i].param))
                }
            }else{
                yield put(setMessage(response.message))
            }
        }
    } catch (e) {
       throw e
    }
 }

 function* login(action){
     try {
        const response = yield call(request, '/api/auth/login', 'POST', action.body)

        if(response.ok){

        }else{
        }
        yield put(clearInputs())
        yield put(setMessage(response.message))
     } catch (e) {
       throw e
     }
 }