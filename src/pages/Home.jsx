const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className='border border-teal-500 box-border rounded-sm mt-[20px] bg-slate-200'>
                <div className='p-3'>
                    <div className='flex items-center'>
                        <img
                            className='h-[50px]'
                            src="/public/man.png"
                            alt="user-pic"
                        />
                        <div className='flex flex-col pl-[12px]'>
                            <span className='text-gray-600 font-semibold text-base leading-6'>Biswajeet</span>
                            <span className='not-italic font-normal text-[14px] leading-3 text-gray-400'>a minute ago</span>
                        </div>
                    </div>
                    <div className='font-normal not-italic text-base text-slate-700 mt-4'>Post Content</div>

                    <div className='p-1 flex border border-solid border-gray-300 px-[10px] font-normal text-base text-gray-600 border-x-0'>
                        <div className='flex items-center'>
                            <img
                                className='h-4 cursor-pointer'
                                src="/public/like.svg"
                                alt="likes-icon"
                            />
                            <span className='ml-2'>5</span>
                        </div>

                        <div className='ml-4 flex items-center'>
                            <img
                                className='h-4 cursor-pointer'
                                src="/public/chat.png"
                                alt="comments-icon"
                            />
                            <span className='ml-2'>2</span>
                        </div>
                    </div>
                    <div className='p-3'>
                        <input className='border border-solid border-gray-100 rounded-md h-9 my-0 mx-auto w-full text-base box-border p-2 focus:outline-none focus-visible:outline-0' placeholder="Start typing a comment" />
                    </div>

                    <div className='relative px-3 py-1'>
                        <div className='bg-slate-300 rounded-md p-3 mb-3'>
                            <div className='flex'>
                                <span className='font-semibold text-xs text-gray-600'>Bill</span>
                                <span className='ml-2 text-xs text-gray-500'> a minute ago</span >
                                <span className='text-xs text-gray-700 ml-2' >22</span>
                            </div >

                            <div className='mt-2'>Random comment</div>
                        </div >
                    </div >
                </div >
            </div >
        </div >
    );
};

export default Home;
