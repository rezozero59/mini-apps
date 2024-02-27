import Tabs from "./components/Tabs";
import PreviewButton from "./components/PreviewButton";
import "./IdeApp.css";

function IdeApp() {
  return (
    <div className="ideContainer bg-zinc-900 w-full min-h-screen flex flex-col mt-10 rounded-lg">
      <div className="px-4 py-4 border-b flex items-center">
        <h1 className="w-full text-slate-50 text-2xl">
          <span className="text-base">Mon </span>IDE
        </h1>
        <div className="w-full">
          <PreviewButton />
        </div>
        {/* <div className="w-full flex">
          <div className="ml-auto mr-2">
            <div className="w-[6px] h-[6px] bg-slate-200 rounded-full my-1"></div>
            <div className="w-[6px] h-[6px] bg-slate-200 rounded-full my-1"></div>
            <div className="w-[6px] h-[6px] bg-slate-200 rounded-full"></div>
          </div>
        </div> */}
      </div>
      <Tabs />
    </div>
  );
}

export default IdeApp;
