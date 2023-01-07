import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import WelcomeActitvity from './screens/WelcomeActitvity';
import CreateAccount from './screens/CreateAccount';
import LogIn from './screens/LogIn';
import Home from './screens/Home';
import AddJob from './screens/AddJob';
import AddDeliveryInformationScreen from './screens/AddDeliveryInformationScreen';
import SplashScreen from './screens/SplashScreen';
import AddGeneralInformation from './screens/AddGeneralInformation';
import ProfileActivity from './screens/ProfileActitvity'
import FeedBack from './screens/FeedBack'
import JobDetails from './screens/JobDetails';
import ProductDetails from './screens/ProductDetails';
import InProcessScreen from './screens/InProcessScreen'
import EditUserInformation from './screens/EditUserInformation'
import ChangePassword from './screens/ChangePassword';
import SearchScreen from './screens/SearchScreen';
import { LogBox } from 'react-native';
import Cart from './screens/Cart';
import InCompleteOrders from './screens/InCompleteOrders';
import CompleteOrders from './screens/CompleteOrders';
import PaymentsActivity from './screens/PaymentsActivity';
import GetQoute from './screens/GetQuote';
import SendQuote from './screens/SendQuote';
import QoutationsActivity from './screens/QuotationsActivity'
import QuotationDetails from './screens/QuotationDetails';
import ForgotPassword from './screens/ForgotPassword';
import TwoStepVerification from './screens/TwoStepVerification';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from './components/authContext';
import SignOutActivity from './screens/SignOutActivity';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
 
let stack = createStackNavigator();


export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    const bootstrapAsync = async () => {
    
      let userID = await AsyncStorage.getItem('userId')
      dispatch({ type: 'RESTORE_TOKEN', token: userID });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (userID) => {
        dispatch({ type: 'SIGN_IN', token: userID });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
       <NavigationContainer>
            <StatusBar style="dark" />
            <stack.Navigator
              screenOptions = {{header:()=> null}}>
                {
                  state.isLoading ? (
                    <stack.Screen
                    name = "Splash Screen"
                    component={SplashScreen}
                  />
                  )
                  : 
                  state.userToken == null ? (
                    <>
                      <stack.Screen
                        name = "Welcome Activity"
                        component={WelcomeActitvity}
                      />
                      <stack.Screen
                        name = "Sign Up"
                        component={CreateAccount}
                      />
                      <stack.Screen
                        name = "Log In"
                        component={LogIn}
                      />
                       <stack.Screen
                        name='Verify user'
                        component={TwoStepVerification}
                      />
                      <stack.Screen
                        name='Forgot Password'
                        component={ForgotPassword}
                      />
                    </>
                 
                  ) : (
                    <>
                     <stack.Screen
                      name = 'Home'
                      component={Home}
                      />     
                      <stack.Screen
                        name = {'General Information'}
                        component = {AddGeneralInformation}
                      />
                      <stack.Screen
                      name= 'Product Information'
                      component={AddJob}
                      />
                      <stack.Screen
                      name='Delivery Details'
                      component={AddDeliveryInformationScreen}
                      />
                      
                      <stack.Screen
                        name = {'Feedback'}
                        component = {FeedBack}
                      />
                      <stack.Screen
                        name = {'Profile'}
                        component = {ProfileActivity}
                      />
                      <stack.Screen
                        name='Product Details'
                        component={ProductDetails}
                      />
                      <stack.Screen
                        name ={'Job Details'}
                        component = {JobDetails}
                      />
                      <stack.Screen
                        name='In Process'
                        component={InProcessScreen}
                      /> 
                      <stack.Screen
                        name='Edit Infor'
                        component={EditUserInformation}
                      />
                      <stack.Screen
                        name='Change Password'
                        component={ChangePassword}
                      />
                      <stack.Screen
                        name='Search Screen'
                        component={SearchScreen}
                      />
                      <stack.Screen
                        name='Cart'
                        component={Cart}
                      />
                      <stack.Screen
                        name='Incomplete Orders'
                        component={InCompleteOrders}
                      />
                      <stack.Screen
                        name='Complete Orders'
                        component={CompleteOrders}
                      />
                      <stack.Screen
                        name = {'Payments'}
                        component = {PaymentsActivity}
                      />
                      <stack.Screen
                        name = {'Get Qoute'}
                        component = {GetQoute}
                      />
                      <stack.Screen
                        name='Send Quote'
                        component={SendQuote}
                      />
                      <stack.Screen
                      name='Quotations'
                      component={QoutationsActivity}
                      />
                      <stack.Screen
                        name = 'Quotation Details'
                        component={QuotationDetails}
                      />
                      <stack.Screen
                        name='Sign Out'
                        component={SignOutActivity}
                      />
                    </>
                  )
                }
                
               
               
          </stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
   
  );

}

