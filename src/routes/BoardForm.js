import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BoardDetail from "../components/BoardDetail";
import "./BoardForm.css";

const BoardForm = () => {
    
    const [boardDtl , setBoardDtl] = useState([]);
    const [detail   , setDetail]   = useState(false);
    const [boardInfo, setBoardInfo] = useState({
        userId : 0,
        id     : 0,
        title  : "",
        body   : "",
      });

    const { id } = useParams();
    const getBoardDetail = async() => {

        const data = await axios.get(`http://localhost:4000/posts?id=${id}`)

        if (data.data.length > 0) {
            setBoardDtl(data.data);
            setDetail(true);
            
        }
    }
    
    // 상세정보 호출
    useEffect(() => {
        getBoardDetail();

    }, []);

    // 들어온 상세데이터 set
    useEffect(() => {
        for (let i = 0; i < boardDtl.length; i++) {
            const data = boardDtl[i];
            setBoardInfo({
                userId : data.userId,
                id     : data.id,
                title  : data.title,
                body   : data.body
              })
          } 
    }, [boardDtl])

    // 입력 값 
    const onChange = (e) => {

        setBoardInfo({
            ...boardInfo,
            [e.target.name]: e.target.value
        });

    }

    // 빈값 체크
    const chkValue = () => {
        if (boardInfo.title.trim() === "") {
            alert("제목을 입력하세요.");
            return false;
        };

        if (boardInfo.body.trim() === "") {
            alert("내용을 입력하세요.");
            return false;
        };

        return true;    
    }

    const onClick = (e) => {
        
        if (!chkValue()) {
            return;
        }

        if (e.target.name === "regBoard") {
            fnRegPost();
            alert("게시글을 정상적으로 등록하였습니다.");
        
        } else if (e.target.name === "updBoard") {
            fnUpdatePost();
            alert("게시글을 정상적으로 수정하였습니다.");
        
        
        } else if (e.target.name === "dltBoard") {
            fnDeletePost();
            alert("게시글을 정상적으로 삭제하였습니다.");
        }
    }

    // 등록
    const fnRegPost =  async(e) => {

        await axios.post(`http://localhost:4000/posts`, boardInfo)
                                .then((res) => { console.log(res) })
                                .catch((error) => { console.log(error) })
    }

    // 수정
    const fnUpdatePost = async(e) => {

        await axios.put(`http://localhost:4000/posts/${boardInfo.id}`, boardInfo)
                                .then((res) => { console.log(res); })
                                .catch((error) => { console.log(error) })
    };

    // 삭제
    const fnDeletePost = async(e) => {
        
        await axios.delete(`http://localhost:4000/posts/${boardInfo.id}`);
    };
    
    return (
        <div className="formWrap">

            {detail ?  boardDtl.map((board) => (
                <BoardDetail key={board.id} id={board.id} userId={board.userId} title={board.title} body={board.body} onChange={onChange}/>
            ) )
             : <div className="BoardBox">
                    <div>
                        <p>제목</p>
                        <input name="title" onChange={onChange} />
                    </div>
                    <div>
                        <p>내용</p>
                        <textarea name="body" onChange={onChange}/>
                    </div>
                </div>
            }

            <div>
                { detail ?  
                    <Link to={`/`}>
                        <button name="updBoard" onClick={onClick}>수정</button>
                    </Link> 
                :
                    <Link to={`/`}>
                        <button name="regBoard" onClick={onClick}>등록</button>
                    </Link>
                }           
                <button><Link to={`/`}>목록</Link></button>
                { detail ?
                    <Link to={`/`}>
                        <button name="dltBoard" onClick={onClick}>삭제</button>
                    </Link>
                 : 
                    null
                }
            </div>
        </div>
    );
}

export default BoardForm;