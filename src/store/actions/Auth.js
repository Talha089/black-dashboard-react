/*========== PAGE LOADER ACTIONS ============= */

export const setLoader = (data) => ({
  type: 'SET_LOADER',
  payload: data,
});

/*========== LOGIN ACTIONS ============= */


export const getAdminNonce = (data) => ({
  type: 'GET_ADMIN_NONCE',
  payload: data,
}
);


export const login = (data) => ({
  type: 'LOGIN',
  payload: data,
});

export const signOut = () => ({
  type: 'SIGN_OUT',
});

export const checkNetwork = (data) => ({
  type: 'CHECK_NETWORK',
  payload: data,
});

export const isloginDisabled = () => ({
  type: 'IS_LOGIN_DISABLED',
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const setAddress = (data) => ({
  type: 'SET_ADDRESS',
  payload: data
});

/*========== SMART CONTRACT ACTIONS ============= */

export const getSmartContract = (data) => ({
  type: 'GET_SMART_CONTRACT',
  payload: data
});

export const setSmartContract = (data) => ({
  type: 'SET_SMART_CONTRACT',
  payload: data
});

/*========== ALLOW LIST ACTIONS ============= */

export const getAllowListed = () => ({
  type: 'GET_ALLOW_LISTED',
});

export const setAllowListed = (data) => ({
  type: 'SET_ALLOW_LISTED',
  payload: data
});

export const updateAllowListed = (data) => ({
  type: 'UPDATE_ALLOW_LISTED',
  payload: data
});


/* ---------------- ALOOW LIST SIGNUPS ACTIONS ---------------------- */

export const getAllowListedSignups = () => ({
  type: 'GET_ALLOW_LISTED_SIGNUPS',
});

export const setAllowListedSignups = (data) => ({
  type: 'SET_ALLOW_LISTED_SIGNUPS',
  payload: data
});

export const addNewAllowlistSignups = (data) => ({
  type: 'ADD_NEW_ALLOW_LISTED_SIGNUPS',
  payload: data
});

export const updateAllowListedSignups = (data) => ({
  type: 'UPDATE_ALLOW_LISTED_SIGNUPS',
  payload: data
});

export const deleteAllowListedSignups = (data) => ({
  type: 'DELETE_ALLOW_LISTED_SIGNUPS',
  payload: data
});

export const toggleAddAllowistModal = (data) => ({
  type: 'TOGGLE_ADD_ALLOWLIST_MODAL',
  payload: data
});

export const toggleEditAllowistModal = (data) => ({
  type: 'TOGGLE_EDIT_ALLOWLIST_MODAL',
  payload: data
});

export const toggleDeleteAllowistModal = (data) => ({
  type: 'TOGGLE_DELETE_ALLOWLIST_MODAL',
  payload: data
});