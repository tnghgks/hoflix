import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

export default class extends React.Component {
	state ={
		airingToday:null,
		topRated:null,
		popular:null,
		error:null,
		loading:true
	}
	async componentDidMount(){
		try{
			const {data:{results:airingToday}} = await tvApi.airingToday();
			const {data:{results:topRated}} = await tvApi.topRated();
			const {data:{results:popular}} = await tvApi.popular();
			this.setState({
				airingToday,
				topRated,
				popular
			});
		}catch(error){
			this.setState({
				error:"Can't find TV information."
			})
		}finally{
			this.setState({
				loading:false
			})
		}
	}
	render() {
		const {airingToday,topRated,popular,error,loading} = this.state;
		return (
			<TVPresenter airingToday={airingToday} topRated={topRated} popular={popular} error={error} loading={loading}/>
		)
		
	}
}