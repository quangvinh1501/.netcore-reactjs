const menus = (state = [], action) => {
  switch (action.type) {
    case 'GET_MENU_SUCCEEDED':
      return action.menus;
      case 'CREATE_MENU_SUCCEEDED':
      return [
        ...state,
        {
          menus: action.menus,
          completed: false
        }
      ]
    case 'UPDATE_MENU_SUCCEEDED':
      return [
        ...state,
        {
          menus: action.menus,
          completed: false
        }
      ]
    case 'DELETE_MENU_SUCCEEDED':
      return [
        ...state,
        {
          menus: action.menus,
          completed: false
        }
      ]
    default:
      return state
  }
}

export default menus;