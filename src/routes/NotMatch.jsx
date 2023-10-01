import { Link } from 'react-router-dom';

const NotMatch = () => (
  <div className="flex flex-col items-center justify-center h-screen w-screen">
    <p className="text-center">Page not Found</p>
    <p className="text-center">Try another page</p>
    <Link to="/" className="flex flex-row items-center px-8 py-4 mt-8 bg-green-400 rounded-full cursor-pointer justify-evenly hover:bg-green-500 transition-bg">Go to your Homepage</Link>
  </div>
);
export default NotMatch;
