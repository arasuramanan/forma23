import { saveAs } from 'file-saver';
import { useFormik } from 'formik';
import axios from 'axios';
import './DetailList.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import ExcelJS from 'exceljs';



function DetailsList() {
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState(null);

  const formik = useFormik({
    initialValues: {
      NameoftheUPSI: '',
      InfoSharedBy: '',
      PANNumber1: '',
      InfoSharedwithrespectto: '',
      InsiderTypes: '',
      InfoSharedTo: '',
      PANNumber2: '',
      TypeofOrganization: '',
      NameoftheOrganization: '',
      DateandTimeofSharing: '',
      ParticularofInfoShared: '',
      PurposeofSharing: '',
      ModeofSharing: '',
    },
    onSubmit: async (values) => {
      console.log('hi');
      console.log(values);
      const result = await axios.post('https://backend-oz2e.onrender.com/api/detailsnewform', values);
      console.log(result);
      window.alert('🎉✨ Form Submitted Successfully! 🎉✨');
      window.location.reload();
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/details`);
        setJsonData(response.data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

  
  const generatePdf = () => {

    
    if (!jsonData) return;

    
  
    const pdfContainer = document.createElement('div');
    pdfContainer.innerHTML = `<pre>${JSON.stringify(jsonData, null, 2)}</pre>`;
  
    html2pdf()
      .set({ margin: 0.5 })
      .from(pdfContainer)
      .save()
      .then((pdf) => {
        saveAs(pdf, 'data.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
      
  };
  

  const convertToExcel = () => {
    if (!jsonData) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Convert JSON data to rows
    const rows = Object.values(jsonData);

    // Add headers
    const headers = Object.keys(jsonData);
    worksheet.addRow(headers);

    // Add data rows
    rows.forEach((row) => {
      const values = Object.values(row);
      worksheet.addRow(values);
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'data.xlsx');
    });
  };


  async function handleLogout() {
    try {
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row" style={{ marginBottom: '20px' }}></div>
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <label htmlFor="text" className="form-label">Name of the UPSI:</label>
      </div>
      <div className="col-md-6">
        <input type="text" onChange={formik.handleChange} name="NameoftheUPSI" className="form-control" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <label htmlFor="inputPassword" className="form-label">Info Shared By:</label>
      </div>
      
      <div className="col-md-6">
        <input type="text" onChange={formik.handleChange} name="InfoSharedBy" className="form-control" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <label htmlFor="inputPassword" className="form-label">PAN Number1:</label>
      </div>
      <div className="col-md-6">
        <input type="text" onChange={formik.handleChange} name="PANNumber1" className="form-control" />
      </div>
    </div>
    
    <div className="row">
      <div className="col-md-6">
        <label htmlFor="text" className="form-label">Info Shared with respect to:</label>
      </div>
      
      <div className="col-md-6">
        <select className="form-select" onChange={formik.handleChange} name="InfoSharedwithrespectto" aria-label=".form-select-lg example">
          <option defaultValue="None">--- Select ---</option>
          <option value="Designated Person">Designated Person</option>
          <option value="Insider">Insider</option>
          <option value="UPSI Project">UPSI Project</option>
        </select>
      </div>
    </div>

    <div className="row" style={{ marginTop: '15px' }}>
      <div className="col-md-6">
        <label htmlFor="text" className="form-label">Insider Types:</label>
      </div>
      <div className="col-md-6">
        <select className="form-select" onChange={formik.handleChange} name="InsiderTypes" aria-label=".form-select-lg example">
          <option defaultValue="None">--- Select ---</option>
          <option value="Director">Director</option>
          <option value="Managing Director">Managing Director</option>
          <option value="Independent Director">Independent Director</option>
          <option value="CFO">CFO</option>
          <option value="Company Secretary">Company Secretary</option>
          <option value="Auditor">Auditor</option>
          <option value="Company Secretary - In Practice">Company Secretary - In Practice</option>
          <option value="Others">Others</option>
          
        </select>
      </div>
    </div>


    <div className="row">
  <div className="col-md-6">
    <label htmlFor="text" className="form-label">Insider Signed Confidentiality Agreement:</label>
  </div>

 
  <div className="col-md-6">
    <label htmlFor="text" className="form-label" style={{ color: "red", whiteSpace: "nowrap", marginTop: "10px" }}>
      
      No Confidentiality Agreement Signed
    </label>
    </div>
</div>


<div className="row" style={{ marginTop: "20px" }}>
  <div className="col-md-6">
    <label htmlFor="text" className="form-label">Info Shared To:</label>
  </div>
  <div className="col-md-6">
    <input type="text" onChange={formik.handleChange} name="InfoSharedTo" className="form-control" />
  </div>
</div>

    <div className="row">
      <div className="col-md-6">
        <label htmlFor="inputPassword" className="form-label">PAN Number2:</label>
      </div>
      <div className="col-md-6">
        <input type="text" onChange={formik.handleChange} name="PANNumber2" className="form-control" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <label htmlFor="text" className="form-label">Type of Organization:</label>
      </div>
      <div className="col-md-6">
        <select className="form-select" onChange={formik.handleChange} name="TypeofOrganization" aria-label=".form-select-lg example">
          <option defaultValue="None">--- Select ---</option>
          <option value="Partnership">Partnership</option>
          <option value="Individual">Individual</option>
          <option value="Company">Company</option>
        </select>
      </div>
    </div>
    <div className="row" style={{ marginTop: '15px' }}>
      <div className="col-md-6">
        <label htmlFor="text" className="form-label">Name of the Organization:</label>
      </div>
      <div className="col-md-6">
        <input type="text" onChange={formik.handleChange} name="NameoftheOrganization" className="form-control" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <label htmlFor="text" className="form-label">Date and Time of Sharing:</label>
      </div>
      <div className="col-md-6">
        <input type="date" id="date" onChange={formik.handleChange} name="DateandTimeofSharing" className="form-control" />
      </div>
    </div>
    <div className="row" style={{ marginTop: '15px' }}>
      <div className="col-md-6">
        <label htmlFor="text" className="form-label">Particular of Info Shared:</label>
      </div>
      <div className="col-md-6">
        <input type="text" onChange={formik.handleChange} name="ParticularofInfoShared" className="form-control" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <label htmlFor="text" className="form-label">Purpose of Sharing:</label>
      </div>
      <div className="col-md-6">
        <input type="text" onChange={formik.handleChange} name="PurposeofSharing" className="form-control" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <label htmlFor="text" className="form-label">Mode of Sharing:</label>
      </div>
      <div className="col-md-6">
        <select className="form-select" onChange={formik.handleChange} name="ModeofSharing" aria-label=".form-select-lg example">
          <option defaultValue="None">--- Select ---</option>
          <option value="Email">Email</option>
          <option value="Physical">Physical</option>
          <option value="Pendrive">Pendrive</option>
        </select>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <button type="submit">SUBMIT</button>
      </div>
    </div>

    <div className="row" style={{ marginTop: '20px' }}></div>

<div className="row">
  <div className="col-md-6">
    <button type="button" onClick={generatePdf} className="button downloads-button">
      Downloads
    </button>
  </div>
</div>

<div className="row" style={{ marginTop: '20px' }}></div>

<div className="row">
  <div className="col-md-6">
    <button type="button" onClick={convertToExcel} className="button excel-button">
      Excel
    </button>
  </div>
</div>
</div>
<div className="row" style={{ marginTop: '20px' }}></div>

      
      {/* Logout Button */}
      <div className="row">
        <div className="col-md-6">
          <button type="button" onClick={handleLogout} className="button logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="row" style={{ marginTop: '20px' }}></div>
</form>
  
    );
}

export default DetailsList;