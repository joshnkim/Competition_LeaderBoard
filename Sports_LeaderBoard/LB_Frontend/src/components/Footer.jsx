import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <Link to="/">
                <button>Back to Home Page</button>
            </Link>
        </footer>
    );
};


export default Footer;