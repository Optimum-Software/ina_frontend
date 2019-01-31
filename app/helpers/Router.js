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

	goBack(dispatcher, stackName, screenName) {
		this.goTo(dispatcher, stackName, screenName, {})
	}

	switchLogin(dispatcher) {
		dispatcher.navigate("LoggedIn")
	}

	switchLogout(dispatcher) {
		dispatcher.navigate("LoggedOut")
	}
}

const router = new Router();
export default router;