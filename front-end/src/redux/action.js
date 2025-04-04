export const loginSuccess = (data) => {
    return {
        type: "LOGIN_SUCCESS",
        data: data,
    }
}

export const logoutSuccess = () => {
    return{
        type: "LOGOUT",
    }
}

export const accountAction = (state = null, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return action.data;
        case "LOGOUT":
            return null;
        default:
            return state;
    }
}

export const openBackDrop = () => {
    return {
      type: 'OPENBACKDROP',
    }
  }
  
  export const closeBackDrop = () => {
    return {
      type: 'CLOSEBACKDROP',
    }
  }
  
  export const backdropAction = (state = false, action) => {
    switch (action.type) {
      case "OPENBACKDROP":
        return true;
        case "CLOSEBACKDROP":
          return false;
      default:
        return state;
    }
  }

  export const dialogOpen = (slug) => {
    return{
      type: "OPENDIALOG",
      data: slug,
    }
  }
  
  export const dialogClose = () => {
    return{
      type: "CLOSEDIALOG",
      data: null,
    }
  }
  
  const dialogState = {
    status: false,
    data: null,
  }
  
  export const dialogAction = (state = dialogState, action) => {
    switch (action.type) {
      case "OPENDIALOG":
        return {status: true, data: action.data};
      case "CLOSEDIALOG":
        return {status: false, data: null};
      default:
        return state;
    }
  }
  
  export const dialogClassOpen = (slug) => {
    return{
      type: "OPENCLASSDIALOG",
      data: slug,
    }
  }
  
  export const dialogClassClose = () => {
    return{
      type: "CLOSECLASSDIALOG",
      data: null,
    }
  }
  
  const dialogClassState = {
    status: false,
    data: null,
  }
  
  export const dialogClassAction = (state = dialogClassState, action) => {
    switch (action.type) {
      case "OPENCLASSDIALOG":
        return {status: true, data: action.data};
      case "CLOSECLASSDIALOG":
        return {status: false, data: null};
      default:
        return state;
    }
  }