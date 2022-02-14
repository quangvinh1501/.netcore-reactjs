export function getMenu() {
    return {
        type: 'GET_MENU_REQUESTED'
    }
}
export function getMenuSuccess(menus) {
    return {
        type: "GET_MENU_SUCCEEDED",
        menus
    }
};
export function getMenuFail() {
    return {
        type: "GET_MENU_FAILED"
    }
};
export function createMenu(_data) {
  return {
      type: 'CREATE_MENU_REQUESTED',
      _data
  }
}
export function createMenuSuccess (menus){
    return {
      type: "CREATE_MENU_SUCCEEDED",
      menus
    }
  }
  export function createMenuFail() {
    return {
        type: "CREATE_MENU_FAILED"
    }
};
  export function updateMenu(_data) {
    return {
        type: 'UPDATE_MENU_REQUESTED',
        _data
    }
}
export function updateMenuSuccess (menus){
    return {
      type: "UPDATE_MENU_SUCCEEDED",
      menus
    }
  }
  export function updateMenuFail() {
    return {
        type: "UPDATE_MENU_FAILED"
    }
};
  export function deleteMenu(id) {
    return {
        type: 'DELETE_MENU_REQUESTED',
        id
    }
}
  export function deleteMenuSuccess (menus){
    return {
      type: "DELETE_MENU_SUCCEEDED",
      menus
    }
  }
  export function deleteMenuFail() {
    return {
        type: "DELETE_MENU_FAILED"
    }
};