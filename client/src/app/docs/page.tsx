import React from "react";

const page = () => {
  return (
    <div className=" flex flex-col gap-5 items-center justify-center mt-5">
      <h1 className=" text-3xl">We are still cooking docs page btw :)</h1>
      <h2 className=" text-2xl font-bold">But here you can do :</h2>
      <p className=" text-lg text-center w-[70%] leading-10">
        {" "}
        Login -&gt; copy api key -&gt; give your info -&gt; install "rankdevs"
        extension from vscode extensions -&gt; set api key there{" "}
      </p>
      <h2 className=" text-2xl font-bold">Some special things to remind :</h2>
      <h3 className=" text-xl italic ">
        {" "}
        * You must have github account and vscode installed
      </h3>
      <h3 className=" text-xl italic">
        {" "}
        * You can't use one api key in multiple vscode workplace
      </h3>
      <h3 className=" text-xl italic w-[70%] text-center leading-10">
        * Please add your leetcode, codeforce and twitter account name for
        beautification. It will help use to make your stunning dashboard.
      </h3>
      <h3 className=" text-lg italic w-[70%] text-center">
        {" "}
        * Also here is the Quick open <code className=" mx-2 ">
          Ctrl + P
        </code>{" "}
        command :{" "}
        <code className=" mx-2"> ext install tamalckb.vscode-rankdevs</code>
      </h3>
    </div>
  );
};

export default page;
