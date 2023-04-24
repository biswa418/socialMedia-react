
const Navbar = () => {
    return (
        <nav className='flex bg-gradient-to-r from-cyan-500 to-purple-500 p-3 px-5 items-center justify-between'>
            <div className='leftDiv '>
                <a className='flex items-center' href='/'>
                    <span className='text-yellow-400 text-5xl mt-2'>&lt;</span>
                    <h1 className='text-white text-4xl'>codeial</h1>
                    <span className='text-yellow-400 text-3xl mt-1'>&nbsp;/</span>
                    <span className='text-yellow-400 text-5xl mt-1 ms-[-4px]'>&gt;</span>
                </a>
            </div>

            <div className='rightDiv flex text-white font-bold text-base'>
                <div className='user flex items-center'>
                    <a href='/'>
                        <img className='h-10' alt='' src='./public/man.png' />
                    </a>
                    <span className='ml-2'>Biswajeet</span>
                </div>

                <div className='navLinks flex items-center'>
                    <ul className='flex list-none'>
                        <li className='px-1'>
                            <a className='hover:underline' href='/'>Log in</a>
                        </li>
                        <li className='px-1'>
                            <a className='hover:underline' href='/'>Log out</a>
                        </li>
                        <li className='px-1'>
                            <a className='hover:underline' href='/'>Register</a>
                        </li>

                    </ul>
                </div>
            </div>


        </nav>
    );
}

export default Navbar;