import { Dispatch } from 'redux';
import {AppActionType, changeAppErrorValue} from '../features/app-reducer';

export const handlerForAppErrorInThen = (dispatch: Dispatch<AppActionType>, messages: string[]) => {
    dispatch(changeAppErrorValue(messages.length ? messages[0] : "Some error is occurred"))
}