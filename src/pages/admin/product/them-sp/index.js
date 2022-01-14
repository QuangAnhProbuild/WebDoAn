import { Button, Form, Image, Input, Modal, notification, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ThemSuaSp({ setVisible, visible, dataModal, getApiProduct }) {
  const [form] = Form.useForm();
  console.log(dataModal);
  const id = dataModal?.id;

  const getProductDetail = async () => {
    if (id) {
      try {
        const resp = await axios.get(
          `https://cars-rental-api.herokuapp.com/products/${id}`,
          {}
        );
        console.log(resp);
        form.setFieldsValue(resp?.data?.data?.product);
        setImage(resp?.data?.data?.product?.image);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
        getApiProduct();
        setVisible(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getProductDetail();
    }
  }, [id]);
  const [image, setImage] = useState();
  useEffect(() => {
    setImage(image);
  }, [id]);
  return (
    <Modal
      title={id ? "Chỉnh sửa sản phẩm" : "Thêm mới sản phẩm"}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={
        <Row>
          <Button onClick={() => setVisible(false)}>Hủy</Button>
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
        {image ? (
          <Form.Item label="Ảnh sản phẩm">
            <Image src={image} height={80} width={80} />
          </Form.Item>
        ) : null}
        <Form.Item name="name" label="Tên sản phẩm">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Ghi chú">
          <Input />
        </Form.Item>
        <Form.Item name="categoryId" label="Loại">
          <Input />
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
