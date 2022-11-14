const BoardDetail = ({ id, userId, title, body, onChange }) => {

    return (
        <div className="BoardBox">
            <div>
                <p>제목</p>
                <input name="title" defaultValue={title} onChange={onChange}/>
            </div>
            <div>
                <p>내용</p>
                <textarea name="body" defaultValue={body} onChange={onChange}/>
            </div>
        </div> 
    )
}

export default BoardDetail;