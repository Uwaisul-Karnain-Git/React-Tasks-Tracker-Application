import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <p>Copyright &copy; 2021</p>
            {/* <a href='/about'>About</a> */}  {/* This will force the page to be Refreshed, but <Link> won't */} 
            <Link to='/about'>About</Link>
        </footer>
    )
}

export default Footer

