require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

//http://uat.siamsmile.co.th:9188/swagger/index.html
//https://json-to-js.com/
// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  // ADD_PLAYER: '[Add player] Action',
  SET_CURRENTPAGE: '[SET_CURRENTPAGE] Action',
  UPDATE_CURRENT_PRODUCT: '[UPDATE_CURRENT_PRODUCT] Action',
  RESET_EMPLOYEE: '[RESET_PRODUCT] Action'
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  currentPage: 0,
  currentProductToAdd: {
    name: 0,
    price: '',
    productGroupId:'',
    stockCount: '',
    isActive: true
  },
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENTPAGE: {
      return {...state, currentPage: action.payload};
    }

    case actionTypes.UPDATE_CURRENT_PRODUCT: {
      return {...state, currentProductToAdd: action.payload};
    }
    
    case actionTypes.RESET_EMPLOYEE: {
      return {...state, currentProductToAdd: initialState.currentProductToAdd, currentPage: 0};
    }

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  setCurrentPage: (payload) => ({ type: actionTypes.SET_CURRENTPAGE, payload }),
  updateCurrentProduct: (payload) => ({ type: actionTypes.UPDATE_CURRENT_PRODUCT, payload }),
  resetCurrentProduct: () => ({ type: actionTypes.RESET_PRODUCT }),
};
