import React, { useState } from 'react';

const Blog = () => {
    const[count, setCount] = useState(0);
    const [like, setLike] = useState(false);

    const handlecount = () => {
        
        setCount(count+1);
        if (count === 1){
            setCount(count-1);
        }

        setLike(true);
        if (like === true) {
            setLike(false)
        }
    }
    return (
        <div className='mt-8'>

            <div className='px-12'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab obcaecati quis ipsa qui facere autem laborum minus culpa! Eum cupiditate odit asperiores, quidem accusantium vitae id non quo modi, fugiat magni necessitatibus recusandae deleniti dolor ratione nemo iusto nesciunt dolore? Dolore voluptas veniam animi doloremque enim cumque corrupti, expedita facilis?</p>


                <div className='divider'></div>

                <div>
                    <div className='ml-2'>{count}</div>
                    <div>
                        <button onClick={handlecount} className={`btn ${like ? 'btn-info' : 'btn-outline btn-info'} `}>
                            
                            {like ? 'Liked' : 'Like'}
                            
                            </button>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default Blog;