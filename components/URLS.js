let IPADDRESS = "https://kestrelexpress.onrender.com"

let URLS ={
    IPADDRESS,
    CREATE_USER :  `${IPADDRESS}/create/user/`,
    LOGIN_USER  : `${IPADDRESS}/user/login/`,
    THE_FLASH_ZAG  : "XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT",
    ADD_JOB : `${IPADDRESS}/multipart-upload`,
    GET_USER_INFOR : `${IPADDRESS}/get/infor?id=`,
    ADD_JOB_INFORMATION: `${IPADDRESS}/job_information`,
    GET_JOBS : `${IPADDRESS}/get/jobs/?`,
    GET_USER_PROFILE : `${IPADDRESS}/get/user/profile?id=`,
    EDIT_USER_INFORMATION : `${IPADDRESS}/edit/user/information?id=`,
    CHANGE_PASSWORD  :`${IPADDRESS}/edit/user/password?id=`,
    SEARCH_ORDER  : `${IPADDRESS}/search/orders/?search=`,
    GET_ORDER_INFOR :  `${IPADDRESS}/get/order/for?Jid=`,
    GET_QUOTE_INFOR :  `${IPADDRESS}/get/quote/for?Qid=`,
    GET_CART_INFOR : `${IPADDRESS}/get/cart/for?id=`,
    GET_CART_ITEMS : `${IPADDRESS}/get/cart/items?id=`,
    GET_STATUS_ITEMS  : `${IPADDRESS}/get/status/jobs?`,
    GET_PAYMENTS_FOR: `${IPADDRESS}/get/payments/for?`,
    ADD_QUOTATION: `${IPADDRESS}/add/qoute`,
    GET_QUOTATIONS :  `${IPADDRESS}/get/quotations/for?`,
    VERIFY_USER : `${IPADDRESS}/verify/user`,
    VERIFY_EMAIL  : `${IPADDRESS}/reset/password`,
    CHECK_DELETION : `${IPADDRESS}/check/deletion?for=`

}
export default URLS

//get payments