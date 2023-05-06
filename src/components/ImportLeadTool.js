import { useRef, useState } from 'react'
import { HiArrowCircleUp, HiXCircle } from 'react-icons/hi'
import { read, utils } from 'xlsx'

import styles from '../styles/ImportLeadTool.module.css'

const ImportLeadTool = ({ onFileUploaded, enableImport, onImport }) => {
  const acceptAbleFileFormats = ['xls', 'xlsx']
  const [fileName, setFileName] = useState(null)
  const [sheetNames, setSheetNames] = useState([])
  const [sheetData, setSheetData] = useState(null)
  const fileRef = useRef(null)
  const sheetName = useRef(null)

  // file format validation
  const checkFileFormat = (name) =>
    acceptAbleFileFormats.includes(name.split('.').pop().toLowerCase())

  // remove file
  const handleFileRemove = () => {
    fileRef.current.value = ''
    setSheetData(null)
    onFileUploaded(null)
    setFileName(null)
  }

  // read data from excell file
  const readDataFromExcell = async (data) => {
    const mySheetData = {}
    const { SheetNames, Sheets } = await read(data)
    setSheetNames(SheetNames)

    // loop through sheetnames
    await SheetNames.map(async (name) => {
      const workSheet = Sheets[name]
      const jsonData = await utils.sheet_to_json(workSheet)
      mySheetData[name] = jsonData
      return jsonData
    })

    setSheetData(mySheetData)
    return mySheetData
  }

  const handleFileChange = async (e) => {
    const myFile = e.target.files[0]

    if (!checkFileFormat(myFile.name)) {
      // eslint-disable-next-line no-alert
      alert('Invalid File Format')
      return
    }
    const data = await myFile.arrayBuffer()
    setFileName(myFile.name)
    const mySheetData = await readDataFromExcell(data)

    onFileUploaded(Object.values(mySheetData)[0])
  }

  const handleSheetChange = () => {
    onFileUploaded(sheetData[sheetName.current.value])
  }

  return (
    <div className={styles.container}>
      {!fileName && <h1>Please Upload Excel (.xlsx or .xls) file</h1>}
      <div className={styles.info__container}>
        <div className={styles.info__container__left}>
          <h2>{fileName && `Filename: ${fileName}`}</h2>
          {fileName && (
            <HiXCircle size={20} color="red" onClick={handleFileRemove} />
          )}
        </div>
        <div className={styles.info__container__right}>
          {sheetData && (
            <>
              <select
                name="sheetName"
                id=""
                ref={sheetName}
                onChange={handleSheetChange}
                className={styles.selectbox}
              >
                {sheetNames.map((name, index) => (
                  <option value={name} key={index}>
                    {name}
                  </option>
                ))}
              </select>
            </>
          )}

          {enableImport && (
            <button onClick={onImport} className={styles.import__button}>
              Import
              <HiArrowCircleUp size={24} />
            </button>
          )}
        </div>
      </div>
      {!fileName && (
        <span
          onClick={() => fileRef.current.click()}
          className={styles.upload__button}
        >
          Browse
        </span>
      )}

      <input
        type="file"
        accept=".xlsx, .xls"
        multiple={false}
        onChange={handleFileChange}
        ref={fileRef}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default ImportLeadTool
