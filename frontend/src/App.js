import style from "./styles/App.module.css";
import { DataField } from "./components/DataField";
import { WechselrichterData } from "./components/WechselrichterData";
import { PVData, Konform, Spiii } from "./components/SetDataFields";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uniqid from "uniqid";

function App() {
  const [PVDaten, setPVDaten] = useState(PVData);
  const [Wechselrichter, setWechselrichter] = useState([
    {
      Seriennummer: "",
      Firmware: "",
      Marke: "",
      Modell: "",
      key: uniqid(),
    },
  ]);

  const [Erklärung, setErklärung] = useState(Konform);
  const [Spi, setSpi] = useState(Spiii);

  const [isButtonenabled, setButtonenabled] = useState(false);

  const [file, setFile] = useState();
  const [fileSpi, setFileSpi] = useState();
  const hiddenFileInput = useRef(null);
  const hiddenFileInputSpi = useRef(null);
  const [uploadedFileURL, setUploadedFileURL] = useState(
    "Es wurde noch keine Datei hochgeladen!"
  );
  const [uploadedFileURLSpi, setUploadedFileURLSpi] = useState(
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
    const PORT = process.env.PORT || 8000;
    const url = "http://localhost:" + PORT + "/uploadFile";
    //const url = "https://test-parte-2.onrender.com/uploadFile";
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
      let copy = Object.assign({}, Erklärung);
      copy.filename.push(response.data);
      setErklärung(copy);
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
  function handleUploadSpi(event, fileToUse) {
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
      setFileSpi("");
      return;
    }

    event.preventDefault();
    const PORT = process.env.PORT || 8000;
    const url = "http://localhost:" + PORT + "/uploadSpi";
    //const url = "https://test-parte-2.onrender.com/uploadSpi";

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
      setUploadedFileURLSpi(
        '"' + stringURL + '" wurde erfolgreich hochgeladen!'
      );
      let copy = Object.assign({}, Spi);
      copy.filename.push(response.data);
      setSpi(copy);
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

  const sendData = async (e) => {
    e.preventDefault();
    if (file === undefined) {
      toast.warning(
        "Sie müssen noch eine Kopie mit Ihrer Konformitätserklärung hochladen.",
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
    if (fileSpi === undefined) {
      toast.warning("Sie müssen noch eine Kopie Ihres SPI hochladen.", {
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
    setButtonenabled(true);
    const data = {
      PVDaten,
      Erklärung,
      Spi,
    };
    const id = toast.loading("Bitte warten, ihre Daten werden übermittelt.", {
      autoClose: false,
    });
    const PORT = process.env.PORT || 8000;
    const url = "http://localhost:" + PORT + "/sendData";

    //const url = "https://test-parte-2.onrender.com/sendData";

    axios
      .post(url, data)
      .then((res) => {
        alert(res.data);
        window.location.reload(false);
      })
      .catch((err) => {
        toast.update(id, {
          render: "Etwas is schiefgelaufen, versuchen Sie es später nocheinmal",
          type: "error",
          isLoading: false,
          autoClose: false,
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

  const handleClickSpi = (event) => {
    hiddenFileInputSpi.current.click();
  };
  const handleChangeSpi = (event) => {
    flushSync(() => {
      setFileSpi(event.target.files[0]);
    });
    handleUploadSpi(event, event.target.files[0]);
  };
  const handleChangePvData = () => (e) => {
    let copy = Object.assign({}, PVDaten);
    copy[e.target.id].content = e.target.value;
    setPVDaten(copy);
  };
  const handleChangeWechselrichter = (index) => (e) => {
    let copy = Wechselrichter;
    copy[index][e.target.name] = copy[index][e.target.name] + e.target.value;
    setWechselrichter(copy);
  };
  const addWechselrichter = (e) => {
    let copy = Wechselrichter;

    copy.push({
      Seriennummer: "",
      Firmware: "",
      Marke: "",
      Modell: "",
      key: uniqid(),
    });
    setWechselrichter(copy);
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
          <h1>Parte 2</h1>
        </div>
        <div className={style.section}>
          <h2>Konfomritätserklärung</h2>
          <div className={style.description}>
            Laden Sie hier bitte eine Kopie Ihrer Konformitätserklärung hoch.
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
          <h2>SPI</h2>
          <div className={style.description}>
            Laden Sie hier bitte eine Kopie Ihres SPI hoch.
          </div>
          <button className={style.buttonupload} onClick={handleClickSpi}>
            Datei hochladen
          </button>
          <input
            type="file"
            onChange={handleChangeSpi}
            ref={hiddenFileInputSpi}
            style={{ display: "none" }}
          />
          <div>{uploadedFileURLSpi}</div>
        </div>
        <form onSubmit={sendData}>
          <div className={style.section}>
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
          </div>
          <div className={style.section}>
            {Wechselrichter.map((element, index) => {
              return (
                <WechselrichterData
                  key={element.key}
                  index={index}
                  elements={Object.keys(element)}
                  value={Wechselrichter[index]}
                  onChange={handleChangeWechselrichter(index)}
                  onClick={addWechselrichter()}
                ></WechselrichterData>
              );
            })}
          </div>
          <div className={style.section}></div>
          <button
            className={style.submitbutton}
            type="submit"
            disabled={isButtonenabled}
          >
            {"Daten abschicken"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;
