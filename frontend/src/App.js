import style from "./styles/App.module.css";
import { DataField } from "./components/DataField";
import {
  PVData,
  PVLocation,
  PersonalData,
  Signature,
  id,
  Cadastral,
  bill,
} from "./components/SetDataFields";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [Personendaten, setPersonendaten] = useState(PersonalData);
  const [PVDaten, setPVDaten] = useState(PVData);
  const [PVAdresse, setPVAdresse] = useState(PVLocation);

  const [Unterschrift, setUnterschrift] = useState(Signature);
  const [Ausweis, setAusweis] = useState(id);
  const [Stromrechnung, setStromrechnung] = useState(bill);
  const [Kataster, setKataster] = useState(Cadastral);

  const [file, setFile] = useState();
  const [fileAusweis, setFileAusweis] = useState();
  const [fileStromrechnung, setFileStromrechnung] = useState();
  const [fileKataster, setFileKataster] = useState();
  const hiddenFileInput = useRef(null);
  const hiddenFileInputAusweis = useRef(null);
  const hiddenFileInputStromrechnung = useRef(null);
  const hiddenFileInputKataster = useRef(null);
  const [uploadedFileURL, setUploadedFileURL] = useState(
    "Es wurde noch keine Datei hochgeladen!"
  );
  const [uploadedFileURLAusweis, setUploadedFileURLAusweis] = useState(
    "Es wurde noch keine Datei hochgeladen!"
  );
  const [uploadedFileURLStromrechnung, setUploadedFileURLStromrechnung] =
    useState("Es wurde noch keine Datei hochgeladen!");
  const [uploadedFileURLKataster, setUploadedFileURLKataster] = useState(
    "Es wurde noch keine Datei hochgeladen!"
  );
  function handleUpload(event, fileToUse) {
    event.preventDefault();
    if (fileToUse === undefined) {
      toast.warning("Bitte wählen Sie eine Datei aus!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    let format = fileToUse.name.split(".");
    if (format[format.length - 1] === "js") {
      toast.error("Hochgeladener Filetyp wird nicht unterstützt!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setFile("");
      return;
    }
    //const PORT = process.env.PORT || 8000;
    //const url = "http://localhost:" + PORT + "/uploadFile";
    const url = "https://test-parte-2.onrender.com/uploadFile";
    const formData = new FormData();
    formData.append("file", fileToUse);
    formData.append("fileName", fileToUse.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      let stringURL = "";
      let splitedResponse = response.data.split("_");
      for (let i = 1; i < splitedResponse.length; i++) {
        stringURL = stringURL + splitedResponse[i];
      }
      setUploadedFileURL('"' + stringURL + '" wurde erfolgreich hochgeladen!');
      let copy = Object.assign({}, Unterschrift);
      copy.filename.push(response.data);
      setUnterschrift(copy);
      toast.success('"' + stringURL + '" wurde erfolgreich hochgeladen!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  }
  function handleUploadAusweis(event, fileToUse) {
    event.preventDefault();
    if (fileToUse === undefined) {
      toast.warning("Bitte wählen Sie eine Datei aus!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    let format = fileToUse.name.split(".");
    if (format[format.length - 1] === "js") {
      toast.error("Hochgeladener Filetyp wird nicht unterstützt!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setFileAusweis("");
      return;
    }

    event.preventDefault();
    //const PORT = process.env.PORT || 8000;
    //const url = "http://localhost:" + PORT + "/uploadAusweis";
    const url = "https://test-parte-2.onrender.com/uploadAusweis";

    const formData = new FormData();
    formData.append("file", fileToUse);
    formData.append("fileName", fileToUse.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      let stringURL = "";
      let splitedResponse = response.data.split("_");
      for (let i = 1; i < splitedResponse.length; i++) {
        stringURL = stringURL + splitedResponse[i];
      }
      setUploadedFileURLAusweis(
        '"' + stringURL + '" wurde erfolgreich hochgeladen!'
      );
      let copy = Object.assign({}, Ausweis);
      copy.filename.push(response.data);
      setAusweis(copy);
      toast.success('"' + stringURL + '" wurde erfolgreich hochgeladen!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  }
  function handleUploadStromrechnung(event, fileToUse) {
    event.preventDefault();
    if (fileToUse === undefined) {
      toast.warning("Bitte wählen Sie eine Datei aus!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    let format = fileToUse.name.split(".");
    if (format[format.length - 1] === "js") {
      toast.error("Hochgeladener Filetyp wird nicht unterstützt!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setFileStromrechnung("");
      return;
    }
    event.preventDefault();
    //const PORT = process.env.PORT || 8000;
    //const url = "http://localhost:" + PORT + "/uploadStromrechnung";
    const url = "https://test-parte-2.onrender.com/uploadStromrechnung";
    const formData = new FormData();
    formData.append("file", fileToUse);
    formData.append("fileName", fileToUse.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      let stringURL = "";
      let splitedResponse = response.data.split("_");
      for (let i = 1; i < splitedResponse.length; i++) {
        stringURL = stringURL + splitedResponse[i];
      }
      setUploadedFileURLStromrechnung(
        '"' + stringURL + '" wurde erfolgreich hochgeladen!'
      );
      let copy = Object.assign({}, Stromrechnung);
      copy.filename.push(response.data);
      setStromrechnung(copy);
      toast.success('"' + stringURL + '" wurde erfolgreich hochgeladen!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  }
  function handleUploadKataster(event, fileToUse) {
    event.preventDefault();
    if (fileToUse === undefined) {
      toast.warning("Bitte wählen Sie eine Datei aus!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    let format = fileToUse.name.split(".");
    if (format[format.length - 1] === "js") {
      toast.error("Hochgeladener Filetyp wird nicht unterstützt!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setFileKataster("");
      return;
    }
    event.preventDefault();
    //const PORT = process.env.PORT || 8000;
    //const url = "http://localhost:" + PORT + "/uploadKataster";

    const url = "https://test-parte-2.onrender.com/uploadKataster";
    const formData = new FormData();
    formData.append("file", fileToUse);
    formData.append("fileName", fileToUse.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      let stringURL = "";
      let splitedResponse = response.data.split("_");
      for (let i = 1; i < splitedResponse.length; i++) {
        stringURL = stringURL + splitedResponse[i];
      }
      setUploadedFileURLKataster(
        '"' + stringURL + '" wurde erfolgreich hochgeladen!'
      );
      let copy = Object.assign({}, Kataster);
      copy.filename.push(response.data);
      setKataster(copy);
      toast.success('"' + stringURL + '" wurde erfolgreich hochgeladen!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  }

  const handleChangePerson = () => (e) => {
    let copy = Object.assign({}, Personendaten);
    copy[e.target.id].content = e.target.value;
    setPersonendaten(copy);
  };
  const handleChangePvData = () => (e) => {
    let copy = Object.assign({}, PVDaten);
    copy[e.target.id].content = e.target.value;
    setPVDaten(copy);
  };
  const handleChangePvAdress = () => (e) => {
    let copy = Object.assign({}, PVAdresse);
    copy[e.target.id].content = e.target.value;
    setPVAdresse(copy);
  };
  const handleChangePrivatpersonContent = () => (e) => {
    if (Personendaten["Privatperson"].selectedValue === "Ja") return;
    let copy = Object.assign({}, Personendaten);
    copy["Privatperson"].content = e.target.value;
    setPersonendaten(copy);
  };
  const handleChangePrivatpersonRadiobutton = (value) => {
    let copy = Object.assign({}, Personendaten);
    copy["Privatperson"].selectedValue = value;
    if (Personendaten["Privatperson"].selectedValue === "Ja") {
      copy["Privatperson"].content = "";
      copy["Partita Iva"].required = false;
    } else copy["Partita Iva"].required = true;
    setPersonendaten(copy);
  };
  const handleChangeSpeicherContent = () => (e) => {
    if (PVDaten["Speicher"].selectedValue === "Nein") return;
    let copy = Object.assign({}, PVDaten);
    copy["Speicher"].content = e.target.value;
    setPVDaten(copy);
  };
  const handleChangeSpeicherLeistung = () => (e) => {
    if (PVDaten["Speicher"].selectedValue === "Nein") return;
    let copy = Object.assign({}, PVDaten);
    copy["Speicher"].leistung = e.target.value;
    setPVDaten(copy);
  };
  const handleChangeSpeicherRadioButton = (value) => {
    let copy = Object.assign({}, PVDaten);
    copy["Speicher"].selectedValue = value;
    if (PVDaten["Speicher"].selectedValue === "Nein") {
      copy["Speicher"].content = "";
      copy["Speicher"].leistung = "";
    }
    setPVDaten(copy);
  };
  const createPDF = async (e) => {
    e.preventDefault();
    if (file === undefined) {
      toast.warning(
        "Sie müssen noch ein Foto mit Ihrer Unterschrift hochladen.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
    }
    if (fileAusweis === undefined) {
      toast.warning("Sie müssen noch eine Kopie Ihres Ausweißes hochladen.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (fileStromrechnung === undefined) {
      toast.warning(
        "Sie müssen noch eine Kopie Ihrer Stromrechnung hochladen.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
    }
    if (fileKataster === undefined) {
      toast.warning(
        "Sie müssen noch eine Kopie Ihres Katasterauszuges hochladen.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
    }
    const data = {
      PVDaten,
      PVAdresse,
      Personendaten,
      Unterschrift,
      Ausweis,
      Stromrechnung,
      Kataster,
    };
    //const PORT = process.env.PORT || 8000;
    //const url = "http://localhost:" + PORT + "/createPdf";

    const url = "https://test-parte-2.onrender.com/createPdf";

    axios
      .post(url, data)
      .then((res) => {
        alert(res.data);
        window.location.reload(false);
      })
      .catch((err) => {
        toast.error(err + "\nVersuchen Sie es später nocheinmal", {
          position: "top-center",
          autoClose: 100000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    flushSync(() => {
      setFile(event.target.files[0]);
    });
    handleUpload(event, event.target.files[0]);
  };

  const handleClickAusweis = (event) => {
    hiddenFileInputAusweis.current.click();
  };
  const handleChangeAusweis = (event) => {
    flushSync(() => {
      setFileAusweis(event.target.files[0]);
    });
    handleUploadAusweis(event, event.target.files[0]);
  };

  const handleClickStromrechnung = (event) => {
    hiddenFileInputStromrechnung.current.click();
  };
  const handleChangeStromrechnung = (event) => {
    flushSync(() => {
      setFileStromrechnung(event.target.files[0]);
    });
    handleUploadStromrechnung(event, event.target.files[0]);
  };

  const handleClickKataster = (event) => {
    hiddenFileInputKataster.current.click();
  };
  const handleChangeKataster = (event) => {
    flushSync(() => {
      setFileKataster(event.target.files[0]);
    });
    handleUploadKataster(event, event.target.files[0]);
  };
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <section className={style.container}>
        <div className={style.header}>
          <div className={style.image}></div>
          <h1>Portal zur Erstellung des Formulars "Parte 2 "</h1>
        </div>
        <div className={style.section}>
          <h2>Upload Unterschrift</h2>
          <div className={style.description}>
            Um das Dokument für Sie zu signieren wird ein Foto von ihrer
            Unterschrift benötigt. Laden Sie dieses bitte hier hoch.
          </div>
          <button className={style.buttonupload} onClick={handleClick}>
            Datei hochladen
          </button>
          <input
            type="file"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
          <div>{uploadedFileURL}</div>
        </div>
        <div className={style.section}>
          <h2>Upload Ausweiß</h2>
          <div className={style.description}>
            Laden Sie hier bitte eine Kopie Ihres Ausweißes hoch.
          </div>
          <button className={style.buttonupload} onClick={handleClickAusweis}>
            Datei hochladen
          </button>
          <input
            type="file"
            onChange={handleChangeAusweis}
            ref={hiddenFileInputAusweis}
            style={{ display: "none" }}
          />
          <div>{uploadedFileURLAusweis}</div>
        </div>
        <div className={style.section}>
          <h2>Upload Stromrechnung</h2>
          <div className={style.description}>
            Laden Sie hier bitte eine Kopie Ihrer Stromrechnung hoch.
          </div>
          <button
            className={style.buttonupload}
            onClick={handleClickStromrechnung}
          >
            Datei hochladen
          </button>
          <input
            type="file"
            onChange={handleChangeStromrechnung}
            ref={hiddenFileInputStromrechnung}
            style={{ display: "none" }}
          />
          <div>{uploadedFileURLStromrechnung}</div>
        </div>
        <div className={style.section}>
          <h2>Upload Katasterauszug</h2>
          <div className={style.description}>
            Laden Sie hier bitte eine Kopie Ihres Katasterauszuges hoch.
          </div>
          <button className={style.buttonupload} onClick={handleClickKataster}>
            Datei hochladen
          </button>
          <input
            type="file"
            onChange={handleChangeKataster}
            ref={hiddenFileInputKataster}
            style={{ display: "none" }}
          />
          <div>{uploadedFileURLKataster}</div>
        </div>
        <form onSubmit={createPDF}>
          <div className={style.section}>
            <h2>Persönliche Daten</h2>
            {Object.keys(Personendaten).map((key) => {
              return (
                <DataField
                  name={key}
                  type={Personendaten[key].type}
                  key={Personendaten[key].key}
                  value={Personendaten[key].content}
                  onChange={handleChangePerson()}
                  required={Personendaten[key].required}
                  maxlength={Personendaten[key].maxlength}
                ></DataField>
              );
            })}
            <div className={style.question}>
              Führen Sie die Arbeiten als Privatperson durch?
            </div>
            <div className={style.inputbox}>
              <div>
                <input
                  className={style.radiobutton}
                  type="radio"
                  id="Ja"
                  name="Privatperson"
                  value="Ja"
                  onChange={() => handleChangePrivatpersonRadiobutton("Ja")}
                  checked={Personendaten["Privatperson"].selectedValue === "Ja"}
                ></input>
                <label htmlFor="Ja">Ja</label>
              </div>
              <div>
                <input
                  className={style.radiobutton}
                  type="radio"
                  id="Nein"
                  name="Privatperson"
                  value="Nein"
                  onChange={() => handleChangePrivatpersonRadiobutton("Nein")}
                  checked={
                    Personendaten["Privatperson"].selectedValue === "Nein"
                  }
                ></input>
                <label htmlFor="nein">
                  Nein, ich führe die Arbeiten als gesetzlicher Vertreter
                  folgendes Unternehmens durch:
                </label>
                <input
                  type="text"
                  value={Personendaten["Privatperson"].content}
                  onChange={handleChangePrivatpersonContent()}
                  className={style.inputtextfield}
                ></input>
              </div>
            </div>
          </div>
          <div className={style.section}>
            <h2>Daten der PV-Anlage</h2>
            {Object.keys(PVDaten).map((key) => {
              return (
                <DataField
                  name={key}
                  type={PVDaten[key].type}
                  key={PVDaten[key].key}
                  value={PVDaten[key].content}
                  onChange={handleChangePvData()}
                  required={PVDaten[key].required}
                  maxlength={PVDaten[key].maxlength}
                ></DataField>
              );
            })}
            <div className={style.question}>Wird ein Speicher installiert?</div>
            <div className={style.inputbox}>
              <input
                className={style.radiobutton}
                type="radio"
                id="Ja"
                name="Speicher"
                value="Ja"
                onChange={() => handleChangeSpeicherRadioButton("Ja")}
                checked={PVDaten["Speicher"].selectedValue === "Ja"}
              ></input>
              <label htmlFor="Ja">Ja, mit:</label>{" "}
              <div className={style.radiodescription}>
                • Speicherkapazität[kWh]{" "}
                <input
                  type="number"
                  value={PVDaten["Speicher"].content}
                  onChange={handleChangeSpeicherContent()}
                  className={style.inputfield}
                ></input>
              </div>
              <div className={style.radiodescription}>
                • Gesamtleistung[kW]{" "}
                <input
                  type="number"
                  value={PVDaten["Speicher"].leistung}
                  onChange={handleChangeSpeicherLeistung()}
                  className={style.inputfield}
                ></input>
              </div>
            </div>
            <div className={style.inputbox}>
              <input
                type="radio"
                id="Nein"
                name="Speicher"
                value="Nein"
                onChange={() => handleChangeSpeicherRadioButton("Nein")}
                checked={PVDaten["Speicher"].selectedValue === "Nein"}
                className={style.radiobutton}
              ></input>
              <label htmlFor="Nein">Nein</label>
            </div>
          </div>
          <div className={style.section}>
            <h2>Örtliche Angaben zur PV-Anlage</h2>
            {Object.keys(PVAdresse).map((key) => {
              return (
                <DataField
                  name={key}
                  type={PVAdresse[key].type}
                  key={PVAdresse[key].key}
                  value={PVAdresse[key].content}
                  onChange={handleChangePvAdress()}
                  required={PVAdresse[key].required}
                  maxlength={PVAdresse[key].maxlength}
                ></DataField>
              );
            })}
          </div>
          <div className={style.section}></div>
          <button className={style.submitbutton} type="submit">
            {"Daten abschicken"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;
