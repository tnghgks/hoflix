import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Helmet from "react-helmet";
import {Link} from "react-router-dom";
import Poster from "Components/Poster";
import Section from "Components/Section";

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
	background-image: url(${props => props.bgImage});
	background-position: center center;
	background-size: cover;
	filter:blur(3px);
	opacity:0.5;
	z-index:0;
`;

const Content = styled.div`
	display:flex;
	position:relative;
	width:100%;
	z-index:1;
	height:100%;

`;

const Cover = styled.div`
	width:30%;
	background-image:url(${props => props.bgImage});
	background-position:center center;
	background-size:cover;
	height:100%;
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

const ItemContainer = styled.div`
	margin:20px 0 ;
`;

const Item = styled.span`
	cursor:${props => props.cursor}
`;

const Divider = styled.span`
	margin:0 10px;
`;

const Overview = styled.p`
	font-size:12px;
	opacity:0.7;
	line-height:1.5;
	width: 50%;
	margin-bottom: 20px;
`;

const ContentsContainer = styled.div`
	height:50%;
	display:flex;
	flex-direction:column;
	justify-content:flex-start;
	align-items:left;
	flex-wrap: wrap;
`;

const VideoTitle = styled.span`
	display:block;
	width:25%;
	margin:10px 0px;
	&:hover{
		font-weight:600;
	}
`;
const LogoImage = styled.img`
	width:100px;
	height:100px;
	opacity:0.8;
`;
const Companies = styled.div`
	position:absolute;
	bottom:0px;
`;
const LogoContainer = styled.div`
	height:20%;
	margin:15px 0px;
	display:flex;
	justify-content:space-around;

`;

const CompanyTitle = styled.div`
	margin:5px 0px;
`;

const Logo = styled.div`
	display:flex;
	margin:0px 15px;
	flex-direction:column;
	justify-content:center;
	align-items:center;
`;

const DetailPresenter = ({ result, loading, error, getVideoResult, isMovie, toggle, handleToggle}) => loading ?
	(<>
		<Helmet>
			<title>Loading | Hoflix</title>
		</Helmet>
		<Loader /> 
	</>) : (
		error ? <Message text={error} />: (
		<Container>
			<Helmet>
				<title>{result.original_title ? result.original_title : result.original_name} | Hoflix</title>
			</Helmet>
			<Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`} />
			<Content>
				<Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original/${result.poster_path}` : require("../../assets/noPosterSmall.png")} />
			<Data>
				<Title>{result.original_title ? result.original_title : result.original_name}</Title>	
				<ItemContainer>
					<Item>{result.release_date ? result.release_date.substring(0,4) : (result.first_air_date ? result.first_air_date.substring(0,4) : "Unknown")}</Item>
					<Divider>●</Divider>
					<Item>{result.runtime !== 0 ? (result.runtime ? result.runtime : result.episode_run_time[0]) : 0} min</Item>
					<Divider>●</Divider>
					<Item>{result.genres && result.genres.map((genre,index) => index === result.genres.length - 1 ? genre.name : `${genre.name} / `) }</Item>
					{result.imdb_id ?
						 <>
							<Divider>●</Divider>
							<Item>
								<a href={`https://www.imdb.com/title/${result.imdb_id}`}>IMDB LINK </a>
							</Item>
						 </> : ""}
					{result.production_countries[0]?
						 <>
							<Divider>●</Divider>
							<Item>
								Made in {result.production_countries[0].name}
							</Item>
						 </> : ""}
					{isMovie ?
					(<>
						{result.belongs_to_collection ?
						 <>
							<Divider>●</Divider>
							<Item>
								<Link to={`/collection/${result.belongs_to_collection.id}`}>
								View Collections
								</Link>
							</Item>
						 </> : ""}
					</> ): (<>{result.seasons[0] ?
							<>
							<Divider>●</Divider>
							<Item onClick={handleToggle} cursor="pointer">
								View Season
							</Item>
						 </> :"" }</>)}
				</ItemContainer>
				<Overview>
					{result.overview}
				</Overview>
				<ContentsContainer>
					{toggle ?  <>
					<Section title="Season Collection" overflow="auto">
						{result && result.seasons.map(season => <Poster key={season.id} id={season.id} imageUrl={season.poster_path} title={season.name} />)}
					</Section>
					</>: <>
					<h1>Related video</h1>
					{getVideoResult[0] ? getVideoResult.map(video => <VideoTitle key={video.id}><a href={`https://www.youtube.com/watch?v=${video.key}`}>{video.name.length > 25 ? `${video.name.substring(0,25)}...` : video.name }</a></VideoTitle>) : <h2>Nothing Here.</h2>}
				</>}
					
				</ContentsContainer>
				{ result.production_companies[0] ?
				<Companies>
					<h1>Production Companies</h1>
					<LogoContainer>
							{result.production_companies.map( company => 
								<Logo key={company.id}>
									<LogoImage src={company.logo_path ? `https://image.tmdb.org/t/p/w200/${company.logo_path}` : require("../../assets/noPosterSmall.png")} alt={company.name}/>
									<CompanyTitle>{company.name}</CompanyTitle>
								</Logo>) }
					</LogoContainer>
				</Companies> : <Companies>No company information.</Companies>
				}
			</Data>
			</Content>
		</Container>)
	);

DetailPresenter.propTypes = {
	result: PropTypes.object,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.string,
	getVideoResult:PropTypes.array
};

export default DetailPresenter;