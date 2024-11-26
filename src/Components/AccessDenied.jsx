import PropTypes from 'prop-types';


AccessDenied.propTypes = {
    Role: PropTypes.string.isRequired,
};

export function AccessDenied({Role})
{
    return (
        <div>
            <h1>Access denied for {Role} view, please log in as a {Role}</h1>
        </div>
    )
}

