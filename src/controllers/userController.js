//  standardized response function

import { createUser as createUserService, getAllUsers as getAllUsersService, getUserById as getUserByIdService, updateUser as updateUserService, deleteUser as deleteUserService, insertReport, updateReport, getAllReports, getReport, getLastReport, deleteReport, clearAll } from "../models/userModel.js";
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
        // handle unique constraint or our pre-check conflict
        if (err?.status === 409 || err?.code === '23505') {
            return handleResponse(res, 409, null, err.message || 'Email already exists');
        }
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


// Controller function to insert a new agent report
export const insertAgentReport = async (req, res) => {
    try {
        const {
            agentName,
            closingCash,
            posBalance,
            addedCash,
            removedFunds,
            startingMoney,
            startingCash,
            commissionRate,
            date
        } = req.body;

        

        // Insert the report into the database
        const result = await insertReport(agentName,
            closingCash,
            posBalance,
            addedCash,
            removedFunds,
            startingMoney,
            startingCash,
            commissionRate,
            date);

        // Respond with the inserted report ID
        res.status(201).json({ id: result, message: 'Agent report inserted successfully.' });
    } catch (error) {
        console.error('Error inserting agent report:', error);
        res.status(500).json({ message: 'Error inserting agent report.', error: error.message });
    }
}

export const updateAgentReport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            agentName,
            closingCash,
            posBalance,
            addedCash,
            removedFunds,
            startingMoney,
            startingCash,
            commissionRate,
            date

         } = req.body;
        const report = await updateReport(id, agentName,
            closingCash,
            posBalance,
            addedCash,
            removedFunds,
            startingMoney,
            startingCash,
            commissionRate,
            date);
        if (!report) {
            return handleResponse(res, 404, null, "report not found");
        }
        handleResponse(res, 200, report, "report updated successfully");
    } catch (err) {
        next(err);
    }
}


export const getAllAgentReports = async ( res, next) => {
    try {
        const reports = await getAllReports();
        handleResponse(res, 200, reports, "Reports retrieved successfully");
    } catch (err) {
        next(err);
    }
}

export const getAgentReport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const report = await getReport(id);
        if (!report) {
            return handleResponse(res, 404, null, "Report not found");
        }
        handleResponse(res, 200, report, "Report retrieved successfully");
    } catch (err) {
        next(err);
    }
}


export const getLastAgentReport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const report = await getLastReport(id);
        if (!report) {
            return handleResponse(res, 404, null, "Report not found");
        }
        handleResponse(res, 200, report, "Report retrieved successfully");
    } catch (err) {
        next(err);
    }
}

export const deleteAgentReport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const report = await deleteReport(id);
        if (!report) {
            return handleResponse(res, 404, null, "Report not found");
        }
        handleResponse(res, 200, report, "Report deleted successfully");
    } catch (err) {
        next(err);
    }
}

export const deleteAllReports = async (req, res, next) => {
    try {
        const { id } = req.params;
        const report = await clearAll(id);
        handleResponse(res, 200, report, "Reports deleted successfully");
    } catch (err) {
        next(err);
    }
}




export default {
    insertAgentReport, 
    updateAgentReport, 
    getAllAgentReports, 
    getAgentReport,
    getLastAgentReport,
    deleteAgentReport,
    deleteAllReports,
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser };