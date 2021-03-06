import { call, put, select } from 'redux-saga/effects'
import { request } from '../Api'
import {
    authentication,
    clearAllInputs,
    clearInput,
    clearPasswordInput,
    setMessage,
    setOnWarning,
} from '../authenticationLogic/authActionCreators'
import { LOGIN } from '../authenticationLogic/authTypes'

// worker Saga: будет запускаться на экшены типа `USER_FETCH_REQUESTED`
export function* registration(action) {
    try {
        // call первым аргументом принимает функцию, а остальные будут складываться в параметры вызываемой функции по соответствию
        const response = yield call(
            request,
            '/api/auth/registration',
            'POST',
            action.body
        )

        if (response.ok) {
            const auth = yield select(state => state.authReducer)
            const body = {
                nickName: auth.formInputs.nickName,
                password: auth.formInputs.password,
            }
            yield put({ type: LOGIN, body })
            yield put(clearAllInputs())
            if (response.message) yield put(setMessage(response.message))
        } else {
            if (response.fault) {
                for (let i = 0; i < response.fault.length; i++) {
                    yield put(setOnWarning(response.fault[i].param))
                }
            } else {
                if (response.message) yield put(setMessage(response.message))
            }
        }
    } catch (e) {
        throw e
    }
}

export function* login(action) {
    try {
        const response = yield call(
            request,
            '/api/auth/login',
            'POST',
            action.body
        )

        if (response.ok) {
            yield put(authentication(response.token, response.nickName))
            yield put(clearAllInputs())
        } else {
            if (response.incorrectField === 'password')
                yield put(clearPasswordInput())
            else yield put(clearInput('nickName'))
        }
        yield put(setMessage(response.message))
    } catch (e) {
        throw e
    }
}
