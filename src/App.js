import React, { useState } from "react";
import * as XLSX from 'xlsx'

function App() {
  const [items, setItems] = useState([])

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e) => {
        const bufferArray = e.target.result
        const workBook = XLSX.read(bufferArray, { type: "buffer" })
        const workSheetName = workBook.SheetNames[0]
        const workSheet = workBook.Sheets[workSheetName]
        const data = XLSX.utils.sheet_to_json(workSheet)

        resolve(data)
      } 

      file.onerror = (err) => {
        reject(err)
      }
    })

    promise.then((data) => {
      console.log(data)
      setItems(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0]
          readExcel(file)
        }}
      />

      {items.length && <table className="table">
        <thead>
          <tr>
            <th scope="col">Fakülte</th>
            <th scope="col">Bölüm</th>
            <th scope="col">Program</th>
            <th scope="col">Sınıf</th>
            <th scope="col">Kod</th>
            <th scope="col">Şube</th>
            <th scope="col">Ders</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr>
              <td>{item.Fakülte}</td>
              <td>{item.Bölüm}</td>
              <td>{item.Program}</td>
              <td>{item.Sınıf}</td>
              <td>{item.Kod}</td>
              <td>{item.Şube}</td>
              <td>{item.Ders}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}

export default App;
