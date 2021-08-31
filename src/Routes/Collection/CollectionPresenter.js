import React from "react";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Poster from "Components/Poster";
import Section from "Components/Section";
import Message from "Components/Message";

const Container = styled.div`
	height:calc(100vh - 50px);
	width: 100%;
	position:relative;
	padding:50px;
`;

const Backdrop = styled.div`
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	background-image:url(${props => props.imgURL});
	background-position: center center;
	background-size:cover;
	filter:blur(3px);
	opacity:0.5;
	z-index:0;
`;
const Content = styled.div`
	display:flex;
	position:relative;
	width:100%;
	height:100%;
	z-index:1;
`;

const Cover = styled.div`
	width:30%;
	height:100%;
	background-image:url(${props => props.imgURL});
	background-position:center center;
	background-size:cover;
	border-radius:5px;
`;

const Data = styled.div`
	width: 70%;
	margin-left:10px;
`;

const Title = styled.h3`
	font-size: 32px;
	margin-bottom:20px;
`;

const Overview = styled.p`
	font-size:12px;
	opacity:0.7;
	line-height:1.5;
	width: 50%;
	margin-bottom: 20px;
`;
const CollectionPresenter = ({result, error, loading}) => loading ? 
	  <>
	  <Helmet>
	  	<title>Loading | Hoflix</title>
	  </Helmet>
	  <Loader />
	  </> : <Container>
				<Helmet>
					<title>{result.name} | Hoflix</title>
				</Helmet>
				<Backdrop imgURL={result.backdrop_path ? `https://image.tmdb.org/t/p/original${result.backdrop_path}` : require("../../assets/noPosterSmall.png")} />
				<Content>
					<Cover imgURL={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/noPosterSmall.png")} />
					<Data>
						<Title>{result.name}</Title>
						<Overview>{result.overview}</Overview>
						<Section title="Collections">
						{result.parts.map(collection => 
							  <Poster
								key={collection.id}
								id={collection.id} 
								imageUrl={collection.poster_path} 
								title={collection.title} 
								rating={collection.vote_average}
								year={collection.release_date}
								isMoive={true}/>
						)}						
						</Section>
					</Data>
				</Content>
			{error && <Message color="#e74c3c" text={error} ></Message>}
			</Container>

CollectionPresenter.propTypes = {
	result:PropTypes.object,
	error:PropTypes.string,
	loading:PropTypes.bool.isRequired
}

export default CollectionPresenter;