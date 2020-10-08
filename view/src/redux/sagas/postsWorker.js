import { call, put, select } from 'redux-saga/effects'
import {request} from '../Api'
import { setLoadingFalse, setLoadingTrue, updatePostList, clearPostList } from '../postsLogic/postsActionCreators'


export function* publishPost(){
    try {
       const posts = yield select(state => state.postsReducer)
       const auth = yield select(state => state.authReducer)
       const date = Date.now()
       let body = {
           text: posts.postField,
           date: date,
           avatarUrl: auth.avatarUrl,
           author: auth.nickName
       }
       const response = yield call(request, '/api/posts/create', 'POST', body)
       if(response.ok){
           body = {
               loadedPostsQuantity: 0
           }
           const update = yield call(request, '/api/posts/upload', 'POST', body)
           yield put(clearPostList())
           yield put(updatePostList(update))
       }else{}
    } catch (e) {
        throw e
    }
}

export function* uploadPosts(){
   yield put(setLoadingTrue())
   try {
       const posts = yield select(state => state.postsReducer)
       const body = {
           loadedPostsQuantity: posts.uploadedPosts.length
       }
       const response = yield call(request, '/api/posts/upload', 'POST', body)
       yield put(updatePostList(response))
       yield put(setLoadingFalse())
   } catch (error) {
       console.log(error.name)
       yield put(setLoadingFalse())
       throw error
   }
}