import { Button, Form, Image, Input, Modal, notification, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ThemSuaVoucher({ setVisible, visible, dataModal, getApiProduct }) {
  const [form] = Form.useForm();
  console.log(dataModal);
  const id = dataModal?.id;

  const getProductDetail = async () => {
    if (id) {
      try {
        const resp = await axios.get(
          `https://cars-rental-api.herokuapp.com/vouchers/${id}`,
          {}
        );
        console.log(resp);
        form.setFieldsValue(resp?.data?.data?.voucher);
        setImage(resp?.data?.data?.voucher?.img);
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
          `https://cars-rental-api.herokuapp.com/vouchers/${id}`,
          data
        );
        getApiProduct();
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
          `https://cars-rental-api.herokuapp.com/vouchers`,
          data
        );
        notification.success({
          message: "Thêm mới thành công!",
        });
        onCancel();
        getApiProduct();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onCancel = () => {
    setVisible(false);
    form.setFieldsValue({
      title: "",
      description: "",
      img: "",
      discount: "",
    });
    setImage("");
  };

  useEffect(() => {
    if (id) {
      getProductDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const [image, setImage] = useState();
  useEffect(() => {
    setImage(image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <Modal
      title={id ? "Chỉnh sửa Voucher" : "Thêm mới Voucher"}
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
        {image ? (
          <Form.Item label="Ảnh voucher">
            <Image src={image} height={80} width={80} />
          </Form.Item>
        ) : null}
        <Form.Item name="title" label="Tên voucher">
          <Input />
        </Form.Item>
        <Form.Item name="discount" label="Giảm giá">
          <Input />
        </Form.Item>
        <Form.Item name="img" label="Hình ảnh">
          <Input onChange={(e) => setImage(e.target.value)} />
        </Form.Item>
        <Form.Item name="description" label="Ghi chú">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ThemSuaVoucher;
