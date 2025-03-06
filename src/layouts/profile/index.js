/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { Row, Col, Typography } from "antd";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";

// Layout components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "components/Footer";
import ProfileInfoCard from "components/Cards/ProfileCards/ProfileInfoCard";
import ProfilesList from "components/Lists/ProfilesList";
import DefaultProjectCard from "components/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

const { Title, Text } = Typography;

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ padding: "24px" }}>
        <Header />
        <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
          <Col xs={24} lg={8}>
            <PlatformSettings />
          </Col>
          <Col xs={24} lg={16}>
            <ProfileInfoCard
              title="Información del Perfil"
              description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: "Alec M. Thompson",
                mobile: "(44) 123 4564 789",
                email: "alecthompson@mail.com",
                location: "USA",
              }}
              social={[
                {
                  platform: "twitter",
                  color: "twitter",
                  icon: "fab fa-twitter",
                  link: "https://twitter.com/creativetim",
                },
                {
                  platform: "facebook",
                  color: "facebook",
                  icon: "fab fa-facebook",
                  link: "https://www.facebook.com/creativetim",
                },
                {
                  platform: "instagram",
                  color: "instagram",
                  icon: "fab fa-instagram",
                  link: "https://www.instagram.com/creativetim",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
          <Col xs={24} md={6}>
            <ProfilesList title="conversations" profiles={profilesListData} />
          </Col>
          <Col xs={24} md={6}>
            <ProfilesList title="message" profiles={profilesListData} />
          </Col>
          <Col xs={24} md={6}>
            <ProfilesList title="message" profiles={profilesListData} />
          </Col>
          <Col xs={24} md={6}>
            <ProfilesList title="message" profiles={profilesListData} />
          </Col>
        </Row>
        <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
          <Col xs={24} md={6}>
            <DefaultProjectCard
              image={homeDecor1}
              label="project #2"
              title="modern"
              description="As Uber works through a huge amount of internal management turmoil."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view project",
              }}
              authors={[
                { image: team1, name: "Elena Morison" },
                { image: team2, name: "Ryan Milly" },
                { image: team3, name: "Nick Daniel" },
                { image: team4, name: "Peterson" },
              ]}
            />
          </Col>
          <Col xs={24} md={6}>
            <DefaultProjectCard
              image={homeDecor2}
              label="project #1"
              title="scandinavian"
              description="Music is something that every person has his or her own specific opinion about."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view project",
              }}
              authors={[
                { image: team3, name: "Nick Daniel" },
                { image: team4, name: "Peterson" },
                { image: team1, name: "Elena Morison" },
                { image: team2, name: "Ryan Milly" },
              ]}
            />
          </Col>
          <Col xs={24} md={6}>
            <DefaultProjectCard
              image={homeDecor3}
              label="project #3"
              title="minimalist"
              description="Different people have different taste, and various types of music."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view project",
              }}
              authors={[
                { image: team4, name: "Peterson" },
                { image: team1, name: "Elena Morison" },
                { image: team2, name: "Ryan Milly" },
                { image: team3, name: "Nick Daniel" },
              ]}
            />
          </Col>
          <Col xs={24} md={6}>
            <DefaultProjectCard
              image={homeDecor4}
              label="project #4"
              title="gothic"
              description="Why would anyone pick blue over pink? Pink is obviously a better color."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view project",
              }}
              authors={[
                { image: team4, name: "Peterson" },
                { image: team3, name: "Nick Daniel" },
                { image: team2, name: "Ryan Milly" },
                { image: team1, name: "Elena Morison" },
              ]}
            />
          </Col>
        </Row>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
