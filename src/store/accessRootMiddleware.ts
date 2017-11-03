import { Store } from 'redux'

export default (store: Store<any>) => (next: any) => (action: any) => {
  next({ ...action, getState: store.getState })
}
