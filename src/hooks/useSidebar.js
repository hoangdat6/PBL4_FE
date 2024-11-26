import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, showSidebar } from '../store/slices/sidebarSlice';

const useSidebar = () => {
    const dispatch = useDispatch();
    const { isSidebarActive, isShowSidebar } = useSelector(state => state.sidebar);

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar(!isSidebarActive));
    };

    const handleShowSidebar = () => {
        dispatch(showSidebar());
    };

    return {
        isSidebarActive,
        isShowSidebar,
        handleToggleSidebar,
        handleShowSidebar,
    };
};

export default useSidebar;
