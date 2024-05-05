import { PURGE } from "redux-persist";


var initialState =
{
  auth: localStorage.getItem('token'),
  address: localStorage.getItem('token'),
  isLoader: { message: 'Please Wait...', status: false },

  allAddresses: [],
  isAllowlistModal: false,

  allAddressesSignups: [],
  isAddAllowlistModal: false,
  isEditAllowlistModal: false,
  isDeleteAllowlistModal: false,

  TokenABI: {}, TokenAddress: '',
  CrowdSaleABI: {}, CrowdSaleAddress: '',
};

const Auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURGE: return initialState;

    /*========== ADMIN REDUCERS ============= */

    case 'LOGIN':
      localStorage.setItem('token', payload);
      return {
        ...state,
        address: payload,
        auth: payload,
      };

    case 'IS_LOGIN_DISABLED':
      return {
        ...state,
      };

    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        address: '',
        auth: '',
      };

    case 'SET_ADDRESS':
      return {
        ...state,
        address: payload
      };

    case 'SET_BALANCE':
      return {
        ...state,
        balance: payload
      };

    /*========== LOADER REDUCERS ============= */

    case 'SET_LOADER':
      return {
        ...state,
        isLoader: payload
      };

    /*========== SMART CONTRACT REDUCERS ============= */

    case 'SET_SMART_CONTRACT':
      return {
        ...state,
        CrowdSaleABI: payload['CrowdSaleABI'],
        CrowdSaleAddress: payload['CrowdSaleAddress'],
        TokenABI: payload['TokenABI'],
        TokenAddress: payload['TokenAddress'],
      };

    /*========== ALLOW LIST REDUCERS ============= */

    case 'SET_ALLOW_LISTED':
      return {
        ...state,
        allAddresses: payload,
      };

    /*========== ALLOW LIST SIGNUPS REDUCERS ============= */

    case 'SET_ALLOW_LISTED_SIGNUPS':
      return {
        ...state,
        allAddressesSignups: payload,
      };

    case 'TOGGLE_ADD_ALLOWLIST_MODAL':
      return {
        ...state,
        isAddAllowlistModal: payload,
      };

    case 'TOGGLE_EDIT_ALLOWLIST_MODAL':
      return {
        ...state,
        isEditAllowlistModal: payload,
      };

    case 'TOGGLE_DELETE_ALLOWLIST_MODAL':
      return {
        ...state,
        isDeleteAllowlistModal: payload,
      };

    default:
      return state;
  }
};

export default Auth;