import { Link } from 'react-router-dom';

const NotMatch = () => (
  <>
    <p>Not found!</p>
    <p>Try another page</p>
    <Link to="/" className="flex flex-row items-center px-8 py-4 mt-8 bg-green-400 rounded-full cursor-pointer justify-evenly hover:bg-green-500 transition-bg">Go to Homepage</Link>
  </>
);
export default NotMatch;
