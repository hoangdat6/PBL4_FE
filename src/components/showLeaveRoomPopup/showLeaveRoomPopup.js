import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const showLeaveRoomPopup = (handleLeaveRoom) => {
    MySwal.fire({
        title: 'Bạn muốn rời phòng?',
        text: 'Nếu bạn rời phòng, bạn sẽ không thể tham gia vào trận đấu này nữa!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đúng vậy, rời phòng',
        cancelButtonText: 'Không, tôi muốn ở lại',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            handleLeaveRoom();
        }
    });
};

export default showLeaveRoomPopup;