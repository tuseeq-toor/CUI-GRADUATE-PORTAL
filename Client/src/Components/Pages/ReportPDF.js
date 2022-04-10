import { Button } from "@mui/material";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import comsatsLogo from "../../../src/cui.png";
import "../../Components/UI/ActiveTab.css";

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

const ReportPDF = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div ref={componentRef} className="pdf">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={comsatsLogo}
            alt=""
            style={{ objectFit: "contain", height: "6rem" }}
          />
          <h2
            style={{
              textAlign: "center",
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
            marginBottom: "0",
          }}
        >
          <div
            style={{
              width: "21rem",
              marginTop: "0",
              marginBottom: "0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                marginRight: "1rem",
                marginTop: "0",
                marginBottom: "0",
              }}
            >
              Candidate:{" "}
            </h3>
            <p style={{ marginTop: "0", marginBottom: "0" }}>
              {data.candidateName}
            </p>
          </div>
          <h3
            style={{
              marginRight: "1rem",
              marginTop: "0",
              marginBottom: "0",
            }}
          >
            Registration Number:
          </h3>
          <p style={{ marginTop: "0", marginBottom: "0" }}>
            {data.registrationNumber}
          </p>
        </div>
        {/* Second Row */}
        <div
          style={{
            marginLeft: "0.5rem",
            display: "flex",
            alignItems: "center",
            marginTop: "0",
            marginBottom: "0",
          }}
        >
          <div
            style={{
              width: "21rem",
              marginTop: "0",
              marginBottom: "0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                marginRight: "1rem",
                marginTop: "0",
                marginBottom: "0",
              }}
            >
              Supervisor:{" "}
            </h3>
            <p style={{ marginTop: "0", marginBottom: "0" }}>
              {data.supervisor}
            </p>
          </div>
          <h3
            style={{
              marginRight: "1rem",
              marginTop: "0",
              marginBottom: "0",
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
            marginTop: "0",
            marginBottom: "0",
          }}
        >
          <h3
            style={{
              marginRight: "1rem",
              marginTop: "0",
              marginBottom: "0",
            }}
          >
            Synopsis Title:
          </h3>
          <p style={{ marginTop: "0", marginBottom: "0" }}>
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
            marginBottom: "0",
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
                  marginTop: "0",
                  marginBottom: "0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    marginTop: "0",
                    marginBottom: "0",
                    fontWeight: "bold",
                  }}
                >
                  {item.evaluatorName}
                </p>
              </div>
              <div
                style={{
                  width: "23rem",
                  marginTop: "0",
                  marginBottom: "0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    marginRight: "1rem",
                    marginTop: "0",
                    marginBottom: "0",
                    fontSize: "1.1rem",
                  }}
                >
                  Recommendation:
                </h3>
                <p
                  style={{
                    marginTop: "0",
                    marginBottom: "0",
                  }}
                >
                  {item.evaluationStatus}
                </p>
              </div>
              <div
                style={{
                  width: "19rem",
                  marginTop: "0",
                  marginBottom: "0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    marginRight: "1rem",
                    marginTop: "0",
                    marginBottom: "0",
                    fontSize: "1.1rem",
                  }}
                >
                  Is Required Again:
                </h3>
                <p
                  style={{
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
                marginTop: "0",
                marginBottom: ".5rem",
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
                marginBottom: "0",
                textAlign: "justify",
              }}
            >
              {item.comment}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", placeContent: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mb: 2 }}
          onClick={handlePrint}
        >
          Print/Download PDF
        </Button>
      </div>
    </>
  );
};

export default ReportPDF;
