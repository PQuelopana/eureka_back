const config = require('./dbconfig');
const sql = require('mssql');

async function getEmployees() {
    try {
        const pool = await sql.connect(config);

        const employees = await pool.request().query('Exec Sp_Employee_List');

        return employees.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getEmployeeById(id) {
    try {
        const pool = await sql.connect(config);

        const employee = await pool.request()
            .input('P_id', sql.Int, id)
            .query("Exec Sp_Employee_By_Id @P_id");

        return employee.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addEmployee(employee) {

    try {
        const pool = await sql.connect(config);

        const request = await pool.request()
            .input('P_name', sql.NVarChar, employee.name)
            .input('P_lastName', sql.Int, employee.lastName)
            .input('P_dateOfBirth', sql.NVarChar, employee.dateOfBirth)
            .input('P_dateOfAdmission', sql.NVarChar, employee.dateOfAdmission)
            .input('P_position', sql.NVarChar, employee.position)
            .input('P_salary', sql.NVarChar, employee.salary)
            .query('Exec Sp_Employee_Add @P_name, @P_lastName, @P_dateOfBirth, @P_dateOfAdmission, @P_position, @P_salary');

        return request.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function updateEmployee(employee) {
    try {
        const pool = await sql.connect(config);

        const request = await pool.request()
            .input('P_id', sql.Int, employee.id)
            .input('P_name', sql.NVarChar, employee.name)
            .input('P_lastName', sql.Int, employee.lastName)
            .input('P_dateOfBirth', sql.NVarChar, employee.dateOfBirth)
            .input('P_dateOfAdmission', sql.NVarChar, employee.dateOfAdmission)
            .input('P_position', sql.NVarChar, employee.position)
            .input('P_salary', sql.NVarChar, employee.salary)
            .query('Exec Sp_Employee_Update @P_id, @P_name, @P_lastName, @P_dateOfBirth, @P_dateOfAdmission, @P_position, @P_salary');

        return request.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteEmployee(id) {
    try {
        const pool = await sql.connect(config);

        const request = await pool.request()
            .input('P_Id', sql.Int, id)
            .query("Exec Sp_Employee_Delete_By_Id @P_Id");

        return request.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
}