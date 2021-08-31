import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
	:not(:last-child){
		margin-bottom:50px;
	}
	overflow: ${props => props.overflow};
	max-height:100%;
`;
const Title = styled.span`
	font-size:16px;
	font-weight:600;
`;

const Grid = styled.div`
	display:grid;
	grid-template-columns:repeat(auto-fill, 125px);
	grid-gap:20px;
	margin-top:25px;
`;

const Section = ({title, children ,overflow="visible"}) => (
	<Container overflow={overflow}>
		<Title>{title}</Title>
		<Grid>{children}</Grid>
	</Container>
);

Section.propTypes = {
	title:PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
}
	
export default Section;