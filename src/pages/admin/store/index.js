import { Form, Image, Input, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Store() {
  const columns = [
    {
      title: "STT",
      align: "center",
      width: 50,
      render: (text, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "name",
      key: "name",
      width: 250,
    },
    {
      title: "Ảnh",
      dataIndex: "image_1",
      key: "image_1",
      width: 80,
      render: (text) => <Image src={text} height={50} width={50} />,
    },
    {
      title: "Địa chỉ",
      dataIndex: "fullAddress",
      key: "fullAddress",
      width: 500,
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Giờ mở cửa",
      dataIndex: "opening_time",
      key: "opening_time",
    },
    {
      title: "",
      key: "",
      width: 90,
    },
  ];
  const [dsStore, setDsStore] = useState([]);
  const [search, setSearch] = useState();
  const [dsTable, setDsTable] = useState([]);
  const [searchDC, setSearchDC] = useState();
  const getDsStore = async () => {
    try {
      const res = await axios.get(
        `https://api.thecoffeehouse.com/api/get_all_store`,
        {}
      );
      setDsStore(
        res.data.map((e) => ({
          ...e,
          fullAddress: `${e?.external_name} - ${e?.district_name} - ${e?.state_name} - ${e?.country}`,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const searchData = (search, data) => {
    let filterData = [];
    for (var i = 0; i < dsStore?.length; i++) {
      search = search.toLowerCase();
      var name = dsStore[i].name.toLocaleLowerCase();
      if (name.includes(search)) {
        filterData.push(data[i]);
      }
    }
    return filterData;
  };

  const searchDChi = (search, data) => {
    let filterData = [];
    for (var i = 0; i < dsStore?.length; i++) {
      search = search.toLowerCase();
      var name = dsStore[i].fullAddress.toLocaleLowerCase();
      if (name.includes(search)) {
        filterData.push(data[i]);
      }
    }
    return filterData;
  };

  useEffect(() => {
    if (searchDC) {
      let b = searchDChi(searchDC, dsStore);
      setDsTable(b);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDC]);

  useEffect(() => {
    if (search) {
      let b = searchData(search, dsStore);
      setDsTable(b);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    getDsStore();
  }, []);
  return (
    <Form layout="vertical">
      <div className="grid grid-cols-2 gap-10">
        <Form.Item label="Tên cửa hàng">
          <Input onChange={(e) => setSearch(e.target.value)} />
        </Form.Item>
        <Form.Item label="Địa chỉ">
          <Input onChange={(e) => setSearchDC(e.target.value)} />
        </Form.Item>
      </div>
      <div>
        <Table
          bordered
          size="small"
          columns={columns}
          dataSource={search || searchDC ? dsTable : dsStore}
        />
      </div>
    </Form>
  );
}

export default Store;
