import { Button, Carousel, Image, Typography } from "antd";
import React, { useState, useEffect } from "react";

import axios from "axios";
import Modal from "antd/lib/modal/Modal";
import Header from "../../components/Header";
import { DoubleRightOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
const Home = () => {
  const [dsCars, setDsCars] = useState([]);
  const [carDetail, setCarDetail] = useState([]);
  const [idCar, setIdCar] = useState();
  const [visible, setVisible] = useState(false);
  const getDsCars = async () => {
    try {
      const resp = await axios.get(
        `https://cars-rental-api.herokuapp.com/products`,
        {}
      );
      setDsCars(resp?.data?.data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  const getCarDetail = async () => {
    if (idCar) {
      try {
        const resp = await axios.get(
          `https://cars-rental-api.herokuapp.com/products/${idCar}`,
          {}
        );
        setCarDetail([resp?.data?.data?.product]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getCarDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCar]);
  useEffect(() => {
    getDsCars();
  }, []);
  return (
    <div>
      <Header />
      <div>
        <Carousel autoplay>
          <div>
            <img
              src="https://recmiennam.com/wp-content/uploads/2018/04/anh-ly-cafe-buoi-sang-10.jpg"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
          <div>
            <img
              src="https://sieuimba.com/wp-content/uploads/2015/05/12.jpg"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
          <div>
            <img
              src="http://file.hstatic.net/1000135323/article/tra-trai-cay-cac-loai_34fcf3d606084e7880df4cd29a5413e4.jpg"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
          <div>
            <img
              src="https://cdn.beptruong.edu.vn/wp-content/uploads/2019/01/cookie-ice-blended.jpg"
              className="w-full mt-20"
              style={{ height: 500 }}
              alt="ảnh ô tô"
            />
          </div>
        </Carousel>
      </div>
      <div className=" flex justify-center justify-items-center pb-12">
        <div className="w-4/5">
          {/* <div id="4cho" style={{ marginTop: -100 }} className="hidden"></div> */}
          <Typography>Sản phẩm</Typography>

          <div className="grid xl:grid-cols-2 sm:grid-cols-1 xl:gap-x-10">
            {dsCars?.map((e) => {
              return (
                <div className="flex  mt-10 border rounded-md shadow-sm px-3 py-4">
                  <div className="mr-2">
                    <img
                      className="rounded-md shadow-sm "
                      src={e?.image}
                      style={{ height: 250, width: 350 }}
                      alt="ảnh ô tô"
                    />
                  </div>
                  <div>
                    <span>{e?.name}</span>
                    <div>
                      <Button
                        className="mr-2 !text-white !bg-green-500"
                        type="primary"
                        onClick={() => {
                          setVisible(true);
                          setIdCar(e?.id);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <DoubleRightOutlined className="mr-2" />{" "}
                          <span>Xem chi tiết</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        title="Thông tin chi tiết"
        width="1200px"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={false}
      >
        <div className=" border rounded-md shadow-sm px-3 py-4">
          {carDetail?.map((e) => {
            return (
              <div className="flex  ">
                <div className="mr-10">
                  <Image
                    // className="rounded-md shadow-sm "
                    src={e?.image}
                    width={500}
                    alt="Ảnh sản phẩm"
                  />
                </div>
                <div>
                  <div>
                    <span>{e?.name}</span>
                  </div>
                  <div>
                    <p>{e?.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      <Footer />
    </div>
  );
};

export default Home;
