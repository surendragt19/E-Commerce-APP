import categoryModel from "../models/createCategoryModel.js";
import slugify from "slugify";


// create category
export const createCategoryController = async (req, res) => {
  console.log("Test")
  try {
    console.log("Test")
    const { name } = req.body;
    if (!name) {
      return res.status(500).send({ message: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }
    const category = new categoryModel({ name, slug: slugify(name) });
    await category.save();

    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
     console.error('error:', error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Category",
    });
  }
};





//   update category

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Eroor in Update Category",
      error,
    });
  }
};

//get All Category

export const getAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      messsage: "All Category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Eroor in Get All Category",
      error,
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};


//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
