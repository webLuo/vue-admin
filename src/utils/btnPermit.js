import store from '../store/index';

export function btnPermit(permission) {
  const btnData = store.getters["asyncRouter/btnPermit"];
  return btnData.indexOf(permission) != -1
}