import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BoardList from "../components/BoardList";
import './Board.css';

function Board() {
    
    // boardList 초기화
    const [boardList, setBoardList] = useState([]);

    // 데이터 호출
    const getBoardList = async() => {
        
        const data = await axios.get(`http://localhost:4000/posts`)

        setBoardList(data.data);
    }

    useEffect(() => {
        getBoardList();
    }, []);

    return (
        <div className="BoardWrap">
            <div className="BoardTb">
                <h3 className="BoardTitle">게시판</h3>
                <table className="tableBoard">
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardList.map((board) => (
                            <BoardList key={board.id} id={board.id} userId={board.userId} title={board.title} />
                            ) )}
                    </tbody>
                </table>
            </div>
            <div className="BoardBtt"> 
                <button>
                    <Link to={`/boardForm`}>글등록</Link> 
                </button>
            </div>
        </div>
    );
}

export default Board;