"use client";
import React from "react";
import CopyBlock from "./CopyBlock";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Tab from "./Tab";

interface UsageProps {
  setPosition: (position: string) => void;
  position: string; // Añadir la prop "position" para enlazar el valor del select
}

function Usage({ setPosition, position }: UsageProps) {
  const code = `const LOCAL_STORAGE_KEY = "tab-system-data";
function Test() {
  const [tabs, setTabs] = useState([
    { id: "tab1", label: "Tab 1", content: "Content 1" },
    { id: "tab2", label: "Tab 2", content: "Content 2" },
  ]);
  const [activeTab, setActiveTab] = useState("tab1");

  // Load tabs and activeTab from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setTabs(parsedData.tabs || []);
      setActiveTab(parsedData.activeTab || "tab1");
    }
  }, []);

  // Save tabs and activeTab to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ tabs, activeTab })
    );
  }, [tabs, activeTab]);

  const addTab = () => {
    const newTab = {
      id: \`tab${`tabs`.length + 1}\`,
      label: \`Tab ${`tabs`.length + 1}\`,
      content: \`Content ${`tabs`.length + 1}\`,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (tabId: string) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== tabId));
    if (activeTab === tabId && tabs.length > 1) {
      const newActive = tabs.find((tab) => tab.id !== tabId)?.id || "";
      setActiveTab(newActive);
    }
  };

  const moveTab = (dragIndex: number, hoverIndex: number) => {
    const updatedTabs = [...tabs];
    const [movedTab] = updatedTabs.splice(dragIndex, 1);
    updatedTabs.splice(hoverIndex, 0, movedTab);
    setTabs(updatedTabs);
  };

  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList onAddTab={addTab} view="style1">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              view="style1"
              onClose={() => closeTab(tab.id)}
              moveTab={moveTab}
              index={index}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
      
    </DndProvider></>
  );
}

  `;
  const handlePositionChange = (newPosition: string) => {
    // Guardar el valor en localStorage
    localStorage.setItem("position", newPosition);
    // Actualizar el estado del componente
    setPosition(newPosition);
  };

  return (
    <div>
      <br />
      <h1 className="font-bold text-2xl">Usage</h1>
      <p>The component is based on shadcn tabs, so its imports are the same and its styles are the same.</p>
      <br />
      <CopyBlock text={code} />
      <p className="italic">This example contains a storage system in localstorage and the use with dnd-kit</p>
      
      <br />
      <h1 className="font-bold text-2xl">Style</h1>
      <p>Choose the tab style (restart the page to view the changes)</p>
       
      <br />
      <Select value={position} onValueChange={handlePositionChange}>
        <SelectTrigger className="">
          <SelectValue placeholder="style1" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="style1">style1</SelectItem>
          <SelectItem value="style2">style2</SelectItem>
          <SelectItem value="style3">style3</SelectItem>
          <SelectItem value="style4">style4</SelectItem>
          <SelectItem value="style5">style5</SelectItem>
          <SelectItem value="style6">style6</SelectItem>
          <SelectItem value="style7">style7</SelectItem>
          <SelectItem value="style8">style8</SelectItem>
          <SelectItem value="style9">style9</SelectItem>
          <SelectItem value="style10">style10</SelectItem>
          <SelectItem value="style11">style11</SelectItem>
        </SelectContent>
      </Select>

      <br />
      <Tab />
      <p className="font-bold">The styles come from  <a href="https://originui.com/tabs">originui</a></p>
    </div>
  );
}

export default Usage;
