import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import ADminMenu from '../../components/layout/ADminMenu';
import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/authC';
import { Select } from 'antd';

const { Option } = Select;

const AdminOrder = () => {
  const [status, setStatus] = useState([
    'Not Process',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancel',
  ]);
  const [changeStatus, setCHangeStatus] = useState('');
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/allOrders');
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`http://localhost:8000/api/orderStatus/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <ADminMenu />
          </div>
          <div className="col-md-9 mt-2 p-1">
            <h1 className="text-center"><u>All Orders</u></h1>
            {orders?.map((o, i) => (
              <div className="border shadow" key={o._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          variant="default"
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, idx) => (
                            <Option key={idx} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                      <td>{o?.payment?.success ? 'Success' : 'Failed'}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`http://localhost:8000/product/productPhoto/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price: {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
