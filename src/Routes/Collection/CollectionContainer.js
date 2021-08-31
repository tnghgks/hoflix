import React from "react";
import CollectionPresenter from "./CollectionPresenter";
import {moviesApi} from "../../api";

export default class extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			result:null,
			error:null,
			loading:true
		};
	}
	
	async componentDidMount(){
		const {
			match : {
				params:{ id } 
			},
			history:{ push }
		} = this.props;
		const parsedId = parseInt(id);
		
		if(isNaN(parsedId)){
			return push("/");
		}
		
		let result = null;
		
		try {
			({data:result} = await moviesApi.getCollection(parsedId));
			console.log(result);
		}catch{
			this.setState({error:"Not Found Collection"});
		}finally{
			this.setState({result, loading:false});
		}
	}
	render(){
		const {result, error,loading} = this.state;
		return <CollectionPresenter result={result} error={error} loading={loading} />
	}
}