import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  notification,
  Row,
  Select,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { getProduct } from "../../../../service/api.coffee";

function ThemSuaSp({
  setVisible,
  visible,
  dataModal,
  getApiProduct,
  dataCoffee,
}) {
  const [form] = Form.useForm();
  const id = dataModal?.id;
  const loaiDoUong = [
    { value: 1, label: "Cà phê" },
    { value: 2, label: "Cookie" },
    { value: 5, label: "Trà hoa quả" },
    { value: 18, label: "Hộp cà phê" },
    { value: 12, label: "Combo" },
    { value: 9 || 20, label: "Trà sữa" },
    { value: 72 || 10, label: "latte" },
  ];

  console.log(dataCoffee.find((e) => e._id === dataModal?._id));
  const onSubmit = async (data) => {
    if (id) {
      // call api chỉnh sửa
      try {
        await axios.put(
          `https://cars-rental-api.herokuapp.com/products/${id}`,
          data
        );
        getApiProduct();
        setVisible(false);
        onCancel();
        notification.success({
          message: "Chỉnh sửa thành công",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post(
          `https://cars-rental-api.herokuapp.com/products`,
          data
        );
        notification.success({
          message: "Thêm mới thành công!",
        });
        onCancel();
        getApiProduct();
        setVisible(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onCancel = () => {
    setVisible(false);
    form.setFieldsValue({
      name: "",
      categoryId: undefined,
      description: "",
      image: "",
      basePrice: "",
    });
    setImage("");
  };

  const [image, setImage] = useState();
  useEffect(() => {
    if (dataModal?._id) {
      form.setFieldsValue(dataCoffee.find((e) => e._id === dataModal?._id));
      setImage(dataCoffee.find((e) => e._id === dataModal?._id)?.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataModal?._id]);

  return (
    <Modal
      title={dataModal?._id ? "Chỉnh sửa sản phẩm" : "Thêm mới sản phẩm"}
      visible={visible}
      onCancel={onCancel}
      footer={
        <Row>
          <Button onClick={onCancel}>Hủy</Button>
          <Button
            onClick={() => {
              form
                .validateFields()
                .then((data) => {
                  onSubmit(data);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
            htmlType="submit"
            key="submit"
            type="primary"
            // icon={<HiOutlineNewspaper className="mr-1 mb-0.5" />}
          >
            Lưu
          </Button>
        </Row>
      }
    >
      <Form form={form} layout="vertical">
        {dataModal ? (
          image ? (
            <Form.Item label="Ảnh sản phẩm">
              <Image src={image} height={80} width={80} />
            </Form.Item>
          ) : null
        ) : null}
        <Form.Item name="name" label="Tên sản phẩm">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Ghi chú">
          <Input />
        </Form.Item>
        <Form.Item name="categoryId" label="Loại">
          <Select
            options={loaiDoUong.map((e) => ({
              value: e?.value,
              label: e?.label,
            }))}
          />
        </Form.Item>
        <Form.Item name="image" label="Hình ảnh">
          <Input onChange={(e) => setImage(e.target.value)} />
        </Form.Item>
        <Form.Item name="basePrice" label="Giá">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ThemSuaSp;
