import { flexbox } from "@mui/system";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";
import comsatsLogo from "../../../src/cui.png";
import synopsisService from "../../API/synopsis";

const ref = React.createRef();

function ViewSynopsisReport() {
  useEffect(() => {
    async function fetchData() {
      const res = await synopsisService.getSynopsisEvaluations();
    }
    fetchData();
  }, []);

  const data = {
    candidateName: "Waqas Zafar",
    registrationNumber: "FA18-BCS-107",
    supervisor: "Dr. Nadeem Javaid",
    dated: "Mar 18, 2022",
    synopsisTitle:
      "Efficient Electricity Theft Detection in Smart Grids using Data Driven Models",
    recommendations: [
      {
        comment:
          'The problem statement focuses on class imbalance, dimension reduction. These are generic issues. Rather the candidate should focus on the limitations of the techniques in literature. The manuscipt is written in a bt informal way. For example in the sentence "Therefore, ETD is an important thing and needs immediate attention to avoid ever-increasing electricity theft rate. Keeping this" avoid using the words like "thing" etc. Comparisons should be done with the relevant baseline techniques rather than any arbitrary techniques. Discussion on handling the identical issues should be is a way such that they are aligned with the objectives of the proposed research.',
        evaluatorName: "Dr. Assad Abbas",
        evaluationStatus: "Minor Changings",
        isRequiredAgain: "No",
      },
      {
        comment:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        evaluatorName: "Dr. Basit Raza",
        evaluationStatus: "Major Changings",
        isRequiredAgain: "Yes",
      },
    ],
  };

  return (
    <div className="App">
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      <div
        ref={ref}
        style={{
          width: "50rem",
          paddingLeft: "0.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={comsatsLogo} style={{ width: "12rem" }} />
          <h2
            style={{
              textAlign: "center",
              marginLeft: "12rem",
              color: "#6B57A2",
            }}
          >
            Synopsis Evaluation
          </h2>
        </div>
        {/* First Row */}
        <div
          style={{
            marginLeft: "0.5rem",
            display: "flex",
            alignItems: "center",
            marginTop: "2rem",
            marginBottom: "0rem",
          }}
        >
          <div
            style={{
              width: "21rem",
              marginTop: "0rem",
              marginBottom: "0rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                marginRight: "1rem",
                marginTop: "0rem",
                marginBottom: "0rem",
              }}
            >
              Candidate:{" "}
            </h3>
            <p style={{ marginTop: "0rem", marginBottom: "0rem" }}>
              {data.candidateName}
            </p>
          </div>
          <h3
            style={{
              marginRight: "1rem",
              marginTop: "0rem",
              marginBottom: "0rem",
            }}
          >
            Registration Number:
          </h3>
          <p style={{ marginTop: "0rem", marginBottom: "0rem" }}>
            {data.registrationNumber}
          </p>
        </div>
        {/* Second Row */}
        <div
          style={{
            marginLeft: "0.5rem",
            display: "flex",
            alignItems: "center",
            marginTop: "0rem",
            marginBottom: "0rem",
          }}
        >
          <div
            style={{
              width: "21rem",
              marginTop: "0rem",
              marginBottom: "0rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                marginRight: "1rem",
                marginTop: "0rem",
                marginBottom: "0rem",
              }}
            >
              Supervisor:{" "}
            </h3>
            <p style={{ marginTop: "0rem", marginBottom: "0rem" }}>
              {data.supervisor}
            </p>
          </div>
          <h3
            style={{
              marginRight: "1rem",
              marginTop: "0rem",
              marginBottom: "0rem",
            }}
          >
            Dated:
          </h3>
          <p>{data.dated}</p>
        </div>
        {/* Third Row */}
        <div
          style={{
            marginLeft: "0.5rem",
            display: "flex",
            alignItems: "center",
            marginTop: "0rem",
            marginBottom: "0rem",
          }}
        >
          <h3
            style={{
              marginRight: "1rem",
              marginTop: "0rem",
              marginBottom: "0rem",
            }}
          >
            Synopsis Title:
          </h3>
          <p style={{ marginTop: "0rem", marginBottom: "0rem" }}>
            {data.synopsisTitle}
          </p>
        </div>
        {/* 4th Row */}
        <div
          style={{
            marginLeft: "0.5rem",
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            marginBottom: "0rem",
          }}
        >
          <h3
            style={{
              marginRight: "1rem",
              marginTop: "0rem",
              marginBottom: "0rem",
            }}
          >
            After in depth examination of the manuscript following are the
            recommendations of the GAC member(s)
          </h3>
        </div>
        {/* 5th Row */}
        {data.recommendations.map((item) => (
          <div>
            <div
              style={{
                marginLeft: "0.5rem",
                display: "flex",
                alignItems: "center",
                marginTop: "2rem",
                marginBottom: "0rem",
              }}
            >
              <div
                style={{
                  width: "14rem",
                  marginTop: "0rem",
                  marginBottom: "0rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    marginTop: "0rem",
                    marginBottom: "0rem",
                    fontWeight: "bold",
                  }}
                >
                  {item.evaluatorName}
                </p>
              </div>
              <div
                style={{
                  width: "23rem",
                  marginTop: "0rem",
                  marginBottom: "0rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    marginRight: "1rem",
                    marginTop: "0rem",
                    marginBottom: "0rem",
                    fontSize: "1.1rem",
                  }}
                >
                  Recommendation:
                </h3>
                <p
                  style={{
                    marginTop: "0rem",
                    marginBottom: "0rem",
                  }}
                >
                  {item.evaluationStatus}
                </p>
              </div>
              <div
                style={{
                  width: "19rem",
                  marginTop: "0rem",
                  marginBottom: "0rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    marginRight: "1rem",
                    marginTop: "0rem",
                    marginBottom: "0rem",
                    fontSize: "1.1rem",
                  }}
                >
                  Is Required Again:
                </h3>
                <p
                  style={{
                    marginTop: "0rem",
                    marginBottom: "0rem",
                    fontWeight: "bold",
                  }}
                >
                  {item.isRequiredAgain}
                </p>
              </div>
            </div>
            <h3
              style={{
                marginRight: "1rem",
                marginTop: "0rem",
                marginBottom: "0rem",
                fontSize: "1.1rem",
                marginLeft: "0.5rem",
              }}
            >
              Comment:
            </h3>
            <div
              style={{
                marginLeft: "0.5rem",
                display: "flex",
                alignItems: "center",
                marginBottom: "0rem",
              }}
            >
              {item.comment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewSynopsisReport;
