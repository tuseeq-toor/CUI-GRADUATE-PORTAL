import { flexbox } from "@mui/system";
import React, { useEffect } from "react";

import synopsisService from "../../API/synopsis";
import ReportPDF from "./ReportPDF";

const ViewSynopsisReport = () => {
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
      <div>
        <ReportPDF />
      </div>
    </div>
  );
};

export default ViewSynopsisReport;
