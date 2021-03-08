import moment from "moment";
import abivin from "../../img/abivin.PNG";
import one_0 from "../../img/one_0.PNG";
import one_1 from "../../img/one_1.PNG";
import one_2 from "../../img/one_2.PNG";
import tripi_0 from "../../img/tripi_0.PNG";
import tripi_1 from "../../img/tripi_1.PNG";
import tripi_2 from "../../img/tripi_2.PNG";
import tripi_3 from "../../img/tripi_3.PNG";
import vr_0 from "../../img/vr_0.PNG";

export const profileData = {
  avatar:
    "https://media-exp1.licdn.com/dms/image/C4D03AQHuKPHRXG7OWA/profile-displayphoto-shrink_800_800/0/1584370726285?e=1620864000&v=beta&t=bjnAcGbF4K1OFY_T29voWbXjdFv_Qabke32lO1UnhVU",
  name: "Vũ Tiến Đại",
  birthday: "01/01/1997",
  school: "VNU University of Science",
  habit: ["Bóng đá", "Bóng bàn", "Chạy bộ", "Karaoke"],
  character: [
    "Cầu toàn",
    "Hòa đồng",
    "thẳng thắn",
    "thật thà",
    "nhiệt huyết",
    "Ghét sự lươn lẹo",
    "Đôi lúc hơi bảo thủ nhưng nếu thấy sai sẽ nhận",
  ],
  plan: [
    "Phát triển bản thân ở một môi trường chuyên nghiệp",
    "Đi sâu vào lĩnh vực mình mong muốn",
    "Được làm việc mới những người tài giỏi",
    "Được làm những việc mình giỏi nhất",
    "Trong 4 năm tới cố găng lên techLead",
    
  ],
  profile: [
    {
      title: "Frontend Developer at Abivin – logistics optimization platform",
      start: 1601538030000,
      end: moment().valueOf(),
      activity: [
        {
          content: [
            "Independently rebuilt the frontend of the website’s company to migrate from Angular V1 to React",
          ],
        },
      ],
    },
    {
      title:
        "Frontend Developer at Tripi.vn – ecommerce site for tickets and tours 	",
      start: 1564645230000,
      end: 1601538030000,
      image: tripi_0,
      activity: [
        {
          title:
            "Project 1: New admin solutions for Tripi’s partners: vending machines management for SunWorld and orders for chain store partners",
          content: [
            "Lead the technical development of both projects, set up the applications’ foundations using React TypeScript with required libraries, routes, and RESTful APIs",
            "Built simulated backend data for testing, automated routing and views based on access privilege",
            "Manage progress in Jira, coach and conduct code reviews for other developers",
          ],
        },
        {
          title:
            "Project 2: Tripi webview for integration into Sacombank’s application (team of 2)",
          content: [
            "Developed the frontend core components and custom themes by using React, Redux, and Materia UI and designed the authentication mechanism",
            "Setup the continuous integration and deployment pipeline with Jenkins and nginx auto deploy",
          ],
        },
        {
          title: "Project 3: Comprehensive redesign (alpha.tripi.vn)",
          content: [
            "Helped exceed the goal of rebuilding core features from 20% to 33% across all platforms – web, Android, and iOS, owned the development of important modules: hotels, tours, promotion, and order management",
            "Collaborated with the design team to improve the user experience and interaction",
          ],
          images: [tripi_0, tripi_1, tripi_2, tripi_3],
        },
        {
          title: "Project 4: Comprehensive redesign (one.tripi.vn)",
          content: [
            "Lead the technical development  set up the applications’ foundations using React TypeScript with required libraries, routes, and RESTful API",
          ],
          images: [one_0, one_1, one_2],
        },
      ],
    },
    {
      title: "Frontend Developer at Abivin – logistics optimization platform",
      start: 1546328430000,
      end: 1559374830000,
      image: abivin,
      activity: [
        {
          content: [
            "Independently rebuilt the frontend of the website’s company to migrate from Angular V1 to React",
          ],
        },
      ],
    },
    {
      title: "Frontend Developer at VRPac",
      time: "March 2018 ㅡ January 2019",
      image: vr_0,
      url: "http://vrpacs.com/",
      start: 1519890030000,
      end: 1546328430000,
      activity: [
        {
          content: [
            "Collaborated with a partner to build a web platform to assist doctors in diagnostic imaging at Viet Xo Friendship Hospital, Hanoi Medical University Hospital, Thai Nguyen Central Hospital, E Hospital Center",
            "Reduced costs for diagnosis imaging by off-loading jobs from servers to GPUs on client’s device",
            "Implemented the core algorithms, used cornerstone, vtk, threeJS to render images",
          ],
          images: [vr_0],
        },
      ],
    },
  ],
};
