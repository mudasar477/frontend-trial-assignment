import React, { useState} from 'react';
import { Card, Button, Form, Input, Select } from 'antd';
import countryList from 'react-select-country-list'
import Papa, { ParseResult } from "papaparse"
import './App.css';

const { Option } = Select;
const { TextArea } = Input;

type Data = {
  Product: string,
  Price: string,
}

type Values = {
  data: Data[]
}

var csvData: Data[];

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const FileHandler = () => {
     
  // This state will store the parsed data
  const [data, setData] = useState<Values | undefined>();

  const [textFieldData, setTextFieldData] = useState<Values | undefined>();
   
  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");
   
  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  // This function will be called when
  // the file input changes
  const handleFileChange = (e: React.ChangeEvent<any>) => {
      setError("");
       
      // Check if user has entered the file
      if (e.target.files.length) {
          const inputFile = e.target.files[0];
          // Check the file extensions, if it not
          // included in the allowed extensions
          // we show the error
          const fileExtension = inputFile?.type.split("/")[1];
          if (!allowedExtensions.includes(fileExtension)) {
              setError("Please input a csv file");
              return;
          }
          // If input type is correct set the state
          setFile(inputFile);
          Papa.parse(inputFile, {
            header: true,
            download: true,
            skipEmptyLines: true,
            delimiter: ",",
            complete: (results: ParseResult<Data>) => {
              setData(results);
              csvData = results.data;
            },
          })
      }
  };

  const handleParse = () => {
       
      // If user clicks the parse button without
      // a file we show a error
      if (!file) return setError("Enter a valid file");
      
      console.log(data?.data);
      setTextFieldData(data);
      data?.data.forEach(function (value) {
        console.log(value);
      }); 
      
  };

  return (
    <Form.Item >
      <Form.Item >
          <Input.Group compact>
          <Form.Item >
        <Input.Group compact>
          <Form.Item>
            <Input
                onChange={handleFileChange}
                name="file"
                type={"file"}
                accept={".csv"}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleParse}>Upload</Button>
          </Form.Item>
        </Input.Group>
      </Form.Item>
          </Input.Group>
      </Form.Item>
      <Form.Item label="Manual CSV Data Input">
        <TextArea id="manual-csv-data" rows={15} value={
          `Product, Price\n` + 
          textFieldData?.data.map((value, index) => {
            return (
              `${value.Product}, ${value.Price}\n`
            );
          })
        }/>
      </Form.Item>
    </Form.Item>
      
  );
};

const ageItems = [];

for (let i = 0; i <= 120; i++) {             
  ageItems.push(<option key={i} value={i}>{i}</option>);   
  //here I will be creating my options dynamically based on
  //what props are currently passed to the parent component
}

const tabList = [
  {
    key: 'input',
    tab: 'Input',
  },
  {
    key: 'output',
    tab: 'Output',
  },
];

const inputContent = <div>
  
  <Form >
    <h3>User</h3>
    <Form.Item >
      <Input.Group compact>
        <Form.Item label="Name">
              <Input placeholder="Last name First name" />
        </Form.Item>
        <Form.Item label="Gender">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Please select gender"
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="unspecified">Unspecified</Option>
        </Select>
        </Form.Item>
        <Form.Item label="Age">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Please select age"
        >
          {ageItems}
        </Select>
        </Form.Item>
      </Input.Group>
    </Form.Item>
    <Form.Item >
      <Input.Group compact>
        <Form.Item label="Email">
              <Input/>
        </Form.Item>
        <Form.Item label="Country">
          <Select showSearch style={{ width: 200 }} placeholder="Please select city" options={countryList().getData()}/>
        </Form.Item>
        <Form.Item label="City">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Please select city"
          >
            {ageItems}
          </Select>
        </Form.Item>
      </Input.Group>
    </Form.Item>
    <h3>Input CSV Data</h3>
    <FileHandler />
  </Form>
</div>;
const outputContent = <p>Output content</p>;

const contentList: Record<string, React.ReactNode> = {
  input: inputContent,
  output: outputContent,
};

const App: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('input');
  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
    console.log(csvData);
    csvData.forEach(function (value) {
      console.log(value);
    }); 
  };

  return (
    <>
      <Card
        style={{ width: '100%'}}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={key => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      
    </>
  );
};

export default App;