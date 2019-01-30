import { NavigationActions, StackActions} from "react-navigation";
let instance = null;
class Router {

	constructor() {
    	if (!instance) {
	  		instance = this
	  	}
    	return instance;
  	}
  	
	goTo(dispatcher, stackName, screenName, parameters) {
		dispatcher.dispatch(
      		NavigationActions.navigate({
  		  		routeName: stackName,
  		  		action: NavigationActions.navigate({
  		  	  		routeName: screenName,
  		  	  		params: parameters

  		  		})
      		})
		)      		
	}

	goBack(dispatcher) {
		dispatcher.dispatch(NavigationActions.back())
	}

	switchLogin(dispatcher) {
		console.log(dispatcher)
		dispatcher.navigate("LoggedIn")
	}

	switchLogout(dispatcher) {
		console.log(dispatcher)
		dispatcher.dispatch(
			StackActions.reset({
    			index: 0,
    			key: "HomeStack",
    			actions: []
    		})
		)
		dispatcher.navigate("LoggedOut")
	}
}

const router = new Router();
export default router;