import { call, put, select, takeEvery } from 'redux-saga/effects'
import * as authTypes from './authenticationLogic/authTypes'
import * as postsTypes from './postsLogic/postsTypes'
import {request} from './Api'
import { authentication, clearInputs, clearPasswordInput, logout, setMessage, setOnWarning } from './authenticationLogic/authActionCreators'


export default function* Saga() {
    yield takeEvery(authTypes.SEND_FORM, fetchForm)
    yield takeEvery(authTypes.LOGIN, login)
    yield takeEvery(postsTypes.PUBLISH_POST, publishPost)
    yield takeEvery(postsTypes.UPLOAD_POSTS, fetchPosts)
}

// worker Saga: будет запускаться на экшены типа `USER_FETCH_REQUESTED`
function* fetchForm(action) {
    try {
        // call первым аргументом принимает функцию, а остальные будут складываться в парамтры вызываемой функции по соответсвию
       const response = yield call(request, '/api/auth/registration', 'POST', action.body)

       if(response.ok){
            const app = yield select(state => state.authReducer)
            const body={
                mix: app.formInputs.nickName,
                password: app.formInputs.password
            }
            yield put({ type: authTypes.LOGIN, body })
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
            yield put(authentication(response.token, response.userNick))
            yield put(clearInputs())
        }else{
            yield put(clearPasswordInput())
        }
        yield put(setMessage(response.message))
     } catch (e) {
       throw e
     }
 }

 function* publishPost(){
     try {
        const posts = yield select(state => state.postsReducer)
        const app = yield select(state => state.authReducer)
        const date = new Date()
        const body = {
            token: app.token,
            text: posts.postField,
            date: date.toLocaleDateString(),
            author: app.userNick
        }
        const response = yield call(request, '/api/posts/create', 'POST', body)
        if(response.ok){

        }else{
            if(response.tokenDied){
                yield put(logout())
                yield put(setMessage('Время сессии закончилось'))
            }
        }
        // yield put(clearPostField())
     } catch (e) {
         throw e
     }
 }

 function* fetchPosts(){
    try {
        // const response = yield call(request, 'api/posts/upload')
        const response = yield call(request, 'api/posts/upload')
        console.log(response)
    } catch (error) {
        console.log(error.name)
        throw error
    }
 }