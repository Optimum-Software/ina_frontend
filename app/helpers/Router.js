import { NavigationActions } from "react-navigation";
export default class Router {

	static getInstance() {
    	if (Router.instance == null) {
    	  Router.instance = new Router();
    	  }
	
    	return Router.instance;
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
}