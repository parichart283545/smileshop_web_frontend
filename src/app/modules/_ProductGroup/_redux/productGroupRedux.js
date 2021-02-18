require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

//http://uat.siamsmile.co.th:9188/swagger/index.html
//https://json-to-js.com/
// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  // ADD_PLAYER: '[Add player] Action',
  SET_CURRENTPAGE: '[SET_CURRENTPAGE] Action',
  UPDATE_CURRENT_PRODUCTGROUP: '[UPDATE_CURRENT_PRODUCTGROUP] Action',
  RESET_PRODUCTGROUP: '[RESET_PRODUCTGROUP] Action'
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  currentPage: 0,
  currentProductGroupToAdd: {
    id: 0,
    name: '',
    createBy:'',
    CreateDate: dayjs(),
    isActive: true,
    product: []
  },
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENTPAGE: {
      return {...state, currentPage: action.payload};
    }

    case actionTypes.UPDATE_CURRENT_PRODUCTGROUP: {
      return {...state, currentProductGroupToAdd: action.payload};
    }
    
    case actionTypes.RESET_PRODUCTGROUP: {
      return {...state, currentProductGroupToAdd: initialState.currentProductGroupToAdd, currentPage: 0};
    }

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  setCurrentPage: (payload) => ({ type: actionTypes.SET_CURRENTPAGE, payload }),
  updateCurrentProductGroup: (payload) => ({ type: actionTypes.UPDATE_CURRENT_PRODUCTGROUP, payload }),
  resetCurrentProductGroup: () => ({ type: actionTypes.RESET_PRODUCTGROUP }),
};
