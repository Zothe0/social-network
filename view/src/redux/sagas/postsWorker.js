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

export function* uploadPosts(action){
   yield put(setLoadingTrue())
   try {
       const posts = yield select(state => state.postsReducer)
       const nickName = yield select(state => state.authReducer.nickName)
       const body = {nickName, loadedPostsQuantity: posts.uploadedPosts.length}
       if(action.render) {
            body.loadedPostsQuantity = 0
            const update = yield call(request, '/api/posts/upload', 'POST', body)
            yield put(clearPostList())
            yield put(updatePostList(update))
        }else{
            const response = yield call(request, '/api/posts/upload', 'POST', body)
            yield put(updatePostList(response))
        }
       console.log(body.loadedPostsQuantity)
       yield put(setLoadingFalse())
   } catch (error) {
       console.log(error.name)
       yield put(setLoadingFalse())
       throw error
   }
}

export function* likeChanging(action){
    const body = {
        postId: action.postId,
        newLikes: action.newLikes
    }
    const response = yield call(request, '/api/posts/like', 'PATCH', body)
    if(response.ok){

    }
}