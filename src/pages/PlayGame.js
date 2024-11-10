import useGameWebSocket from "../hooks/useGameWebSocket";

import React from "react";


const PlayGame = () => {
    const { sendMove, isConnected, connect, isGameStarted} = useGameWebSocket();
    // Các trạng thái của phòng
    // Nguyên tắc: Khi thay đổi trạng thái phòng, cần cập nhật lại UI
    // Người chơi đã tham gia phòng chưa (để hiển thị Loading)
    // Trận đấu đã bắt đầu hay chưa (để hiển thị WaitingRoom hoặc CaroBoard)

    // nhấn vào nút chơi game -> gọi giao diện chơi game -> gọi hàm connect() để kết nối tới server WebSocket
    //


    // Đầy tiên, thực hiện 1 kết nối tới server WebSocket


    return (
        <>

        </>
    )
}

export default PlayGame;