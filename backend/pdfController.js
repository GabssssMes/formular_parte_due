const { PDFDocument } = require("pdf-lib");
const { writeFileSync, readFileSync, unlinkSync } = require("fs");
const nodemailer = require("nodemailer");

exports.uploadFile = async (req, res) => {
  // console.log(req.body);
  //console.log(req.file.filename);
  res.send(req.file.filename);
};
exports.uploadAusweis = async (req, res) => {
  res.send(req.file.filename);
};
exports.uploadStromrechnung = async (req, res) => {
  res.send(req.file.filename);
};
exports.uploadKataster = async (req, res) => {
  res.send(req.file.filename);
};
exports.createPdf = async (req, res) => {
  //console.log(req.body);
  const PersonalData = req.body.Personendaten;
  const PVData = req.body.PVDaten;
  const PVAdress = req.body.PVAdresse;
  const SignatureFilename = req.body.Unterschrift.filename;
  const AusweisFilename = req.body.Ausweis.filename;
  const StromrechnungFilename = req.body.Stromrechnung.filename;
  const KatasterFilename = req.body.Kataster.filename;
  const current = new Date();
  const date = `${current.getDate()}.${
    current.getMonth() + 1
  }.${current.getFullYear()}`;
  if (PersonalData.length === 0 || PVData.length === 0 || PVAdress.length === 0)
    return "error, to many empty fields";

  let pdfDoc,
    filename =
      "parte_uno_" +
      PersonalData["Nachname"].content +
      "_" +
      PersonalData["Vorname"].content +
      ".pdf",
    path =
      "./parte_uno_" +
      PersonalData["Nachname"].content +
      "_" +
      PersonalData["Vorname"].content +
      ".pdf";

  pdfDoc = await PDFDocument.load(
    readFileSync(
      "./Documents/Allegato_A_-_MU_Parte_I_e_Parte_II__FTV_200kW_20_dic-3.pdf"
    )
  );
  const pages = pdfDoc.getPages();
  pages[0].drawText(
    PersonalData["Vorname"].content + " " + PersonalData["Nachname"].content,
    {
      x: 123,
      y: 665,
      size: 8,
    }
  );
  pages[0].drawText(PersonalData["Geburtsort"].content, {
    x: 314,
    y: 665,
    size: 8,
  });
  pages[0].drawText(PersonalData["Geburtsdatum"].content, {
    x: 385,
    y: 665,
    size: 8,
  });
  pages[0].drawText(PersonalData["Gemeinde"].content, {
    x: 66,
    y: 653,
    size: 7,
  });
  pages[0].drawText(
    PersonalData["Provinz (Abkürzung, maximal 2 Zeichen ,z.B. BZ für Bozen)"]
      .content,
    {
      x: 166,
      y: 653,
      size: 8,
    }
  );
  pages[0].drawText(PersonalData["Straße"].content, {
    x: 202,
    y: 653,
    size: 6,
  });
  pages[0].drawText(PersonalData["Hausnummer"].content, {
    x: 290,
    y: 652,
    size: 8,
  });
  pages[0].drawText(PersonalData["Postleitzahl"].content, {
    x: 330,
    y: 652,
    size: 8,
  });
  pages[0].drawText(PersonalData["Steuernummer"].content, {
    x: 418,
    y: 652,
    size: 8,
  });
  pages[0].drawText(PersonalData["Partita Iva"].content, {
    x: 418,
    y: 642,
    size: 8,
  });
  pages[0].drawText(PersonalData["Telefonnummer"].content, {
    x: 115,
    y: 640,
    size: 6,
  });
  pages[0].drawText(PersonalData["Telefonnummer"].content, {
    x: 179,
    y: 640,
    size: 6,
  });
  pages[0].drawText(PersonalData["Email"].content, {
    x: 248,
    y: 641,
    size: 7,
  });
  if (PersonalData["Privatperson"].selectedValue === "Ja") {
    pages[0].drawLine({
      start: { x: 74, y: 597 },
      end: { x: 83, y: 588 },
    });
    pages[0].drawLine({
      start: { x: 74, y: 588 },
      end: { x: 83, y: 597 },
    });
  } else {
    pages[0].drawLine({
      start: { x: 74, y: 555 },
      end: { x: 83, y: 546 },
    });
    pages[0].drawLine({
      start: { x: 74, y: 546 },
      end: { x: 83, y: 555 },
    });
    pages[0].drawText(
      "Legale rappresentante della ditta " +
        PersonalData["Privatperson"].content,
      {
        x: 170,
        y: 548,
        size: 8,
      }
    );
  }
  pages[0].drawText(PVData["Baubeginn"].content, {
    x: 109,
    y: 420,
    size: 7,
  });
  pages[0].drawText(PVData["Name PV-Anlage"].content, {
    x: 472,
    y: 426,
    size: 6,
  });
  pages[0].drawText(PVData["Spitzenleistung[kW]"].content, {
    x: 150,
    y: 408,
    size: 6,
  });
  pages[0].drawText(PVData["Nennleistung[kW]"].content, {
    x: 420,
    y: 408,
    size: 6,
  });
  pages[0].drawText(PVData["POD"].content, {
    x: 177,
    y: 396,
    size: 8,
  });
  if (PVData["Speicher"].selectedValue === "Ja") {
    pages[0].drawLine({
      start: { x: 74, y: 200 },
      end: { x: 83, y: 191 },
    });
    pages[0].drawLine({
      start: { x: 74, y: 191 },
      end: { x: 83, y: 200 },
    });
    pages[0].drawText(PVData["Speicher"].content, {
      x: 415,
      y: 193,
      size: 8,
    });
    pages[0].drawLine({
      start: { x: 93, y: 152 },
      end: { x: 98, y: 157 },
    });

    pages[0].drawLine({
      start: { x: 93, y: 157 },
      end: { x: 98, y: 152 },
    });

    pages[0].drawLine({
      start: { x: 335, y: 156 },
      end: { x: 373, y: 156 },
    });
    pages[0].drawLine({
      start: { x: 335, y: 154 },
      end: { x: 373, y: 154 },
    });
    //pages[0].drawText("continua", {
    //  x: 267,
    //  y: 153,
    //  size: 7,
    pages[0].drawText(PVData["Speicher"].leistung, {
      x: 406,
      y: 112,
      size: 6,
    });
  }
  if (
    PVData["Nennleistung[kW]"].content < PVData["Spitzenleistung[kW]"].content
  ) {
    pages[0].drawText(PVData["Nennleistung[kW]"].content, {
      x: 432,
      y: 57,
      size: 8,
    });
  } else {
    pages[0].drawText(PVData["Spitzenleistung[kW]"].content, {
      x: 432,
      y: 57,
      size: 8,
    });
  }

  pages[0].drawLine({
    start: { x: 74, y: 376 },
    end: { x: 83, y: 367 },
  });
  pages[0].drawLine({
    start: { x: 74, y: 367 },
    end: { x: 83, y: 376 },
  });
  pages[0].drawText(PVAdress["Fraktion"].content, {
    x: 83,
    y: 333,
    size: 8,
  });
  pages[0].drawText(
    PVAdress["Provinz (Abkürzung, maximal 2 Zeichen ,z.B. BZ für Bozen)"]
      .content,
    {
      x: 150,
      y: 333,
      size: 8,
    }
  );
  pages[0].drawText(PVAdress["Straße"].content, {
    x: 207,
    y: 340,
    size: 8,
  });
  pages[0].drawText(PVAdress["Nummer"].content, {
    x: 275,
    y: 333,
    size: 8,
  });
  pages[0].drawText(PVAdress["Gemeinde"].content, {
    x: 343,
    y: 333,
    size: 8,
  });
  pages[0].drawText(PVAdress["Kataster-Blatt"].content, {
    x: 119,
    y: 290,
    size: 8,
  });

  pages[0].drawText(PVAdress["Kataster-Parzelle"].content, {
    x: 160,
    y: 290,
    size: 8,
  });
  pages[0].drawText(PVAdress["Kataster-Sub."].content, {
    x: 206,
    y: 290,
    size: 8,
  });
  pages[0].drawLine({
    start: { x: 74, y: 312 },
    end: { x: 83, y: 303 },
  });
  pages[0].drawLine({
    start: { x: 74, y: 303 },
    end: { x: 83, y: 312 },
  });
  pages[1].drawText(PersonalData["IBAN laufend auf"].content, {
    x: 60,
    y: 705,
    size: 6,
  });
  pages[1].drawText(PersonalData["IBAN"].content, {
    x: 148,
    y: 715,
    size: 7,
  });
  pages[1].drawLine({
    start: { x: 132, y: 582 },
    end: { x: 126, y: 576 },
  });
  pages[1].drawLine({
    start: { x: 132, y: 576 },
    end: { x: 126, y: 582 },
  });
  pages[1].drawLine({
    start: { x: 166, y: 572 },
    end: { x: 161, y: 566 },
  });
  pages[1].drawLine({
    start: { x: 166, y: 566 },
    end: { x: 161, y: 572 },
  });
  pages[1].drawText(PVAdress["Fraktion"].content + "    " + date, {
    x: 133,
    y: 154,
    size: 8,
  });

  let filename2 =
      "Delega_mandato_di_rappresentanza_Unificato_TICA_" +
      PersonalData["Nachname"].content +
      "_" +
      PersonalData["Vorname"].content +
      ".pdf",
    path2 =
      "./Delega_mandato_di_rappresentanza_Unificato_TICA_" +
      PersonalData["Nachname"].content +
      "_" +
      PersonalData["Vorname"].content +
      ".pdf";

  let pdfDoc2 = await PDFDocument.load(
    readFileSync("./Documents/Regolamento di Esercizio BT (CEI 0-21_2022).pdf")
  );
  const pages2 = pdfDoc2.getPages();

  pages2[0].drawText(PersonalData["Vorname"].content, {
    x: 90,
    y: 644,
    size: 9,
  });
  pages2[0].drawText(PersonalData["Nachname"].content, {
    x: 300,
    y: 644,
    size: 9,
  });
  pages2[0].drawText(PersonalData["Geburtsort"].content, {
    x: 90,
    y: 625,
    size: 9,
  });
  pages2[0].drawText(PersonalData["Geburtsdatum"].content, {
    x: 201,
    y: 625,
    size: 9,
  });
  pages2[0].drawText(PersonalData["Steuernummer"].content, {
    x: 120,
    y: 605,
    size: 9,
  });
  pages2[0].drawText(PersonalData["Straße"].content, {
    x: 350,
    y: 605,
    size: 9,
  });
  pages2[0].drawText(PersonalData["Gemeinde"].content, {
    x: 95,
    y: 585,
    size: 9,
  });
  pages2[0].drawText(PersonalData["Postleitzahl"].content, {
    x: 280,
    y: 585,
    size: 9,
  });
  pages2[0].drawText(
    PersonalData["Provinz (Abkürzung, maximal 2 Zeichen ,z.B. BZ für Bozen)"]
      .content,
    {
      x: 379,
      y: 585,
      size: 9,
    }
  );
  if (PersonalData["Privatperson"].selectedValue !== "Ja") {
    pages2[0].drawText(PersonalData["Privatperson"].content, {
      x: 150,
      y: 471,
      size: 9,
    });
    pages2[0].drawText(PersonalData["Partita Iva"].content, {
      x: 379,
      y: 471,
      size: 9,
    });
  }
  pages2[2].drawText(date, {
    x: 80,
    y: 207,
    size: 9,
  });
  writeFileSync(
    filename,
    await pdfDoc
      .save()
      .then(
        writeFileSync(
          filename2,
          await pdfDoc2
            .save()
            .then(
              sendMail(
                filename,
                path,
                PersonalData["Vorname"].content +
                  " " +
                  PersonalData["Nachname"].content,
                filename2,
                path2,
                SignatureFilename,
                AusweisFilename,
                StromrechnungFilename,
                KatasterFilename
              )
            )
        )
      )
  );
  res.send(
    "Vielen Dank, Ihre Daten wurden erfolgreich übermittelt! Sie können das Portal jetzt verlassen!"
  );
};

sendMail = async (
  filename,
  path,
  FullName,
  filename2,
  path2,
  SignatureFilename,
  AusweisFilename,
  StromrechnungFilename,
  KatasterFilename
) => {
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
    subject: "Formular Parte 1 von " + FullName,
    html: "Zustellung Formular Parte 1 von " + FullName,
    attachments: [
      {
        filename: filename,
        path: path,
        contentType: "application/pdf",
      },
      {
        filename: filename2,
        path: path2,
        contentType: "application/pdf",
      },
      {
        filename: SignatureFilename[SignatureFilename.length - 1],
        path:
          "./Documents/Uploads/" +
          SignatureFilename[SignatureFilename.length - 1],
      },
      {
        filename: AusweisFilename[AusweisFilename.length - 1],
        path:
          "./Documents/Uploads/" + AusweisFilename[AusweisFilename.length - 1],
      },
      {
        filename: StromrechnungFilename[StromrechnungFilename.length - 1],
        path:
          "./Documents/Uploads/" +
          StromrechnungFilename[StromrechnungFilename.length - 1],
      },
      {
        filename: KatasterFilename[KatasterFilename.length - 1],
        path:
          "./Documents/Uploads/" +
          KatasterFilename[KatasterFilename.length - 1],
      },
    ],
  });

  console.log("Ihre Daten wurden erfolgreich gespeichert!");
  unlinkSync(filename);
  unlinkSync(filename2);
  for (let i = SignatureFilename.length - 1; i > -1; i--) {
    unlinkSync("./Documents/Uploads/" + SignatureFilename[i]);
    SignatureFilename.pop();
  }
  for (i = AusweisFilename.length - 1; i > -1; i--) {
    unlinkSync("./Documents/Uploads/" + AusweisFilename[i]);
    AusweisFilename.pop();
  }
  for (i = StromrechnungFilename.length - 1; i > -1; i--) {
    unlinkSync("./Documents/Uploads/" + StromrechnungFilename[i]);
    StromrechnungFilename.pop();
  }
  for (i = KatasterFilename.length - 1; i > -1; i--) {
    unlinkSync("./Documents/Uploads/" + KatasterFilename[i]);
    KatasterFilename.pop();
  }
};
