import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "../Dropdown";
import { Container, Nav, NavContainer, Create, LogIn } from "./Navbar.styled";
import { usePrivy } from "@privy-io/react-auth";

function Navbar() {
	const [click, setClick] = useState(false);
	const [dropdown, setDropdown] = useState(false);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const onMouseEnter = () => {
		setDropdown(window.innerWidth >= 800);
	};

	const onMouseLeave = () => {
		setDropdown(false);
	};

	const { ready, authenticated, user, logout } = usePrivy();




	return (
		<Nav>
			<Container className="navbar">
				<a href="/" className="logo" onClick={closeMobileMenu}>
					<img
						src="/images/logo.png"
						alt="logo"
						width="40px"
						height="40px"
						loading="eager"
					/>
					<span className="hidden">Memester</span>
				</a>
				<NavContainer>
					<ul className={click ? "nav-menu active" : "nav-menu"}>
						{/* <li className="nav-item">
							<NavLink
								to="/categories"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								<span className="hide" aria-label="none">
									🔥{" "}
								</span>
								Categories
							</NavLink>
						</li> */}
						{/* <li
							className="nav-item"
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
						>
							<NavLink
								to="/about"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								<span className="hide" aria-label="none">
									⚙️{" "}
								</span>
								About <i className="fas fa-angle-down" />
							</NavLink>
							{dropdown && <Dropdown />}
						</li> */}
						{/* <li className="nav-item">
							<NavLink
								to="/contact"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								<span className="hide" aria-label="none">
									📱{" "}
								</span>
								Contact
							</NavLink>
						</li> */}
						<li>
							<Link
								to={`/`}
								className="btn btn-light nav-links-mobile"
								onClick={closeMobileMenu}
							>
								<a className="">
									<b>Create Meme</b>
								</a>
							</Link>
							{/* <NavLink
								to="/"
								className="btn btn-light nav-links-mobile"
								onClick={closeMobileMenu}
							></NavLink> */}
						</li>

						<li>
							<Link
								to={`/mymemes`}
								className="btn btn-light nav-links-mobile"
								onClick={closeMobileMenu}
							>
								<a className="" href="/mymemes">
									<b>My Memes List</b>
								</a>
							</Link>
							{/* <NavLink
								to="/"
								className="btn btn-light nav-links-mobile"
								onClick={closeMobileMenu}
							>
								<a className="" href="/mymemes">
									<b>My Memes List</b>
								</a>
							</NavLink> */}
						</li>
					</ul>
					<Create className="hidden">
						<Link to={`/`}>
							<a className="" >
								<b>Create Meme</b>
							</a>
						</Link>
					</Create>
					<Create className="hidden">
						<Link to={`/mymemes`}>
							<a className="">
								<b>My Memes List</b>
							</a>
						</Link>
					</Create>
					<Create className="hidden">
						<Link to={`/create-contest`}>
							<a className="">
								<b>Create Contest</b>
							</a>
						</Link>
					</Create>
					<Create className="hidden">
						<Link to={`/contest-list`}>
							<a className="">
								<b>Contest List</b>
							</a>
						</Link>
					</Create>
					{ready && authenticated ? (
						<a
							style={{ marginRight: "5px" }}
							className="btn btn-primary highlight"
						>
							@{user.farcaster ? user.farcaster.username : ""}
						</a>
					) : (
						" "
					)}{" "}
					{ready && authenticated ? (
						<a className="btn btn-primary highlight" onClick={logout}>
							<b> Logout</b>
						</a>
					) : (
						" "
					)}
					<div className="menu-icon" onClick={handleClick}>
						<i
							className={
								click ? "fas fa-bars-staggered" : "fas fa-bars-staggered"
							}
						/>
					</div>
				</NavContainer>
			</Container>
		</Nav>
	);
}

export default Navbar;
