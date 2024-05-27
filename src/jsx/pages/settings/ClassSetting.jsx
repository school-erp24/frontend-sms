import React, { useEffect, useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import {
  createClasses,
  updateClasses,
} from "../../../services/SettingsService";
import { getClass } from "../../../services/CommonService";
import { useNavigate } from "react-router-dom";

const ClassSetting = () => {
  const [classSettings, setClassSettings] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  const [cls, setCls] = useState("");
  const [sec, setSec] = useState("");
  const [secList, setSecList] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const [updateModal, setUpdateModal] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);

  function handleAddSection(e) {
    e.preventDefault();
    const s = {
      value: sec,
      status: 1,
    };
    setSecList([...secList, s]);
    setSec("");
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    const newSection = {
      tid: idCounter,
      class: cls,
      sectionList: secList.map((s) => s.value),
      sections: secList.map((s) => s.value),
    };
    const updatedClassSettings = [...classSettings, newSection];
    setClassSettings(updatedClassSettings);
    setIdCounter(idCounter + 1);

    createClasses({ data: updatedClassSettings }).then((res) => {
      getClassData();
    });
    resetForm();
  }

  function resetForm() {
    setInputValue("");
    setValue([]);
    setCls("");
    setSecList([]);
    setSec("");
  }

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  const createOption = (label) => ({
    label,
    value: label,
  });

  useEffect(() => {
    getClassData();
  }, []);

  const getClassData = () => {
    getClass()
      .then((resp) => {
        const updatedData = resp.data.data.rows.map((classObj, index) => {
          const sectionsArray = classObj.sectionList.map(
            (section) => section.section
          );

          return {
            ...classObj,
            sections: sectionsArray,
            tid: index + 1,
          };
        });

        setClassSettings(updatedData);
        setIdCounter(updatedData.length + 1);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  };

  const handleCheckboxChange = (sectionId, sectionName) => {
    setSelectedClass((prevState) => {
      const updatedSectionList = prevState.sectionList.map((section) => {
        if (section.id === sectionId) {
          const updatedStatus = section.status === 1 ? 0 : 1;
          return { ...section, status: updatedStatus };
        }
        return section;
      });

      return { ...prevState, sectionList: updatedSectionList };
    });
  };

  const handleSectionNameChange = (sectionId, newSectionName) => {
    setSelectedClass((prevState) => {
      const updatedSectionList = prevState.sectionList.map((section) => {
        if (section.id === sectionId) {
          return { ...section, section: newSectionName };
        }
        return section;
      });

      return { ...prevState, sectionList: updatedSectionList };
    });
  };

  const handleUpdateClass = () => {
    updateClasses(selectedClass)
      .then((resp) => {
        console.log(resp);
        setSelectedClass({});
        setUpdateModal(false);
        getClassData();
      })
      .catch((error) => {
        console.error("Error updating class:", error);
        setUpdateModal(false);
      });
  };

  const navigate = useNavigate();

  return (
    <>
      {/* <PageTitle activeMenu={"Class Setup"} motherMenu={"Settings"} /> */}
      <Row>
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Class Setup</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitForm}>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="class_field">
                        Class
                      </label>
                      <input
                        placeholder=""
                        id="class_field"
                        type="text"
                        className="form-control"
                        required
                        value={cls}
                        onChange={(e) => setCls(e.target.value.toUpperCase())}
                      />
                    </div>
                  </div>
                  {secList?.map((s, i) => (
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="section_field">
                          Section {i + 1}
                        </label>
                        <input
                          key={i}
                          id="section_field"
                          type="text"
                          className="form-control"
                          required
                          maxlength="10"
                          value={s.value}
                          contentEditable={false}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="section_field">
                        Add a section
                      </label>
                      <span style={{ display: "flex", gap: "5px" }}>
                        <input
                          placeholder=""
                          id="section_field"
                          type="text"
                          className="form-control"
                          //required
                          maxlength="10"
                          value={sec}
                          onChange={(e) => setSec(e.target.value.toUpperCase())}
                        />
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={handleAddSection}
                        >
                          Add
                        </Button>
                      </span>
                    </div>
                  </div>
                </div>
                <span style={{ display: "flex", gap: ".5rem" }}>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <Button variant="danger light" onClick={() => resetForm()}>
                    Reset
                  </Button>
                </span>
              </form>
            </div>
          </div>
        </div>
      </Row>
      {/* Table displaying class settings */}
      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8" style={{ width: "100%" }}>
                  <div className="table-responsive">
                    <div className="cus_ovrfx">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Class</th>
                            <th>Sections</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {classSettings.map((section) => (
                            <tr key={section.tid}>
                              <td>{section.class}</td>
                              <td>{section.sections.join(", ")}</td>
                              <td>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    setSelectedClass({
                                      id: section.id,
                                      class: section.class,
                                      sectionList: section.sectionList,
                                      status: section.status,
                                    });
                                    setUpdateModal(true);
                                  }}
                                >
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for updating class */}
      <Modal
        className="fade"
        show={updateModal}
        onHide={setUpdateModal}
        centered
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Update Class</Modal.Title>
          <Button
            variant=""
            className="btn-close"
            onClick={() => setUpdateModal(false)}
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div
            className="container"
            style={{
              maxHeight: "400px",
              overflow: "scroll",
              scrollbarWidth: "auto",
            }}
          >
            <div className="row ">
              <div className="col-sm-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="class_field">
                    Class
                  </label>
                  <input
                    placeholder=""
                    type="text"
                    className="form-control"
                    required
                    readOnly
                    defaultValue={selectedClass ? selectedClass.class : ""}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              {selectedClass &&
                selectedClass.sectionList &&
                selectedClass.sectionList.map((section) => (
                  <div className="col-sm-4" key={section.id}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="class_field">
                        Section
                      </label>
                      <div className="input-group mb-3">
                        <div className="input-group-text">
                          <input
                            type="checkbox"
                            checked={section.status === 1}
                            onChange={() => handleCheckboxChange(section.id)}
                          />
                        </div>
                        <input
                          type="text"
                          className="form-control cus_up"
                          defaultValue={section.section}
                          onChange={(e) =>
                            handleSectionNameChange(
                              section.id,
                              e.target.value.toUpperCase()
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setUpdateModal(false);
              setSelectedClass({});
            }}
            variant="danger light"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdateClass();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClassSetting;

