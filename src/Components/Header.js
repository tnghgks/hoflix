import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
	width:100%;
	height:50px;
	display:flex;
	align-items:center;
	
`;

const Item = styled.li`
	color:white;
	display:flex;
	justify-content:center;
	align-items:center;
	width:100px;
	height:100%;
	border-bottom:3px solid 
	${ props => (props.current ? "#fff" : "transparent" )};
`;

const SLink = styled(Link)`
	justify-content: center;
	
`

export default withRouter( ({location:{pathname}}) => (
	<Header>
		<List>
			<Item current={pathname === "/"}>
				<SLink to="/"   >Movies</SLink>
			</Item>
			<Item  current={pathname === "/tv"}>
				<SLink to="/tv">TV</SLink>
			</Item>
			<Item current={pathname === "/search"}>
				<SLink to="/search" >Search</SLink>
			</Item>
		</List>
	</Header>)
	)