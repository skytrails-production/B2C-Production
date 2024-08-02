// import React, { useState } from "react";
// import { Layout, Menu, Avatar, message, Button, Modal } from "antd";
// import {
//   DashboardOutlined,
//   FileAddOutlined,
//   FileSearchOutlined,
//   SettingOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import "./InventoryDashboard.css";
// import InventoryHotelForm from "./InventoryHotelForm";
// import whiteLogo from "./whiteLogo.png";
// import AllInventory from "./AllInventory";
// import { useNavigate } from "react-router-dom";
// import { apiURL } from "../../Constants/constant"; // Import your API URL constant here
// const { Header, Sider, Content } = Layout;

// const InventoryDashboard = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedMenu, setSelectedMenu] = useState("1");
//   const [data, setData] = useState([]); // Assuming you have state to hold inventory data
//   const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
//   const [isModalVisibleLogout, setIsModalVisibleLogout] = useState(false); // State to control modal visibility
//   const navigate = useNavigate();

//   const handleMenuClick = (e) => {
//     setSelectedMenu(e.key);
//   };

//   const renderContent = () => {
//     switch (selectedMenu) {
//       case "1":
//         return <div>Dashboard Content</div>;
//       case "2":
//         return <InventoryHotelForm />;
//       case "3":
//         return <AllInventory />;
//       case "4":
//         return <div>Settings Content</div>;
//       default:
//         return <div>Dashboard Content</div>;
//     }
//   };

//   const handleDeleteProfile = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       message.error("No token found. Please login first.");
//       return;
//     }
//     try {
//       const response = await fetch(
//         `${apiURL.baseURL}/skyTrails/api/inventory/deletPartnerData`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//         }
//       );

//       const responseData = await response.json();
//       console.log("Delete Response:", responseData); // Log the response from the server

//       if (response.ok) {
//         message.success("Inventory deleted successfully");
//         navigate("/inventoryLogin");
//       } else {
//         message.error(
//           responseData.responseMessage || "Failed to delete inventory"
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting inventory:", error);
//       message.error("Failed to delete inventory. Please try again.");
//     }
//   };

//   const showDeleteProfileModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     handleDeleteProfile();
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   //Logout
//   const showLogoutModal = () => {
//     setIsModalVisibleLogout(true);
//   };
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/inventoryLogin");
//   };

//   const handleOkLogout = () => {
//     setIsModalVisibleLogout(false);
//     // Add your logout logic here
//     handleLogout();
//   };

//   const handleCancelLogout = () => {
//     setIsModalVisibleLogout(false);
//   };
//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={setCollapsed}
//         width={200}
//         // style={{ position: "fixed",minHeight: "100vh" }}
//       >
//         <div className="Inventorylogo">
//           <img src={whiteLogo} alt="Logo" className="logo-image" />
//         </div>
//         <Menu
//           theme="dark"
//           defaultSelectedKeys={["1"]}
//           mode="inline"
//           onClick={handleMenuClick}
//         >
//           <Menu.Item key="1" icon={<DashboardOutlined />}>
//             Dashboard
//           </Menu.Item>
//           <Menu.Item key="2" icon={<FileAddOutlined />}>
//             Add Inventory
//           </Menu.Item>
//           <Menu.Item key="3" icon={<FileSearchOutlined />}>
//             View Inventory
//           </Menu.Item>
//           <Menu.Item key="4" icon={<SettingOutlined />}>
//             Settings
//           </Menu.Item>
//         </Menu>
//       </Sider>
//       <Layout className="site-layout">
//         <Header
//           className="site-layout-background"
//           style={{ padding: 0, border: "2px solid red" }}
//         >
//           <div
//             style={{
//               float: "right",
//               marginRight: 20,
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <Avatar icon={<UserOutlined />} onClick={showDeleteProfileModal} />
//             <span
//               style={{ color: "white", cursor: "pointer" }}
//               onClick={showDeleteProfileModal}
//             >
//               Profile
//             </span>
//             <Button
//               type="link"
//               onClick={showLogoutModal}
//               style={{ color: "white", marginLeft: 16 }}
//             >
//               Logout
//             </Button>
//           </div>
//         </Header>
//         <Modal
//           title="Confirm Logout"
//           visible={isModalVisibleLogout}
//           onOk={handleOkLogout}
//           onCancel={handleCancelLogout}
//           okText="Yes"
//           cancelText="No"
//         >
//           <p>Are you sure you want to logout?</p>
//         </Modal>

//         <Content className="site-layout-content">
//           <div
//             className="site-layout-background"
//             style={{ padding: 24, minHeight: 360 }}
//           >
//             {renderContent()}
//           </div>
//         </Content>
//       </Layout>
//       <Modal
//         title="Delete Profile"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText="Yes, Delete"
//         cancelText="Cancel"
//       >
//         <p>Are you sure you want to delete your profile?</p>
//       </Modal>
//     </Layout>
//   );
// };

// export default InventoryDashboard;

import React, { useState } from "react";
import { Layout, Menu, Avatar, message, Button, Modal } from "antd";
import {
  DashboardOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./InventoryDashboard.css";
import InventoryHotelForm from "./InventoryHotelForm";
import whiteLogo from "./whiteLogo.png";
import AllInventory from "./AllInventory";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../Constants/constant"; // Import your API URL constant here

const { Header, Sider, Content } = Layout;

const InventoryDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("1");
  const [data, setData] = useState([]); // Assuming you have state to hold inventory data
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [isModalVisibleLogout, setIsModalVisibleLogout] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "1":
        return <div>Dashboard Content</div>;
      case "2":
        return <InventoryHotelForm />;
      case "3":
        return <AllInventory />;
      case "4":
        return <div>Settings Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  const handleDeleteProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No token found. Please login first.");
      return;
    }
    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/api/inventory/deletPartnerData`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      const responseData = await response.json();
      console.log("Delete Response:", responseData); // Log the response from the server

      if (response.ok) {
        message.success("Inventory deleted successfully");
        navigate("/inventoryLogin");
      } else {
        message.error(
          responseData.responseMessage || "Failed to delete inventory"
        );
      }
    } catch (error) {
      console.error("Error deleting inventory:", error);
      message.error("Failed to delete inventory. Please try again.");
    }
  };

  const showDeleteProfileModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    handleDeleteProfile();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //Logout
  const showLogoutModal = () => {
    setIsModalVisibleLogout(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/inventoryLogin");
  };

  const handleOkLogout = () => {
    setIsModalVisibleLogout(false);
    // Add your logout logic here
    handleLogout();
  };

  const handleCancelLogout = () => {
    setIsModalVisibleLogout(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={200}
        className="fixed-sider"
      >
        <div className="Inventorylogo">
          <img src={whiteLogo} alt="Logo" className="logo-image" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<FileAddOutlined />}>
            Add Inventory
          </Menu.Item>
          <Menu.Item key="3" icon={<FileSearchOutlined />}>
            View Inventory
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background fixed-header"
          style={{ padding: 0 }}
        >
          <div
            style={{
              marginRight: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "62.5rem" }}>
              <Avatar
                icon={<UserOutlined />}
                onClick={showDeleteProfileModal}
              />
              <span
                style={{ color: "white", cursor: "pointer" }}
                onClick={showDeleteProfileModal}
              >
                Profile
              </span>
              <Button
                type="link"
                onClick={showLogoutModal}
                style={{ color: "white", marginLeft: 16 }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Header>
        <Modal
          title="Confirm Logout"
          visible={isModalVisibleLogout}
          onOk={handleOkLogout}
          onCancel={handleCancelLogout}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to logout?</p>
        </Modal>

        <Content className="site-layout-content">
          <div
            className="site-layout-background content-scroll"
            style={{ padding: 24 }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
      <Modal
        title="Delete Profile"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete your profile?</p>
      </Modal>
    </Layout>
  );
};

export default InventoryDashboard;
