import logoDark from '/logo/PetLink-Dark.png'
import logoLight from '/logo/PetLink-Light.png'
import { useThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router';


const Logo = () => {
    const { isDark } = useThemeContext()

    return (
        <Link to='/'>
            <div className='flex items-center gap-4 cursor-pointer'>
                <img className='w-8' src={isDark ? logoLight : logoDark} alt="" />
                <h1 className='text-2xl font-bold'>Pet<span className='text-primary'>Link</span></h1>
            </div>
        </Link>
    );
};

export default Logo;