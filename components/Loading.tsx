import {AiOutlineLoading3Quarters} from 'react-icons/ai';

const Loading = () => {
    return (
        <div className='flex items-center justify-center w-full p-4 h-screen'>
            <AiOutlineLoading3Quarters className="animate-spin mx-auto text-blue-700" size={50} />
        </div>
    )
}

export default Loading