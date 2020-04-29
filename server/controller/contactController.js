const { pool } = require('../config/db_config');

module.exports.createContact = async (req, res) => {
  const { id } = req.user;
  const { name, description, owner_email, phone_number } = req.body;
  const contactExist = await pool.query(
    'SELECT id FROM contacts WHERE name=$1',
    [name],
  );
  if (contactExist.rowCount > 0) {
    return res.status(409).json({
      status: 409,
      message: 'Contact already exist',
    });
  }
  const query = `INSERT INTO contacts (user_id,name,description,owner_email,phone_number)
  VALUES($1,$2,$3,$4,$5) RETURNING *`;

  try {
    const { rows } = await pool.query(query, [
      id,
      name,
      description,
      owner_email,
      phone_number,
    ]);

    return res.status(201).json({
      status: 201,
      message: 'Contact added successfuly',
      data: rows[0],
    });
  } catch (error) {}
};

module.exports.getContacts = async (req, res) => {
  const query = `SELECT * FROM contacts WHERE user_id=$1;`;
  try {
    const result = await pool.query(query, [req.user.id]);
    return res.status(200).json({
      status: 200,
      data: result.rows,
    });
  } catch (error) {}
};

module.exports.getContact = async (req, res) => {
  const query = `SELECT * FROM contacts WHERE user_id=$1 AND id=$2;`;
  try {
    const result = await pool.query(query, [req.user.id, req.params.id]);
    if (result.rowCount <= 0) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: result.rows,
    });
  } catch (error) {}
};
module.exports.deleteContact = async (req, res) => {
  const query = `DELETE FROM contacts WHERE id = $1;`;

  try {
    const result = await pool.query(query, [req.params.id]);
    if (result.rowCount <= 0) {
      return res.status(404).json({
        status: 404,
        error: 'Contact does not exist',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Contact deleted successfully',
    });
  } catch (error) {}
};
