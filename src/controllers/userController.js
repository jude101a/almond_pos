//  standardized response function

import { createUser as createUserService, getAllUsers as getAllUsersService, getUserById as getUserByIdService, updateUser as updateUserService, deleteUser as deleteUserService } from "../models/userModel.js";
const handleResponse = (res, statusCode, data=null, message) => {
    res.status(statusCode).json({
        status: statusCode >= 200 && statusCode < 300 ? "success" : "error",
        message: message,
        data: data
    });
}
export const createUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = await createUserService(name, email);
        handleResponse(res, 201, user, "User created successfully");
    } catch (err) {
        next(err);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, users, "Users retrieved successfully");
    } catch (err) {
        next(err);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);
        if (!user) {
            return handleResponse(res, 404, null, "User not found");
        }
        handleResponse(res, 200, user, "User retrieved successfully");
    } catch (err) {
        next(err);
    }
}
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await updateUserService(id, name, email);
        if (!user) {
            return handleResponse(res, 404, null, "User not found");
        }
        handleResponse(res, 200, user, "User updated successfully");
    } catch (err) {
        next(err);
    }
}   
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await deleteUserService(id);
        if (!user) {
            return handleResponse(res, 404, null, "User not found");
        }
        handleResponse(res, 200, user, "User deleted successfully");
    } catch (err) {
        next(err);
    }
}
export default { createUser, getAllUsers, getUserById, updateUser, deleteUser };