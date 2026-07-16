import DeleteAcount from '@/components/Myprofile/DeleteAcount';
import UpdatePass from '@/components/Myprofile/UpdatePass';
import UserDetails from '@/components/Myprofile/UserDetails';
import { useSelector } from 'react-redux';

const MyProfile = () => {
    const { googleId } = useSelector((state) => state.profile.user);

    return (
        <>
            <div className='bg-[#000814] w-full min-h-screen py-16'>
                <UserDetails />
                {!googleId && <UpdatePass />}
                <DeleteAcount />
            </div>
        </>
    )
}

export default MyProfile
