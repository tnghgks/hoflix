import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
	constructor(props){
		super(props);
		const {
			location : { pathname }
		} = props;
		this.state = {
			result:null,
			error:null,
			loading: true,
			isMovie: pathname.includes("/movie/"),
			getVideoResult:null,
			toggle:false
		};
	}
	handleToggle = () =>{
		const { toggle } = this.state;
		if(toggle){
			this.setState({toggle:false});
		}else{
			this.setState({toggle:true});
		}
	}
	async componentDidMount(){
		const {
			match : {
				params:{ id } 
			},
			history:{ push }
		} = this.props;
		
		const { isMovie } = this.state;
		const parsedId = parseInt(id);
		if(isNaN(parsedId)){
			return push("/");
		}
		let result = null;
		let getVideoResult = null;
		try{
			if(isMovie){
				({data : result }= await moviesApi.movieDetail(parsedId));
				({data : {results : getVideoResult}} = await moviesApi.getVideo(parsedId));
			} else {
				({data : result } = await tvApi.showDetail(parsedId));
				({data : {results : getVideoResult} } = await tvApi.getVideo(parsedId));
				const {data:{results}} = await tvApi.getShowImdb(result.name);
					if(results){
						result = {...result, imdb_id:results[0].id};
					}
				}
		} catch(e) {
			console.log(e);
			this.setState({error:"Can't find anything."});
		} finally {
			this.setState({loading:false, result, getVideoResult});
		}
		
	}
	
	render() {
		const {result, error,loading, getVideoResult, isMovie, toggle} = this.state;
		return <DetailPresenter result={result} error={error} loading={loading} getVideoResult={getVideoResult} isMovie={isMovie} toggle={toggle} handleToggle={this.handleToggle} />
		
	}
}