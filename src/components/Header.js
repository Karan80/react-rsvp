import React from 'react';
import PropTypes from 'prop-types';

const Header = props =>
   <header>
     <h1>RSVP</h1>
     <p>A React App</p>
     <form onSubmit={props.handleSubmit}>
        <input type="text" placeholder="Invite Someone" 
               value={props.value}
               onChange={props.handleNameInput} />
        <button type="submit" name="submit" value="submit">Submit</button>
     </form>
   </header>

Header.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    handleNameInput: PropTypes.func.isRequired
}

export default Header;