import { NavLink } from "react-router-dom";
import NavButton from "../NavButton/NavButton";


export default function BottomNav() {
    return (
        <nav>
            <NavLink to="/" end>
                {({ isActive }) => (
                <NavButton label="Home" icon="home" active={ isActive } />
            )}
            </NavLink>

            <NavLink to="/schedule">
                {({ isActive }) => (
                <NavButton label="Schedule" icon="calendar" active={isActive} />
            )}
            </NavLink>

            <NavLink to="/map">
                {({ isActive }) => (
                <NavButton label="Map" icon="map" active={isActive} />
            )}
            </NavLink>

            <NavLink to="/artists">
                {({ isActive }) => (
                <NavButton label="Artists" icon="artists" active={isActive} />
            )}
            </NavLink>

            <NavLink to="/menu">
                {({ isActive }) => (
                <NavButton label="menu" icon="menu" active={isActive} />
            )}
            </NavLink>
            
        </nav>
    );
}