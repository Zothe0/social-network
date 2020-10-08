import { takeLeading } from 'redux-saga/effects'
import * as authTypes from '../authenticationLogic/authTypes'
import * as postsTypes from '../postsLogic/postsTypes'
import * as profileTypes from '../profileLogic/profileTypes'
import { login, registration } from './authWorker'
import { likeChanging, publishPost, uploadPosts } from './postsWorker'
import { sendAvatarImage, uploadCurrentProfileAvatarUrl } from './profileWorker'

// Saga watcher
export default function* Saga() {
    yield takeLeading(authTypes.REGISTRATION, registration)
    yield takeLeading(authTypes.LOGIN, login)
    yield takeLeading(postsTypes.PUBLISH_POST, publishPost)
    yield takeLeading(postsTypes.UPLOAD_POSTS, uploadPosts)
    yield takeLeading(profileTypes.SEND_AVATAR_IMAGE, sendAvatarImage)
    yield takeLeading(profileTypes.UPLOAD_CURRENT_PROFILE_AVATAR_URL, uploadCurrentProfileAvatarUrl)
    yield takeLeading(postsTypes.LIKE_CHANGING, likeChanging)
}