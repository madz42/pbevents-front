import { width } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";

export const FieldBlock = (props) => {
  //
  const navigate = useNavigate();
  //   console.log("preview image", props.item.id, props.item.preview);

  return (
    <div style={{ padding: "0.5em", width: "20em" }}>
      <p>{props.item.name}</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <Link to={`/view/${props.item.id}`}>
            <img src={props.item.preview} alt="" />
          </Link>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", padding: "0.5em" }}
        >
          <p>
            Bunkers: <br />
            {props.item.total}
          </p>
          <p>
            Created: <br />
            {props.item.createdAt.split("T")[0]}
          </p>

          <button onClick={() => navigate(`/view/${props.item.id}`)}>
            Viewer
          </button>
          <br />
          <button>Planner</button>
          <br />
          <button onClick={() => navigate(`/build/${props.item.id}`)}>
            Builder
          </button>
        </div>
      </div>
    </div>
  );
};
