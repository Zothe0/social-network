import { call, put, select } from 'redux-saga/effects'
import {request} from '../Api'
import { authentication, clearInputs, clearPasswordInput, setMessage, setOnWarning } from '../authenticationLogic/authActionCreators'
import { LOGIN } from '../authenticationLogic/authTypes'


// worker Saga: будет запускаться на экшены типа `USER_FETCH_REQUESTED`
export function* registration(action) {
    try {
        // call первым аргументом принимает функцию, а остальные будут складываться в парамтры вызываемой функции по соответсвию
       const response = yield call(request, '/api/auth/registration', 'POST', action.body)
       
       if(response.ok){
            const auth = yield select(state => state.authReducer)
            const body={
                mix: auth.formInputs.nickName,
                password: auth.formInputs.password
            }
            yield put({ type: LOGIN, body })
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

export function* login(action){
     try {
        const response = yield call(request, '/api/auth/login', 'POST', action.body)

        if(response.ok){
            yield put(authentication(response.token, response.nickName))
            yield put(clearInputs())
        }else{
            if(response.incorrectFiled === 'password') yield put(clearPasswordInput())
            else yield put(clearInputs())
        }
        yield put(setMessage(response.message))
     } catch (e) {
       throw e
     }
 }