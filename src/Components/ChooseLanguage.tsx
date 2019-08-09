import React from "react";
import { AppState } from "./Store";
import { change_input } from "./ActionCreators/ActionCreators";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";

interface mapStateToProps {}
interface mapDispatchToProps {
  change_input: typeof change_input;
}

type AppProps = mapStateToProps & mapDispatchToProps;

function ChooseLanguage(props: AppProps) {
  const handleClick = (lang: string) => {
    console.log(lang);
    localStorage.setItem("LangTS", lang);
    props.change_input("lang", lang);
  };
  return (
    <div style={{ marginLeft: "75%", marginTop: "2%" }}>
      <Dropdown>
        <Dropdown.Toggle
          variant="info"
          className="btn btn-outline-light text-light"
          id="dropdown-basic"
          style={{
            width: "10rem",
            background: "rgba(255, 255, 255, 0.4)"
          }}
        >
          {localStorage.getItem("LangTS") === "en" && "English"}
          {localStorage.getItem("LangTS") === "ru" && "Russian"}
          {localStorage.getItem("LangTS") === "es" && "Spanish"}
          {localStorage.getItem("LangTS") === "fi" && "Finnish"}
          {localStorage.getItem("LangTS") === null && "English"}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ background: "rgba(255, 255, 255, 0.4)" }}>
          <Dropdown.Item
            href="#"
            className="btn btn-info text-center"
            style={{
              backgroundColor: "#54b9f85f"
            }}
            onMouseOver={(e: any) => {
              e.target.classList.add("shadow", "text-info");
            }}
            onMouseOut={(e: any) => {
              e.target.classList.remove("shadow", "text-info");
            }}
          >
            <div
              className="btn btn-outline-light text-white text-center"
              style={{ width: "7rem" }}
              onClick={() => {
                handleClick("en");
              }}
            >
              English
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            href="#"
            className="btn btn-info text-center"
            style={{
              backgroundColor: "#54b9f85f"
            }}
            onMouseOver={(e: any) => {
              e.target.classList.add("shadow", "text-info");
            }}
            onMouseOut={(e: any) => {
              e.target.classList.remove("shadow", "text-info");
            }}
          >
            <div
              className="btn btn-outline-light text-white text-center"
              style={{ width: "7rem" }}
              onClick={() => {
                handleClick("ru");
              }}
            >
              Russian
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            href="#"
            className="btn btn-info text-center"
            style={{
              backgroundColor: "#54b9f85f"
            }}
            onMouseOver={(e: any) => {
              e.target.classList.add("shadow", "text-info");
            }}
            onMouseOut={(e: any) => {
              e.target.classList.remove("shadow", "text-info");
            }}
          >
            <div
              className="btn btn-outline-light text-white text-center"
              style={{ width: "7rem" }}
              onClick={() => {
                handleClick("es");
              }}
            >
              Spanish
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            href="#"
            className="btn btn-info text-center"
            style={{
              backgroundColor: "#54b9f85f"
            }}
            onMouseOver={(e: any) => {
              e.target.classList.add("shadow", "text-info");
            }}
            onMouseOut={(e: any) => {
              e.target.classList.remove("shadow", "text-info");
            }}
          >
            <div
              className="btn btn-outline-light text-white text-center"
              style={{ width: "7rem" }}
              onClick={() => {
                handleClick("fi");
              }}
            >
              Finnish
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToProps => ({
  ...bindActionCreators({ change_input }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseLanguage);
