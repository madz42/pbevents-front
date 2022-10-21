// import { Title } from "../styled"
// import { Link } from "react-router-dom"
import { LinkWord } from "../styled";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../config/constants";

export const SharePage = () => {
  const dispatch = useDispatch();
  const route_params = useParams(); // fid pid
  //   const intro = useSelector(selectIntro);
  const link = {
    web: `linktopewpewpew/share/${route_params.fid}`,
    webTitle: "Link to PewPewPew site",
    svg: `${apiUrl}/field/svg/${route_params.fid}`,
    svgTitle: "Link for SVG file download",
    jpg: `${apiUrl}/field/jpg/${route_params.fid}`,
    jpgTitle: "Link for JPG file download",
  };
  const [share, setShare] = useState({ url: link.web, title: link.webTitle });
  const [field, setField] = useState(null);

  const getFieldInfo = async (id) => {
    try {
      const incoming = await axios.get(`${apiUrl}/field/id/${id}`);
      setField(incoming.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getFieldInfo(route_params.fid);
  }, []);

  if (!field) return <p>LOADING</p>;
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            width: "20%",
          }}
        >
          <div>
            <h3>{field.name}</h3>
            <img src={field.preview} alt="" height={250} width={200} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            width: "50%",
          }}
        >
          <div>
            <br />
            <h3>Get Link to</h3>
            <button
              className="share"
              onClick={() => setShare({ url: link.web, title: link.webTitle })}
            >
              PewPewPew site
            </button>
            <button
              className="share"
              onClick={() => setShare({ url: link.svg, title: link.svgTitle })}
            >
              Donwload SVG file
            </button>
            <button
              className="share"
              onClick={() => setShare({ url: link.jpg, title: link.jpgTitle })}
            >
              Donwload JPG file
            </button>
            <br />
            <br />
            <br />
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${share.url}&size=200x200`}
              alt=""
              title=""
              height={200}
              width={200}
            />
            <h3>{share.title}</h3>
            <p>{share.url}</p>
            <button
              className="share"
              onClick={() => navigator.clipboard.writeText(share.url)}
            >
              Copy to clipboard
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
`;
