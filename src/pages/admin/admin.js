import { Tabs, Card, Typography } from "antd";
import React from "react";
// import axios from "axios";
import Product from "./product";
import Voucher from "./voucher";
import Header from "../../components/Header";
import Store from "./store";

const Admin = () => {
  const { TabPane } = Tabs;
  // const [dsCars, setDsCars] = useState([]);
  // const getDsProduct = async () => {
  //   try {
  //     const resp = await axios.get(
  //       `https://cars-rental-api.herokuapp.com/products`,
  //       {}
  //     );
  //     setDsCars(resp?.data?.data?.cars);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const getCarDetail = async () => {
  //   if (idCar) {
  //     try {
  //       const resp = await axios.get(
  //         `https://cars-rental-api.herokuapp.com/cars/${idCar}`,
  //         {}
  //       );
  //       setDarDetail(resp?.data?.data?.car);
  //       form.setFieldsValue(resp?.data?.data?.car);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // // call api danh sách hãng
  // const getDsCarsVendors = async () => {
  //   try {
  //     const resp = await axios.get(
  //       `https://cars-rental-api.herokuapp.com/vendors`,
  //       {}
  //     );
  //     setDsCarsVendors(resp?.data?.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onSubmit = async (data) => {
  //   if (idCar) {
  //     // call api chỉnh sửa
  //     try {
  //       await axios.put(
  //         `https://cars-rental-api.herokuapp.com/cars/${idCar}`,
  //         data
  //       );
  //       getDsCars();
  //       getCarDetail();
  //       notification.success({
  //         message: "Chỉnh sửa thành công",
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     // call api thêm mới
  //     try {
  //       await axios.post(`https://cars-rental-api.herokuapp.com/cars`, data);

  //       getDsCars();

  //       notification.success({
  //         message: "Thêm mới thành công!",
  //       });
  //       setVisible(false);
  //       setUrlImage(undefined);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // //call api xóa
  // const onDelete = async () => {
  //   if (idCarDelete) {
  //     try {
  //       await axios.delete(
  //         `https://cars-rental-api.herokuapp.com/cars/${idCarDelete}`,
  //         {}
  //       );
  //       getDsCars();
  //       notification.success({
  //         message: "Xóa Thành công",
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // const searchData = (searchName, data) => {
  //   let filterData = [];
  //   for (var i = 0; i < dsCars?.length; i++) {
  //     searchName = searchName.toLowerCase();
  //     var full_address = dsCars[i].name.toLowerCase();
  //     if (full_address.includes(searchName)) {
  //       filterData.push(data[i]);
  //     }
  //   }
  //   return filterData;
  // };
  // const [dsData, setDsData] = useState([]);
  // useEffect(() => {
  //   var storeName = searchData(searchName, dsCars);
  //   setDsData(storeName);
  // }, [searchName]);
  // function callback(key) {
  //   console.log(key);
  // }
  return (
    <div>
      <Header />
      <div className="">
        <Card
          title={
            <div>
              <Typography.Title level={3}>
                QUẢN LÝ ỨNG DỤNG THE COFFEE HOUSE
              </Typography.Title>
            </div>
          }
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab={<div className="w-24 ml-8">Sản phẩm</div>} key="1">
              <Product />
            </TabPane>
            <TabPane tab={<div className="w-24 ml-8">Khuyến mãi</div>} key="2">
              <Voucher />
            </TabPane>
            <TabPane tab={<div className="w-24 ml-8">Cửa hàng</div>} key="3">
              <Store />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
