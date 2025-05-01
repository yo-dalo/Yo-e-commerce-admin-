import TableTd from '../components/TablesX/TableTd';
import isImage from '../common/Helper/IsImage';
import React,{useEffect,useState} from "react";
import Axios from "axios"
import { Link ,useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
const DataDisplay = ({url}) => {
  
  const { id } = useParams();
  
  const [updata, setUpdata] = useState(null);
  const [keyArryX, setKeyArryX] = useState([]);
    const [dataX, setDataX] = useState({});
    const [loading, setLoading] = useState(null);
    
  const user = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    city: "New York",
  };



  useEffect(() => {
  const source = Axios.CancelToken.source();
  setLoading(true);
  Axios.get(url+id, { cancelToken: source.token })
    .then((res) => {
      if (res.data.data ) {
        setKeyArryX(Object.keys(res.data.data));
        setDataX(res.data.data);
      } else {
      toast.error("No data found");
        
        setDataX([]);
      }
    })
    .catch((err) => {
      if (!Axios.isCancel(err)) {
        console.error("Error fetching data:", err);
         toast.error("Error fetching data:");

      }
    })
    .finally(() => {
      setLoading(false);
    });

  return () => {
    source.cancel("Component unmounted, request canceled.");
  };
}, [url]);







  return (
    <div className="p-6 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>
      <div className="overflow-x-auto ">
        <table className="min-w-full shadow-md rounded-lg overflow-hidden">
          <thead className="rounded-sm  border-stroke bg-gray-300 shadow-default  dark:bg-gray-600 sm:px-7.5 xl:pb-1">
            <tr>
              <th className="py-3 px-6 text-left">Field</th>
              <th className="py-3 px-6 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
          
          {keyArryX.map((data,index)=>(
            <tr key={index} className="border-b">
              <td className="py-3 px-6 font-medium">{data}</td>
            {/*
           {Array.isArray(dataX[data])
           ?
           dataX[data].map((img,index)=>(
             typeof dataX[data] === 'string' && isImage(dataX[data])
                      ? <img  src={`http://localhost:5000/uploads/` + dataX[data][img]  || "......loding" }  />
                      : <td className="py-3 px-6">{dataX[data][img]|| "--"}</td>

             ))
             :
             typeof dataX[data] === 'string' && isImage(dataX[data])
                      ? <img  src={`http://localhost:5000/uploads/` + dataX[data]  || "......loding" }  />
                      : <td className="py-3 px-6">{dataX[data]|| "--"}</td>
             
                   }
                   */}
              
             { typeof dataX[data] === 'string' && isImage(dataX[data])
                      ? <img  src={`http://localhost:5000/uploads/` + dataX[data]  || "......loding" }  />
                      : <td className="py-3 px-6">{dataX[data]|| "--"}</td>

             }
              
              
            </tr>
            
               ))}
          </tbody>
          
        </table>
      </div>
    </div>
  );
};

export default DataDisplay;