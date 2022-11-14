import { Link } from "react-router-dom";

function BoardList({ id, userId, title }) {

    return (
        <tr>
            <td className="title">
                <Link to={`/boardForm/${id}`}>{title}</Link>
            </td>
            <td className="writer">{userId}</td>
        </tr>
    )
}

export default BoardList;