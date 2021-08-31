import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster"

const Container = styled.div`
	padding:0px 20px;
`;

const Form = styled.form`
	margin-bottom:50px;
	width:100%;
`;

const Input = styled.input`
	all:unset;
	font-size:28px;
	width:100%;
`;

const SearchPresenter = ({movieResults, tvResults, searchTerm, error, loading, handleSubmit, updateTerm}) => 
<>
	<Helmet>
		<title>Search | Hoflix</title>
	</Helmet>
	{loading ? <Loader /> : (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Input placeholder="Search Movies or TV Shows..." value={searchTerm} onChange={updateTerm}></Input>
			</Form>
			{loading ? 
				<Loader /> : 
				<>
					{movieResults && movieResults.length > 0 && 
						<Section title="Movie Results">
							{movieResults.map(movie => 
								 <Poster 
									key={movie.id} 
									id={movie.id} 
									imageUrl={movie.poster_path} 
									title={movie.original_title} 
									rating={movie.vote_average}
									year={movie.first_air_date ? movie.first_air_date.substring(0, 4) : "" } 
									isMoive={true}
								/>
										)}
						</Section>
					}
					{tvResults && tvResults.length > 0 && 
						<Section title="TV Shows Results">
							{tvResults.map(show => 
								<Poster 
									key={show.id} 
									id={show.id} 
									imageUrl={show.poster_path} 
									title={show.original_name} 
									rating={show.vote_average} 
									year={show.first_air_date ? show.first_air_date.substring(0, 4) : ""} 
								/>
									)}
						</Section>}
					{tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 && (<Message color="#95a5a6" text={`Nothing found`}  />)}
				</>}
		</Container>
	)}
</>


SearchPresenter.propTypes = {
	movieResults:PropTypes.array,
	tvResults:PropTypes.array,
	searchTerm:PropTypes.string,
	error:PropTypes.string,
	loading:PropTypes.bool.isRequired,
	handleSubmit:PropTypes.func.isRequired,
	updateTerm:PropTypes.func.isRequired
}

export default SearchPresenter;