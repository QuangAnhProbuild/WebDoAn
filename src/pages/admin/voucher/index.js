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
import { getList } from "../../../service/api";
import { getProduct } from "../../../service/api.coffee";
import ThemSuaVoucher from "./them-voucher";
import { HiOutlineTrash, HiPencil } from "react-icons/hi";

export default function Voucher() {
  const columns = [
    {
      title: "STT",
      align: "center",
      render: (text, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
    },
    {
      title: "Giá",
      dataIndex: "base_price",
      key: "base_price",
      render: (text) => (
        <div>{`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image src={text} height={50} width={50} />,
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
  const [dataTable, setDataTable] = useState([]);
  const [dataCoffee, setDataCoffee] = useState([]);
  const [dsTable, setDsTable] = useState();
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [searchMoney, setSearchMoney] = useState();
  const [showModalProduct, setShowModalProduct] = useState(false);
  const getApiProduct = async () => {
    try {
      const result = await getList();
      setDataTable(result.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApiProduct();
  }, []);

  const getApiCoffee = async () => {
    try {
      setLoading(true);
      const res = await getProduct();
      setDataCoffee(res.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getApiCoffee();
  }, []);

  const dataAll = dataTable
    .map((e) => ({
      ...e,
      base_price: e?.basePrice ? e?.basePrice.toString() : `${0}`.toString(),
      product_name: e?.name,
    }))
    .concat(
      dataCoffee?.map((e) => ({
        ...e,
        name: e?.product_name,
        base_price: e?.base_price.toString(),
      }))
    );

  const searchData = (search, data) => {
    let filterData = [];
    for (var i = 0; i < dataAll?.length; i++) {
      search = search.toLowerCase();
      var name = dataAll[i].name.toLocaleLowerCase();
      if (name.includes(search)) {
        filterData.push(data[i]);
      }
    }
    return filterData;
  };
  const SearchMoney = (searchMoney, data) => {
    let filterData = [];
    for (var i = 0; i < dataAll?.length; i++) {
      var base_price = dataAll[i].base_price;
      if (base_price.includes(searchMoney)) {
        filterData.push(data[i]);
      }
    }
    return filterData;
  };

  const onDelete = async () => {
    if (dataModal?.id) {
      try {
        await axios.delete(
          `https://cars-rental-api.herokuapp.com/products/${dataModal?.id}`,
          {}
        );
        getApiProduct();
        notification.success({
          message: "Xóa Thành công",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (searchMoney) {
      let b = SearchMoney(searchMoney, dataAll);
      setDsTable(b);
    }
  }, [searchMoney]);

  useEffect(() => {
    if (search) {
      let b = searchData(search, dataAll);
      setDsTable(b);
    }
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
        <div className="grid grid-cols-4 gap-5">
          <Form.Item label="Tên sản phẩm">
            <Input onChange={(e) => setSearch(e.target.value)} />
          </Form.Item>
          <Form.Item label="Giá tiền">
            <Input onChange={(e) => setSearchMoney(e.target.value)} />
          </Form.Item>
        </div>

        <Table
          columns={columns}
          bordered
          size="small"
          dataSource={search || searchMoney ? dsTable : dataAll}
          loading={loading}
        />
      </Form>
      <ThemSuaVoucher
        visible={showModalProduct}
        setVisible={setShowModalProduct}
        dataModal={dataModal}
        getApiProduct={getApiProduct}
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
