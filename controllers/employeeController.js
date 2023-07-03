import Employee from "../models/Employee.js";

export const createEmployee = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, position, department } =
      req.body;

    const employee = new Employee({
      firstname,
      lastname,
      email,
      phone,
      position,
      department,
    });

    const savedEmployee = await employee.save();
    res.status(201).json({
      success: true,
      message: "Successfully created employee",
      data: savedEmployee,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating employee",
        error: error.message,
      });
  }
};

export const getAllEmployees = async (_, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      message: "Successfully fetched all employees",
      data: employees,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error getting employees",
        error: error.message,
      });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetched employee",
      data: employee,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error getting employee",
        error: error.message,
      });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phone, position, department } =
      req.body;

    const employee = await Employee.findByIdAndUpdate(
      id,
      { firstname, lastname, email, phone, position, department },
      { new: true }
    );

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({
      success: true,
      message: "Successfully updated employee",
      data: employee,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating employee",
        error: error.message,
      });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting employee",
        error: error.message,
      });
  }
};
