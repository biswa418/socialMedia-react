import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

const Navbar = () => {
    const auth = useAuth();

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
                {auth.user &&
                    <div className='user flex items-center'>
                        <Link to='/'>
                            <img className='h-10' alt='userDP' src='./man.png' />
                        </Link>
                        <span className='mx-2 text-base'>{auth.user.name}</span>
                    </div>
                }

                <div className='navLinks flex items-center'>
                    <ul className='flex list-none'>
                        {
                            auth.user ?
                                <>
                                    <li className='px-1'>
                                        <button className='hover:underline' onClick={auth.logout}>Sign out</button>
                                    </li>
                                </>
                                :
                                <>
                                    <li className='px-1'>
                                        <Link className='hover:underline' to='/login'>Sign in</Link>
                                    </li>
                                    <li className='px-1'>
                                        <Link className='hover:underline' to='/register'>Sign up</Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>


        </nav>
    );
}

export default Navbar;