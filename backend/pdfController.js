const { unlinkSync } = require("fs");
const nodemailer = require("nodemailer");

exports.uploadFile = async (req, res) => {
  // console.log(req.body);
  //console.log(req.file.filename);
  res.send(req.file.filename);
};
exports.uploadSpi = async (req, res) => {
  res.send(req.file.filename);
}; /*
exports.uploadStromrechnung = async (req, res) => {
  res.send(req.file.filename);
};
exports.uploadKataster = async (req, res) => {
  res.send(req.file.filename);
};*/
exports.sendData = async (req, res) => {
  //console.log(req.body);
  const PVData = req.body.PVDaten;
  const Konformfilename = req.body.Erklärung.filename;
  const SpiFilename = req.body.Spi.filename;
  if (PVData.length === 0) return "error, to many empty fields";

  await sendMail(
    PVData["Vorname"].content + " " + PVData["Nachname"].content,
    PVData["Bauende"].content,
    Konformfilename,
    SpiFilename
  ).then(() => {
    res.send(
      "Vielen Dank, Ihre Daten wurden erfolgreich übermittelt! Sie können das Portal jetzt verlassen!"
    );
  });
};

sendMail = async (FullName, Bauende, Konformfilename, SpiFilename) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "gabrielmaler789@gmail.com",
      pass: "owvmuijpjvbqrqpe",
    },
  });
  const info = await transporter.sendMail({
    from: "gabrielmaler789@gmail.com",
    to: "formulare.automatisiert@gmail.com",
    subject: "Parte 2 von " + FullName,
    html: "Bauende: " + Bauende,
    attachments: [
      {
        filename: Konformfilename[Konformfilename.length - 1],
        path:
          "./Documents/Uploads/" + Konformfilename[Konformfilename.length - 1],
      },
      {
        filename: SpiFilename[SpiFilename.length - 1],
        path: "./Documents/Uploads/" + SpiFilename[SpiFilename.length - 1],
      },
    ],
  });

  console.log("Ihre Daten wurden erfolgreich gespeichert!");
  for (let i = Konformfilename.length - 1; i > -1; i--) {
    unlinkSync("./Documents/Uploads/" + Konformfilename[i]);
    Konformfilename.pop();
  }
  for (i = SpiFilename.length - 1; i > -1; i--) {
    unlinkSync("./Documents/Uploads/" + SpiFilename[i]);
    SpiFilename.pop();
  }
};
