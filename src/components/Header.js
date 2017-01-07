import React from 'react';

//Stateless component
const Header = (props) => {
    return (
        <header className="top">
            <h1>Catch
                    <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
                Day</h1>
            <h3 className="tagline"><span>{props.tagline}</span></h3>
        </header>
    );
};

// PropTypes can be used to validate props!
Header.propTypes = {
    tagline: React.PropTypes.string
}


export default Header;