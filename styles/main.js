import { StyleSheet, Dimensions } from 'react-native'
let { height, width } = Dimensions.get("screen")

let styles = StyleSheet.create({
    Screen:{
        width:"100%",
        flex:1,
        height :height,
        backgroundColor : '#fff',
        flexDirection:"column"
    },  

    container:{
        width:"100%",
        height:"100%",
        padding: 25
    },
    container_pad: {
        padding : 25
    },
    KE_LOGO:{
        width : '100%', 
        height : 250,
    },
    h1 :{
        fontSize : 35
    },
    h2:{
        fontSize : 30
    },
    h3:{
        fontSize : 25
    },
    h4:{
        fontSize : 20
    },
    h5:{
        fontSize :  15
    }, 
    h6:{
        fontSize: 10
    },
    primary_color: {
        backgroundColor : "#8b0000"
    },
    secondaryColor : {
        backgroundColor : "#000000"
    },
    tertiaryColor: {
        backgroundColor : '#ecececec'
    },  
    primaryText : {
        color : "#8b0000"
    },
    secondaryText : {
        color : "#000"
    },
    tertiaryText :{
        color : "#fff"
    },
    grayText:{
        color : '#708090'
    },
    success :{
        backgroundColor : '#008b8b'
    },
    danger : {
        backgroundColor : '#dc3545'
    },
    btn: {
        width : "100%",
        padding : 25,
        borderRadius : 10
    },
    btn_disabled : {
      backgroundColor  :'#FF3E3E'

    },
    alert:{
        width : "100%",
        padding : 25,
        borderRadius : 15
    },
    secondaryBtn  :{
        backgroundColor : "#fff",
    },
    row : {
        width  :"100%",
        flexDirection :"row"
    },
    centerItem :{
        justifyContent : "center",
        alignItems :"center"
    },
    spaceItems:{
        justifyContent:'space-between'
    },
    textCenter  :{
        textAlign : "center"
    },
    textRight : {
        textAlign : 'right'
    },
    textBold:{
        fontWeight :'bold'
    },  
    childElem:{
        height : '100%',
        width :  '100%'
    },
    mLeft15 : {
        marginLeft  :15
    }, 
    mRight15 : {
        marginRight : 15
    }, 
    mTop15 : {
        marginTop : 15
    },
    mBot15: {
        marginBottom : 15
    },
    mTop25:{
        marginTop : 25
    },
    
    mBot25:{
        marginBottom : 25
    },
    mTopHalf:{
        marginTop :height * 0.45
    }, 
    header : {
        height :  height * 0.1,
    },
    body:{
        height : height * 0.8,
    },
    body_:{
        height : height * 0.778,
    },
    long_billboard : {
        width  : "100%",
        height  :  height * 0.7,
    },
    wel_row: {
        height : (height * 0.7) / 2.45
    },
    w80:{
        width : '80%',
    },
    w60:{
        width  : '60%'
    },
    w50:{
        width: '50%'
    },  
    w40:{
        width: '40%'
    },
    w20 :{
        width : '20%'
    },
    w10:{
        width : '10%'
    },
    billboard :{
        width  : "100%",
        height  :  height * 0.5,
    },
    short_billboard :{
        
        width : "100%",
        height : height * 0.3,
    },
    topBorderRadius :{
        borderTopLeftRadius : 15,
        borderTopRightRadius  :15
    },
    marginVertical : {
        marginVertical : 15
    },

    textField :{
        marginTop : 10,
        padding : 15,
        borderRadius  :7.5,
        backgroundColor :"#f2f2f2"
    },
    textField_err:{
        backgroundColor :'#ffe4e4'
    },
    input:{
        paddingLeft: 15,
        width : "100%",

    },
    google_box:{
        borderRadius  :15,
       padding: 20
    },
    navbar:{
        width : '100%',
    },
    username:{
        justifyContent : 'center'
    },
    profile:{
        width : 50,
        height : 50,
        marginTop : 15,
        borderRadius : 100,
        borderColor: 'gray',
        borderWidth  : 2
    },  
    searchbar : {
        width : '100%',
        height  :  height * 0.2,
        borderRadius : 15
    },
    bar:{
        width :'100%',
        padding: 7.5,
        borderRadius: 7.5
    },
    addorder:{
        width : '100%',
        height  :  height * 0.12,
    },
    option:{
      
        padding :15,
    
        borderRadius : 15,
        backgroundColor  : '#eaeaeaea'
    },
    orders :{
        flex : 1
    },
   icons: {
        width  : '20%'
   },
   order_infor  :{
        width : '80%',
        paddingLeft : 10
   },
   icon : {
    backgroundColor : '#ffe4e4',
    padding : 15,
    borderRadius : 100
   },
   red_gb:{

   },
   blue_bg:{

   },
   gray_bg:{

   },
   orange_bg:{

   },
   search_history :{
    marginTop : 25,
    borderTopColor : '#ddd',
    borderTopWidth: 1
   },
   add_btn:{
    borderRadius: 15,
    },
    job_field:{
        
    },
    timedatepill:{
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 7.5
    },
    input_dob : {
        width : width * 0.14,
        borderBottomColor : "#8b0000",
        borderBottomWidth : 2
    },
    input_num : {
        width : '80%',
        borderBottomColor : "#8b0000",
        borderBottomWidth : 2
        
    },
    images_container : {
        width : '100%',
        height : height *0.3,
    },
    image: {
        width : width - 50,
        height : height *0.3, 
        borderRadius : 15
    },

    noImage:{
        backgroundColor : '#ecececec'
    },
    absolute_add_image:{
        backgroundColor : '#fff',
        paddingTop :10,
        paddingBottom : 10,
        paddingRight : 15,
        position :'absolute',
        borderRadius : 15,
        bottom: 15
    },
    dropDownBtn: {
        width : '100%',
        padding: 25,
        borderWidth:  2.5,
        borderColor : '#8b0000',
        backgroundColor : '#fff',
        borderRadius : 15,
        justifyContent : 'center',
        alignItems : 'center'
    },
    smallInput : {
        width : 50,
        borderWidth: 2,
        borderColor : '#8b0000',
        marginLeft: 7.4,
        marginRight : 7.4,
        borderRadius : 7.5,
        paddingLeft :7.5
    },
    rePick:{
        position : 'absolute',
        backgroundColor : '#8b0000',
        borderRadius: 25,
        padding  : 10,
        margin: 5
    },
    splashScreen:{  
        width :  200,
        height: 200,
        justifyContent: 'center',
        alignItems : 'center'
    },
    rowBtn : {
        padding: 15,
        width : '50%',
        borderRadius : 10
    },
    modular : {
        backgroundColor : 'rgba(0,0,0,0.5)',
        position : 'absolute',
    },
    receipt:{
        width  : '80%',
        height: '80%',
        backgroundColor : '#ececec',
        borderRadius : 15
    },
    cartHeader:{
        paddingBottom: 7.5,
        borderBottomWidth : .5,
        borderBottomColor: 'rgba(0,0,0,0.5)'
    },
    cartItem:{
        width :'100%',
    },
    cartImage:{
        width : 50,
        height : 50,
        borderRadius : 100
    }, 
    status: {        
        color : '#008b8b'
    },
    yl  :{
        backgroundColor :'yellow'
    },
    elevation: {  
        shadowColor: '#52006A',  
        elevation: 20,
    },
    drawer : {
        position :'absolute',
        backgroundColor: '#fff',
        width : 250,
        right: width *0.15,
        top: height *0.1,
        shadowColor: '#8b0000',  
        elevation: 30,
        borderRadius : 7.5
    },
    drawer_content:{
        paddingLeft :15,
        paddingBottom :25,
        paddingRight: 15
    },
    closeNav:{
        textAlign  :'right',
        marginBottom:7
    },
    nav_link : {

    },
    nav_link_active: { 
        color : 'white'
    },
    active :{
      backgroundColor:'#8b0000',
      padding : 7.45,
      borderRadius : 7.5
    },
    detailsBody:{
        backgroundColor : '#fff',
        position  :'absolute',
        top : height * 0.28,
        marginHorizontal  :25,
        shadowColor: 'rgba(0,0,0,0.8)',  
        elevation: 30,
        height : height *0.7
        
    },

    cartProductImage:{
        width : '100%',
        height : 100,
        borderRadius : 15
    },
    priceTag :{
        justifyContent: 'flex-end',
    },
    totalPrice : {
        padding : 5,
        justifyContent: 'flex-end',
    },
    h80: {
        height  : height * 0.8
    },
    processImage:{
        width: 250,
        height : 250
    },
    border:{
        borderColor: '#8B0000',
        paddingVertical: 5,
        borderWidth : 1,
        borderRadius : 7.5
    },
    profileImage: {
        width:  100,
        height : 100,
        borderRadius: 100
    },
    activeTab:{
        backgroundColor: '#8b0000',
        padding : 15,
        width: '45%',
        borderRadius: 15
    },
    inActiveTab: {
        borderColor: '#8b0000',
        borderWidth: 2,
        padding : 15,
        borderRadius: 15,
        width: '45%',
    },
    homeImage:{
        width: 250,
        height: 200
    },
    tryAgainPill:{
        borderColor: '#8b0000',
        borderWidth  : 2.5,
        borderRadius : 15,
        paddingVertical : 7.54,
        paddingHorizontal : 15,
        width: width * 0.3
    },
    errorComp:{
        marginTop : height * 0.05
    }
    

})

export default styles