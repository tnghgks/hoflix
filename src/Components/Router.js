import React from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Home";
import Collection from "Routes/Collection";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import TV from "Routes/TV";

export default () => (
	<Router>
		<>
			<Header />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/tv" exact component={TV} />
				<Route path="/tv/popular" render={()=><h1>Popular</h1>} />
				<Route path="/search" exact component={Search} />
				<Route path="/movie/:id" component={Detail} />
				<Route path="/show/:id" component={Detail} />
				<Route path="/collection/:id" component={Collection} />
				<Redirect from="*" to="/" />
			</Switch>
		</>
	</Router>
)