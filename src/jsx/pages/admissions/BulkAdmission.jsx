import React, { useState, useEffect } from "react";
import { Row, Modal, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import * as XLSX from "xlsx";
import { postBulkAdmissionForm } from "../../../services/StudentService";
import { toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";

const theadData = [
  { heading: "S.No", sortingValue: "__rowNum__", sortable: true },
  { heading: "Admission No", sortingValue: "admissionNo", sortable: true },
  { heading: "Roll No", sortingValue: "rollNo", sortable: true },
  { heading: "First Name", sortingValue: "firstName", sortable: true },
  { heading: "Class", sortingValue: "class", sortable: true },
  { heading: "Section", sortingValue: "section", sortable: true },
  { heading: "DOB", sortingValue: "DOB", sortable: true },
  { heading: "Father's Name", sortingValue: "fatherName", sortable: true },
  { heading: "Contact No", sortingValue: "contactNo", sortable: true },
  { heading: "RTE No", sortingValue: "rteApplicationNo", sortable: true },
];

const selectedKeys = theadData.map((item) => item.sortingValue);

const BulkAdmission = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [pageno, setPageNo] = useState(1);
  const [basicModal, setBasicModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [fileModal, setFileModal] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState(null);
  const [unchecked, setUnChecked] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [excelFile, setExcelFile] = useState(undefined);
  const [excelFileName, setExcelFileName] = useState(undefined);
  const [excelData, setExcelData] = useState(undefined);
  const [fileTypeError, setFileTypeError] = useState(undefined);

  const requiredColumns = [
    //  "__rowNum__",
    "admissionNo",
    "rollNo",
    "firstName",
    "gender",
    "class",
    "section",
    "studentType",
    "session",
    "contactNo",
    "fatherName",
  ];

  const allColumns = [
    //  "__rowNum__",
    "admissionNo",
    "rollNo",
    "firstName",
    "lastName",
    "gender",
    "DOB",
    "class",
    "section",
    "studentType",
    "session",
    "contactNo",
    "fatherName",
    "rteApplicationNo",
  ];

  const optionalColumns = ["rteApplicationNo", "DOB"];

  const uniqueColumns = ["admissionNo", "rteApplicationNo"];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      let fileTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setFileTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
          setExcelFileName(selectedFile.name);
        };
      } else {
        setFileTypeError("Please select only Excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handlePageChange = (page) => {
    setPageNo(page);
    if (!unchecked) {
      setUnChecked(true);
    }
  };

  useEffect(() => {
    if (!excelData) {
      resetData();
      return;
    }
    console.log(excelData);
    const totalItems = excelData.length;
    setTotalRecords(totalItems);
    setTableData(excelData.slice((pageno - 1) * rows, pageno * rows));

    const validationErrors = validateExcelData(excelData, requiredColumns);

    if (validationErrors.length > 0) {
      setExcelErrors(validationErrors);
      setErrorModal(true);
      return;
    } else setExcelErrors(null);
  }, [excelData, pageno, rows]);

  const handleFileAdd = () => {
    if (excelFile) {
      const wb = XLSX.read(excelFile, { type: "buffer" });
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      // Check if the required columns are present
      const fileColumns = Object.keys(data[0]);
      const missingColumns = requiredColumns.filter(
        (col) => !fileColumns.includes(col)
      );

      if (missingColumns.length > 0) {
        toast.error(`Required columns are missing`);
        return;
      }

      setExcelData(data);
    }

    setFileModal(false);
  };

  // const handleCheckedAll = (value) => {
  //   const updatedFeeData = tableData.map((item) => ({
  //     ...item,
  //     inputchecked: value,
  //   }));
  //   setTableData(updatedFeeData);
  //   setUnChecked(!unchecked);
  // };

  const [excelErrors, setExcelErrors] = useState(undefined);
  const handleSubmit = () => {
    if (!excelData) {
      toast.warn("No excel file uploaded");
      return;
    }
    if (!excelData.length > 0) {
      toast.warn("No data");
      return;
    }
    //const students = excelData.map(({ __rowNum__, ...rest }) => rest);
    const students = tableData;

    const validationErrors = validateExcelData(excelData, requiredColumns);

    if (validationErrors.length > 0) {
      setExcelErrors(validationErrors);
      setErrorModal(true);
      //toast.error(validationErrors.join("\n"));
      //toast.error("Invalid excel format, please check format");
      return;
    } else setExcelErrors(null);

    console.log(students);
    postBulkAdmissionForm({ students: students })
      .then((resp) => {
        //console.log(resp.data);
        if (resp.status === 200) {
          toast.success(resp.data.data.message || "Successfully added");
          resetData();
        } else throw resp;
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 207) {
          toast.warn(err.data.message || "Partially added");
          setExcelErrors(err?.data?.errors?.map((er) => er.message));
          setErrorModal(true);
          return;
        }
        toast.error(
          err?.response?.data?.message || err?.message || "Something went wrong"
        );
        setExcelErrors(err?.response?.data?.errors?.map((er) => er.message));
        setErrorModal(true);
      });
  };

  //const handleReset = () => {};
  const resetData = () => {
    setExcelFile(undefined);
    setExcelData(undefined);
    setTableData(undefined);
    setTotalRecords(0);
    setExcelErrors(undefined);
    setExcelFileName(undefined);
  };

  // handle update in a key
  const [focusedField, setFocusedField] = useState(null);
  const handleUpdate = (e, index, key) => {
    e.preventDefault();
    let updatedValue = e.target.value;

    if (key === "contactNo") {
      updatedValue = updatedValue.replace(/\D/g, "");
      if (updatedValue.length > 10) {
        updatedValue = updatedValue.slice(0, 10);
      }
    } else {
      updatedValue = updatedValue.toUpperCase();
    }
    const updatedTableData = [...tableData];
    updatedTableData[index][key] = updatedValue;
    setTableData(updatedTableData);
  };

  //handle row checked
  const [checkedRows, setCheckedRows] = useState([]);
  const handleCheckChange = (index) => {
    if (checkedRows.includes(index)) {
      const updatedRows = checkedRows.filter((item) => item !== index);
      setCheckedRows(updatedRows);
    } else {
      const newCheckRows = [...checkedRows, index];
      setCheckedRows(newCheckRows);
    }
  };

  //handle delete selected rows
  const handleDeleteRows = () => {
    if (checkedRows.length > 0) {
      setExcelData(
        excelData.filter((data, index) => !checkedRows.includes(index))
      );
      setCheckedRows([]);
    }
  };

  return (
    <>
      <PageTitle activeMenu={"Bulk Admission"} motherMenu={"Admissions"} />
      <Row>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header py-0">
              <h4 className="card-title">
                {excelFileName ? `${excelFileName}` : "No file selected"}
              </h4>
              <div className="d-flex align-items-center gap-2">
                {excelErrors?.length > 0 && (
                  <Button
                    onClick={setErrorModal}
                    //className="my-4 btn btn-danger"
                    variant="danger light"
                  >
                    {excelErrors?.length} errors
                  </Button>
                )}
                <button onClick={setFileModal} className="my-4 btn btn-primary">
                  + Upload excel file
                </button>
                {checkedRows.length > 0 && (
                  <button
                    onClick={handleDeleteRows}
                    className="my-4 btn btn-danger"
                  >
                    Delete {checkedRows.length} rows
                  </button>
                )}
              </div>
            </div>
            <div className="card-body py-0">
              {tableData && (
                <div className="table-responsive">
                  <div className="dataTables_wrapper no-footer">
                    <div className="cus_ovrfx" style={{ overflowX: "auto" }}>
                      <table className="display dataTable no-footer w-100">
                        <thead>
                          <tr>
                            <th></th>
                            {theadData.map((head, index) => (
                              <th key={index}>
                                {head.heading}
                                {!optionalColumns.includes(head.sortingValue) &&
                                  head.sortingValue !== "__rowNum__" && (
                                    <span style={{ color: "red" }}>*</span>
                                  )}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="cus_up">
                          {tableData?.map((data, index) => (
                            <tr key={index}>
                              <td>
                                <span className="btn btn-xs sharp btn-link me-1">
                                  <input
                                    checked={checkedRows.includes(index)}
                                    onChange={() => handleCheckChange(index)}
                                    type="checkbox"
                                  />
                                </span>
                              </td>
                              <td>{data["__rowNum__"]}</td>
                              {Object.keys(data).map((key) =>
                                selectedKeys.includes(key) &&
                                key !== "rteApplicationNo" ? (
                                  <td key={key}>
                                    {key === "__rowNum__" ? null : (
                                      <input
                                        type="text"
                                        value={data[key]}
                                        onChange={(e) =>
                                          handleUpdate(e, index, key, data[key])
                                        }
                                        style={{
                                          maxWidth: "150px",
                                          background: "transparent",
                                        }}
                                        onFocus={(e) =>
                                          setFocusedField(tableData[index][key])
                                        }
                                      />
                                    )}
                                  </td>
                                ) : null
                              )}
                              <td>
                                <input
                                  type="text"
                                  value={data["rteApplicationNo"]}
                                  onChange={(e) =>
                                    handleUpdate(
                                      e,
                                      index,
                                      "rteApplicationNo",
                                      data["rteApplicationNo"]
                                    )
                                  }
                                  style={{
                                    maxWidth: "150px",
                                    background: "transparent",
                                  }}
                                  onFocus={(e) =>
                                    setFocusedField(
                                      tableData[index]["rteApplicationNo"]
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {excelData && (
                      <div className="d-sm-flex text-center justify-content-between align-items-center ">
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".5rem",
                          }}
                        >
                          <button
                            to={"#"}
                            className="btn btn-danger"
                            style={{
                              height: "fit-content",
                              backgroundColor: "white",
                              color: "#ff1616",
                            }}
                            onClick={() => setBasicModal(true)}
                          >
                            Clear
                          </button>
                          <button
                            onClick={handleSubmit}
                            className="my-4 btn btn-primary"
                            // disabled={!!excelErrors}
                          >
                            Submit
                          </button>
                        </span>

                        <div
                          className="dataTables_info"
                          style={{ color: "black", fontSize: "medium" }}
                        >
                          Total records : {totalRecords}
                        </div>

                        <Pagination
                          totalItems={totalRecords}
                          rows={rows}
                          onPageChange={handlePageChange}
                          filterCriteria={filterCriteria}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* <!-- Modal --> */}
              <Modal
                className="fade"
                show={fileModal}
                onHide={setFileModal}
                centered
              >
                <Modal.Header>
                  <Modal.Title>Add excel file</Modal.Title>
                  <Button
                    variant=""
                    className="btn-close"
                    onClick={() => setFileModal(false)}
                  ></Button>
                </Modal.Header>
                <Modal.Body>
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    className="form-control"
                    onChange={handleFile}
                  />
                  {fileTypeError && (
                    <div className="alert alert-danger mt-4" role="alert">
                      {fileTypeError}
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => setFileModal(false)}
                    variant="danger light"
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleFileAdd}
                    //onClick={() => handleDelete({ id: selectedIds })}
                  >
                    Add file
                  </Button>
                </Modal.Footer>
              </Modal>

              {/** */}

              <Modal
                className="fade"
                show={errorModal}
                onHide={setErrorModal}
                centered
              >
                <Modal.Header>
                  <Modal.Title>Excel data errors:</Modal.Title>
                  <Button
                    variant=""
                    className="btn-close"
                    onClick={() => setErrorModal(false)}
                  ></Button>
                </Modal.Header>
                <Modal.Body>
                  {excelErrors?.map((er, index) => (
                    <Alert
                      className="d-flex gap-2 w-100"
                      key={index}
                      variant={"danger"}
                    >
                      <p>{index + 1}:</p>
                      <p key={index}> {er}</p>
                    </Alert>
                  ))}
                </Modal.Body>
              </Modal>

              {/* */}

              <Modal
                className="fade"
                show={basicModal}
                onHide={setBasicModal}
                centered
              >
                <Modal.Header>
                  <Modal.Title>Delete Excel data</Modal.Title>
                  <Button
                    variant=""
                    className="btn-close"
                    onClick={() => setBasicModal(false)}
                  ></Button>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete data?</Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => setBasicModal(false)}
                    variant="danger light"
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setExcelData(null);
                      setExcelFile(null);
                      setBasicModal(false);
                    }}
                  >
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default BulkAdmission;

// const validateExcelData = (students, requiredColumns) => {
//   const validationErrors = [];

//   students.forEach((student, index) => {
//     requiredColumns.forEach((column) => {
//       if (
//         student[column] === undefined ||
//         student[column] === null ||
//         student[column] === "" ||
//         (typeof student[column] === "number" && isNaN(student[column]))
//       ) {
//         validationErrors.push(
//           `Row ${index + 1} is missing value for required field: ${column}`
//         );
//       }
//     });
//   });

//   return validationErrors;
// };

const validateExcelData = (students, requiredColumns) => {
  const validationErrors = [];
  const admissionNos = new Set(); // Using a Set to efficiently track unique admission numbers
  const rteNos = new Set();
  const rollNoMap = {};

  students.forEach((student, index) => {
    requiredColumns.forEach((column) => {
      if (
        student[column] === undefined ||
        student[column] === null ||
        student[column] === "" ||
        (typeof student[column] === "number" && isNaN(student[column]))
      ) {
        validationErrors.push(
          `ROW ${index + 1} : is missing value for required field ${column}`
        );
      }
    });

    // Validate contactNo column
    if ("contactNo" in student) {
      const contactNo = student["contactNo"];
      if (
        //typeof contactNo !== 'string' ||
        !/^\d{10}$/.test(contactNo)
      ) {
        validationErrors.push(
          `ROW ${index + 1} :  Invalid contact number: ${contactNo}`
        );
      }
    }

    // Check for duplicate admission numbers
    if (admissionNos.has(student["admissionNo"])) {
      validationErrors.push(
        `ROW ${index + 1} : Duplicate admission number found ${
          student["admissionNo"]
        }`
      );
    } else {
      admissionNos.add(student["admissionNo"]);
    }

    // Check for duplicate RTE numbers, if rteNo exists
    if ("rteApplicationNo" in student) {
      if (
        rteNos.has(student["rteApplicationNo"]) &&
        student["rteApplicationNo"] !== ""
      ) {
        validationErrors.push(
          `ROW ${index + 1} : Duplicate RTE number found ${
            student["rteApplicationNo"]
          }`
        );
      } else {
        rteNos.add(student["rteApplicationNo"]);
      }
    }

    // Check for duplicate roll numbers within the same class and section
    const key = `${student["class"]}_${student["section"]}`;
    if (!rollNoMap[key]) {
      rollNoMap[key] = new Set();
    }
    if (rollNoMap[key].has(student["rollNo"])) {
      validationErrors.push(
        `ROW ${index + 1} : Duplicate roll number found for Roll No ${
          student["rollNo"]
        }
         in Class ${student["class"]} Section ${student["section"]}`
      );
    } else {
      rollNoMap[key].add(student["rollNo"]);
    }
  });

  return validationErrors;
};

// const validateExcelData = (data, requiredColumns) => {
//   const errors = new Set();

//   data.forEach((row, rowIndex) => {
//     requiredColumns.forEach((column) => {
//       if (!(column in row)) {
//         errors.add(`Missing required column "${column}" in one or more rows`);
//       }
//     });

//     // Validate data
//     Object.entries(row).forEach(([key, value]) => {
//       if (requiredColumns.includes(key)) {
//         if (key === "DOB") {
//           const datePattern = /^\d{4}-\d{2}-\d{2}$/;
//           if (!datePattern.test(value)) {
//             errors.add(
//               `Column "${key}" should be in "yyyy-mm-dd" format in one or more rows`
//             );
//           }
//         } else if (key === "session") {
//           const sessionPattern = /^\d{4}-\d{4}$/;
//           if (!sessionPattern.test(value)) {
//             errors.add(
//               `Column "${key}" should be in "yyyy-yyyy" format in one or more rows`
//             );
//           }
//         } else if (typeof value !== "string") {
//           row[key] = String(value);
//         }
//       }
//     });
//   });

//   return Array.from(errors);
// };
