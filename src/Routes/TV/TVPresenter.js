import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
	padding:0px 20px;
`;

const TVPresenter = ({airingToday, topRated, popular, error, loading}) => 
<>
	<Helmet>
		<title>TV Show | Hoflix</title>
	</Helmet>
	{loading ? <Loader /> : (
		<Container>
			{airingToday && airingToday.length > 0 && (
				<Section title="AiringToday">
					{airingToday.map(show => 
						<Poster 
							key={show.id} 
							id={show.id} 
							imageUrl={show.poster_path} 
							title={show.original_name} 
							rating={show.vote_average} 
							year={show.first_air_date ? show.first_air_date.substring(0, 4) : ""} 
						/>
									)}
				</Section>
				)}
			{topRated && topRated.length > 0 && (
				<Section title="TopRated">
					{topRated.map(show => 
						<Poster 
							key={show.id} 
							id={show.id} 
							imageUrl={show.poster_path} 
							title={show.original_name} 
							rating={show.vote_average} 
							year={show.first_air_date ? show.first_air_date.substring(0, 4) : ""} 
						/>
							)}
				</Section>
			)}
			{popular && popular.length > 0 && (
				<Section title="Popular">
					{popular.map(show => 
						<Poster 
							key={show.id} 
							id={show.id} 
							imageUrl={show.poster_path} 
							title={show.original_name} 
							rating={show.vote_average} 
							year={show.first_air_date ? show.first_air_date.substring(0, 4) : ""} 
						/>
							)}
				</Section>
			)}
			{error && <Message color="#e74c3c" text={error} ></Message>}
		</Container>
	)}
</>


TVPresenter.propTypes = {
	airingToday:PropTypes.array,
	topRated:PropTypes.array,
	popular:PropTypes.array,
	error:PropTypes.string,
	loading:PropTypes.bool.isRequired
}

export default TVPresenter;