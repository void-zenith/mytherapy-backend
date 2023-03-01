const pool = require("../../db/conn");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `
        insert into user(userName, 
          userEmail, 
          gender, 
          address, 
          phone, 
          password, 
          dob, 
          type) values (?,?,?,?,?,?,?, ?)`,
      [
        data.first_name + data.last_name,
        data.email,
        data.gender,
        data.address,
        data.phone,
        data.password,
        data.dob,
        data.type,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query("select * from user", [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getUserById: (id, callBack) => {
    pool.query(
      `select * from user where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update user set userName=?, 
    userEmail = ?,
    gender = ? ,
    address=?,
    phone=?,
    password=?,
    dob=?
    WHERE id = ?`,
      [
        data.first_name + data.last_name,
        data.email,
        data.gender,
        data.address,
        data.phone,
        data.password,
        data.dob,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteUser: (email, callBack) => {
    pool.query(
      `delete from user where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByEmail: (email, callBack) => {
    pool.query(
      `select * from user where userEmail = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
