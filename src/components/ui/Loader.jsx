import { bouncy } from 'ldrs'
bouncy.register()

const Loader = ({ size = 20, color='black' }) => {
    return (
        <l-bouncy size={size} speed="1.75" color={color}></l-bouncy>
    );
};

export default Loader;