import React from "react";
import "./Market.css";

const AccountInfo = () => {
  return (
    <div className="w-full h-screen bg-slate-400 mt-20 flex justify-center text-mini">
      <div className="w-11/12 bg-white flex">
        {/* SIDE */}
        <div className="w-1/2 mr-1 ">
          <div className="w-full  border-[1px] border-black flex flex-col">
            <div className="w-full  flex ">
              <div className="w-full">
                <div className="w-full bg-yellow-200 h-8 flex px-2 items-center justify-between">
                  <p>Client Account Info</p>
                  <div className="w-1/2 flex justify-between items-center">
                    <div>
                      <label className="mr-1" for="id1">
                        ID#
                      </label>
                      <input id="id1" placeholder="ID#" className="h-5" />
                    </div>
                    <div>
                      <label className="mr-1" for="pin1">
                        PIN#
                      </label>
                      <input id="pin1" placeholder="PIN#" className="h-5" />
                    </div>
                    <button className="border-2 px-4 py-1">Search</button>
                  </div>
                </div>
                <div className="w-full flex">
                  <div className="w-5/12 flex flex-col justify-around p-1">
                    {[
                      "Account No",
                      "Bank Name",
                      "MTBI Account No",
                      "Opening Branch",
                    ].map((val, index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-between items-center my-1 h-6 "
                        >
                          <label for={`${val}`}>{val}</label>
                          <input
                            className="h-6 outline-none border-2 pl-2"
                            id={val}
                            placeholder={val}
                          ></input>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-7/12   flex flex-col justify-around p-1">
                    <div className="flex justify-between items-center  h-6 ">
                      <label className="w-2/12 text-center">Account Name</label>
                      <input className="h-6 outline-none w-10/12 border-2 pl-2"></input>
                    </div>
                    <div className="flex items-center  h-6  ">
                      <label className="w-2/12 text-center">Opening Date</label>
                      <input className="w-2/12 h-6 outline-none  border-2 pl-2"></input>
                      <label className="w-2/12 text-center">Closing Date</label>
                      <input className="w-2/12 h-6 outline-none  border-2 pl-2"></input>
                      <label className="w-2/12 text-center">Status</label>
                      <input className="w-2/12 h-6 outline-none  border-2 pl-2"></input>
                    </div>
                    <div className="flex  items-center justify-between h-6 ">
                      <label className="w-2/12 text-center">
                        KSEI Account No
                      </label>
                      <input className="h-6 outline-none w-4/12 border-2 pl-2"></input>
                      <label className="w-2/12 text-center">SID No</label>
                      <input className="h-6 outline-none w-4/12 border-2 pl-2"></input>
                    </div>
                    <div className="flex justify-between items-center  h-6 ">
                      <label className="w-2/12 text-center">Branch</label>
                      <input className="h-6 outline-none w-10/12 border-2 pl-2"></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex ">
              <div className="w-full">
                <div className="w-full h-8 bg-blue-100 flex items-center px-1 ">
                  <p>Profile</p>
                </div>
                <div className="flex">
                  <div className=" w-4/12 h-32 flex flex-col justify-around">
                    {["USER ID", "ID EXP DATE", "PHONE ID", "COMPANY NAME"].map(
                      (val, index) => {
                        return (
                          <div key={index} className="flex w-full">
                            <label for={val} className="w-2/6 px-1">
                              {val}
                            </label>
                            <div className="w-4/6 px-1">
                              <input
                                id={val}
                                className="w-full h-6 border-2"
                                placeholder={val}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className=" w-4/12 h-32 flex flex-col justify-around">
                    {["ID TYPE", "DATE OF BIRTH", "MOBILE ID", "POSITION"].map(
                      (val, index) => {
                        return (
                          <div key={index} className="flex w-full">
                            <label for={val} className="w-2/6 px-1">
                              {val}
                            </label>
                            <div className="w-4/6 px-1">
                              <input
                                id={val}
                                className="w-full h-6 border-2"
                                placeholder={val}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className=" w-4/12 h-32 flex flex-col justify-around">
                    {["ID NO", "MARRIAGE STATUS", "FAX NO", "RELIGION"].map(
                      (val, index) => {
                        return (
                          <div key={index} className="flex w-full">
                            <label for={val} className="w-2/6 px-1">
                              {val}
                            </label>
                            <div className="w-4/6 px-1">
                              <input
                                id={val}
                                className="w-full h-6 border-2"
                                placeholder={val}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="w-full  bg-blue-100 flex flex-col items-center px-1 ">
                  <div className="w-full flex my-1 items-center">
                    <label for="address1" className="w-2/12 text-left">
                      Address
                    </label>
                    <div className="w-10/12">
                      <input
                        id="address1"
                        placeholder="Addres"
                        className="w-full h-6"
                      ></input>
                    </div>
                  </div>
                  <div className="w-full flex my-1 items-center">
                    <label for="email" className="w-2/12 text-left">
                      Email
                    </label>
                    <div className="w-10/12">
                      <input
                        id="email"
                        placeholder="Email"
                        className="w-full h-6"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDE */}
        <div className="w-1/2 h-[420px] bg-blue-400 ml-1">
          <div className="w-full bg-yellow-200 h-8 flex px-2 items-center justify-between">
            <p>PERFORMANCE GAIN/LOSS</p>
            <div className="w-1/2 flex justify-between items-center">
              <div>
                <label className="mr-1" for="id#">
                  ID#
                </label>
                <input id="id#" placeholder="ID#" className="h-5" />
              </div>
              <div>
                <label className="mr-1" for="id#">
                  ID#
                </label>
                <input id="id#" placeholder="ID#" className="h-5" />
              </div>
              <button className="border-2 px-4 py-1">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
