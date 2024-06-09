import React, { useState,useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import ADminMenu from '../../components/layout/ADminMenu'
import toast from 'react-hot-toast';
import axios from 'axios'
import CategoryForm from '../../components/Forms/CategoryForm';
import { Modal } from "antd";

const Create_Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/category/createCategory", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} Category is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      setName("")
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/category/getCategory");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8000/category/updateCategory/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/category/deleteCategory/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <ADminMenu />
          </div>
          <div className="col-md-9 mt-3">
            <h1 className='text-center'><u>Create and Manage Category</u></h1>
            <div className="mt-4 m-4 w-96">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-96 m-4">
              <table className="table">
                <thead>
                  <tr>
                  <th scope="col" className="text-start">Name</th>
                  <th scope="col" className="text-end">Actions</th> 
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td  className="text-end">
                          <button
                            className="btn btn-info ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Create_Category