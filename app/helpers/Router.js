import { NavigationActions } from "react-navigation";
let instance = null;
class Router {
	constructor() {
    	if (!instance) {
	  		instance = this
	  	}
	
    	return instance;
  	}

	goTo(dispatcher, stackName, screenName) {
		dispatcher.dispatch(
      		NavigationActions.navigate({
  		  		routeName: stackName,
  		  		action: NavigationActions.navigate({
  		  	  		routeName: screenName
  		  		})
      		})
		)      		
	}

	goBack(dispatcher) {
		dispatcher.dispatch(NavigationActions.back())
	}
}

const router = new Router();
export default router;