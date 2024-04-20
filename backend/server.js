const express = require("express");
const passport = require("passport");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const { log } = require("console");
require("dotenv").config();
require("./auth");

const PORT = process.env.PORT;
const FRONTEND_PATH = process.env.FRONTEND_PATH;
const FRONTEND_IP_FULL_PATH = process.env.FRONTEND_IP_FULL_PATH;


const app = express();
app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: FRONTEND_PATH,
    method: "*",
    credentials: true,
  })
);

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "project_db",
  port: "3306",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Middleware for session management
app.use(
  require("express-session")({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Get login by google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Callback from login by google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${FRONTEND_PATH}/home`,
    failureRedirect: `${FRONTEND_PATH}`,
  })
);

// Get the session's user
app.get("/login/success", async (req, res) => {
  console.log("Accessed ");
  if (req.user) {
    res.status(200).json({ message: "User Login", user: req.user });
    console.log("Login Successfully as", req.user.displayName);
  } else {
    res.status(400).json({ message: "Not Authorized" });
    console.log("Unautorized");
  }
});

// Destroy session
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect(FRONTEND_PATH);
    console.log("Logged Out Now");
  });
});

// Create role
app.post("/create_role", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    connection.query(
      "INSERT INTO  role(email, password, role) VALUES(?,?,?)",
      [email, password, role],
      (err, results, field) => {
        if (err) {
          console.log("Error while inserting role", err);
          return res.status(400).send();
        }
        return res.status(201).json({ message: "New user created" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Get roles
app.get("/get_roles", async (req, res) => {
  try {
    connection.query("SELECT * FROM role", (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Get role of a person
app.get("/get_role", async (req, res) => {
  try {
    connection.query("SELECT * FROM role", (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Verify email and password
app.post("/verify", async (req, res) => {
  const { email, password } = req.body;
  try {
    connection.query(
      "SELECT password, role FROM role WHERE email = ?",
      [email],
      (err, results, fields) => {
        if (!results) {
          return res.status(401).json({ error: "Incorrect password or email" });
        }
        if (results.length == 0) {
          return res.status(401).json({ error: "Incorrect password or email" });
        }
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        try {
          if (results[0].password !== password) {
            return res
              .status(401)
              .json({ error: "Incorrect password or email" });
          }

          if (results[0].role == "admin") {
            return res.status(200).json({ role: "admin" });
          }
          return res.status(200).json({ role: "user" });
        } catch (err) {
          console.log(err);
          return res.status(500).send();
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Verify email and password
app.options("/verify", async (req, res) => {
  const { email, password } = req.body;
  try {
    connection.query(
      "SELECT password, role FROM role WHERE email = ?",
      [email],
      (err, results, fields) => {
        if (results.length == 0) {
          return res.status(401).json({ error: "Incorrect password or email" });
        }
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        try {
          if (results[0].password !== password) {
            return res
              .status(401)
              .json({ error: "Incorrect password or email" });
          }

          if (results[0].role == "admin") {
            return res.status(200).json({ role: "admin" });
          }
          return res.status(200).json({ role: "user" });
        } catch (err) {
          console.log(err);
          return res.status(500).send();
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Get student id
app.get("/get_student_id", async (req, res) => {
  if (req.user) {
    const id = req.user.email.split("@")[0];
    return { student_id: id };
  }
  return { student_id: "You failed it" };
});

// Get personal info
app.post("/get_personal_info", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(500).json({ message: "No data incoming" });
  }
  const { email } = req.body;
  const student_id = get_student_id(email);
  try {
    connection.query(
      "SELECT * FROM personal_info WHERE student_id = ?",
      [student_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Update grant option
app.post("/update_option", async (req, res) => {
  console.log("Update option");
  const { email, grant_option } = req.body;
  const student_id = get_student_id(email);
  try {
    connection.query(
      "UPDATE student_option_info SET grant_option = ? WHERE student_id = ?",
      [grant_option, student_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res
          .status(200)
          .json({ message: `${student_id} updates to ${grant_option}` });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Get grant option or create if not existed
app.get("/grant_option/:student_id", async (req, res) => {
  const student_id = req.params.student_id;
  const name = req.query.fname + " " + req.query.sname;
  // Check if the student exists in the database
  connection.query(
    "SELECT grant_option FROM student_option_info WHERE student_id = ?",
    [student_id],
    (error, results) => {
      if (error) {
        console.error("Error querying database:", error);
        res.status(500).send("Error querying database");
        return;
      }

      if (results.length === 0) {
        // If student doesn't exist, insert a new one with default age 18
        connection.query(
          "INSERT INTO student_option_info (student_id, name, grant_option, payment_status) VALUES (?, ?,  NULL, ?)",
          [student_id, name, "unpaid"],
          (insertError) => {
            if (insertError) {
              console.error("Error inserting new student:", insertError);
              res.status(500).send("Error inserting new student");
              return;
            }

            // Student inserted successfully, return default age 18
            res
              .status(200)
              .json({ student_id: student_id, grant_option: null });
          }
        );
      } else {
        // Student exists, return their age
        res.status(200).json({
          student_id: student_id,
          grant_option: results[0].grant_option,
        });
      }
    }
  );
});

// Get shipping id
app.get("/shipping_id/:student_id", async (req, res) => {
  const student_id = req.params.student_id;

  connection.query(
    "SELECT shipping_id FROM student_option_info WHERE student_id = ?",
    [student_id],
    (error, results) => {
      if (error) {
        console.error("Error querying database:", error);
        res.status(500).send("Error querying database");
        return;
      }

      if (results.length === 0) {
        // If shipping doesn't exist
        res.status(400).json({ error: "No matched student id" });
      } else {
        // Shipping_id exists,
        res.status(200).json({
          student_id: student_id,
          shipping_id: results[0].shipping_id,
        });
      }
    }
  );
});

// Update address
app.post("/update_address", async (req, res) => {
  console.log("Update address");
  const {
    student_id,
    name,
    tel_no,
    address,
    subdistrict,
    district,
    province,
    post_code,
  } = req.body;

  const sql = `
  INSERT INTO address_info (student_id, name, tel_no, address, subdistrict, district, province, post_code)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    tel_no = VALUES(tel_no), 
    address = VALUES(address), 
    subdistrict = VALUES(subdistrict), 
    district = VALUES(district), 
    province = VALUES(province), 
    post_code = VALUES(post_code);
`;

  try {
    connection.query(
      sql,
      [
        student_id,
        name,
        tel_no,
        address,
        subdistrict,
        district,
        province,
        post_code,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res
          .status(200)
          .json({ message: `${student_id} updated address` });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Get address
app.get("/get_address/:student_id", async (req, res) => {
  const student_id = req.params.student_id;

  sql = "SELECT * FROM address_info where student_id = ?";

  try {
    connection.query(sql, [student_id], (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).send("Error querying database");
        return;
      } else {
        res.status(200).send(results);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// Create receipt path
app.post("/create_image_path", async (req, res) => {
  const { email } = req.body;
  const student_id = get_student_id(email);
  try {
    connection.query(
      `INSERT INTO receipt_image (student_id, image_path)
      SELECT ?, NULL
      WHERE NOT EXISTS (
          SELECT 1 FROM receipt_image WHERE student_id = ?
      );`,
      [student_id, student_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res
          .status(200)
          .json({ message: `create path for ${student_id}` });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Upload receipt
app.post("/upload_receipt", upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log(req.body.student_id);

  const sql_image_path = `
  INSERT INTO receipt_image (student_id, image_path)
  VALUES (?, ?)
  ON DUPLICATE KEY UPDATE image_path = VALUES(image_path);
`;

  connection.query(
    sql_image_path,
    [req.body.student_id, req.file.filename],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(402).json({ message: "error while uploading" });
      }
    }
  );

  const sql_paid = `
  UPDATE student_option_info
  SET payment_status = ?,
  receipt_verification = ?
  WHERE student_id = ?;
`;

  connection.query(
    sql_paid,
    ["paid", "Waiting to be verified", req.body.student_id],
    (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(402)
          .json({ message: "error while updating payment status" });
      }
      return res.json({ status: "success" });
    }
  );
});

// Get receipt image
app.get("/get_receipt_image", (req, res) => {
  const student_id = req.query.sid;
  const sql = `SELECT * FROM receipt_image where student_id = ?`;
  try {
    connection.query(sql, [student_id], (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Error while getting image" });
      }

      var receipt_path = null;
      if (results.length !== 0) {
        receipt_path = results[0].image_path;
      }
      res.status(200).json({ message: "Success", image_path: receipt_path });
    });
  } catch (err) {
    console.log(err);
  }
  res.status(400);
});

// Get receipt verification
app.get("/get_receipt_verification/:student_id", async (req, res) => {
  const student_id = req.params.student_id;
  sql =
    "SELECT receipt_verification FROM student_option_info where student_id = ?";

  try {
    connection.query(sql, [student_id], (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).send("Error querying database");
        return;
      } else {
        res.status(200).send(results);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Get all data from student_option_info
app.get("/admin/get_all_student_option_info", async (req, res) => {
  sql = "SELECT * FROM student_option_info";

  try {
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).send("Error querying database");
        return;
      } else {
        res.status(200).send(results);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Update students' option info
app.post("/admin/update_student_option_info", async (req, res) => {
  console.log(req.body);
  try {
    const data = req.body.data;

    await Promise.all(
      data.map(async (student) => {
        const { student_id, receipt_verification, shipping_id } = student;

        const sql = `
        UPDATE student_option_info
        SET receipt_verification = ?, shipping_id = ?
        WHERE student_id = ?
      `;

        await connection.query(sql, [
          receipt_verification,
          shipping_id,
          student_id,
        ]);
      })
    );
    res
      .status(200)
      .json({ message: "Successfully updated all student information" });
  } catch (error) {
    console.error("Error updating student information:", error);
    res.status(500).json({ error: "Error updating student information" });
  }
});

// Get all data to print
app.get("/admin/get_all_student_info_to_print", async (req, res) => {
  const sql_get_student_ids = `SELECT student_id FROM student_option_info 
    WHERE grant_option = 'Postal Delivery' 
    AND receipt_verification = 'Verified' 
    AND shipping_id IS NULL`;

  try {
    connection.query(sql_get_student_ids, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }

      const studentAddressesPromises = results.map(async (student) => {
        const sql_get_student_addresses = `SELECT * FROM address_info WHERE student_id = ?`;

        return new Promise((resolve, reject) => {
          connection.query(sql_get_student_addresses, [student.student_id], (err, addressResults) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(addressResults);
            }
          });
        });
      });

      try {
        const studentAddresses = await Promise.all(studentAddressesPromises);
        const flattenedAddresses = studentAddresses.flat(); // Flatten the array of arrays
        res.json(flattenedAddresses);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


// Setting port to run on
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Default route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: `You have connected to the server on port ${PORT}` });
});

function get_student_id(email) {
  const id = email.split("@")[0];
  return id;
}
