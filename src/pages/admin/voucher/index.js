import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Row,
  Input,
  Form,
  Modal,
  notification,
  Image,
} from "antd";
import axios from "axios";
import ThemSuaVoucher from "./them-voucher";
import { HiOutlineTrash, HiPencil } from "react-icons/hi";

export default function Voucher() {
  const columns = [
    {
      title: "STT",
      align: "center",
      width: 50,
      render: (text, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 250,
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      render: (text) => <Image src={text} height={50} width={50} />,
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (text) => (
        <div>
          {text < 101
            ? `${text}%`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : `${text}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      ),
    },
    {
      title: "Ghi chú",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "",
      key: "",
      width: 90,
      render: (text, record) => (
        <Row>
          <Button
            icon={<HiPencil className="ml-1.5" />}
            type="primary"
            onClick={() => {
              setShowModalProduct(true);
              setDataModal(record);
            }}
          />
          <Button
            className="ml-2"
            type="primary"
            danger
            onClick={() => {
              setVisible(true);
              setDataModal(record);
            }}
            icon={<HiOutlineTrash className="ml-1.5" />}
          />
        </Row>
      ),
    },
  ];
  const [visible, setVisible] = useState(false);
  const [dataModal, setDataModal] = useState();
  const [dsVoucher, setDsVoucher] = useState();
  const [loading, setLoading] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);

  const getDsVoucher = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://cars-rental-api.herokuapp.com/vouchers`,
        {}
      );
      setDsVoucher(res.data.data.vouchers);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDsVoucher();
  }, []);

  const onDelete = async () => {
    if (dataModal?.id) {
      try {
        await axios.delete(
          `https://cars-rental-api.herokuapp.com/vouchers/${dataModal?.id}`,
          {}
        );
        getDsVoucher();
        notification.success({
          message: "Xóa Thành công",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [search, setSearch] = useState();
  const [searchDC, setSearchDC] = useState();
  const [dsTable, setDsTable] = useState([]);

  const searchData = (search, data) => {
    let filterData = [];
    for (var i = 0; i < dsVoucher?.length; i++) {
      search = search.toLowerCase();
      var name = dsVoucher[i].title.toLocaleLowerCase();
      if (name.includes(search)) {
        filterData.push(data[i]);
      }
    }
    return filterData;
  };

  const searchDChi = (search, data) => {
    let filterData = [];
    for (var i = 0; i < dsVoucher?.length; i++) {
      search = search.toLowerCase();
      var name = dsVoucher[i].discount.toString().toLocaleLowerCase();
      if (name.includes(search)) {
        filterData.push(data[i]);
      }
    }
    return filterData;
  };

  useEffect(() => {
    if (searchDC) {
      let b = searchDChi(searchDC, dsVoucher);
      setDsTable(b);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDC]);

  useEffect(() => {
    if (search) {
      let b = searchData(search, dsVoucher);
      setDsTable(b);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <Form layout="vertical">
        <Row className="justify-end">
          <Button
            type="primary"
            onClick={() => setShowModalProduct(true)}
            className="w-32"
          >
            Thêm mới
          </Button>
        </Row>
        <div className="grid grid-cols-2 gap-10">
          <Form.Item label="Tên voucher">
            <Input onChange={(e) => setSearch(e.target.value)} />
          </Form.Item>
          <Form.Item label="Giảm giá">
            <Input onChange={(e) => setSearchDC(e.target.value)} />
          </Form.Item>
        </div>

        <Table
          columns={columns}
          bordered
          size="small"
          dataSource={search || searchDC ? dsTable : dsVoucher}
          loading={loading}
        />
      </Form>
      <ThemSuaVoucher
        visible={showModalProduct}
        setVisible={setShowModalProduct}
        dataModal={dataModal}
        getApiProduct={getDsVoucher}
      />
      <Modal
        title="Xóa thông tin xe"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          setVisible(false);
          onDelete();
        }}
      >
        <div>
          <span>
            Bạn có muốn xóa{" "}
            <span className="underline text-blue-500">{dataModal?.code} </span>
            <span className="underline text-blue-500">
              {dataModal?.name}
            </span>{" "}
            hay không ?
          </span>
        </div>
      </Modal>
    </div>
  );
}
