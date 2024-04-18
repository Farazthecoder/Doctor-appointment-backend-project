const express = require("express");

const app = express();
const port = 3000;

app.use(express.urlencoded());

app.set("view engine", "ejs");

const doctors = [
  {
    id: 1,
    name: "Dr. Howard Smith",
    specialist: "Cardiology",
    availableSlots: ["Monday", "Wednesday"],
  },
  {
    id: 2,
    name: "Dr. Jin Kazama",
    specialist: "Dermatology",
    availableSlots: ["Tuesday", "Thursday"],
  },
  {
    id: 3,
    name: "Dr. Nina Williams",
    specialist: "Hematologists",
    availableSlots: ["Friday", "Saturday"],
  },
];

const appointmentBooked = [];

app.get("/doctors", (req, res) => {
  res.json(doctors);
});

app.get("/doctors/:id", (req, res) => {
  const doctorsId = +req.params.id;
  // console.log(typeof doctorsId)

  const doctor = doctors.find((d) => {
    return d.id === doctorsId;
  });
  // console.log(doctor)

  if (!doctor) {
    return res.status(404).json({ message: "doctor not found" });
  }
  res.json(doctor);
});

app.get("/doctors/:id/slots", (req, res) => {
  const doctorsId = +req.params.id;
  const doctor = doctors.find((d) => {
    return d.id === doctorsId;
  });
  if (!doctor) {
    return res.status(404).json({ message: "doctor not found" });
  }

  res.json({ availableSlots: doctor.availableSlots });
});

app.get("/appointmentform", (req, res) => {
  res.render("appointmentDetails.ejs");
});

app.post("/submitted/appointment", (req, res) => {
  const { doctorId, patientName } = req.body;
  //

  doctors.filter((d) => {
    if (doctorId == d.id) {
      d.patientName = patientName;
      appointmentBooked.push(d);
      res.json(appointmentBooked);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on a port ${port}`);
});
