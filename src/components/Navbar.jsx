import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='flex bg-gradient-to-r from-cyan-500 to-purple-500 p-1 px-3 md:p-3 md:px-5 items-center justify-between'>
            <div className='leftDiv'>
                <Link className='flex items-center justify-center' to='/'>
                    <span className='text-yellow-400 text-2xl md:text-5xl mt-1'>&lt;</span>
                    <h1 className='text-white text-xl md:text-4xl'>DevConnect</h1>
                    <span className='text-yellow-400 text-lg md:text-3xl mt-1'>/</span>
                    <span className='text-yellow-400 text-2xl md:text-5xl mt-1 ms-[-3px]'>&gt;</span>
                </Link>
            </div>

            <div className='rightDiv flex text-white font-bold text-base'>
                <div className='user flex items-center'>
                    <Link to='/'>
                        <img className='h-10' alt='' src='./man.png' />
                    </Link>
                    <span className='ml-2'>Biswajeet</span>
                </div>

                <div className='navLinks flex items-center'>
                    <ul className='flex list-none'>
                        <li className='px-1'>
                            <Link className='hover:underline' to='/login'>Log in</Link>
                        </li>
                        <li className='px-1'>
                            <Link className='hover:underline' to='/'>Log out</Link>
                        </li>
                        <li className='px-1'>
                            <Link className='hover:underline' to='/'>Register</Link>
                        </li>

                    </ul>
                </div>
            </div>


        </nav>
    );
}

export default Navbar;