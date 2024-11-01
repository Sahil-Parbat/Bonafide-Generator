const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/src", express.static(path.join(__dirname, "../src")));

let certificatesData = []; // Store data for multiple certificates

// Endpoint to receive form data for multiple certificates
app.post("/generate-certificates", (req, res) => {
  const data = req.body;

  // Validate incoming data
  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).send("No certificate data provided.");
  }

  // Store all certificate data
  certificatesData = data.map(
    ({ name, year, branch, enrollment, duration }) => {
      return {
        name,
        year,
        branch,
        enrollment,
        duration,
        date: new Date().toLocaleDateString(),
      };
    }
  );

  res.sendStatus(200);
});

// Endpoint to serve certificate data
app.get("/certificate-data", (req, res) => {
  let certificatesHTML = "";

  // Generate HTML for all certificates
  certificatesData.forEach((certificate) => {
    const { name, year, branch, enrollment, duration } = certificate;
    certificatesHTML += `    
<div style=" padding:0px ; ">
<!-- Certificate Container with Border -->
    <div style="border: 2px solid black; padding: 10px; margin: 10px; border-radius: 10px;">
        <!-- Header Section with Logos -->
        <div style="display: flex; justify-content: space-between; padding: 20px  8px  20px; 
       
          font-style: italic;

           width: 100%;           
    margin: 0 auto;       
    text-align: center; 
        ">
            <img src="/src/gecalogo.jpeg" alt="Left Logo" style="height: 120px;">
            
            <div style="text-align: center;">
                <h3 style="margin: 10px 0px 0px;font-family: Georgia; font-weight: bold; font-size:28px ">
               GOVERNMENT COLLEGE OF ENGINEERING
                </h3>
                <h3 style="margin: 0;font-family: Georgia; font-weight: bold;font-size:28px">AURANGABAD,</h3>

                <h3 style="margin: 0;font-family: Georgia; font-weight: bold;font-size:28px">
                CHHATRAPATI SAMBHAJINAGAR
                </h3>

                <p style="margin: 0;font-family: Georgia; font-size:14px ;font-weight: bold">              
                (An Autonomous Institute of Govt. of Maharashtra)  
                </p>
                <p style="margin: 0;font-size: 14px;
                font-weight: bold;font-family: Georgia;
                ">
                Railway Station Road, Osmanpura, Chhatrapati Sambhajinagar.                
                </p>
                
                <p style="margin: 0; font-size: 14px;
                font-weight: bold;font-family: Georgia;">                
                "In Pursuit of Technical Excellence"                
                </p>

             <p style="margin: 0; font-size: 14px;
             font-weight: bold; font-family: Times New Roman;
             ">
           <img src="/src/telephone-icon.png" alt="Telephone Icon"  style="width: 11px; ">       
             office:     
               (0240)2366101, 2366102 &nbsp;&nbsp; Principal: 0240-2366111                   
                </p>

                <p style="margin: 0; font-size: 14px;
                font-style: italic; font-family: Times New Roman;
                ">
                  <strong>  e-mail-</strong>  
                  
                  <u>
                  officegcoeaurangabad@dtemaharashtra.gov.in</u> &nbsp;   &nbsp; &nbsp; &nbsp;   &nbsp;
                   web: <u>www.geca.ac.in
                  </u>
                  
                </p>
            </div>

            <img src="/src/g2.gif" alt="Right Logo" style="height: 120px;">
        </div>

<hr style="          
    border-top: 3px dashed black; 
    color: black; 
    margin: 15px 5px; 
    ">


        <!-- Certificate Info -->
        <div style="margin: 10px; text-align: left; 

        display: flex; justify-content: space-between; align-items: center;

        font-family: serif,Times New Roman,Arial;
        font-size: 19px;

        
        ">
            <p style="margin: 0px 50px; ">No./GECA/SS/BC/${
              new Date().getFullYear() % 100
            }/ </p>
            <p style="margin: 0px 50px;">Date: ${new Date().toLocaleDateString()}</p>
        </div>


        <!-- Certificate Title -->
        <h3 style="margin: 20px 100px 20px; text-align: center; text-decoration: underline; font-weight: bold;

        
         font-family: serif,Times New Roman,Arial;
        font-size: 26px
        ">BONAFIDE CERTIFICATE</h3>

        <!-- Certificate Body -->
        <div style=" font-family: serif,Times New Roman,Arial; padding: 5px; ; margin:0px 25px ;word-spacing: 8px; font-size: 22px; line-height: 2.0">

<p>&nbsp &nbsp  This is  certify that Shri/Miss <strong style="text-transform: uppercase;">${name}</strong> Class <strong>${year} Year</strong>
    <strong>B.Tech (${branch}</strong>) Enrollment No. <strong style="text-transform: uppercase;">${enrollment}</strong> is a Bonafide Student of this 
  College during the Year 
    <strong style="text-transform: uppercase;  " >${duration}</strong>.</p>
        </div>
        


        <!-- Signature -->

      <div style="
      font-family: serif,Times New Roman,Arial;
      margin: 15px 15px;  display: flex; justify-content: flex-end;">
    <div style=" text-align: center; padding: 5px;
    margin-top:25px; font-size: 18px; line-height:1.2    
    ">
        <p style="margin: 0; ">Principal</p>
        <p style="margin: 0; ">Government College of Engineering</p>
        <p style="margin: 0;">Aurangabad,</p>
        <p style="margin: 0;">Chhatrapati Sambhajinagar</p>
    </div>
</div>


    </div>

</div>

    `;
  });

  res.send(certificatesHTML);
});

// Serve the certificate page
app.get("/certificate", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/certificate.html"));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
