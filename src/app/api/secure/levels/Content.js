'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { encryptData, decryptData } from "@/components/utils/cryptoUtils";
 

const Content = () => {
  const [formData, setFormData] = useState([]);

  const [level, setLevel] = useState({
    lno: 1,
    active: 0,
    dailyamount: 0,
    total: 0,
    totdiractive:0,

  });

 
  // 🔁 Move fetchData outside so it can be reused
  const fetchData = async (lno) => {
    try {
      const formDataToSend = new URLSearchParams();
      const para = { lno: lno };
      const apidata = encryptData(JSON.stringify(para));
      formDataToSend.append("data", apidata);

      const auth = Cookies.get('auth');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/secure/levels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': auth || '',
        },
        body: formDataToSend.toString(),
      });

      if (res.ok) {
        const encryptedResponse = await res.json();
        const decryptedString = decryptData(encryptedResponse);
        const DataList = JSON.parse(decryptedString);
  
        setFormData(DataList);  

        setLevel({
          lno: lno,
          active: DataList.length > 0 ? DataList[0].totalactive : 0,
          dailyamount: DataList.length > 0 ? DataList[0].dailyamount : 0,
          total: DataList.length ,
          totdiractive: DataList.length > 0 ? DataList[0].totdiractive : 0,
          
        });

      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
      fetchData(1);
    
  }, []);

 

  return (
    <>
      <div className="bg-blueDark p-2 md:p-10 rounded-5 flex justify-center md:justify-between items-center flex-wrap gap-2">
        <div className="w-full flex justify-center">
          <div className="text-amber-100 font-bold text-center">
            <h5 className="text-sm leading-1.24 mb-5px mt-5px uppercase">Team Level</h5>

             <div className="flex flex-wrap justify-between items-center mb-3 gap-4">
  {/* Level No - Blue text */}
  <div className="flex items-center">
    <i className="icofont-book-alt pr-2 text-white text-lg"></i>
    <span className="text-size-10 text-white dark:text-white">
      Level No {level.lno}
    </span>
  </div>

  {/* Active Ids - Green text */}
  <div className="flex items-center">
    <i className="icofont-clock-time pr-2 text-green-400 text-lg"></i>
    <span className="text-size-10 text-green-600 dark:text-green-400">
      Active Ids {level.active}
    </span>
  </div>

  {/* Total Ids - Orange text */}
  <div className="flex items-center">
    <i className="icofont-clock-time pr-2 text-orange-400 text-lg"></i>
    <span className="text-size-10 text-orange-600 dark:text-orange-400">
      Total Ids {level.total}
    </span>
  </div>
</div>

<div className="flex flex-wrap justify-between items-center mb-3 gap-4">
  {/* Level No - Blue text */}
  <div className="flex items-center">
 
    <span className="text-size-10 text-white dark:text-white ">
    Total Direct Active : <span className='text-yellow ' >  {level.totdiractive}</span>
    
    </span>
  </div>

  <div className="flex items-center">
    <span className="text-size-10 text-green-600 dark:text-green-400">
    Daily Income : <span className='text-yellow ' >  {level.dailyamount}</span>
    </span>
  </div>

  
</div>




 
          </div>
        </div>
      </div>
     
     

      <div className="flex justify-center items-center pt-2 pb-100px">
        <div className="w-full max-w-2xl">
          <div className="overflow-auto">
            
            <div className="bg-gray-900 text-white p-4 rounded-lg max-w-[390px] w-full mx-auto">
            <div className="grid grid-cols md:grid-cols-3 xl:grid-cols-12 gap-x-30px">
            <div className="xl:col-span-6 mb-3">
        
            <div className="relative w-full">
  <select
    className="appearance-none w-full bg-black text-white p-3 pr-10 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
    onChange={(e) => fetchData(Number(e.target.value))}
    defaultValue="1"
  >
    <option value="1">Level 1</option>
    <option value="2">Level 2</option>
    <option value="3">Level 3</option>
    <option value="4">Level 4</option>
    <option value="5">Level 5</option>
    <option value="6">Level 6</option>
    <option value="7">Level 7</option>
    <option value="8">Level 8</option>
    <option value="9">Level 9</option>
    <option value="10">Level 10</option>
  </select>
  <svg
    className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 h-4 w-4 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</div>

                </div>
          
          
              </div>
              <table className="w-full table-fixed text-size-10 border border-gray-700 rounded overflow-hidden">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="border border-gray-700 px-2 py-2 w-[10%]">#</th>
                    <th className="border border-gray-700 px-2 py-2 w-[20%] break-words">ID</th>
                    <th className="border border-gray-700 px-2 py-2 w-[25%] break-words">Date</th>
                    <th className="border border-gray-700 px-2 py-2 w-[20%] break-words">Ref.</th>
                    <th className="border border-gray-700 px-2 py-2 w-[25%] break-words">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 text-white">
                  {formData?.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-800">
                      <td className="border border-gray-700 px-2 py-2 text-center">{index + 1}</td>
                      <td className="border border-gray-700 p-1 break-words">{item.memberid}</td>
                      <td className="border border-gray-700 px-2 py-2 break-words">{item.dop}</td>
                      <td className="border border-gray-700 px-2 py-2 text-center">{item.introid}</td>
                      <td className="border border-gray-700 px-2 py-2 text-center">
                        {item.totdirect > 0 ? (
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded-full"
                          >
                            Active
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                            Nonactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

             
              
            </div>
          </div>
 
        </div>
      </div>
    </>
  );
};

export default Content;
